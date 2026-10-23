/**
 * Conteúdo do cliente: a única fonte de texto da página. Componentes não têm texto de cliente.
 * Fonte: briefing-cliente.md (aprovado). Onde faltar conteúdo real, use
 * "[[PLACEHOLDER: o que falta]]": o build de produção falha.
 */

interface Foto {
  /** Arquivo em src/assets/images (gerado por npm run images). */
  arquivo: string;
  alt: string;
}

/** Título de seção: [antes] [destaque em itálico rosé][depois]. */
interface Titulo {
  antes: string;
  destaque: string;
  depois?: string;
}

/** Cores pastel dos cartões (tokens --color-*). */
type Pastel = "butter" | "sage" | "lilac" | "peach" | "blush";

/** Ícones disponíveis em Icone.astro. */
export type NomeIcone =
  | "whatsapp"
  | "telefone"
  | "local"
  | "relogio"
  | "instagram"
  | "rota"
  | "joia"
  | "escudo"
  | "cuidado"
  | "seta";

export interface Site {
  nome: string;
  logo: Foto;
  /** Monograma usado como favicon. */
  icone: string;
  seo: {
    /** URL final do site, com https (canônica e Open Graph). */
    url: string;
    /** Serviço + cidade, até ~60 caracteres. */
    title: string;
    /** Até ~155 caracteres. */
    description: string;
    /** Imagem de compartilhamento (Open Graph). */
    imagem: string;
    /** Subtipo de LocalBusiness para o JSON-LD. */
    tipoNegocio: string;
    areaAtendida: string;
  };
  nav: { rotulo: string; href: string }[];
  ctaCurto: string;
  hero: {
    selo: string;
    /** Título em duas linhas: [linha1] / [destaque em itálico] [sublinhado]. */
    headline: { linha1: string; destaque: string; sublinhado: string };
    subheadline: string;
    cta: string;
    avaliacoes: { nota: string; total: string; miniaturas: Foto[] };
    foto: Foto;
    fotoEspaco: Foto;
    experiencia: { numero: string; rotulo: string };
    profissional: { nome: string; titulo: string };
  };
  servicos: {
    eyebrow: string;
    titulo: Titulo;
    texto: string;
    /** Menor preço da página (JSON-LD priceRange). */
    preco: string;
    cartoes: { titulo: string; preco: string; texto: string; foto: Foto; cor: Pastel }[];
    tiposTitulo: string;
    tipos: string[];
  };
  lobuloplastia: {
    eyebrow: string;
    titulo: Titulo;
    texto: string[];
    preco: { rotulo: string; valor: string };
    cta: string;
    mensagemWhatsapp: string;
    antes: Foto & { legenda: string };
    depois: Foto & { legenda: string };
  };
  diferenciais: {
    eyebrow: string;
    titulo: Titulo;
    itens: { titulo: string; texto: string; icone: NomeIcone; cor: Pastel }[];
  };
  sobre: {
    eyebrow: string;
    titulo: Titulo;
    texto: string[];
    foto: Foto;
    selo: { numero: string; rotulo: string };
    formacaoTitulo: string;
    formacao: string[];
    numeros: { valor: string; rotulo: string }[];
  };
  comoFunciona: {
    eyebrow: string;
    titulo: Titulo;
    passos: { titulo: string; texto: string }[];
  };
  avaliacoes: {
    eyebrow: string;
    titulo: Titulo;
    resumo: string;
    linkGoogle: string;
    depoimentos: { texto: string; autor: string; contexto?: string }[];
  };
  faq: {
    eyebrow: string;
    titulo: Titulo;
    perguntas: { pergunta: string; resposta: string }[];
  };
  secaoContato: {
    eyebrow: string;
    titulo: Titulo;
    texto: string;
    ctaWhatsapp: string;
    instagramDetalhe: string;
    mapa: { aviso: string; botao: string; rota: string; tituloIframe: string };
  };
  /** Rótulo acessível do botão flutuante do WhatsApp. */
  flutuante: string;
  contato: {
    /** E.164, ex.: +5561999999999 */
    whatsapp: string;
    mensagemWhatsapp: string;
    telefone?: string;
    email?: string;
    endereco: string;
    /** Endereço estruturado para o JSON-LD. */
    enderecoPostal: { rua: string; bairro: string; cidade: string; uf: string; cep: string };
    enderecoLinhas: { rua: string; cidade: string };
    /** Busca no Google Maps (JSON-LD e links). */
    mapaUrl: string;
    /** Rota até o estúdio no Google Maps. */
    rotaUrl: string;
    /** iframe do Google Maps, carregado só no clique (libere o domínio em frame-src). */
    mapaEmbedUrl: string;
    horario: string[];
    atendimento: string;
    instagram: { usuario: string; url: string };
  };
  rodape: {
    privacidade: string;
  };
  /** Responsável pelo negócio (controladora na LGPD). Sem CNPJ: profissional autônoma. */
  empresa: {
    /** Nome de exibição (rodapé). */
    titular: string;
    /** Nome completo da pessoa física responsável (Política de Privacidade). */
    nomeCompleto: string;
    qualificacao: string;
    cnpj?: string;
  };
  /** Sem e-mail, o canal de privacidade é o WhatsApp. */
  privacidade: { atualizadaEm: string; email?: string };
}

