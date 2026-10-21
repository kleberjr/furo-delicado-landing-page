#!/usr/bin/env node
/**
 * Prepara as fotos do cliente: original/ → src/assets/images/.
 * Uso: npm run images [-- --dry-run]
 *
 * Para cada arquivo em original/: HEIC/HEIF → JPEG; corrige a orientação pelo EXIF; remove todos os
 * metadados (inclusive GPS); limita a 2560px no lado maior (sem ampliar); salva JPEG ~82 (ou PNG se
 * houver transparência) com nome em kebab-case; verifica a saída e só então apaga o original.
 * Falhou em qualquer etapa → o original fica e o motivo vai para o relatório.
 * A otimização para web (AVIF/WebP, srcset) continua no build do Astro.
 *
 * ATENÇÃO: os originais são APAGADOS após o sucesso. Guarde-os antes na pasta do cliente no Drive.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { extname, join, parse, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import convertHeic from "heic-convert";
import sharp from "sharp";

export const LADO_MAXIMO = 2560;
export const TAMANHO_MAXIMO = 1024 * 1024; // 1 MB
const QUALIDADES_JPEG = [82, 76, 70, 64];
const SUPORTADOS = new Set([".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp", ".tif", ".tiff"]);
const HEIC = new Set([".heic", ".heif"]);

export type Status = "ok" | "simulado" | "falha" | "ignorado";

export interface Resultado {
  arquivo: string;
  status: Status;
  saida?: string;
  antes: number;
  depois?: number;
  dimensoes?: { antes: string; depois: string };
  avisos: string[];
  motivo?: string;
}

export interface Opcoes {
  origem: string;
  destino: string;
  dryRun?: boolean;
}

/** "Foto Fachada 1" → "foto-fachada-1" (sem acento, sem espaço, kebab-case). */
export function normalizarNome(nome: string): string {
  const base = nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "imagem";
}

/** true se o EXIF tiver o ponteiro de GPS (tag 0x8825) ou o XMP tiver campos de GPS. */
export async function temGps(entrada: Buffer | string): Promise<boolean> {
  const meta = await sharp(entrada).metadata();
  if (meta.xmp && /GPS(Latitude|Longitude|Position)/i.test(meta.xmp.toString("utf8"))) return true;
  if (!meta.exif) return false;
  return exifTemGps(meta.exif);
}

function exifTemGps(exif: Buffer): boolean {
  try {
    const ini = exif.subarray(0, 6).toString("latin1") === "Exif\0\0" ? 6 : 0;
    const le = exif.subarray(ini, ini + 2).toString("latin1") === "II";
    const u16 = (o: number) => (le ? exif.readUInt16LE(o) : exif.readUInt16BE(o));
    const u32 = (o: number) => (le ? exif.readUInt32LE(o) : exif.readUInt32BE(o));
    const ifd0 = ini + u32(ini + 4);
    const n = u16(ifd0);
    for (let i = 0; i < n; i++) if (u16(ifd0 + 2 + i * 12) === 0x8825) return true;
    return false;
  } catch {
    return true; // EXIF ilegível: trata como suspeito
  }
}

/** Nome livre em `destino`: foto.jpg, foto-2.jpg, foto-3.jpg… */
function nomeLivre(destino: string, base: string, ext: string, reservados: Set<string>): string {
  for (let i = 1; ; i++) {
    const nome = i === 1 ? `${base}${ext}` : `${base}-${i}${ext}`;
    if (!reservados.has(nome) && !existsSync(join(destino, nome))) return nome;
  }
}

/** Decodifica (HEIC → JPEG), orienta, remove metadados, redimensiona e codifica. */
async function converter(
  bruto: Buffer,
  ext: string,
): Promise<{ dados: Buffer; formato: "jpg" | "png"; antes: string; depois: string }> {
  const entrada = HEIC.has(ext)
    ? Buffer.from(await convertHeic({ buffer: bruto, format: "JPEG", quality: 1 }))
    : bruto;
  let meta;
  try {
    meta = await sharp(entrada).metadata();
  } catch {
    throw new Error("não foi possível ler a imagem (arquivo corrompido ou formato inválido)");
  }
  if (!meta.width || !meta.height) throw new Error("dimensões inválidas na entrada");
  const orientacao = meta.orientation ?? 1;
  const antes = `${meta.width}×${meta.height}${orientacao > 1 ? ` EXIF ${orientacao}` : ""}`;

  // .rotate() sem argumento aplica a orientação do EXIF nos pixels; sharp não copia metadados.
  const base = () =>
    sharp(entrada).rotate().resize({
      width: LADO_MAXIMO,
      height: LADO_MAXIMO,
      fit: "inside",
      withoutEnlargement: true,
    });

  const transparente = meta.hasAlpha && !(await sharp(entrada).stats()).isOpaque;
  let dados: Buffer;
  let formato: "jpg" | "png";
  if (transparente) {
    formato = "png";
    dados = await base().png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
    if (dados.length >= TAMANHO_MAXIMO) {
      dados = await base().png({ compressionLevel: 9, palette: true }).toBuffer();
    }
  } else {
    formato = "jpg";
    dados = Buffer.alloc(0);
    for (const quality of QUALIDADES_JPEG) {
      dados = await base()
        .flatten({ background: "#ffffff" })
        .jpeg({ quality, mozjpeg: true })
        .toBuffer();
      if (dados.length < TAMANHO_MAXIMO) break;
    }
  }
  const final = await sharp(dados).metadata();
  return { dados, formato, antes, depois: `${final.width}×${final.height}` };
}

