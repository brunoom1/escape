# Sala 10 — O Farol da Tempestade: Requisitos

## Tema

> Uma tempestade violenta atinge a costa. O farol se apagou e um navio pede socorro pelo rádio, prestes a bater nas rochas. Você precisa reacender a luz do farol antes que seja tarde.

## Conceito Principal — Dificuldade: ★★★☆☆ (Média)

Dois ambientes verticais (base e topo do farol) conectados por uma escada em espiral. A atmosfera de tempestade (chuva, relâmpagos, ondas na janela) cria tensão. O puzzle final é acender o farol combinando pistas de fontes diferentes.

**Mecânica diferenciadora:** feixe de luz giratório renderizado no Canvas quando o farol acende, iluminando a cúpula.

---

## Ambientes

### Ambiente 1: Sala do Faroleiro
Base do farol. Janela redonda com tempestade, escrivaninha com diário, armário de chaves, rádio, lampião e baú de ferramentas.

### Ambiente 2: Sala da Lente
Topo do farol. Lente de Fresnel, mecanismo de engrenagens de rotação e painel de ignição.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 2 ambientes navegáveis (faroleiro + lente) | Alta |
| RF-02 | Cada ambiente com objetos interativos (5+ / 4+) | Alta |
| RF-03 | Gate: lampião deve ser aceso para ler o diário | Alta |
| RF-04 | Gate: chave do armário libera a escada para a lente | Alta |
| RF-05 | Gate: manivela do baú ativa o mecanismo de engrenagens | Alta |
| RF-06 | Puzzle final: código de 3 toques (ignição) exige mecanismo ativo | Alta |
| RF-07 | Cross-fonte: código deduzido do diário + rádio (2 pistas) | Alta |
| RF-08 | Integração login/timer/ranking (registrarResultado) | Alta |
| RF-09 | Aviso de jogador não logado | Média |
| RF-10 | Tema visual lighthouse (azul-petróleo + âmbar) | Alta |

## Puzzle Principal (Anti-Spoiler)

Código de ignição = **124**. Nenhuma pista isolada revela a resposta:
- **Diário**: "comecei com um único toque; cada toque seguinte era o dobro do anterior" (regra: começa em 1, dobra).
- **Rádio**: "padrão de emergência: TRÊS toques, na sequência dobrada" (quantidade: 3 toques).
- Cruzando: 1 → 2 → 4 = **124**.

## Integração com Lobby
- Emoji: 🗼
- Título: "Sala 10 — O Farol da Tempestade"
- Descrição: "Uma tempestade apagou o farol e um navio pede socorro. Reacenda a luz antes que ele bata nas rochas."
- Dificuldade: ★★★☆☆
