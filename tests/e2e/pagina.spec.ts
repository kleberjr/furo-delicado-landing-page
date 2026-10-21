import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { site } from "../../src/content/site";
import { telHref, whatsappUrl } from "../../src/lib/contato";

const PAGINAS = ["/", "/politica-de-privacidade/"];
const LARGURAS = [360, 768, 1280];

test.describe("funcional", () => {
  for (const caminho of PAGINAS) {
    test(`${caminho} carrega sem erro no console (inclui violações de CSP)`, async ({ page }) => {
      const erros: string[] = [];
      page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
      page.on("pageerror", (e) => erros.push(e.message));
      await page.goto(caminho, { waitUntil: "networkidle" });
      expect(erros).toEqual([]);
    });
  }

  test("links wa.me e tel: montados a partir de site.ts", async ({ page }) => {
    await page.goto("/");
    const wpp = whatsappUrl(site.contato.whatsapp, site.contato.mensagemWhatsapp);
    expect(wpp).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    await expect(page.locator('[data-cta="primary"]')).toHaveAttribute("href", wpp);
    if (site.contato.telefone) {
      const tels = await page
        .locator('a[href^="tel:"]')
        .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
      expect(tels.length).toBeGreaterThan(0);
      for (const t of tels) expect(t).toBe(telHref(site.contato.telefone));
    }
  });
});

test.describe("responsividade", () => {
  for (const largura of LARGURAS) {
    test(`sem scroll horizontal em ${largura}px`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: 800 });
      await page.goto("/");
      const excesso = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(excesso).toBeLessThanOrEqual(0);
    });
  }

  test('data-cta="primary" visível sem rolar em 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/");
    await expect(page.locator('[data-cta="primary"]')).toBeInViewport({ ratio: 1 });
  });
});

test.describe("acessibilidade", () => {
  for (const caminho of PAGINAS) {
    test(`${caminho} tem exatamente um h1`, async ({ page }) => {
      await page.goto(caminho);
      await expect(page.locator("h1")).toHaveCount(1);
    });

    for (const largura of [360, 1280]) {
      test(`${caminho} sem violações sérias no axe em ${largura}px`, async ({ page }) => {
        await page.setViewportSize({ width: largura, height: 800 });
        await page.goto(caminho);
        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        const serias = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(serias.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
      });
    }
  }
});

test("segurança: headers presentes no build de preview", async ({ request }) => {
  const h = (await request.get("/")).headers();
  const csp = h["content-security-policy"] ?? "";
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).not.toContain("unsafe-inline");
  expect(h["strict-transport-security"]).toMatch(/max-age=\d{7,}/);
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toBeTruthy();
});
