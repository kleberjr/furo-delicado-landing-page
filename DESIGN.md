# DESIGN.md: Furo Delicado

Decisões visuais do projeto. Os valores ficam só em `src/styles/tokens.css`.
Referência: `design/referencias/ref-*.png` (blush-radiance-clinic). Copiamos a primeira seção quase
igual; as demais seguem a mesma linguagem.

## Direção visual

Editorial, delicado e acolhedor. Fundo creme quente, títulos grandes em serifada fina com uma
palavra em itálico rosé, e a Luciana dentro de um arco. Para o site não ficar monótono, os tons
rosé e nude da marca convivem com acentos pastel (manteiga, sálvia, lilás, pêssego) em cartões e
selos, e com uma seção escura em ameixa.

## Primeira tela

- **Selo:** "✦ Furo humanizado" (pílula blush).
- **Headline (h1):** "Furo de orelha / _sem dor_ e seguro." A palavra em destaque fica em itálico
  rosé e "e seguro." leva um sublinhado desenhado à mão.
- **Subheadline:** "Para bebês a partir de 15 dias, crianças e adultos em Planaltina-DF, com joia
  de titânio inclusa."
- **CTA principal** (`data-cta="primary"`): "Agendar pelo WhatsApp", botão ameixa. Prova social
  (três miniaturas + "★ 5,0 · 128 avaliações no Google"): ao lado do botão a partir de 64rem;
  abaixo disso, acima do botão.
- **Visual:** arco blush com a Luciana (foto sem fundo), um arco em linha por fora, a estrela de
  quatro pontas, a foto da recepção, o cartão manteiga "5+ anos de experiência" e o cartão do nome.
  No cartão, o destaque é "Luciana de Lurdes" (`--font-size-name`, display). "Técnica em
  enfermagem" vai embaixo, pequeno e discreto.
- **Cabeçalho fixo:** o logo oficial completo (monograma + nome + assinatura) em rosé, a navegação
  (só a partir de 56rem) e o botão "Agendar".

## Tokens (`src/styles/tokens.css`)

| Grupo       | Tokens                                                                                    | Uso                                                                           |
| ----------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Base        | `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`   | fundo creme, seções alternadas, texto                                         |
| Marca       | `--color-rose`, `--color-rose-soft`, `--color-nude`, `--color-blush`, `--color-arch-line` | itálicos dos títulos, arco, selos                                             |
| Rosé forte  | `--color-rose-strong`, `--color-on-rose`                                                  | texto rosé pequeno (eyebrow, links) e o botão "Agendar" do topo               |
| Escuro      | `--color-plum`, `--color-plum-hover`, `--color-on-plum`, `--color-on-plum-muted`          | CTA principal, seção "Sobre", rodapé                                          |
| Pastel      | `--color-butter`, `--color-sage`, `--color-lilac`, `--color-peach`                        | **só fundos** de cartões e selos; o texto sobre eles é `--color-text(-muted)` |
| Foco        | `--color-focus`, `--color-focus-on-dark`                                                  | anel de foco no claro e no escuro                                             |
| Tipografia  | `--font-display` (Cormorant Garamond), `--font-sans` (Jost), `--font-size-{xs…2xl,hero}`  | títulos em display peso 400; corpo em Jost 300                                |
| Espaçamento | `--space-{1…16}`, `--space-section`                                                       | `--space-section` entre seções                                                |
| Forma       | `--radius-{sm,md,lg,xl,pill}`, `--shadow-{sm,md,lg}`                                      | cartões `lg`; botões e selos `pill`; sombras quentes e difusas                |
| Movimento   | `--ease-out`                                                                              | hover de botões                                                               |
| Layout      | `--container-max`, `--header-height`, `--tap-min`, `--z-header`, `--z-float`              | largura máxima, cabeçalho fixo, alvo de toque de 48px                         |

Componentes compartilhados: `.btn` (ameixa), `.btn--rose`, `.btn--lg`, `.eyebrow`, `.destaque`
(itálico rosé) e `Brilho.astro` (estrela de quatro pontas).

