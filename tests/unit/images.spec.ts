import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import sharp from "sharp";
import {
  LADO_MAXIMO,
  normalizarNome,
  processarPasta,
  relatorio,
  temGps,
} from "../../scripts/images.ts";

const FIXTURES = new URL("../fixtures/images/", import.meta.url).pathname;
const JPEG_GIRADO = "Foto Fachada Girada.jpg"; // 40×20, EXIF Orientation 6, GPS
const PNG_ALFA = "Logo Transparente.png"; // 64×48 com transparência
const HEIC = "IMG 0001 Salão.HEIC"; // 48×32, faixa vermelha à esquerda

/** Pasta temporária com original/ (cópias dos fixtures pedidos) e destino vazio. */
function ambiente(...fixtures: string[]) {
  const raiz = mkdtempSync(join(tmpdir(), "images-"));
  const origem = join(raiz, "original");
  const destino = join(raiz, "src/assets/images");
  mkdirSync(origem);
  for (const f of fixtures) cpSync(join(FIXTURES, f), join(origem, f));
  return { raiz, origem, destino, limpar: () => rmSync(raiz, { recursive: true, force: true }) };
}

test.describe("normalizarNome", () => {
  test("kebab-case, sem acento e sem espaço", () => {
    expect(normalizarNome("Foto Fachada 1")).toBe("foto-fachada-1");
    expect(normalizarNome("IMG 0001 Salão")).toBe("img-0001-salao");
    expect(normalizarNome("  Ação__Çapa (cópia) ")).toBe("acao-capa-copia");
    expect(normalizarNome("!!!")).toBe("imagem");
  });
});

