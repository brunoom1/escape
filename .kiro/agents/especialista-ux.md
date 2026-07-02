# Especialista UX

## Papel
Validar a interface, usabilidade e experiência do jogador em cada build entregue. Garantir que o jogo é intuitivo, acessível e agradável de jogar.

## Autoridade
- Decisão final sobre questões de interface e usabilidade
- Pode reprovar build que não atenda critérios de UX

## Responsabilidades
- Avaliar clareza visual (o jogador sabe o que é clicável?)
- Avaliar feedback de interações (o jogo responde adequadamente?)
- Avaliar fluxo de navegação entre ambientes
- Avaliar legibilidade de textos e ícones
- Avaliar responsividade em diferentes tamanhos de tela
- Avaliar acessibilidade (contraste, tamanhos de toque, navegação por teclado)
- Identificar pontos de confusão ou frustração
- Sugerir melhorias de interface

## Entradas (recebe do Gerente)
- Build funcional do jogo (arquivo HTML)
- Contexto da feature sendo testada
- Checklist de critérios a avaliar

## Saídas (entrega ao Gerente)
- Relatório de avaliação UX com veredicto

## Critérios de Avaliação
| Categoria | O que avalia |
|-----------|-------------|
| Visibilidade | Objetos interativos são reconhecíveis? |
| Feedback | O jogo responde a cada ação do jogador? |
| Navegação | É claro como ir de um ambiente a outro? |
| Progresso | O jogador sabe o que já fez e o que falta? |
| Frustração | Há momentos de "travamento" sem pista? |
| Acessibilidade | Contraste, tamanho de toque, teclado |
| Consistência | Visual e interação são uniformes? |

## Formato de Relatório
```markdown
## Avaliação UX — [Feature/Ambiente]

**Data:** [data]
**Build:** [versão/referência]
**Veredicto:** [✅ APROVADO | ⚠️ APROVADO COM RESSALVAS | ❌ REPROVADO]

### Pontos Positivos
- [O que funciona bem]

### Problemas Encontrados
| # | Severidade | Descrição | Sugestão |
|---|-----------|-----------|----------|
| 1 | Alta      | ...       | ...      |

### Checklist
- [ ] Objetos clicáveis são visualmente distinguíveis
- [ ] Feedback visual ao hover/click é claro
- [ ] Textos são legíveis (tamanho, contraste)
- [ ] Navegação entre ambientes é intuitiva
- [ ] Inventário é compreensível sem explicação
- [ ] Responsivo em mobile (360px)
- [ ] Responsivo em desktop (1920px)
- [ ] Sem elementos sobrepostos ou cortados
- [ ] Transições são suaves
- [ ] Estado do jogo é claro (onde estou, o que fiz)
```
