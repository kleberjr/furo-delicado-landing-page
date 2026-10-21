---
name: verify
description: Use depois do build e sempre antes de declarar uma página pronta. Roda lint, testes e Lighthouse, revisa a UI com web-design-guidelines, faz o ciclo visual com screenshots em 360, 768 e 1280px contra o DESIGN.md (até 3 rodadas) e preenche o checklist de entrega.
---

# Verify

**Entrada:** página construída pela skill `build` e `DESIGN.md` aprovado.
**Saída:** relatório de entrega com o checklist preenchido.

## Passos

1. **Checagens automáticas** (corrija até passar):

   ```bash
   npm run lint && npm run typecheck && npm test
   npm run build:draft && npm run lighthouse
   ```

2. **Revisão de UI:** use a skill `web-design-guidelines` em `src/components/`, `src/pages/` e
   `src/layouts/`. Só para revisar: corrija os achados pertinentes seguindo o `DESIGN.md`.
3. **Ciclo visual** (no máximo 3 rodadas): `npm run screenshots` gera
   `tests/visual/*-{360,768,1280}.png`. Compare cada imagem com o `DESIGN.md` e as referências,
   liste as divergências, corrija e repita.
4. **Entrega:** rode `npm run build` (produção; falha se sobrar placeholder) e responda com resumo,
   suposições, placeholders, pontos regulatórios do segmento, divergências em aberto e o checklist:

```markdown
- [ ] Briefing e DESIGN.md aprovados
- [ ] Lint, typecheck e testes passando; zero violações sérias no axe
- [ ] Revisão web-design-guidelines feita
- [ ] Ciclo visual nos 3 tamanhos, sem divergências abertas
- [ ] Lighthouse mobile: Perf ≥ 90; A11y, Boas práticas e SEO ≥ 95
- [ ] CTA visível sem rolar em 360px; links de contato testados
- [ ] Headers de segurança configurados; sem segredos no repositório
- [ ] Privacidade coerente com o que o site coleta
- [ ] Placeholders, suposições e pontos regulatórios listados
```

## Pronto quando

- [ ] Todas as checagens verdes e ciclo visual registrado.
- [ ] Checklist preenchido com evidência em cada item.
