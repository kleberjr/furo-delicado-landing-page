export function encontrarPlaceholders(texto: string): string[];
export function verificarDiretorio(
  dir: string,
): Promise<{ arquivo: string; placeholders: string[] }[]>;
