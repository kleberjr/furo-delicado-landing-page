/** Imagens de cliente no projeto: cada uma abaixo de 1 MB e sem metadados de GPS. */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { TAMANHO_MAXIMO, temGps } from "../../scripts/images.ts";

const PASTA = new URL("../../src/assets/images/", import.meta.url).pathname;
const imagens = existsSync(PASTA)
  ? readdirSync(PASTA).filter((f) => /\.(jpe?g|png|webp|avif|heic|heif|tiff?)$/i.test(f))
  : [];

test("imagens em src/assets/images: < 1 MB e sem GPS", async () => {
  for (const nome of imagens) {
    const caminho = join(PASTA, nome);
    const tamanho = statSync(caminho).size;
    expect(tamanho, `${nome} tem ${tamanho} bytes (máx. 1 MB): rode npm run images`).toBeLessThan(
      TAMANHO_MAXIMO,
    );
    expect(await temGps(caminho), `${nome} tem metadados de GPS: rode npm run images`).toBe(false);
  }
});
