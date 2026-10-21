/**
 * npm run screenshots → tests/visual/<pagina>-<largura>.png (página inteira).
 * Usado pela skill verify no ciclo visual. Não compara pixels: a comparação é com o DESIGN.md.
 */
import { test } from "@playwright/test";

const PAGINAS = [
  { nome: "inicio", caminho: "/" },
  { nome: "privacidade", caminho: "/politica-de-privacidade/" },
];
const LARGURAS = [360, 768, 1280];

for (const { nome, caminho } of PAGINAS) {
  for (const largura of LARGURAS) {
    test(`${nome} em ${largura}px`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: largura < 768 ? 800 : 900 });
      await page.goto(caminho, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `tests/visual/${nome}-${largura}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}