export const site: Site = {
  nome: "Furo Delicado",
  logo: { arquivo: "logo-completo-rose.png", alt: "Furo Delicado: perfuração auricular segura" },
  icone: "logo-monograma.png",
  seo: {
    url: "https://furodelicado.com.br",
    title: "Furo de orelha humanizado em Planaltina-DF | Furo Delicado",
    description:
      "Furo de orelha e piercing sem dor em Planaltina-DF, para bebês a partir de 15 dias, crianças e adultos. Joia e acompanhamento inclusos.",
    imagem: "luciana-5.jpg",
    tipoNegocio: "HealthAndBeautyBusiness",
    areaAtendida: "Planaltina-DF e região",
  },
  nav: [
    { rotulo: "Serviços", href: "#servicos" },
    { rotulo: "Sobre", href: "#sobre" },
    { rotulo: "Avaliações", href: "#avaliacoes" },
    { rotulo: "Contato", href: "#contato" },
  ],
  ctaCurto: "Agendar",
  hero: {
    selo: "Furo humanizado",
    headline: { linha1: "Furo de orelha", destaque: "sem dor", sublinhado: "e seguro." },
    subheadline:
      "Para bebês a partir de 15 dias, crianças e adultos em Planaltina-DF, com a joia já inclusa.",
    cta: "Agendar pelo WhatsApp",
    avaliacoes: {
      nota: "5,0",
      total: "+125 avaliações no Google",
      miniaturas: [
        { arquivo: "orelha-crianca-2.jpg", alt: "" },
        { arquivo: "orelha-adulto-2.jpg", alt: "" },
        { arquivo: "local-1.jpg", alt: "" },
      ],
    },
    foto: {
      arquivo: "luciana-hero.png",
      alt: "Luciana de Lurdes, de blazer branco e braços cruzados, sorrindo",
    },
    fotoEspaco: {
      arquivo: "local-2.jpg",
      alt: "Recepção do Furo Delicado, com o logo iluminado em um painel em arco",
    },
    experiencia: { numero: "5+", rotulo: "anos de experiência" },
    profissional: { nome: "Luciana de Lurdes", titulo: "Técnica e graduada em enfermagem" },
  },
  servicos: {
    eyebrow: "Serviços",
    titulo: { antes: "Um cuidado para", destaque: "cada fase" },
    texto:
      "Do primeiro brinquinho do bebê ao piercing de cartilagem, com joia e acompanhamento já inclusos.",
    preco: "a partir de R$ 100",
    cartoes: [
      {
        titulo: "Bebês até 3 meses",
        preco: "a partir de R$ 200",
        texto:
          "A partir de 15 dias de vida (não atendemos prematuros), com joia de aço folheado a ouro 24k.",
        foto: {
          arquivo: "orelha-crianca-2.jpg",
          alt: "Recém-nascido dormindo, com um brinquinho dourado na orelha",
        },
        cor: "peach",
      },
      {
        titulo: "Bebês e crianças",
        preco: "R$ 250",
        texto:
          "A partir de 3 meses, com joia de aço folheado a ouro 24k, com calma e no tempo de cada criança.",
        foto: {
          arquivo: "orelha-crianca-1.jpg",
          alt: "Bebê de faixa branca na cabeça com um brinquinho dourado na orelha",
        },
        cor: "sage",
      },
      {
        titulo: "Adultos",
        preco: "a partir de R$ 100",
        texto:
          "Orelha, nariz e mamilo. Joia de aço a partir de R$ 100 ou de titânio a partir de R$ 150.",
        foto: {
          arquivo: "orelha-adulto-1.jpg",
          alt: "Orelha com vários piercings brilhantes na cartilagem e no lóbulo",
        },
        cor: "lilac",
      },
    ],
    tiposTitulo: "Todas as perfurações",
    tipos: [
      "Lóbulo (1º, 2º e 3º furo)",
      "Tragus",
      "Helix",
      "Mid-helix",
      "Flat",
      "Rook",
      "Conch",
      "Daith",
      "Transversal",
      "Australianos",
      "Aba nasal",
      "Mamilo",
    ],
  },
  lobuloplastia: {
    eyebrow: "Lobuloplastia",
    titulo: { antes: "Lóbulo rasgado?", destaque: "A gente corrige." },
    texto: [
      "A lobuloplastia corrige o lóbulo da orelha rasgado ou alargado, como acontece com o peso dos brincos.",
      "Mande uma foto da sua orelha pelo WhatsApp e tire suas dúvidas.",
    ],
    preco: { rotulo: "a partir de", valor: "R$ 380" },
    cta: "Enviar foto no WhatsApp",
    mensagemWhatsapp: "Olá! Vim pelo site e gostaria de saber sobre a lobuloplastia.",
    antes: {
      arquivo: "lobuloplastia-antes.jpg",
      alt: "Lóbulo da orelha rasgado ao meio, antes da lobuloplastia",
      legenda: "antes",
    },
    depois: {
      arquivo: "lobuloplastia-depois.jpg",
      alt: "Lóbulo da orelha fechado depois da lobuloplastia, com um brinco de pedra",
      legenda: "depois",
    },
  },
  diferenciais: {
    eyebrow: "Diferenciais",
    titulo: { antes: "Por que escolher o", destaque: "Furo Delicado" },
    itens: [
      {
        titulo: "Joia inclusa no valor",
        texto: "As joias são nossas e já vêm no preço. Não usamos joias trazidas de fora.",
        icone: "joia",
        cor: "sage",
      },
      {
        titulo: "Material esterilizado",
        texto: "Todo o material é esterilizado em autoclave.",
        icone: "escudo",
        cor: "butter",
      },
      {
        titulo: "Acompanhamento depois",
        texto: "Você recebe orientação e suporte durante toda a cicatrização.",
        icone: "cuidado",
        cor: "blush",
      },
    ],
  },
  sobre: {
    eyebrow: "Sobre",
    titulo: { antes: "Cuidado de quem", destaque: "entende de gente" },
    texto: [
      "Técnica e graduada em enfermagem, Luciana de Lurdes trabalha com perfuração há mais de 5 anos.",
      "Cada furo é feito sem pressa, com paciência e no tempo de quem está sendo atendido, do recém-nascido ao adulto.",
    ],
    foto: {
      arquivo: "luciana-5.jpg",
      alt: "Luciana de Lurdes sorrindo, de blazer branco, apoiada em um bloco branco",
    },
    selo: { numero: "5+", rotulo: "anos" },
    formacaoTitulo: "Formação",
    formacao: [
      "Graduação em enfermagem",
      "Técnica em enfermagem",
      "Piercing Humanizado: Método Aryanne Cantarino, com habilitação em primeiro brinquinho em bebês",
      "Curso de técnica em piercings australianos",
    ],
    numeros: [
      { valor: "5,0", rotulo: "nota no Google" },
      { valor: "+125", rotulo: "avaliações" },
    ],
  },
  comoFunciona: {
    eyebrow: "Como funciona",
    titulo: { antes: "Simples, do", destaque: "agendamento", depois: " ao pós" },
    passos: [
      {
        titulo: "Chame no WhatsApp",
        texto: "Tire suas dúvidas e combine o dia e o horário do seu atendimento no estúdio.",
      },
      {
        titulo: "Perfuração delicada",
        texto: "Com a nossa joia, material esterilizado e toda biosegurança necessária.",
      },
      {
        titulo: "Acompanhamento",
        texto: "Depois do furo, você tem suporte para cuidar bem da cicatrização.",
      },
    ],
  },
  avaliacoes: {
    eyebrow: "Avaliações",
    titulo: { antes: "Quem furou,", destaque: "recomenda" },
    resumo: "5,0 · +125 avaliações no Google",
    linkGoogle: "Ver todas no Google",
    // Avaliações públicas do Google (avaliacoes.md), texto literal.
    depoimentos: [
      {
        texto:
          "Atendimento humanizado! 💕 Estava com receio de furar a orelhinha da minha bebê, mas foi tudo muito tranquilo. Amei a recepção, o carinho e todo o cuidado que tiveram conosco. Recomendo de olhos fechados!",
        autor: "Thaís R.",
        contexto: "Furo na bebê",
      },
      {
        texto:
          "Excelente atendimento, profissional extremamente qualificada. Fiz meu segundo furo e não senti nenhuma dor",
        autor: "Thuany F.",
        contexto: "Segundo furo",
      },
      {
        texto:
          "Pode confiar, sem medo. Atendimento personalizado, com todo cuidado, paciência e preparo. Muito diferente de outros lugares aqui de Planaltina. Indico!",
        autor: "Angelita S.",
      },
      {
        texto:
          "O atendimento da Luciana foi maravilhoso! Ela é muito educada, paciente e tem muito conhecimento! E o suporte após a realização do procedimento é impecável!",
        autor: "Vanessa G.",
        contexto: "Pós-perfuração",
      },
      {
        texto:
          "Experiência incrível, furo praticamente indolor e a recuperação maravilhosa praticamente sem incômodo, além da assistência oferecida durante o processo de cicatrização",
        autor: "Ana Carolina S.",
        contexto: "Cicatrização",
      },
      {
        texto:
          "Excelente profissional. Muito cuidadosa, equipamentos bem esterelizados, paciente, atenciosa e muito delicada. Simplesmente amei... Minha bebê não chorou durante o furo... Super recomendo!!!",
        autor: "Juciely T.",
        contexto: "Furo na bebê",
      },
    ],
  },
  faq: {
    eyebrow: "Dúvidas",
    titulo: { antes: "Perguntas", destaque: "frequentes" },
    perguntas: [
      {
        pergunta: "Dói?",
        resposta:
          "O método é humanizado e feito com calma, para ser sem dor e sem trauma. Nas avaliações, muita gente conta que nem sentiu o furo.",
      },
      {
        pergunta: "Com quantos dias posso furar a orelha do meu bebê?",
        resposta:
          "A partir de 15 dias de vida. Não atendemos bebês prematuros. O atendimento respeita o tempo do bebê: se ele estiver agitado, a gente espera ele se acalmar.",
      },
      {
        pergunta: "Quanto custa?",
        resposta:
          "Bebês até 3 meses: a partir de R$ 200. Bebês a partir de 3 meses e crianças: R$ 250. Nos dois casos, a joia é de aço folheado a ouro 24k. Adultos: a partir de R$ 100 com joia de aço ou a partir de R$ 150 com joia de titânio. A joia e o acompanhamento pós-perfuração já estão no valor. Lobuloplastia: a partir de R$ 380.",
      },
      {
        pergunta: "Posso levar minha própria joia?",
        resposta:
          "Não. A perfuração é feita só com as nossas joias, que já estão inclusas no valor.",
      },
      {
        pergunta: "O material é esterilizado?",
        resposta: "Sim. Todo o material é esterilizado em autoclave.",
      },
      {
        pergunta: "E depois do furo?",
        resposta: "Você tem acompanhamento durante a cicatrização para tirar qualquer dúvida.",
      },
      {
        pergunta: "Qual é o horário de atendimento?",
        resposta:
          "O atendimento é só com agendamento, sem horário fixo. Chame no WhatsApp e a gente encontra o melhor horário para você.",
      },
    ],
  },
  secaoContato: {
    eyebrow: "Contato",
    titulo: { antes: "Vamos marcar o seu", destaque: "furo", depois: "?" },
    texto: "Chame no WhatsApp e a gente combina o melhor horário para você vir ao estúdio.",
    ctaWhatsapp: "Chamar no WhatsApp",
    instagramDetalhe: "Trabalhos e dicas de cuidado",
    mapa: {
      aviso: "O mapa é do Google Maps e só carrega quando você clicar.",
      botao: "Ver mapa",
      rota: "Traçar rota no Google Maps",
      tituloIframe: "Mapa com a localização do Furo Delicado",
    },
  },
  flutuante: "Conversar no WhatsApp",
  contato: {
    whatsapp: "+5561994552929",
    mensagemWhatsapp: "Olá! Vim pelo site e gostaria de agendar uma perfuração.",
    telefone: "+5561994552929",
    endereco:
      "St. Res. Leste, Buritis I, Quadra 03, Lote 41 - Planaltina, Brasília - DF, 73350-305",
    mapaUrl:
      "https://www.google.com/maps/search/?api=1&query=Furo+Delicado+Piercings+Planaltina+DF",
    enderecoPostal: {
      rua: "St. Res. Leste, Buritis I, Quadra 03, Lote 41",
      bairro: "Setor Residencial Leste",
      cidade: "Planaltina, Brasília",
      uf: "DF",
      cep: "73350-305",
    },
    enderecoLinhas: {
      rua: "St. Res. Leste, Buritis I, Qd. 03, Lt. 41",
      cidade: "Planaltina, Brasília - DF · 73350-305",
    },
    rotaUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Furo+Delicado+Piercings+Planaltina+DF",
    mapaEmbedUrl:
      "https://www.google.com/maps?q=Furo+Delicado+Piercings,+Planaltina+-+DF,+73350-305&output=embed",
    horario: ["Somente com agendamento"],
    atendimento: "No estúdio, em Planaltina-DF",
    instagram: { usuario: "@furodelicado", url: "https://www.instagram.com/furodelicado/" },
  },
  rodape: {
    privacidade: "Política de Privacidade",
  },
  empresa: {
    titular: "Luciana de Lurdes",
    nomeCompleto: "Luciana de Lurdes Neves da Costa",
    qualificacao: "profissional autônoma responsável pelo Furo Delicado",
  },
  privacidade: { atualizadaEm: "2026-10-22" },
};
