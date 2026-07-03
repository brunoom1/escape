# Sala 14 — O Observatório: Requisitos

## Tema

> Você é o astrônomo de plantão. Um sinal misterioso veio do espaço e sumiu — e, no mesmo instante, as portas do observatório se selaram. Para reabrir o sistema e sair, é preciso realinhar o grande telescópio ao alvo certo no céu.

## Conceito Principal — Dificuldade: ★★★★★ (Muito Difícil)

Três ambientes (Sala de Controle → Cúpula do Telescópio / Arquivo Estelar). O clímax exige uma dedução dupla (constelação + coordenada) cruzando três fontes. Atmosfera índigo-estelar, com céu real visível pela fenda da cúpula.

**Mecânica diferenciadora:** fenda da cúpula renderiza um céu estrelado dinâmico; ao acertar, a constelação de Órion aparece alinhada.

---

## Ambientes

### Ambiente 1: Sala de Controle
Painel de energia, monitor principal, gaveta de instrumentos. Hub central.

### Ambiente 2: Arquivo Estelar
Mapas estelares, globo celeste giratório, mesa de cartas, cofre de dados.

### Ambiente 3: Cúpula do Telescópio
Telescópio refrator, console de alinhamento, roda de filtros, fenda para o céu.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes navegáveis | Alta |
| RF-02 | Objetos interativos por ambiente (4+) | Alta |
| RF-03 | Gate: fusível (gaveta) religa a energia | Alta |
| RF-04 | Gate: energia libera a cúpula e o monitor | Alta |
| RF-05 | Gate: chave (gaveta) libera o arquivo | Alta |
| RF-06 | Puzzle final duplo: constelação + coordenada de 3 dígitos | Alta |
| RF-07 | Cross-fonte: monitor (constelação) + mapa + globo (coordenada) | Alta |
| RF-08 | Integração login/timer/ranking (registrarResultado) | Alta |
| RF-09 | Aviso de jogador não logado | Média |
| RF-10 | Tema visual observatory (índigo + violeta estelar) | Alta |

## Puzzle Final (Anti-Spoiler)

Alvo = **Órion** + coordenada **585**:
- **Monitor** (requer energia): "a constelação que os antigos chamavam de O CAÇADOR, soberana do céu de inverno" → Órion.
- **Mapa estelar** (arquivo): "coordenada de ascensão = 5 _ 5" (extremos são 5; central apagado).
- **Globo celeste** (arquivo): "dígito central da coordenada de Órion = 8".
- Cruzando: constelação Órion + 5·8·5 = **585**. Requer energia religada para o console funcionar.

## Integração com Lobby
- Emoji: 🔭
- Título: "Sala 14 — O Observatório"
- Descrição: "Um sinal do espaço selou o observatório. Realinhe o telescópio à constelação certa para reabrir o sistema e escapar."
- Dificuldade: ★★★★★
