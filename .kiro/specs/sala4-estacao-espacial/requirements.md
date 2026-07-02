# Sala 4 — Estação Espacial Abandonada: Requisitos

## Tema

> O jogador acorda numa estação espacial à deriva. Os sistemas estão offline. É preciso navegar entre os módulos da estação, restaurar energia e desbloquear a cápsula de fuga.

## Conceito Principal

A Sala 4 introduz a mecânica de **múltiplos ambientes** dentro de uma única experiência de escape. O jogador navega entre ambientes interconectados, coletando pistas em cada um que se complementam para resolver o puzzle final. Tudo renderizado em **HTML5 Canvas**.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | Deve ter no mínimo 3 ambientes navegáveis | Alta |
| RF-02 | Cada ambiente deve ter pelo menos 4 objetos interativos | Alta |
| RF-03 | Transição entre ambientes deve ser fluida (fade no Canvas) | Alta |
| RF-04 | Inventário deve ser dinâmico e expansível (sem limite fixo de slots) | Alta |
| RF-05 | Inventário deve ser persistente entre ambientes | Alta |
| RF-06 | Deve haver gates (bloqueios) que exigem itens para avançar | Alta |
| RF-07 | Puzzle final deve combinar pistas de múltiplos ambientes | Alta |
| RF-08 | Deve exibir mensagens narrativas contextuais por ambiente | Alta |
| RF-09 | Deve registrar o tempo total de resolução | Média |
| RF-10 | Deve exibir tela de sucesso com tempo e link ao lobby | Alta |
| RF-11 | Deve funcionar sem dependências externas (somente vanilla) | Alta |
| RF-12 | Deve ter indicador visual de qual ambiente o jogador está | Média |
| RF-13 | Pistas de um ambiente devem ser necessárias em outro | Alta |
| RF-14 | Deve ter feedback visual/textual para tentativas incorretas | Média |
| RF-15 | Deve seguir o padrão visual do projeto (estilo escuro) | Alta |
| RF-16 | Toda renderização de cenário deve usar Canvas 2D | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Arquivo único `index.html` com assets carregados via JS |
| RNF-02 | Responsivo para telas de 360px a 1920px |
| RNF-03 | Sem frameworks, bibliotecas ou bundlers |
| RNF-04 | Tempo de carregamento < 1s (assets otimizados) |
| RNF-05 | Acessível via teclado (Enter nos inputs, Tab nos objetos) |
| RNF-06 | Estado do jogo mantido em memória (objeto JS) |
| RNF-07 | 60fps no game loop |

## Integração com Lobby

- Adicionar card no `index.html` raiz (lobby):
  - Emoji: 🚀
  - Título: "Sala 4 — Estação Espacial"
  - Descrição: "Uma estação à deriva no espaço. Navegue entre os módulos e encontre a cápsula de fuga."
  - Link: `escape4/index.html`