/** Confere a imagem gerada; devolve o motivo da reprovação ou null. */
async function verificar(dados: Buffer): Promise<string | null> {
  if (dados.length === 0) return "arquivo vazio";
  if (dados.length >= TAMANHO_MAXIMO) return `ficou com ${formatarBytes(dados.length)} (máx. 1 MB)`;
  let meta;
  try {
    meta = await sharp(dados).metadata();
  } catch (e) {
    return `não abre: ${(e as Error).message}`;
  }
  if (!meta.width || !meta.height) return "dimensões inválidas";
  if (Math.max(meta.width, meta.height) > LADO_MAXIMO) return "lado maior acima de 2560px";
  if (await temGps(dados)) return "ainda contém metadados de GPS";
  return null;
}

export async function processarPasta({
  origem,
  destino,
  dryRun = false,
}: Opcoes): Promise<Resultado[]> {
  if (!existsSync(origem)) {
    if (!dryRun) await mkdir(origem, { recursive: true });
    return [];
  }
  const entradas = (await readdir(origem, { withFileTypes: true }))
    .filter((e) => !e.name.startsWith("."))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (!dryRun) await mkdir(destino, { recursive: true });

  const reservados = new Set<string>();
  const resultados: Resultado[] = [];

  for (const e of entradas) {
    const caminho = join(origem, e.name);
    const ext = extname(e.name).toLowerCase();
    const r: Resultado = { arquivo: e.name, status: "falha", antes: 0, avisos: [] };
    resultados.push(r);

    if (!e.isFile()) {
      r.status = "ignorado";
      r.motivo = "não é arquivo (subpastas não são processadas)";
      continue;
    }
    r.antes = (await stat(caminho)).size;
    if (!SUPORTADOS.has(ext)) {
      r.status = "ignorado";
      r.motivo = `formato não suportado (${ext || "sem extensão"}); mantido em original/`;
      continue;
    }

    try {
      const { dados, formato, antes, depois } = await converter(await readFile(caminho), ext);
      const base = normalizarNome(parse(e.name).name);
      const nome = nomeLivre(destino, base, `.${formato}`, reservados);
      reservados.add(nome);
      if (nome !== `${base}.${formato}`)
        r.avisos.push(`${base}.${formato} já existia; salvo como ${nome}`);
      r.saida = join(destino, nome);
      r.depois = dados.length;
      r.dimensoes = { antes, depois };

      const problema = await verificar(dados);
      if (problema) throw new Error(problema);
      if (dryRun) {
        r.status = "simulado";
        continue;
      }

      await writeFile(r.saida, dados, { flag: "wx" }); // nunca sobrescreve
      const gravado = await readFile(r.saida);
      const problemaGravado = await verificar(gravado);
      if (problemaGravado) {
        await rm(r.saida, { force: true });
        throw new Error(`verificação após gravar: ${problemaGravado}`);
      }
      await rm(caminho);
      r.status = "ok";
    } catch (err) {
      r.status = "falha";
      r.motivo = (err as Error).message || String(err);
      delete r.saida;
    }
  }
  return resultados;
}

export function formatarBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function relatorio(resultados: Resultado[], raiz = process.cwd(), dryRun = false): string {
  if (!resultados.length)
    return "Nenhum arquivo em original/. Coloque as fotos do cliente lá e rode de novo.";
  const conta = (s: Status) => resultados.filter((r) => r.status === s).length;
  const linhas = [
    dryRun
      ? `Simulação (--dry-run): nada foi gravado nem apagado.`
      : `Imagens: ${conta("ok")} processada(s), ${conta("falha")} falha(s), ${conta("ignorado")} ignorada(s).`,
    "",
  ];
  for (const r of resultados) {
    const saida = r.saida ? relative(raiz, r.saida) : "";
    const tam =
      r.depois !== undefined ? `${formatarBytes(r.antes)} → ${formatarBytes(r.depois)}` : "";
    const dim = r.dimensoes ? ` (${r.dimensoes.antes} → ${r.dimensoes.depois})` : "";
    if (r.status === "ok" || r.status === "simulado") {
      const verbo = r.status === "ok" ? "✔" : "→";
      linhas.push(`${verbo} ${r.arquivo} → ${saida}  ${tam}${dim}`);
    } else if (r.status === "falha") {
      linhas.push(`✖ ${r.arquivo}: ${r.motivo} (original mantido)`);
    } else {
      linhas.push(`– ${r.arquivo}: ${r.motivo}`);
    }
    for (const a of r.avisos) linhas.push(`  ⚠ ${a}`);
  }
  return linhas.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const dryRun = process.argv.includes("--dry-run");
  const resultados = await processarPasta({
    origem: resolve("original"),
    destino: resolve("src/assets/images"),
    dryRun,
  });
  console.log(relatorio(resultados, process.cwd(), dryRun));
  if (resultados.some((r) => r.status === "falha")) process.exitCode = 1;
}
