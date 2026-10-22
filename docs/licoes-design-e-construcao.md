# Lições de design e construção

Correções que o usuário precisou apontar durante o projeto Furo Delicado (out/2026). Leia antes das
skills `design` e `build` e confira cada ponto antes de mostrar resultado ao usuário.

## Processo e expectativa

1. **Avise no início do design que a etapa entrega só a primeira tela.** O usuário perguntou "cadê
   o resto do site?" ao ver só o hero. Ao mostrar a primeira tela, diga explicitamente que as
   demais seções estão descritas no `DESIGN.md` e só são construídas após a aprovação.
2. **Screenshots devem mostrar o que o usuário vê.** Um screenshot de elemento (`locator.screenshot`)
   numa seção mais alta que a tela costura várias capturas, e o cabeçalho `sticky` e o botão
   `fixed` aparecem no meio da imagem. Isso pareceu bug. Para mostrar elementos fixos, use
   screenshots de viewport rolada (`page.screenshot()` depois de `scrollTo`).
3. **Referência visual "o mais próximo possível"** quer dizer copiar estrutura, composição,
   tipografia e elementos decorativos da primeira seção, não só "se inspirar". As demais seções
   podem variar, mas na mesma linguagem.

## Espaçamento e tipografia

4. **Número + rótulo sempre com respiro.** Foi apontado duas vezes: no cartão "5+ anos de
   experiência" do hero e no selo circular "5+ anos" da seção Sobre. Todo par número/rótulo
   (cartões de estatística, selos, contadores) leva margem entre os dois (≥ `--space-1`/
   `--space-2`).
5. **Números na Cormorant Garamond:** use `font-variant-numeric: lining-nums`. O padrão são
   algarismos de estilo antigo, de alturas desiguais ("5,0" parece desalinhado de "128"). Nunca use
   `tabular-nums` nela: o "1" ganha caixa larga e vira "1 28". Pares lado a lado usam o mesmo
   espaçamento entre si.
6. **No cartão de uma pessoa, o nome é o destaque**, não o cargo ou título. Nome em display,
   maior; cargo pequeno e discreto, sem caixa alta.

## Marca e conteúdo visual

7. **Use o logo oficial completo** (monograma + nome), não um recorte só do nome. O recorte foi
   lido como "texto digitado, não o logo".
8. **Selos e eyebrows precisam fazer sentido sozinhos.** "Também a domicílio" no selo do hero foi
   rejeitado por não fazer sentido fora de contexto. Prefira um conceito que defina o negócio
   (ex.: "Furo humanizado", palavra usada pelos clientes nas avaliações).
9. **Não use faixa rolando (marquee)** com listas como tipos de serviço. O usuário não quis.
10. **Não deixe o site monótono.** Além das cores da marca, use acentos pastel variados nos cartões
    e uma seção escura para dar contraste.

## Layout e conversão

11. **Prova social (avaliações) x CTA principal:** lado a lado em telas grandes; acima do botão em
    telas médias e pequenas.
12. **Mapa embutido do Google, não só link.** A justificativa do usuário era "os clientes vêm do
    Google". Carregue o iframe só no clique (cookies de terceiros → LGPD) e mantenha o botão
    "Traçar rota".
13. **Botão flutuante do WhatsApp** fixo no canto inferior direito, em todas as telas.
14. **Seção de contato caprichada:** bloco com cantos grandes e fundo da marca, título com
    destaque, botões de WhatsApp e telefone, cartão com endereço, atendimento e redes, e o mapa ao
    lado. Uma lista de links simples não basta.

## Voz e copy

15. **O negócio fala na 1ª pessoa do plural ("nós").** Nada de "a Luciana faz…" em diferenciais e
    FAQ: "As joias são nossas…", "Nós vamos até você…".
16. **Ao apresentar a profissional, sem artigo:** "Luciana de Lurdes é técnica em enfermagem…",
    não "A Luciana de Lurdes…".
17. **Prefira "furo" a "furinho"** em títulos e chamadas ("Vamos marcar o seu furo?").
18. **Respeite as afirmações do cliente quando ele confirma.** O cliente manteve "sem dor e sem
    traumas" mesmo após o alerta de promessa de resultado. Alerte uma vez, registre a decisão e
    siga.

## Dados do negócio

19. **Não presuma CNPJ nem razão social.** Pergunte no briefing se é empresa, MEI ou profissional
    autônoma. Sendo autônoma, a controladora na Política de Privacidade é a pessoa física, pelo
    **nome completo** (o rodapé pode usar o nome de exibição).
20. **Itens que o cliente pediu para não exibir** (aqui, a licença sanitária e o número do COREN)
    ficam registrados no briefing e não aparecem no site.
