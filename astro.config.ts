import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: {
    // CSS sempre em arquivo: a CSP (public/_headers) não permite estilos inline.
    inlineStylesheets: "never",
    format: "directory",
  },
  vite: {
    build: {
      // Nada de data: URIs nem scripts inline; tudo como arquivo em /_astro/.
      assetsInlineLimit: 0,
    },
  },
  devToolbar: { enabled: false },
});