## Regras

- **Contraste:** `--color-rose` (#A66D6D) tem 4,0:1 no creme e só vale para texto ≥ 24px (títulos
  em itálico). Texto rosé pequeno usa `--color-rose-strong` (5,9:1).
- **Títulos:** um `h1`. Cada seção abre com eyebrow + `h2`, e o `h2` tem uma palavra `.destaque`.
- **Ritmo:** as seções alternam entre creme (`bg`), creme escuro (`surface`) e uma seção ameixa.
- **Cores e CTA:** cada grupo de cartões usa pastéis diferentes entre si. Nunca dois cartões
  vizinhos da mesma cor. Todo CTA leva ao WhatsApp. O ameixa é a cor de ação; o rosé forte fica
  só para o botão do topo.
- **Fotos:** só as do cliente. Arcos e cantos `lg` emolduram as fotos, nunca bordas duras.

## Faça / não faça

| Faça                                                     | Não faça                                               |
| -------------------------------------------------------- | ------------------------------------------------------ |
| Uma palavra em itálico rosé por título                   | Itálico ou rosé em frases inteiras                     |
| Pastéis variados nos cartões, para dar vida              | Página inteira em rosé/nude (fica monótona)            |
| Palavras dos clientes ("zero dor", "transmite paz")      | Prometer o que não está no briefing                    |
| Muito respiro; sombras só em cartões flutuantes e no CTA | Bordas e sombras em tudo                               |
| Ícones SVG inline finos, na cor do texto ou rosé         | Emoji como ícone, biblioteca de ícones, a Dream Avenue |

## Seções (em ordem)

1. **Cabeçalho** fixo: logo, navegação e "Agendar".
2. **Hero:** como descrito acima. Sem faixa rolando depois dele (pedido do cliente).
3. **Serviços** (`#servicos`, creme escuro): "Um cuidado para _cada fase_". Três cartões brancos
   com foto: bebês e crianças, lóbulo e cartilagem, cada um com selo pastel "a partir de R$ 100"
   abaixo do título. Embaixo, chips com todos os tipos de furo, inclusive aba nasal e mamilo.
4. **Diferenciais** (creme): quatro cartões pastel (sálvia, manteiga, blush, lilás) com ícone.
   Joia de titânio inclusa, material esterilizado em autoclave, acompanhamento pós-perfuração,
   atendimento a domicílio.
5. **Sobre a Luciana** (`#sobre`, ameixa): foto com cantos `xl`, selo circular rosé "5+ anos",
   texto curto, formação e números reais (5,0 no Google, 128 avaliações).
6. **Como funciona** (creme escuro): três passos em cartões brancos, com números "01–03" em itálico
   rosé.
7. **Avaliações** (`#avaliacoes`, creme): "Quem furou, _recomenda_". Seis depoimentos reais,
   abreviados como "Nome S."; o do meio de cada linha é rosé cheio. Link "Ver todas no Google".
8. **Dúvidas frequentes** (creme escuro): título à esquerda e `<details>` à direita, com as
   objeções do briefing.
9. **Contato** (`#contato`, **pronto**): bloco blush com cantos `xl`. À esquerda: eyebrow, "Vamos
   marcar o seu _furo_?", texto, botão WhatsApp (ameixa, com ícone) e telefone (pílula com
   contorno), e um cartão creme com endereço, "Somente com agendamento · no estúdio ou a domicílio"
   e Instagram, cada item com ícone rosé. À direita, ou abaixo no celular: fachada do mapa (grade
   sutil, pino rosé, "Ver mapa"). O iframe do Google só carrega no clique. Embaixo, o link "Traçar
   rota no Google Maps".
10. **Rodapé** ameixa: logo completo, Instagram, Política de Privacidade.

**Botão flutuante do WhatsApp** (**pronto**): círculo rosé forte de 56px (64px no desktop) no canto
inferior direito, fixo, com o ícone do WhatsApp em branco e `aria-label`.
