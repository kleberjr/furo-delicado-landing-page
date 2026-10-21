---
name: design
description: Use depois que o briefing for aprovado, ou quando o usuário pedir mudança visual ou enviar referências. Gera DESIGN.md e src/styles/tokens.css a partir do briefing e das referências em design/referencias/, mostra um screenshot da primeira tela e pede aprovação.
---

# Design

**Entrada:** `briefing-cliente.md` aprovado + imagens de referência em `design/referencias/`
(screenshots de sites que o cliente admira, fotos do negócio, logo).
**Saída:** `DESIGN.md` + `src/styles/tokens.css` aprovados.

## Passos

1. Confirme que o briefing foi aprovado. Se não, pare.
2. Olhe as imagens em `design/referencias/` e **extraia o estilo das imagens, não do HTML** dos
   sites: paleta, peso e escala tipográfica, raios, sombras, densidade, ritmo entre seções. Sem
   referências, proponha um estilo coerente com o segmento e o `tom_de_voz`.
3. **Cores da marca do cliente prevalecem** sobre o que as referências sugerem. Confira contraste
   (texto ≥ 4,5:1).
4. Fontes: no máximo 2, **self-hosted** em `src/assets/fonts/` (woff2 + arquivo de licença), com
   licença livre para uso comercial (ex.: OFL). Nunca link do Google Fonts. Declare o `@font-face`
   em `tokens.css`.
5. Escreva `tokens.css` (única fonte de valores) e o `DESIGN.md` (curto e decisório): direção
   visual em 2–3 frases, primeira tela (headline, subheadline, CTA), tokens e uso, regras,
   faça/não faça (até 5 cada) e as seções da página, em ordem.
6. Monte a primeira tela com os tokens, rode `npm run dev` e tire screenshots em 360 e 1280px.
7. Mostre o `DESIGN.md` e os screenshots e **aguarde aprovação**.

## Pronto quando

- [ ] Estilo baseado nas referências (ou no segmento), com as cores da marca preservadas.
- [ ] Fontes self-hosted com licença.
- [ ] Screenshots da primeira tela apresentados.
- [ ] O usuário aprovou o `DESIGN.md` por escrito.
