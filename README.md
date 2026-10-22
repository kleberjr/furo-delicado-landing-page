# Furo Delicado — landing page

Site do **Furo Delicado**, estúdio de furo de orelha humanizado em Planaltina-DF
(profissional: Luciana de Lurdes). Feito com Astro a partir do template `landing-kit`.

Domínio: **furodelicado.com.br**

## Rodar localmente

```bash
nvm use 22
npm ci
npm run dev   # http://localhost:4321
```

## Comandos

| Comando                                  | O que faz                                              |
| ---------------------------------------- | ------------------------------------------------------ |
| `npm run dev`                            | desenvolvimento                                        |
| `npm run build`                          | build de produção em `dist/`                           |
| `npm run build:draft && npm run preview` | testa o build com os headers de segurança              |
| `npm run lint` / `npm run typecheck`     | qualidade de código                                    |
| `npm test`                               | testes unitários e e2e                                 |
| `npm run screenshots`                    | capturas em 360, 768 e 1280px em `tests/visual/`       |
| `npm run lighthouse`                     | Lighthouse mobile (no WSL: defina `CHROME_PATH`)       |
| `npm run images`                         | processa fotos de `original/` (**apaga os originais**) |

## Onde mexer

- **Textos, contatos e dados:** `src/content/site.ts` (único lugar com conteúdo do cliente).
- **Cores, fontes e espaçamentos:** `src/styles/tokens.css`; as decisões estão no `DESIGN.md`.
- **Seções:** `src/components/`.
- **Fotos:** coloque em `original/` e rode `npm run images`.
- **Briefing e avaliações de origem:** `briefing-cliente.md` e `avaliacoes.md`.
- **Lições para próximas sessões:** `docs/licoes-design-e-construcao.md`.

## Deploy

Cloudflare Pages (ou Netlify): comando `npm run build`, pasta `dist`, Node da `.nvmrc`. Os headers
de segurança estão em `public/_headers`.
