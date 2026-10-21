import type { ImageMetadata } from "astro";

const arquivos = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

/** Resolve um arquivo de src/assets/images (ex.: "fachada.jpg") para o Astro otimizar. */
export function imagem(arquivo: string): ImageMetadata {
  const encontrada = arquivos[`../assets/images/${arquivo}`];
  if (!encontrada) throw new Error(`Imagem "${arquivo}" não encontrada em src/assets/images.`);
  return encontrada.default;
}
