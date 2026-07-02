# Sala 5 — O Submarino Afundado: Requisitos

## Tema

> O submarino militar K-47 afundou após uma explosão no reator. Você é o único sobrevivente consciente na seção de proa. A pressão da água está rompendo os compartimentos um a um. Chegue à escotilha de emergência antes que a água tome tudo.

## Conceito Principal — Dificuldade: ★★☆☆☆ (Fácil)

Sala introdutória com mecânica visual de **nível de água subindo** como indicador de urgência (apenas visual, não causa game over). O ambiente claustrofóbico e azul metálico cria tensão, mas os puzzles são acessíveis. Ideal para jogadores iniciantes.

**Mecânica diferenciadora:** Um indicador visual de "nível de água" sobe progressivamente no Canvas, criando pressão psicológica. Cada puzzle resolvido "drena" um pouco. Puramente estético — não há game over.

---

## Ambientes

### Ambiente 1: Compartimento de Proa
Sala frontal do submarino. Periscópio, mesa de navegação, armário de suprimentos. Água infiltrando pelo casco.

### Ambiente 2: Sala de Máquinas
Motores, válvulas, tubulações. O gerador de emergência precisa ser religado para abrir a escotilha.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 2 ambientes navegáveis (proa + máquinas) | Alta |
| RF-02 | Cada ambiente com pelo menos 5 objetos interativos | Alta |
| RF-03 | Indicador visual de "nível de água" subindo gradualmente no Canvas | Alta |
| RF-04 | Puzzle principal: sequência de válvulas para religar gerador (3 etapas) | Alta |
| RF-05 | Gate: sala de máquinas requer chave de manutenção (encontrada na proa) | Alta |
| RF-06 | Puzzles acessíveis — dificuldade baixa, pistas mais evidentes | Alta |
| RF-07 | Cross-ambiente: código de frequência na proa necessário nas máquinas | Alta |
| RF-08 | Inventário dinâmico | Alta |
| RF-09 | Tela de sucesso com tempo | Alta |
| RF-10 | Tema visual: azul escuro, metálico, água | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Canvas 2D, 900x600 |
| RNF-02 | Responsivo 360-1920px |
| RNF-03 | Zero dependências |
| RNF-04 | 60fps |

## Puzzle Principal

O jogador precisa religar o gerador de emergência girando 3 válvulas na ordem correta (baseada em cores/pressão). As pistas vêm de:
- Manual de emergência na proa (indica que a ordem é por pressão crescente)
- Manômetros nas tubulações (mostram valores de pressão por válvula)
- O jogador ordena as 3 válvulas por pressão: baixa → média → alta

## Integração com Lobby
- Emoji: 🚢
- Título: "Sala 5 — O Submarino Afundado"
- Descrição: "O K-47 afundou. A água sobe. Encontre a escotilha antes que seja tarde."
- Dificuldade: ★★☆☆☆
