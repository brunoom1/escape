# Sala 2 — O Laboratório: Requisitos de Revitalização

## Estado Atual (POC)

### O que existe
- Ambiente único com 6 objetos (emojis posicionados com CSS absoluto)
- Puzzle: sequência de 3 cores (azul → vermelho → verde)
- Inventário fixo de 3 slots
- Renderização via DOM simples
- Pistas baseadas em metáforas simples ("frio = azul", "calor = vermelho", "crescimento = verde")
- Narrativa mínima: "alarme disparou, encontre a fórmula de neutralização"
- Sem cenário visual (fundo preto com emojis)

### Problemas Identificados
- Narrativa rasa — não explica por que o alarme disparou ou o que aconteceu no laboratório
- Visual pobre — emojis sobre fundo escuro, sem imersão de ambiente científico
- Puzzle pouco desafiador — mapa de cores é explícito (quadro branco diz tudo)
- Ambiente único (laboratório real teria áreas especializadas)
- Inventário limitado a 3 slots fixos
- Sem animações ambientais (um lab deveria ter luzes, telas piscando, vapores)
- Sem consequência narrativa (o que está sendo "neutralizado"?)

---

## Tema Revitalizado

> **O Laboratório de Virologia — Protocolo Omega**
>
> Você é um técnico de segurança biológica chamado para conter um vazamento no Laboratório Helix. O sistema de ventilação selou todas as saídas automaticamente. O containment breach vai liberar a toxina em 10 minutos. Você precisa sintetizar o antídoto e ativar o protocolo de purificação para desbloquear as portas.

---

## Ambientes (Multi-ambiente)

### Ambiente 1: Laboratório Principal
Bancadas com equipamentos, telas de monitoramento, tubos de ensaio. O coração do laboratório com microscópios, centrífuga e computador central.

### Ambiente 2: Câmara de Contenção
Sala estéril com paredes de vidro, sistema de purificação e painel de controle da ventilação. Acessível após encontrar o crachá de segurança nível 3.

### Ambiente 3: Depósito de Reagentes
Sala fria com prateleiras de químicos, refrigerador de amostras e cofre de substâncias controladas. Acesso requer desligamento do alarme no lab principal.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | Deve ter 3 ambientes navegáveis (lab + contenção + depósito) | Alta |
| RF-02 | Cada ambiente deve ter pelo menos 5 objetos interativos | Alta |
| RF-03 | Transição entre ambientes via fade no Canvas | Alta |
| RF-04 | Inventário dinâmico e expansível (sem limite fixo) | Alta |
| RF-05 | Puzzle principal: sintetizar antídoto com sequência de reagentes coletados de múltiplos ambientes | Alta |
| RF-06 | Puzzle secundário: decifrar código do cofre de reagentes (depósito) | Alta |
| RF-07 | Narrativa coesa: cada pista é um dado científico que faz sentido no contexto | Alta |
| RF-08 | Gate 1: câmara de contenção requer crachá nível 3 | Alta |
| RF-09 | Gate 2: depósito requer desligamento do alarme (ação no lab principal) | Alta |
| RF-10 | Cenário renderizado em Canvas com assets visuais científicos | Alta |
| RF-11 | Animações ambientais (telas piscando, vapor, luzes de alerta) | Média |
| RF-12 | Timer visual opcional (pressão narrativa, sem game over real) | Baixa |
| RF-13 | Tela de sucesso com tempo e link lobby/próxima sala | Alta |
| RF-14 | Feedback visual em objetos interativos (glow ao hover) | Média |
| RF-15 | Pistas cross-ambiente: reagente A no depósito, fórmula no lab, ativação na contenção | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Renderização 100% em Canvas 2D |
| RNF-02 | Responsivo 360px a 1920px |
| RNF-03 | Zero dependências externas |
| RNF-04 | 60fps no game loop |
| RNF-05 | Carregamento < 1s |

---

## Puzzle Redesenhado

**Antes (POC):** Quadro branco explicita o mapa (Frio=Azul, Calor=Vermelho, Crescimento=Verde) → ordem direta.

**Depois (Revitalizado):**
1. No Lab principal: computador mostra fórmula molecular parcial e temperatura de reação
2. No Depósito: rótulos dos reagentes com propriedades (ponto de ebulição, cor, pH)
3. Na Contenção: painel de purificação exige sequência precisa de 4 reagentes
4. O jogador precisa **cruzar dados científicos** de múltiplos ambientes para deduzir a sequência correta (ex: reagente com pH ácido → reagente a 37°C → catalisador → base neutralizante)

A dificuldade está na **interpretação dos dados**, não na leitura direta da resposta.
