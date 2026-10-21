<!--
Modelo de briefing. A skill `briefing` preenche este arquivo a partir do material colado na
conversa (texto livre, anotações, avaliações do Google, prints). Campo sem informação vira
[DESCONHECIDO]. Só depoimentos, números, garantias e promoções confirmados pelo cliente.
-->

# Briefing do cliente

```yaml
negocio:
  nome: ""
  segmento: "" # ex.: restaurante, dentista, barbearia, oficina, advocacia
  cidade_bairro: ""
  publico_alvo: "" # quem é e qual a dor principal
  diferencial: ""
  objecoes_comuns: [] # ex.: "é caro?", "atende no sábado?", "tem estacionamento?"
  palavras_dos_clientes: [] # trechos reais de avaliações do Google/Instagram
  tom_de_voz: "" # ex.: acolhedor, técnico, sóbrio
  origem_trafego: "" # ex.: Google Maps, Instagram, anúncio, QR code em panfleto
conversao:
  principal: "" # ex.: WhatsApp, agendar, ligar, orçamento, visitar
  secundaria: ""
conteudo:
  servicos: [] # nome, benefício, preço (opcional)
  depoimentos_reais: [] # só reais e autorizados
  horario: ""
  endereco: ""
  whatsapp: "" # E.164, ex.: +5561999999999
  telefone: ""
  redes: []
  razao_social_cnpj: ""
visual:
  cores: [] # hex da marca; vazio = o agente propõe
  estilo: "" # ex.: minimalista, vibrante, sóbrio
  logo: ""
hospedagem: "" # ex.: Cloudflare Pages, Netlify
```
