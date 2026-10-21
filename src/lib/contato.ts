/** Número no formato E.164: "+" seguido de 8 a 15 dígitos, sem zero inicial. */
export const E164 = /^\+[1-9]\d{7,14}$/;

function normalizarE164(numero: string): string {
  const limpo = numero.replace(/[\s().-]/g, "");
  if (!E164.test(limpo)) {
    throw new Error(`Número inválido: "${numero}". Use E.164, ex.: +5561999999999.`);
  }
  return limpo;
}

/** https://wa.me/<dígitos>?text=<mensagem codificada> */
export function whatsappUrl(numero: string, mensagem?: string): string {
  const digitos = normalizarE164(numero).slice(1);
  const texto = mensagem?.trim();
  return texto
    ? `https://wa.me/${digitos}?text=${encodeURIComponent(texto)}`
    : `https://wa.me/${digitos}`;
}

/** tel:+<dígitos> */
export function telHref(numero: string): string {
  return `tel:${normalizarE164(numero)}`;
}

/** +5561999999999 → (61) 99999-9999. Outros países ficam como estão. */
export function formatarTelefoneBR(numero: string): string {
  const limpo = normalizarE164(numero);
  const m = /^\+55(\d{2})(\d{4,5})(\d{4})$/.exec(limpo);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : limpo;
}
