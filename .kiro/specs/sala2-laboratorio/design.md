# Sala 2 — Design Técnico (Revitalização)

## Ambientes

### Ambiente 1: Laboratório Principal

```
┌─────────────────────────────────────────────────┐
│  Laboratório Helix — Área Principal              │
│                                                   │
│  ┌────────────┐    ┌──────────────────────┐     │
│  │ Computador │    │ Quadro de monitoram. │     │
│  │  central   │    │ (gráficos, alertas)  │     │
│  └────────────┘    └──────────────────────┘     │
│                                                   │
│  ┌─────────┐  ┌──────────┐  ┌──────────────┐   │
│  │Microscóp│  │Centrífuga│  │Painel alarme │   │
│  └─────────┘  └──────────┘  └──────────────┘   │
│                                                   │
│  📋 Clipboard    🚪 Contenção(🔒)  🚪 Depósito(🔒) │
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Computador central | Click | Mostra fórmula parcial + log de último experimento |
| Quadro de monitoramento | Click | Gráficos de temperatura e alertas de vazamento |
| Microscópio | Click | Amostra revela estrutura molecular (pista visual) |
| Centrífuga | Click | Contém amostra separada — revela propriedade de um reagente |
| Painel de alarme | Click | Permite desligar alarme (gate para Depósito) — precisa de código |
| Clipboard (bancada) | Click | Protocolo de segurança com crachá nível 3 escondido atrás |
| Porta → Contenção | Click | Requer crachá nível 3 |
| Porta → Depósito | Click | Requer alarme desligado |

### Ambiente 2: Câmara de Contenção

```
┌─────────────────────────────────────────────────┐
│  Câmara de Contenção — Nível BSL-3              │
│                                                   │
│  ┌──────────────────────────────────────┐       │
│  │  Painel de Purificação               │       │
│  │  [ _ ] → [ _ ] → [ _ ] → [ _ ]      │       │
│  │  (sequência de 4 reagentes)          │       │
│  └──────────────────────────────────────┘       │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Visor de │  │ Manual   │  │ Tubos de │     │
│  │ contenção│  │ protoc.  │  │ exaustão │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                   │
│  🔙 Voltar ao Lab                                │
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Painel de purificação | Click | Puzzle final — selecionar 4 reagentes em ordem |
| Visor de contenção | Click | Mostra amostra contaminada (pista sobre o que neutralizar) |
| Manual de protocolos | Click | Indica ordem de operação: "ácido antes de base, catalisador no meio" |
| Tubos de exaustão | Click | Indicam temperatura máxima tolerada pelo sistema |
| Voltar | Click | Retorna ao Lab principal |

### Ambiente 3: Depósito de Reagentes

```
┌─────────────────────────────────────────────────┐
│  Depósito de Reagentes — Sala Refrigerada        │
│                                                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  │ R-01 │ │ R-02 │ │ R-03 │ │ R-04 │ │ R-05 │ │
│  │ azul │ │verm. │ │verde │ │amar. │ │roxo  │ │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ │
│                                                   │
│  ┌────────────────┐    ┌──────────────────┐     │
│  │  Refrigerador  │    │ Cofre de subst.  │     │
│  │  de amostras   │    │ controladas 🔒   │     │
│  └────────────────┘    └──────────────────┘     │
│                                                   │
│  📊 Tabela periódica   🔙 Voltar ao Lab         │
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Reagente R-01 (azul) | Click | Rótulo: "NaCl-X, pH 2.1, ponto ebulição 78°C" |
| Reagente R-02 (vermelho) | Click | Rótulo: "FeO-7, pH 7.0, catalisador orgânico" |
| Reagente R-03 (verde) | Click | Rótulo: "CaB-3, pH 12.4, base forte" |
| Reagente R-04 (amarelo) | Click | Rótulo: "H2S-9, pH 4.5, temp. reação 37°C" |
| Reagente R-05 (roxo) | Click | Rótulo: "KMn-4, oxidante, incompatível com ácidos" |
| Refrigerador | Click | Contém amostra especial (necessária para puzzle) |
| Cofre controlado | Click | Código numérico — contém reagente raro |
| Tabela periódica | Click | Destaca elementos relevantes (pista visual) |
| Voltar | Click | Retorna ao Lab principal |

---

## Progressão

```
1. Jogador começa no Laboratório Principal
2. Explora computador, microscópio, centrífuga → coleta dados científicos
3. Encontra crachá nível 3 → desbloqueia Câmara de Contenção
4. Desliga alarme com código (obtido das telas) → desbloqueia Depósito
5. No Depósito: lê rótulos dos reagentes, abre cofre (puzzle secundário)
6. Na Contenção: usa dados de TODOS os ambientes para montar sequência
7. Painel de purificação aceita sequência correta → portas desbloqueiam
8. Escape!
```

---

## Assets Necessários

### Cenários (Canvas backgrounds)
- `lab_principal_bg.png` — Lab com bancadas, telas verdes, luzes de emergência
- `camara_contencao_bg.png` — Sala estéril, paredes de vidro, iluminação UV azulada
- `deposito_bg.png` — Sala fria, prateleiras metálicas, vapor condensado

### Objetos interativos
- Computador com tela (dados/gráficos)
- Microscópio com lente
- Centrífuga (tampa transparente)
- Painel de alarme (luzes vermelhas)
- Frascos de reagente (5 cores)
- Painel de purificação (4 slots)
- Refrigerador industrial
- Cofre de substâncias
- Manual de protocolos

### Animações
- Luzes de alerta pulsando (vermelho)
- Telas com dados scrollando
- Vapor/condensação no depósito
- Líquidos borbulhando nos tubos

### UI
- Painel de purificação (drag ou select de 4 reagentes)
- Painel do cofre (código numérico)
- Indicador de ambientes (tabs: Lab | Contenção | Depósito)

---

## Interface

```
┌──────────────────────────────────────────────────┐
│  [Lab Principal]  [Contenção 🔒]  [Depósito 🔒] │
├──────────────────────────────────────────────────┤
│                                                    │
│         Canvas (900x600)                           │
│         Cenário + objetos + animações              │
│                                                    │
├──────────────────────────────────────────────────┤
│  ⚠️ Mensagem narrativa / dados científicos        │
├──────────────────────────────────────────────────┤
│  [ items... ]                   ← inventário      │
└──────────────────────────────────────────────────┘
```
