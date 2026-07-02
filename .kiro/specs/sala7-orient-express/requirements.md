# Sala 7 — O Orient Express: Requisitos

## Tema

> Ano de 1934. Você é um diplomata a bordo do Orient Express, rota Istambul–Paris. Ao acordar, descobre que o trem está sem maquinista — ele desapareceu. Os vagões estão se desacoplando automaticamente um a um. Precisa chegar à locomotiva e frear o trem antes de perder todos os vagões.

## Conceito Principal — Dificuldade: ★★★★☆ (Difícil)

**Mecânica diferenciadora:** Os ambientes (vagões) se "desacoplam" visualmente com o tempo. Após certo tempo em cada vagão, o próximo vagão se torna inacessível permanentemente (representado visualmente por ele "sumindo"). O jogador precisa ser eficiente — explorar rápido e seguir em frente. Não há game over, mas perder um vagão significa perder pistas, tornando o puzzle final mais difícil (mas ainda solucionável por dedução com menos dados).

---

## Ambientes

### Ambiente 1: Vagão Restaurante
Mesas postas, janelas com paisagem noturna, menu, adega. Elegante e misterioso.

### Ambiente 2: Vagão de Cabines
Corredor com portas numeradas. A cabine do maquinista tem pertences pessoais com pistas.

### Ambiente 3: Locomotiva
Painel de controle, alavancas, medidores. O puzzle final para frear.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes (restaurante + cabines + locomotiva) | Alta |
| RF-02 | Mecânica de tempo: vagão anterior fica inacessível após avançar | Alta |
| RF-03 | Aviso visual antes do desacoplamento ("vagão balançando") | Alta |
| RF-04 | Cada ambiente com 5+ objetos | Alta |
| RF-05 | Puzzle final: sequência de frenagem (3 alavancas + pressão da caldeira) | Alta |
| RF-06 | Puzzle secundário: abrir cabine do maquinista (combinação de 3 dígitos) | Alta |
| RF-07 | Cross-ambiente: pistas no restaurante necessárias na locomotiva | Alta |
| RF-08 | Sem game over — mas menos pistas = mais difícil | Média |
| RF-09 | Gate: locomotiva acessível após encontrar chave mestra nas cabines | Alta |
| RF-10 | Tema visual: art déco, anos 30, madeira polida, latão | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Canvas 2D, 900x600 |
| RNF-02 | Responsivo |
| RNF-03 | Zero dependências |
| RNF-04 | Animação de paisagem passando na janela (parallax sutil) |

## Puzzle Principal

Frear o trem requer ajustar 3 alavancas para valores específicos de pressão da caldeira. Os valores vêm de:
- Menu do restaurante (números nos preços codificam pressão)
- Diário do maquinista na cabine (referências indiretas: "nunca exceder o dobro do jantar")
- Medidores na locomotiva mostram escalas (jogador interpreta qual valor aplicar)

O jogador cruza: preços do menu + referência do diário + escala dos medidores = 3 posições corretas.

## Integração com Lobby
- Emoji: 🚂
- Título: "Sala 7 — O Orient Express"
- Descrição: "O maquinista sumiu. Os vagões se desacoplam. Chegue à locomotiva e freie antes que seja tarde."
- Dificuldade: ★★★★☆