test.describe("npm run images", () => {
  test("fixture JPEG tem rotação e GPS (pré-condição)", async () => {
    const meta = await sharp(join(FIXTURES, JPEG_GIRADO)).metadata();
    expect(meta.orientation).toBe(6);
    expect(await temGps(join(FIXTURES, JPEG_GIRADO))).toBe(true);
  });

  test("JPEG: orientação aplicada nos pixels, GPS e metadados removidos, original apagado", async () => {
    const amb = ambiente(JPEG_GIRADO);
    try {
      const [r] = await processarPasta(amb);
      expect(r?.status).toBe("ok");
      const saida = join(amb.destino, "foto-fachada-girada.jpg");
      const meta = await sharp(saida).metadata();
      expect([meta.width, meta.height]).toEqual([20, 40]); // 40×20 girada 90°
      expect(meta.orientation ?? 1).toBe(1);
      expect(meta.exif).toBeUndefined();
      expect(await temGps(saida)).toBe(false);
      // A faixa vermelha (esquerda na origem) vai para o topo após girar 90° no sentido horário.
      const { data } = await sharp(saida)
        .extract({ left: 10, top: 2, width: 1, height: 1 })
        .raw()
        .toBuffer({ resolveWithObject: true });
      expect(data[0]).toBeGreaterThan(200);
      expect(existsSync(join(amb.origem, JPEG_GIRADO))).toBe(false);
    } finally {
      amb.limpar();
    }
  });

  test("HEIC é convertido para JPEG", async () => {
    const amb = ambiente(HEIC);
    try {
      const [r] = await processarPasta(amb);
      expect(r?.status, r?.motivo).toBe("ok");
      const meta = await sharp(join(amb.destino, "img-0001-salao.jpg")).metadata();
      expect(meta.format).toBe("jpeg");
      expect([meta.width, meta.height]).toEqual([48, 32]);
      expect(existsSync(join(amb.origem, HEIC))).toBe(false);
    } finally {
      amb.limpar();
    }
  });

  test("PNG com transparência continua PNG com canal alfa", async () => {
    const amb = ambiente(PNG_ALFA);
    try {
      await processarPasta(amb);
      const saida = join(amb.destino, "logo-transparente.png");
      const meta = await sharp(saida).metadata();
      expect(meta.format).toBe("png");
      expect(meta.hasAlpha).toBe(true);
      expect((await sharp(saida).stats()).isOpaque).toBe(false);
    } finally {
      amb.limpar();
    }
  });

  test("PNG opaco vira JPEG", async () => {
    const amb = ambiente();
    try {
      await sharp({ create: { width: 30, height: 20, channels: 4, background: "#336699ff" } })
        .png()
        .toFile(join(amb.origem, "Print Opaco.png"));
      await processarPasta(amb);
      expect(readdirSync(amb.destino)).toEqual(["print-opaco.jpg"]);
    } finally {
      amb.limpar();
    }
  });

  test(`limita o lado maior a ${LADO_MAXIMO}px e não amplia imagens menores`, async () => {
    const amb = ambiente(HEIC);
    try {
      await sharp({ create: { width: 4000, height: 1000, channels: 3, background: "#777" } })
        .jpeg()
        .toFile(join(amb.origem, "grande.jpg"));
      await processarPasta(amb);
      const grande = await sharp(join(amb.destino, "grande.jpg")).metadata();
      expect([grande.width, grande.height]).toEqual([LADO_MAXIMO, 640]);
      const pequena = await sharp(join(amb.destino, "img-0001-salao.jpg")).metadata();
      expect([pequena.width, pequena.height]).toEqual([48, 32]);
    } finally {
      amb.limpar();
    }
  });

  test("nome existente não é sobrescrito: recebe sufixo e aviso", async () => {
    const amb = ambiente(JPEG_GIRADO);
    try {
      mkdirSync(amb.destino, { recursive: true });
      writeFileSync(join(amb.destino, "foto-fachada-girada.jpg"), "existente");
      const [r] = await processarPasta(amb);
      expect(r?.status).toBe("ok");
      expect(r?.saida).toMatch(/foto-fachada-girada-2\.jpg$/);
      expect(r?.avisos.join()).toMatch(/já existia/);
      expect(readdirSync(amb.destino).sort()).toEqual([
        "foto-fachada-girada-2.jpg",
        "foto-fachada-girada.jpg",
      ]);
    } finally {
      amb.limpar();
    }
  });

  test("falha e formato não suportado mantêm o original e entram no relatório", async () => {
    const amb = ambiente(PNG_ALFA);
    try {
      writeFileSync(join(amb.origem, "quebrada.jpg"), "não é imagem");
      writeFileSync(join(amb.origem, "contrato.pdf"), "%PDF");
      const resultados = await processarPasta(amb);
      const por = (n: string) => resultados.find((r) => r.arquivo === n);
      expect(por("quebrada.jpg")?.status).toBe("falha");
      expect(por("contrato.pdf")?.status).toBe("ignorado");
      expect(por(PNG_ALFA)?.status).toBe("ok");
      expect(readdirSync(amb.origem).sort()).toEqual(["contrato.pdf", "quebrada.jpg"]);
      expect(readdirSync(amb.destino)).toEqual(["logo-transparente.png"]);
      const texto = relatorio(resultados, amb.raiz);
      expect(texto).toMatch(/1 processada\(s\), 1 falha\(s\), 1 ignorada\(s\)/);
      expect(texto).toMatch(/✖ quebrada\.jpg: não foi possível ler a imagem/);
      expect(texto).toMatch(/– contrato\.pdf: formato não suportado/);
      expect(texto).toMatch(/Logo Transparente\.png → src\/assets\/images\/logo-transparente\.png/);
    } finally {
      amb.limpar();
    }
  });

  test("--dry-run não grava nem apaga nada", async () => {
    const amb = ambiente(JPEG_GIRADO, HEIC, PNG_ALFA);
    try {
      const resultados = await processarPasta({ ...amb, dryRun: true });
      expect(resultados.map((r) => r.status)).toEqual(["simulado", "simulado", "simulado"]);
      expect(existsSync(amb.destino)).toBe(false);
      expect(readdirSync(amb.origem)).toHaveLength(3);
      expect(relatorio(resultados, amb.raiz, true)).toMatch(/nada foi gravado nem apagado/);
    } finally {
      amb.limpar();
    }
  });

  test("sem pasta original/: cria a pasta e não processa nada", async () => {
    const amb = ambiente();
    try {
      rmSync(amb.origem, { recursive: true });
      expect(await processarPasta(amb)).toEqual([]);
      expect(existsSync(amb.origem)).toBe(true);
    } finally {
      amb.limpar();
    }
  });
});
