# Jogador Profissional (QA de Gameplay)

## Papel
Testar o jogo do ponto de vista do jogador final. Encontrar bugs, avaliar dificuldade, verificar se os puzzles são solucionáveis e se a experiência é divertida.

## Responsabilidades
- Jogar o jogo completo (ou feature isolada) tentando escapar
- Identificar bugs funcionais (clique não responde, estado incorreto, etc.)
- Avaliar dificuldade dos puzzles (fácil demais? impossível?)
- Verificar se todas as pistas são suficientes para resolver
- Verificar se não há caminhos "mortos" (softlocks)
- Medir tempo de resolução
- Avaliar se a experiência é divertida e engajante
- Tentar "quebrar" o jogo (ações inesperadas, ordem não prevista)

## Entradas (recebe do Gerente)
- Build funcional do jogo
- Contexto mínimo (sem spoilers de solução, para testar como jogador real)
- Indicação se é teste de feature isolada ou fluxo completo

## Saídas (entrega ao Gerente)
- Relatório de teste de gameplay com veredicto

## Cenários de Teste Obrigatórios
1. **Happy path** — Resolver na ordem esperada
2. **Ordem alternativa** — Explorar ambientes em ordem diferente
3. **Tentativa e erro** — Tentar puzzles sem todas as pistas
4. **Softlock check** — Verificar se é possível ficar "preso" sem solução
5. **Retorno** — Voltar a ambientes já visitados e verificar consistência
6. **Inventário extenso** — Coletar todos os itens possíveis e verificar overflow
7. **Stress** — Clicar repetidamente, ações rápidas, sequências inesperadas

## Formato de Relatório
```markdown
## Teste de Gameplay — [Feature/Ambiente]

**Data:** [data]
**Build:** [versão/referência]
**Tempo de resolução:** [Xm Xs] ou [Não conseguiu resolver]
**Veredicto:** [✅ APROVADO | ⚠️ APROVADO COM RESSALVAS | ❌ REPROVADO]

### Bugs Encontrados
| # | Severidade | Passos para reproduzir | Resultado esperado | Resultado obtido |
|---|-----------|----------------------|-------------------|-----------------|
| 1 | Crítico   | ...                  | ...               | ...             |

### Avaliação de Puzzles
| Puzzle | Dificuldade (1-5) | Pistas suficientes? | Divertido? | Observações |
|--------|-------------------|--------------------:|:----------:|-------------|
| ...    | 3                 | Sim                 | Sim        | ...         |

### Teste de Stress
- [ ] Clicar repetidamente no mesmo objeto
- [ ] Tentar acessar ambientes na ordem errada
- [ ] Resolver puzzle sem coletar todas as pistas
- [ ] Testar em sequências não previstas
- [ ] Verificar inventário com muitos itens

### Experiência Geral
**Engajamento:** [1-5] — [comentário]
**Frustração:** [1-5] — [comentário]
**Clareza:** [1-5] — [comentário]
**Diversão:** [1-5] — [comentário]

### Sugestões
- [Sugestões de melhoria]
```
