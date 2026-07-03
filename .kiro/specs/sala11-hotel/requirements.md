# Sala 11 — O Grande Hotel: Requisitos

## Tema

> Você passou a noite no lendário Grande Hotel, abandonado há décadas, e acordou trancado. A única saída é pelo porão — mas o caminho passa pela misteriosa Suíte 237, de onde um hóspede nunca fez check-out.

## Conceito Principal — Dificuldade: ★★★★☆ (Difícil)

Três ambientes encadeados (Recepção → Suíte 237 → Porão) com gates progressivos. Atmosfera de terror psicológico art déco decadente. O puzzle do cofre exige raciocínio espacial (reflexo de espelho) e o final exige ordenação lógica.

---

## Ambientes

### Ambiente 1: Recepção
Saguão art déco. Balcão com livro de registro, escaninho de chaves, quadro do fundador, relógio parado, sino.

### Ambiente 2: Suíte 237
Quarto do hóspede desaparecido. Cofre, espelho com marca de batom, cama, telefone, alçapão para o porão.

### Ambiente 3: Porão
Caldeira, painel de disjuntores, prateleiras e a porta de saída de serviço (com tranca elétrica).

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes navegáveis | Alta |
| RF-02 | Objetos interativos por ambiente (5+) | Alta |
| RF-03 | Gate: chave 237 (escaninho) libera a Suíte | Alta |
| RF-04 | Gate: cofre (suíte) libera o alçapão do porão | Alta |
| RF-05 | Puzzle do cofre: reflexo de espelho (raciocínio espacial) | Alta |
| RF-06 | Puzzle final: ordenar disjuntores por carga crescente | Alta |
| RF-07 | Gate: energia religada destranca a porta de saída | Alta |
| RF-08 | Integração login/timer/ranking (registrarResultado) | Alta |
| RF-09 | Aviso de jogador não logado | Média |
| RF-10 | Tema visual hotel (bordô + dourado decadente) | Alta |

## Puzzles (Anti-Spoiler)

### Cofre = 732
- **Livro de registro**: hóspede permanente na **Suíte 237** (fornece 237).
- **Espelho** (batom): número escrito **invertido pelo reflexo** (fornece a operação: espelhar).
- **Cama** (bilhete): "o número que me trancou também me liberta" (reforça que é o nº do quarto).
- Cruzando: 237 espelhado = **732**. O telefone ("trois, zéro, sept" = 307) é uma pista falsa deliberada.

### Disjuntores = 5A → 15A → 30A
- **Caldeira** (placa): "religar da MENOR para a MAIOR carga" (a regra).
- **Painel**: mostra as cargas 5A, 15A, 30A (os valores).
- Cruzando: ordem ascendente por amperagem.

## Integração com Lobby
- Emoji: 🏨
- Título: "Sala 11 — O Grande Hotel"
- Descrição: "Você acordou trancado num hotel abandonado. A saída passa pela Suíte 237, de onde um hóspede nunca partiu."
- Dificuldade: ★★★★☆
