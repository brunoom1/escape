# Sala 12 — O Teatro Fantasma: Requisitos

## Tema

> Meia-noite num teatro de ópera condenado. Uma voz cantou nos corredores vazios e as portas se fecharam. Diz a lenda que o Fantasma só liberta quem tocar sua ária no Grande Órgão.

## Conceito Principal — Dificuldade: ★★★☆☆ (Média)

Três ambientes (Palco → Camarim → Sótão dos Órgãos). Atmosfera gótica-teatral (carmesim, dourado, holofote). O clímax é um puzzle musical: reproduzir a ária final combinando pistas de fontes diferentes.

**Mecânica diferenciadora:** puzzle sonoro/musical de sequência de notas com deduo em formato de "arco" (palíndromo melódico).

---

## Ambientes

### Ambiente 1: Palco
Cortinas de veludo, plateia em sombras, partitura no chão, holofote (interruptor), poltrona 13.

### Ambiente 2: Camarim
Espelho de camarim com lâmpadas, penteadeira, cartaz da ópera, baú de figurinos com a máscara.

### Ambiente 3: Sótão dos Órgãos
Grande Órgão de tubos, caixa de música, rosácea, saída pelo telhado.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes navegáveis | Alta |
| RF-02 | Objetos interativos por ambiente (5+) | Alta |
| RF-03 | Gate: holofote deve estar aceso para ler a partitura | Alta |
| RF-04 | Gate: chave da poltrona 13 libera o Camarim | Alta |
| RF-05 | Gate: máscara do baú libera o Sótão | Alta |
| RF-06 | Puzzle final: sequência musical de 5 notas | Alta |
| RF-07 | Cross-fonte: partitura + caixa de música definem a ária | Alta |
| RF-08 | Integração login/timer/ranking (registrarResultado) | Alta |
| RF-09 | Aviso de jogador não logado | Média |
| RF-10 | Tema visual theater (carmesim + dourado) | Alta |

## Puzzle Final (Anti-Spoiler)

Ária = **Dó · Mi · Sol · Mi · Dó** (arco/palíndromo melódico de 5 notas):
- **Partitura** (requer holofote): "arco — começa e termina na nota mais grave (Dó); o ápice central é a mais aguda (Sol)". Fornece Dó ? Sol ? Dó.
- **Caixa de música**: "os degraus intermediários são Mi". Fornece as notas do meio.
- **Cartaz**: "5 atos" indica o número de notas.
- Nenhuma pista isolada revela a sequência completa.

## Integração com Lobby
- Emoji: 🎭
- Título: "Sala 12 — O Teatro Fantasma"
- Descrição: "Meia-noite num teatro condenado. O Fantasma só liberta quem tocar sua ária no Grande Órgão."
- Dificuldade: ★★★☆☆
