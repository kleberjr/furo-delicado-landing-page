# DESIGN.md

Decisões visuais do projeto. Toda decisão visual sai daqui; os valores ficam só em
`src/styles/tokens.css`. Este é o design da **página de demonstração** do kit: a skill `design`
o reescreve em cada projeto de cliente.

## Direção visual

Sóbrio, quente e direto. Fundo claro, marrom escuro para estrutura e uma única cor de destaque
reservada para a ação principal. Uma família tipográfica (Inter, self-hosted), títulos fortes e
bastante espaço em branco.

## Primeira tela

- **Headline:** benefício concreto + cidade.
- **Subheadline:** a dor do público em uma frase.
- **CTA principal** (`data-cta="primary"`): visível sem rolar em 360px, com redutor de atrito
  verdadeiro ao lado.

## Tokens (`src/styles/tokens.css`)

| Grupo       | Tokens                                                                                 | Uso                                         |
| ----------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| Cores       | `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`                  | fundo, seções alternadas, texto             |
| Marca       | `--color-brand`, `--color-on-brand`                                                    | hero e rodapé                               |
| Ação        | `--color-cta`, `--color-cta-hover`, `--color-on-cta`                                   | **só** botões de conversão                  |
| Foco        | `--color-focus`                                                                        | anel de foco do teclado                     |
| Tipografia  | `--font-sans`, `--font-size-{sm,base,lg,xl,2xl}`, `--font-weight-*`, `--line-height-*` | escala de texto; `h1` usa `--font-size-2xl` |
| Espaçamento | `--space-{1..12}`, `--space-section`                                                   | `--space-section` entre seções              |
| Forma       | `--radius-{sm,md,pill}`, `--shadow-{sm,lg}`                                            | cartões, imagens e botões                   |
| Layout      | `--container-max`, `--tap-min`, `--z-float`                                            | largura máxima e alvo de toque (48px)       |

## Regras

- Contraste: texto ≥ 4,5:1; texto grande e foco ≥ 3:1.
- Um `h1` (headline); cada seção abre com `h2`.
- Seções alternam `--color-bg` e `--color-surface`.
- Cores da marca do cliente prevalecem sobre qualquer sugestão.

## Faça / não faça

| Faça                                      | Não faça                                 |
| ----------------------------------------- | ---------------------------------------- |
| Foto real do negócio no hero              | Banco de imagens como se fosse o cliente |
| Um objetivo; todo CTA leva a ele          | CTAs concorrentes com o mesmo peso       |
| Textos curtos, com as palavras do cliente | Parágrafos longos ou jargão              |
| Espaço em branco entre seções             | Bordas e sombras em tudo                 |
| Ícones SVG inline simples                 | Biblioteca de ícones ou emoji como ícone |
