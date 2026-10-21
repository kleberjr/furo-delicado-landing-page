# landing-kit

Template para produzir landing pages de pequenos negócios locais com o Claude Code: Astro +
TypeScript, um processo padrão com duas aprovações e um conjunto mínimo de verificações
(segurança, UX/UI, qualidade de código, performance, acessibilidade, SEO e responsividade).

## Requisitos

- Node **22.22** (`.nvmrc`; `nvm use`) e npm 10+
- Para os testes locais: Chromium do Playwright (`npx playwright install chromium`) ou
  `CHROMIUM_PATH=/caminho/do/chrome`. O Lighthouse usa `CHROME_PATH`.

## Criar um projeto de cliente

1. No GitHub: **Use this template → Create a new repository** (`lp-<cliente>`, privado).
2. `git clone …`, `nvm use`, `npm ci` e `npm test`.
3. Abra o Claude Code na pasta e siga o processo abaixo.

A página que vem no kit ("Negócio Exemplo": hero, contato e rodapé, com conteúdo fictício) é só
uma **demonstração** para os testes rodarem. Ela é substituída em cada projeto pela skill `build`
(`src/content/site.ts`, `src/components/`, `src/assets/images/demo-hero.webp`).

## Processo padrão

| Etapa          | O que você faz                                                                                             | O que o agente faz                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1. Briefing    | Cola na conversa tudo o que tiver: anotações, avaliações do Google, prints, origem do tráfego. **Aprova.** | Preenche `briefing-cliente.md`, marca `[DESCONHECIDO]`, faz até 5 perguntas |
| 2. Design      | Coloca referências (prints de sites, fotos, logo) em `design/referencias/`. **Aprova.**                    | Gera `DESIGN.md` + `tokens.css` e mostra a primeira tela                    |
| 3. Construção  | Guarda as fotos originais no Drive e coloca cópias em `original/`.                                         | Roda `npm run images`, escreve `site.ts`, os componentes e a copy           |
| 4. Verificação | —                                                                                                          | Testes, Lighthouse, revisão de UI e ciclo visual (até 3 rodadas)            |
| 5. Entrega     | Fornece o que faltar nos placeholders; conecta a hospedagem.                                               | Checklist, placeholders, pontos regulatórios; `npm run build` de produção   |

Deploy (Cloudflare Pages ou Netlify): comando `npm run build`, pasta `dist`, Node da `.nvmrc`.
Confira `seo.url` em `site.ts` com a URL final.

## Comandos

| Comando               | O que faz                                                                       |
| --------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`         | desenvolvimento (placeholders permitidos)                                       |
| `npm run build`       | build de **produção**: falha se houver `[[PLACEHOLDER`                          |
| `npm run build:draft` | build sem a checagem de placeholders                                            |
| `npm run preview`     | serve `dist/` aplicando `public/_headers`                                       |
| `npm run lint`        | ESLint + Prettier                                                               |
| `npm run typecheck`   | `astro check` + `tsc`                                                           |
| `npm test`            | unitários + e2e (headers, responsividade, axe, console, links de contato)       |
| `npm run screenshots` | capturas em 360, 768 e 1280px em `tests/visual/`                                |
| `npm run lighthouse`  | Lighthouse mobile: Perf ≥ 90; A11y, Boas práticas e SEO ≥ 95                    |
| `npm run images`      | prepara as fotos de `original/` em `src/assets/images/` (`-- --dry-run` simula) |

## Imagens (`npm run images`)

> ⚠️ **O script apaga os originais processados.** Guarde antes os originais em resolução máxima
> na pasta do cliente no Drive.

Coloque as fotos em `original/` (criada pelo script se não existir; está no `.gitignore`). Para
cada arquivo (PNG, JPEG, HEIC/HEIF, WebP, TIFF), o script converte HEIC → JPEG, aplica a
orientação do EXIF, remove todos os metadados (inclusive GPS), limita a 2560px e salva em
`src/assets/images/` com nome em kebab-case (sem sobrescrever). Só apaga o original depois de
verificar a saída (abre, dimensões, sem GPS, < 1 MB); falhas ficam em `original/` e aparecem no
relatório. `npm run images -- --dry-run` mostra o que seria feito sem gravar nem apagar nada.

## Onde estão as regras

- `CLAUDE.md`: papel, processo, piso de qualidade, honestidade e orientação por segmento.
- `.claude/skills/`: `briefing`, `design`, `build`, `verify` e `web-design-guidelines` (revisão
  de UI da Vercel, usada só na `verify`; baixa as regras mais recentes a cada revisão).
- `public/_headers`: headers de segurança (formato Cloudflare Pages/Netlify). Em outra hospedagem,
  copie os mesmos pares nome/valor para a configuração dela.

Para atualizar a `web-design-guidelines`: `npx skills update` (origem em `skills-lock.json`).
