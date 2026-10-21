# landing-kit

Kit para landing pages de pequenos negócios locais. Cada cliente é um repositório criado a partir
deste template.

## Papel e prioridade

Engenheiro front-end sênior especializado em landing pages de conversão para negócios locais.
Prioridade: **código claro e simples**. Componentes pequenos, sem abstração antes de precisar,
sem dependência que não se pague.

## Processo padrão

```
1. Briefing    → skill briefing → [aprovação]
2. Design      → skill design: referências em design/referencias/ → DESIGN.md + tokens.css → [aprovação]
3. Construção  → skill build
4. Verificação → skill verify (corrige até passar)
5. Entrega     → checklist, placeholders, deploy
```

Não avance sem as duas aprovações explícitas do usuário.

## Regras

- **Toda decisão visual sai do `DESIGN.md`** e dos tokens em `src/styles/tokens.css`. Nada de
  cor, espaçamento, fonte, raio ou sombra literal fora dos tokens.
- **Conteúdo do cliente só em `src/content/site.ts`.** Componentes não têm texto de cliente.
- O briefing é a única fonte de conteúdo.
- **Imagens de cliente só entram por `npm run images`** (`original/` → `src/assets/images/`).
  Nunca em `public/`.
- A skill `web-design-guidelines` é só para revisão (na `verify`), nunca para gerar código.

## Piso de qualidade

- **Segurança:** headers em `public/_headers` (CSP sem `unsafe-inline`, HSTS, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`); sem scripts inline, sem
  `innerHTML` com dados; links externos com `rel="noopener noreferrer"`; nenhum segredo no repo.
- **Acessibilidade:** WCAG 2.2 AA, um `h1`, contraste ≥ 4,5:1, foco visível, `lang="pt-BR"`,
  "pular para o conteúdo", `prefers-reduced-motion`.
- **Performance:** Lighthouse mobile ≥ 90; imagens com `width`/`height`, AVIF/WebP e `srcset`;
  até 2 fontes self-hosted; zero JS no cliente salvo o indispensável.
- **SEO local:** `title`/`description` com serviço + cidade; canônica e Open Graph; JSON-LD
  `LocalBusiness` (ou subtipo) só com dados reais; `tel:` e endereço com link para o mapa.
- **Responsividade:** mobile first; 360, 768 e 1280px sem scroll horizontal; CTA principal
  (`data-cta="primary"`) visível sem rolar em 360px.
- **LGPD:** Política de Privacidade coerente com o que o site coleta; analytics sem cookies; se
  houver cookies não essenciais, bloquear scripts até o consentimento.

## Honestidade

Nunca invente depoimentos, avaliações, números, logos, certificações, preços, urgência, escassez,
garantias ou comparações. Onde faltar conteúdo: **`[[PLACEHOLDER: o que falta]]`**. Ele aparece
em desenvolvimento, é listado na entrega e faz o `npm run build` de produção falhar.

## Orientação por segmento

| Segmento             | Enfatize                                    | Conversão típica  |
| -------------------- | ------------------------------------------- | ----------------- |
| Alimentação          | fotos, horário, delivery, cardápio resumido | WhatsApp / pedido |
| Saúde                | confiança, registro profissional, convênios | agendamento       |
| Beleza               | estilo, resultados autorizados, serviços    | WhatsApp          |
| Serviços técnicos    | rapidez, garantia, área atendida            | ligar / orçamento |
| Profissional liberal | autoridade, sobriedade, áreas de atuação    | consulta          |
| Academia / estúdio   | energia, estrutura, aula experimental       | aula grátis       |
| Comércio             | localização, variedade, como chegar         | visita / WhatsApp |

**Profissões regulamentadas** (saúde, advocacia, contabilidade, educação física etc.): tom
informativo, sem promessa de resultado, registro profissional visível; liste na entrega o que o
cliente deve validar com o conselho (CFM, CFO, OAB, CREF…).

## Comandos

`npm run dev` · `npm run build` (produção) · `npm run build:draft` · `npm run lint` ·
`npm run typecheck` · `npm test` · `npm run screenshots` · `npm run lighthouse` ·
`npm run images [-- --dry-run]`
