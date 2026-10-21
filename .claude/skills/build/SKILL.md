---
name: build
description: Use depois que o DESIGN.md for aprovado, para construir a página do cliente: imagens, src/content/site.ts, componentes e copy, seguindo briefing, DESIGN.md e as regras de página.
---

# Build

**Entrada:** `briefing-cliente.md` e `DESIGN.md` aprovados.
**Saída:** página completa rodando em `npm run dev`, com `npm run build:draft` passando.

## Passos

1. **Imagens:** se `original/` tiver arquivos, rode `npm run images` e mostre o relatório. Use os
   arquivos gerados em `src/assets/images/` com `alt` descritivo; quando não souber o que a foto
   mostra, use `[[PLACEHOLDER: alt da foto X]]`.
2. **Conteúdo:** reescreva `src/content/site.ts` (tipos + conteúdo) a partir do briefing. Todo
   texto do cliente fica ali.
3. **Componentes:** crie em `src/components/` só as seções que o projeto precisa, na ordem do
   `DESIGN.md`. Componentes pequenos, dados por props, estilizados só com tokens. Remova os
   componentes da demonstração que não forem usados.
4. **Copy**, seguindo as regras de página abaixo.
5. Adicione o JSON-LD `LocalBusiness` (ou subtipo) com dados reais e ajuste a Política de
   Privacidade se o site coletar algo além do previsto.

## Regras de página

- Ordem base: hero → prova social → serviços → diferenciais → depoimentos → como funciona/como
  chegar → FAQ → CTA final → rodapé. Use só o que o briefing sustenta.
- **Hero:** headline com benefício concreto + cidade; subheadline sobre a dor do público; foto real;
  CTA principal com `data-cta="primary"`, visível sem rolar em 360px.
- A primeira tela cumpre a promessa da origem do tráfego (anúncio, Google, panfleto).
- Um único objetivo; todos os CTAs levam a ele. WhatsApp: `https://wa.me/<número>?text=<mensagem>`
  (use `whatsappUrl` de `src/lib/contato.ts`) e botão flutuante no mobile.
- Redutor de atrito junto do CTA só se for verdade.
- Escreva com as `palavras_dos_clientes`; o FAQ responde às `objecoes_comuns` com `<details>`.
- `tel:` nos telefones, endereço com link para o mapa. Mapa embutido só carregado sob clique.
- Rodapé: endereço, horário, contatos, redes, razão social/CNPJ, link para a Política de
  Privacidade.
- Textos curtos, sem jargão. Ícones em SVG inline.

## Pronto quando

- [ ] `npm run typecheck` e `npm run build:draft` passam.
- [ ] Nenhum texto de cliente fora de `site.ts`; nenhum valor visual fora dos tokens.
- [ ] Placeholders anotados para a entrega. Siga para a skill `verify`.
