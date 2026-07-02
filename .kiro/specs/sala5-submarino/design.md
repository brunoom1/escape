# Sala 5 — Design Técnico

## Ambientes

### Ambiente 1: Compartimento de Proa

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Periscópio | Click | Mostra superfície — "profundidade: 340m. Escotilha no módulo de máquinas" |
| Mesa de navegação | Click | Carta náutica com frequência de emergência: "Canal 7" marcado |
| Armário de suprimentos | Click | Chave de manutenção (gate para máquinas) + lanterna |
| Manual de emergência | Click | "Válvulas: ativar na ordem de PRESSÃO CRESCENTE para evitar ruptura" |
| Painel de comunicação | Click | Rádio morto — mostra que "Canal 7 = frequência 147.3 MHz" |
| Escotilha → Máquinas | Click | Requer chave de manutenção |

### Ambiente 2: Sala de Máquinas

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Válvula Vermelha | Click | Manômetro: 45 PSI |
| Válvula Azul | Click | Manômetro: 12 PSI |
| Válvula Amarela | Click | Manômetro: 78 PSI |
| Painel do gerador | Click | Puzzle: selecionar ordem das 3 válvulas |
| Rádio de emergência | Click | Exige frequência (147.3) — confirma resgate a caminho |
| Escotilha de fuga | Click | Trancada até gerador religar |
| Voltar à Proa | Click | Transição |

## Progressão

```
1. Jogador na Proa — água visualmente subindo
2. Explora: manual (ordem por pressão), mesa (frequência), painel (canal 7 = 147.3)
3. Armário: pega chave → desbloqueia Máquinas
4. Nas Máquinas: lê manômetros (12, 45, 78 PSI)
5. Painel do gerador: ordena válvulas por pressão crescente → Azul(12) → Vermelha(45) → Amarela(78)
6. Gerador liga → escotilha desbloqueia
7. Opcional: insere frequência no rádio → confirmação narrativa
8. Escotilha → Escape!
```

## Indicador de Água

```javascript
// Nível de água visual (não afeta gameplay)
let waterLevel = 0; // 0 a 200px (máx visual)
const WATER_RATE = 0.3; // pixels por segundo

// No game loop:
waterLevel = Math.min(200, waterLevel + WATER_RATE * dt);
ctx.fillStyle = 'rgba(20, 60, 120, 0.4)';
ctx.fillRect(0, 600 - waterLevel, 900, waterLevel);
```

## Interface

```
┌──────────────────────────────────────────────┐
│  [Proa]  [Máquinas 🔒]              ← tabs  │
├──────────────────────────────────────────────┤
│         Canvas (900x600)                     │
│         Cenário + água subindo               │
├──────────────────────────────────────────────┤
│  Mensagem narrativa                          │
├──────────────────────────────────────────────┤
│  [ items... ]                ← inventário    │
└──────────────────────────────────────────────┘
```

## Tema Visual
- Paleta: azul marinho (#0a1628), metálico (#3a5a7a), ferrugem (#8b4513)
- Efeito: água transparente subindo, bolhas, condensação
- Som visual: "gotas" como partículas caindo
