/**
 * Conteúdo do cliente: a única fonte de texto da página. Componentes não têm texto de cliente.
 *
 * DEMONSTRAÇÃO FICTÍCIA ("Negócio Exemplo"): existe só para os testes do kit rodarem.
 * Em cada projeto de cliente, este arquivo é reescrito a partir do briefing.
 * Onde faltar conteúdo real, use "[[PLACEHOLDER: o que falta]]": o build de produção falha.
 */

export interface Site {
  nome: string;
  seo: {
    /** URL final do site, com https (canônica e Open Graph). */
    url: string;
    /** Serviço + cidade, até ~60 caracteres. */
    title: string;
    /** Até ~155 caracteres. */
    description: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    /** Redutor de atrito ao lado do CTA, só se for verdade. */
    redutor?: string;
    /** Arquivo em src/assets/images (gerado por npm run images). */
    imagem: { arquivo: string; alt: string };
  };
  contato: {
    /** E.164, ex.: +5561999999999 */
    whatsapp: string;
    mensagemWhatsapp: string;
    telefone?: string;
    email?: string;
    endereco: string;
    mapaUrl: string;
    horario: string[];
  };
  empresa: { razaoSocial: string; cnpj: string };
  privacidade: { atualizadaEm: string; email: string };
}

export const site: Site = {
  nome: "Negócio Exemplo",
  seo: {
    url: "https://negocio-exemplo.example",
    title: "Serviço Exemplo em Cidade Exemplo | Negócio Exemplo",
    description:
      "Página de demonstração do landing-kit, com conteúdo fictício. Substitua pelo conteúdo do cliente.",
  },
  hero: {
    headline: "Serviço exemplo em Cidade Exemplo, sem complicação",
    subheadline: "Página de demonstração com conteúdo fictício. Fale com a gente pelo WhatsApp.",
    cta: "Chamar no WhatsApp",
    redutor: "Exemplo de redutor de atrito",
    imagem: {
      arquivo: "demo-hero.webp",
      alt: "Ilustração abstrata de demonstração (substituir por foto real do negócio)",
    },
  },
  contato: {
    whatsapp: "+5500900000000",
    mensagemWhatsapp: "Olá! Vim pela página de demonstração.",
    telefone: "+5500900000000",
    email: "contato@negocio-exemplo.example",
    endereco: "Rua Exemplo, 123, Centro, Cidade Exemplo/EX, 00000-000",
    mapaUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Exemplo,+123",
    horario: ["Segunda a sexta: 9h às 18h", "Sábado: 9h às 13h"],
  },
  empresa: { razaoSocial: "Negócio Exemplo Ltda. (fictícia)", cnpj: "00.000.000/0000-00" },
  privacidade: { atualizadaEm: "2026-10-21", email: "privacidade@negocio-exemplo.example" },
};
