# Jogador Profissional (QA de Gameplay)

## Papel
Testar o jogo do ponto de vista do jogador final. Encontrar bugs, avaliar dificuldade, verificar se os puzzles são solucionáveis e se a experiência é divertida. **Validar que nenhuma solução é entregue de forma explícita ao jogador.**

## Responsabilidades
- Jogar o jogo completo (ou feature isolada) tentando escapar
- Identificar bugs funcionais (clique não responde, estado incorreto, etc.)
- Avaliar dificuldade dos puzzles (fácil demais? impossível?)
- Verificar se todas as pistas são suficientes para resolver
- Verificar se não há caminhos "mortos" (softlocks)
- Medir tempo de resolução
- Avaliar se a experiência é divertida e engajante
- Tentar "quebrar" o jogo (ações inesperadas, ordem não prevista)
- **CRÍTICO: Validar que NENHUMA pista entrega a solução diretamente (Regra Anti-Spoiler)**

---

## Regra Anti-Spoiler (OBRIGATÓRIA)

> **Nenhuma interação, texto, item de inventário ou pista pode conter a resposta completa de um puzzle.**
> O jogador SEMPRE deve precisar de dedução, interpretação ou cruzamento de informações.

### O que é PROIBIDO
- Texto que diz literalmente o código/senha/sequência (ex: "a senha é 0847")
- Texto que revela a resposta com formatação óbvia (ex: "é #0847? Sistema exige 4")
- Item de inventário cujo label contém a resposta (ex: label "#0847")
- Pista única que, sozinha, resolve o puzzle sem necessidade de outra pista
- Combinação de objeto + texto que elimina toda ambiguidade sem esforço

### O que é PERMITIDO
- Pistas parciais que precisam ser combinadas com outras
- Dicas indiretas que requerem interpretação (metáforas, referências)
- Confirmações visuais que validam uma dedução já feita pelo jogador
- Dados brutos que o jogador precisa cruzar (pH, datas, posições)

### Teste Anti-Spoiler (aplicar em cada pista)
Para cada texto/pista do jogo, perguntar:
1. "Se eu ler APENAS esta pista, consigo resolver o puzzle?" → Se SIM = **REPROVADO**
2. "Preciso combinar com outra informação para resolver?" → Se SIM = OK
3. "A resposta está escrita literalmente aqui?" → Se SIM = **REPROVADO**
4. "Existe ambiguidade que exige pensamento?" → Se SIM = OK

### Nível de Revelação Aceitável por Pista

| Nível | Descrição | Aceitável? |
|-------|-----------|:----------:|
| 1 | Dica vaga, atmosférica | ✅ |
| 2 | Informação parcial que sozinha não resolve | ✅ |
| 3 | Dado concreto que precisa de contexto de outra pista | ✅ |
| 4 | Confirmação de algo que o jogador já deduziu | ✅ |
| 5 | Resposta explícita, literal, completa | ❌ PROIBIDO |

### Exemplos

**❌ REPROVADO:**
- "Na lixeira: 'a senha é 0847'" — resposta literal
- "Bilhete: '#0847? Sistema exige 4.'" — resposta com contexto óbvio
- Item de inventário: "Código: 0847" — resposta no label

**✅ APROVADO:**
- "Caso #847 no quadro" + "formato 4 dígitos no laptop" + "preencher até completar" na lixeira — 3 pistas separadas que combinadas levam à dedução
- "O relógio parou às 9:37" + diário menciona "a hora revela" — jogador deduz que 937 é relevante

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
8. **Anti-Spoiler** — Ler cada pista isoladamente e verificar se alguma entrega a solução completa

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

### Teste Anti-Stress
- [ ] Clicar repetidamente no mesmo objeto
- [ ] Tentar acessar ambientes na ordem errada
- [ ] Resolver puzzle sem coletar todas as pistas
- [ ] Testar em sequências não previstas
- [ ] Verificar inventário com muitos itens

### Validação Anti-Spoiler
| Pista | Resolve sozinha? | Requer combinação? | Veredicto |
|-------|:----------------:|:------------------:|:---------:|
| ...   | Não              | Sim (+ pista X)    | ✅        |

### Experiência Geral
**Engajamento:** [1-5] — [comentário]
**Frustração:** [1-5] — [comentário]
**Clareza:** [1-5] — [comentário]
**Diversão:** [1-5] — [comentário]

### Sugestões
- [Sugestões de melhoria]
```
