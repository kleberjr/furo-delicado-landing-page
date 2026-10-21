import { defineConfig, devices } from "@playwright/test";

const PORTA = 4321;
const CI = !!process.env.CI;

/**
 * e2e e screenshots rodam contra o build servido por scripts/serve.mjs, que aplica public/_headers
 * (a CSP vale durante os testes). Usa build:draft para rodar mesmo com placeholders; o bloqueio de
 * placeholders fica no `npm run build` (produção).
 * CHROMIUM_PATH aponta para um Chromium já instalado (opcional).
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORTA}`,
    ...(process.env.CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.CHROMIUM_PATH } }
      : {}),
  },
  projects: [
    { name: "unit", testDir: "tests/unit" },
    { name: "e2e", testDir: "tests/e2e", use: { ...devices["Desktop Chrome"] } },
    { name: "screenshots", testDir: "tests/visual", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: process.argv.some((a) => a === "--project=unit")
    ? undefined
    : {
        command: `npm run build:draft && node scripts/serve.mjs dist`,
        env: { PORT: String(PORTA) },
        url: `http://localhost:${PORTA}`,
        reuseExistingServer: !CI,
        timeout: 180_000,
      },
});
