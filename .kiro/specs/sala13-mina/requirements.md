# Sala 13 — A Mina Abandonada: Requisitos

## Tema

> Você desceu à velha mina de ouro para investigar e um desmoronamento selou a saída. O único caminho de volta à superfície é o antigo elevador de carga, lá no fundo — mas primeiro é preciso luz, energia e o código certo.

## Conceito Principal — Dificuldade: ★★★★☆ (Difícil)

Três ambientes descendo na mina (Entrada → Galeria Profunda → Sala do Elevador). Mecânica de **escuridão**: sem o lampião aceso, é impossível avançar. Atmosfera claustrofóbica de terra, ferrugem e âmbar.

**Mecânica diferenciadora:** gate de luz — a escuridão bloqueia a navegação até o lampião de carbureto ser abastecido e aceso.

---

## Ambientes

### Ambiente 1: Entrada da Mina
Trilhos, quadro de avisos, lampião de carbureto, caixa de ferramentas, vagonete.

### Ambiente 2: Galeria Profunda
Veio de ouro, placa de profundidade, escoras rachadas, poça d'água.

### Ambiente 3: Sala do Elevador
Gerador a diesel, painel de controle, cabine de carga.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes navegáveis | Alta |
| RF-02 | Objetos interativos por ambiente (4+) | Alta |
| RF-03 | Gate de luz: lampião abastecido (carbureto) e aceso libera galeria/elevador | Alta |
| RF-04 | Gate: gerador ligado energiza o painel do elevador | Alta |
| RF-05 | Puzzle final: código de profundidade de 3 dígitos | Alta |
| RF-06 | Cross-fonte: quadro (centenas) + placa (dezenas/unidades) | Alta |
| RF-07 | Integração login/timer/ranking (registrarResultado) | Alta |
| RF-08 | Aviso de jogador não logado | Média |
| RF-09 | Tema visual mine (terra + âmbar de carbureto) | Alta |

## Puzzle Final (Anti-Spoiler)

Código do elevador = **420** (profundidade em metros do nível principal):
- **Quadro de avisos** (entrada): "código = profundidade do nível principal (m); as CENTENAS são 4".
- **Placa de profundidade** (galeria): "_ 2 0 m" — os dois últimos dígitos são 20; o primeiro está corroído.
- Cruzando: 4 (centenas) + 20 = **420**. Requer o gerador ligado para o painel funcionar.

## Integração com Lobby
- Emoji: ⛏️
- Título: "Sala 13 — A Mina Abandonada"
- Descrição: "Um desmoronamento selou a saída. Só o velho elevador de carga leva de volta à superfície — se você achar luz, energia e o código."
- Dificuldade: ★★★★☆
