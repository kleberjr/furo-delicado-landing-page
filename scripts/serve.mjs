#!/usr/bin/env node
/**
 * Servidor estático de preview que aplica public/_headers (copiado para dist/_headers),
 * imitando Cloudflare Pages / Netlify. Usado pelos testes e pelo Lighthouse CI.
 * Uso: node scripts/serve.mjs [dist] (porta: PORT, padrão 4321)
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const raiz = resolve(process.argv[2] ?? "dist");
const porta = Number(process.env.PORT ?? 4321);

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

/** Lê o formato _headers: linha sem indentação = padrão de caminho; indentada = "Nome: valor". */
function lerHeaders(texto) {
  const regras = [];
  for (const linha of texto.split("\n")) {
    if (!linha.trim() || linha.trim().startsWith("#")) continue;
    if (!/^\s/.test(linha)) {
      regras.push({ padrao: linha.trim(), headers: {} });
    } else if (regras.length) {
      const i = linha.indexOf(":");
      regras.at(-1).headers[linha.slice(0, i).trim()] = linha.slice(i + 1).trim();
    }
  }
  return regras;
}

function casa(padrao, caminho) {
  const re = new RegExp(`^${padrao.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
  return re.test(caminho);
}

async function arquivo(caminho) {
  const alvo = normalize(join(raiz, decodeURIComponent(caminho)));
  if (alvo !== raiz && !alvo.startsWith(raiz + sep)) return null;
  for (const c of [alvo, join(alvo, "index.html"), `${alvo}.html`]) {
    try {
      if ((await stat(c)).isFile()) return c;
    } catch {
      /* tenta o próximo */
    }
  }
  return null;
}

const regras = lerHeaders(await readFile(join(raiz, "_headers"), "utf8").catch(() => ""));

createServer(async (req, res) => {
  const caminho = new URL(req.url ?? "/", "http://localhost").pathname;
  for (const r of regras) {
    if (casa(r.padrao, caminho))
      for (const [k, v] of Object.entries(r.headers)) res.setHeader(k, v);
  }
  if (caminho === "/_headers") {
    res.writeHead(404).end();
    return;
  }
  const encontrado = await arquivo(caminho);
  const destino = encontrado ?? join(raiz, "404.html");
  try {
    const corpo = await readFile(destino);
    res.writeHead(encontrado ? 200 : 404, {
      "Content-Type": TIPOS[extname(destino)] ?? "application/octet-stream",
    });
    res.end(req.method === "HEAD" ? undefined : corpo);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(porta, () => console.log(`Preview em http://localhost:${porta} (${raiz})`));
