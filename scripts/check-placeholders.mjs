#!/usr/bin/env node
/**
 * Falha o build de produção se o site gerado ainda tiver [[PLACEHOLDER: ...]].
 * Uso: node scripts/check-placeholders.mjs dist
 * (npm run build roda isto; npm run dev e npm run build:draft não.)
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const EXTENSOES = /\.(html|xml|txt|json|js|css)$/;
const PADRAO = /\[\[PLACEHOLDER:?([^\]]*)\]\]/g;

/** Lista os placeholders de um texto, ex.: ["foto real do salão"]. */
export function encontrarPlaceholders(texto) {
  return [...texto.matchAll(PADRAO)].map((m) => (m[1] ?? "").trim());
}

/** Varre um diretório e devolve [{ arquivo, placeholders }] com ocorrências. */
export async function verificarDiretorio(dir) {
  const entradas = await readdir(dir, { recursive: true, withFileTypes: true });
  const achados = [];
  for (const e of entradas) {
    if (!e.isFile() || !EXTENSOES.test(e.name)) continue;
    const caminho = join(e.parentPath, e.name);
    const placeholders = encontrarPlaceholders(await readFile(caminho, "utf8"));
    if (placeholders.length) achados.push({ arquivo: relative(dir, caminho), placeholders });
  }
  return achados;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = process.argv[2] ?? "dist";
  const achados = await verificarDiretorio(dir);
  if (achados.length) {
    console.error("Build de produção bloqueado: há placeholders no site gerado.\n");
    for (const { arquivo, placeholders } of achados) {
      for (const p of new Set(placeholders)) console.error(`  ${arquivo}: [[PLACEHOLDER: ${p}]]`);
    }
    console.error(
      "\nSubstitua-os em src/content/site.ts (ou use npm run build:draft para rascunho).",
    );
    process.exit(1);
  }
  console.log("Nenhum [[PLACEHOLDER encontrado.");
}
