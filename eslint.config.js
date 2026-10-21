import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default defineConfig(
  {
    ignores: [
      "dist/",
      ".astro/",
      "node_modules/",
      ".lighthouseci/",
      "test-results/",
      "playwright-report/",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...astro.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "no-restricted-properties": [
        "error",
        { property: "innerHTML", message: "Não use innerHTML; monte o DOM com APIs seguras." },
      ],
    },
  },
  {
    files: ["scripts/**/*.mjs", "*.config.{js,ts}"],
    languageOptions: { globals: { process: "readonly", console: "readonly", URL: "readonly" } },
  },
);
