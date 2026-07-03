# Sala 15 — A Oficina do Relojoeiro: Requisitos (JOGO DE TESTE)

## Propósito

Sala **de teste** para validar a nova característica de **puzzles manipulativos** (ver `.kiro/specs/mini-puzzles-interativos/repertorio.md`). Aplica 4 mecânicas novas. Se aprovada, a característica migra para steering.

## Tema

> O velho relojoeiro Sr. Ventura desapareceu, deixando a oficina trancada por dentro. Dizem que ele escondeu a chave da saída dentro de seus próprios enigmas mecânicos. Você tem uma hora antes que a oficina seja lacrada para sempre.

## Conceito Principal — Dificuldade: ★★★★☆ (Difícil)

Dois ambientes (Oficina → Depósito). O diferencial não são códigos digitados, e sim **manipulação direta**: ajustar ponteiros, resolver um xadrez, montar uma foto rasgada e empurrar um engradado.

---

## Mecânicas Manipulativas Aplicadas

| # | Mecânica (catálogo) | Aplicação na sala |
|---|---------------------|-------------------|
| 1 | Ajuste de Relógio | Encaixar o ponteiro achado e girar até 12:30 → abre compartimento |
| 2 | Xadrez — Lance de Mate | Clicar na casa do mate-em-1 → destrava gaveta secreta |
| 3 | Quebra-Cabeça (Jigsaw) | Ordenar 3 fragmentos de uma foto → revela código da porta |
| 4 | Blocos Deslizantes (Sokoban) | Empurrar o engradado até a marca → libera a escotilha de saída |

---

## Ambientes

### Ambiente 1: Oficina
Relógio de parede, tabuleiro de xadrez, bancada de montagem, gaveta, caixa de ferramentas, porta blindada para o depósito.

### Ambiente 2: Depósito
Engradados empurráveis (grade Sokoban), marca no piso, escotilha de saída.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 2 ambientes navegáveis | Alta |
| RF-02 | Puzzle do relógio: encaixar ponteiro + girar até 12:30 (interativo) | Alta |
| RF-03 | Puzzle de xadrez: clicar na casa de mate-em-1 (interativo) | Alta |
| RF-04 | Puzzle jigsaw: reordenar 3 fragmentos até formar a foto | Alta |
| RF-05 | Puzzle Sokoban: empurrar engradado até a marca no piso | Alta |
| RF-06 | Gate: código da foto (jigsaw) abre a porta do depósito | Alta |
| RF-07 | Estado dos puzzles visível em tempo real | Alta |
| RF-08 | Anti-spoiler: 2+ pistas, nada literal | Alta |
| RF-09 | Integração login/timer/ranking (registrarResultado) | Alta |
| RF-10 | Aviso de jogador não logado | Média |
| RF-11 | Tema visual clockwork (latão + turquesa) | Alta |

## Puzzles (Anti-Spoiler)

### Relógio → 12:30
- **Ponteiro** (gaveta): item necessário para operar o relógio.
- **Bilhete** (caixa de ferramentas): "Ventura almoçava sempre meia hora após o meio-dia."
- Deduz-se 12:30 (nunca escrito). Abre o compartimento → **fragmento A** da foto.

### Xadrez → mate-em-1
- **Posição** no tabuleiro (visível ao inspecionar).
- **Livro de aberturas** (bancada): "a Dama termina o que os peões começaram" (pista da peça).
- Clicar na casa correta destrava a gaveta secreta → **fragmento B**.

### Jigsaw → código da porta
- Fragmentos **A** (relógio), **B** (xadrez) e **C** (caixa de ferramentas), reordenados nos 3 slots na sequência certa (bordas/numeração no verso).
- Foto montada revela o **código de 3 dígitos** da porta blindada.

### Sokoban → saída
- Empurrar o engradado até a marca "X"; sobre a marca, a escotilha destrava → vitória.
- **Esquema na parede** mostra a posição final do engradado.

## Integração com Lobby
- Emoji: 🕰️
- Título: "Sala 15 — A Oficina do Relojoeiro"
- Descrição: "O relojoeiro sumiu e trancou a oficina por dentro. Resolva seus enigmas mecânicos — ajuste, monte e empurre — para escapar."
- Dificuldade: ★★★★☆
