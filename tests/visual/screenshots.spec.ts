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
      // Rola até o fim para carregar as imagens com loading="lazy" antes da captura.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `tests/visual/${nome}-${largura}.png`,
        fullPage: true,
        animations: "disabled",
      });
    });
  }
}
