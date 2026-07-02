---
inclusion: auto
---

# Fluxo de Trabalho da Equipe

## Regras de Operação

1. **Nenhum agente se comunica diretamente com outro** — tudo passa pelo Gerente
2. **Toda entrega deve ser validada** antes de ser passada adiante
3. **Feedback negativo gera tarefa de correção**, nunca retrabalho sem registro
4. **Máximo 3 ciclos de correção** por item antes de revisão de escopo
5. **O Roteirista tem autoridade final** sobre decisões narrativas
6. **O UX tem autoridade final** sobre decisões de interface
7. **O Gerente tem autoridade final** sobre priorização e prazos

## Ciclo de Desenvolvimento por Sala

### Fase 1: Fundação
```
Gerente lê spec da sala
  → Solicita narrativa ao Roteirista
  → Envia briefing de assets ao Design
  → Envia estrutura base ao Frontend
```

### Fase 2: Ambiente por Ambiente
```
Para cada ambiente:
  Design cria assets → Frontend implementa → Build parcial
  → UX avalia interface → Jogador testa gameplay
  → Se reprovado: Gerente cria tarefa de correção
  → Se aprovado: próximo ambiente
```

### Fase 3: Integração e Entrega
```
Frontend integra tudo + puzzle final
  → UX avalia fluxo completo
  → Jogador testa fim-a-fim
  → Aprovado = sala concluída
```

## Protocolo de Solicitação (Gerente → Agente)
```
SOLICITAÇÃO #[ID]
Para: [Agente]
Tipo: [Criação | Correção | Revisão]
Contexto: [Informação necessária]
Entregável: [O que deve ser produzido]
```

## Protocolo de Feedback (UX/Jogador → Gerente)
```
FEEDBACK #[ID]
Veredicto: [Aprovado | Reprovado]
Resumo: [1-2 frases]
Ações: [Lista de correções se reprovado]
```

## Dependências
```
Narrativa → Assets → Implementação → Validação → Correção (se necessário)
```
- Nunca enviar tarefa ao Frontend sem assets do Design
- Nunca enviar build para teste sem textos do Roteirista
