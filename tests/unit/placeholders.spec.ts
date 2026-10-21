import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { encontrarPlaceholders, verificarDiretorio } from "../../scripts/check-placeholders.mjs";

test.describe("placeholders", () => {
  test("encontra placeholders no texto", () => {
    expect(
      encontrarPlaceholders("<p>[[PLACEHOLDER: foto real]]</p> e [[PLACEHOLDER: CNPJ]]"),
    ).toEqual(["foto real", "CNPJ"]);
    expect(encontrarPlaceholders("<p>Tudo certo</p>")).toEqual([]);
  });

  test("o build de produção falha com placeholder; sem placeholder passa", async () => {
    const dir = mkdtempSync(join(tmpdir(), "landing-kit-"));
    try {
      mkdirSync(join(dir, "sub"));
      writeFileSync(join(dir, "index.html"), "<h1>Ok</h1>");
      const script = new URL("../../scripts/check-placeholders.mjs", import.meta.url).pathname;

      expect(spawnSync(process.execPath, [script, dir]).status).toBe(0);

      writeFileSync(join(dir, "sub", "index.html"), "<p>[[PLACEHOLDER: depoimento real]]</p>");
      expect(await verificarDiretorio(dir)).toEqual([
        { arquivo: join("sub", "index.html"), placeholders: ["depoimento real"] },
      ]);
      const r = spawnSync(process.execPath, [script, dir], { encoding: "utf8" });
      expect(r.status).toBe(1);
      expect(r.stderr).toContain("depoimento real");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
