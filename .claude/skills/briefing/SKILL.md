---
name: briefing
description: Use no início de todo projeto de cliente, quando o usuário descrever o negócio (texto livre, anotações, avaliações coladas, prints ou links) ou pedir para preencher/atualizar o briefing. Produz briefing-cliente.md e pede aprovação.
---

# Briefing

**Entrada:** o material que o usuário colou na conversa e o modelo em `briefing-cliente.md`.
**Saída:** `briefing-cliente.md` preenchido e aprovado.

## Passos

1. Preencha o YAML de `briefing-cliente.md` mantendo a estrutura e removendo o comentário inicial.
   - Use **só** o que o usuário disse ou forneceu. Nunca suponha: campo sem informação vira
     `[DESCONHECIDO]`.
   - Extraia o implícito: `objecoes_comuns` e `palavras_dos_clientes` saem das avaliações coladas
     (trechos literais); `segmento` e `tom_de_voz` saem da descrição.
   - Normalize sem alterar o conteúdo: WhatsApp em E.164 (`+5561999999999`), horários padronizados.
   - `depoimentos_reais`: só os confirmados e autorizados.
2. Mostre o briefing e pergunte, **de uma vez, no máximo 5** campos `[DESCONHECIDO]` que mudam o
   resultado (normalmente: conversão principal, WhatsApp/contato, endereço, serviços, fotos). Para
   os demais, proponha padrões e liste-os como **suposições declaradas**.
3. Atualize o arquivo com as respostas. Se o usuário mandar seguir sem responder, siga com as
   suposições declaradas.
4. Peça a aprovação explícita.

## Pronto quando

- [ ] Nada inventado; desconhecidos como `[DESCONHECIDO]` ou suposição declarada.
- [ ] Contatos normalizados.
- [ ] O usuário aprovou o briefing por escrito.
