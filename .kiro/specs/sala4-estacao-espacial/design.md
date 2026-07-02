# Sala 4 — Design Técnico

## Sistema de Múltiplos Ambientes

### Estrutura dos Ambientes

```
┌─────────────────────────────────────────────────────┐
│                  ESTAÇÃO ESPACIAL                     │
│                                                       │
│  ┌───────────┐    ┌───────────┐    ┌───────────┐    │
│  │  Módulo   │───▶│  Módulo   │───▶│  Módulo   │    │
│  │  Comando  │◀───│  Energia  │◀───│  Cápsula  │    │
│  └───────────┘    └───────────┘    └───────────┘    │
│       │                │                │            │
│   Pistas A         Pistas B        Puzzle Final     │
│   (códigos)        (fusíveis)      (sequência de    │
│                                     ignição)         │
└─────────────────────────────────────────────────────┘
```

### Mecânica de Navegação
- Todos os ambientes renderizados no mesmo Canvas
- Apenas um ambiente visível por vez (troca de estado de render)
- Transição via fade (alpha interpolation, 300-500ms)
- Inventário e estado persistentes entre ambientes
- Caixa de mensagens contextual por ambiente

### Implementação Técnica

```javascript
// Ambientes como estados de render
const ambientes = ['comando', 'energia', 'capsula'];
let ambienteAtual = 'comando';

function trocarAmbiente(destino) {
  if (!podeAcessar(destino)) {
    msg('Acesso bloqueado. Você precisa de algo...');
    return;
  }
  fadeOut(() => {
    ambienteAtual = destino;
    fadeIn();
  });
  msg(mensagemInicial[destino]);
}

// Inventário dinâmico
function addInventory(id, emoji, label) {
  if (state.inventory.find(i => i.id === id)) return;
  state.inventory.push({ id, emoji, label });
  renderInventory();
}

function renderInventory() {
  const container = document.getElementById('inventory');
  container.innerHTML = '';
  state.inventory.forEach(item => {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot filled';
    slot.textContent = item.emoji;
    slot.title = item.label;
    container.appendChild(slot);
  });
}
```

---

## Ambientes Detalhados

### Ambiente 1: Módulo de Comando

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Terminal quebrado | Click | Exibe fragmento de código de acesso |
| Mapa da estação | Click | Revela layout dos módulos |
| Cadeira do capitão | Click | Embaixo há um cartão de acesso |
| Janela espacial | Click | Mostra a estrela mais próxima (pista visual) |
| Porta → Energia | Click | Transição para Módulo de Energia (requer cartão) |

### Ambiente 2: Módulo de Energia

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Painel de fusíveis | Click | Puzzle de encaixe (precisa de fusível) |
| Gerador avariado | Click | Pista sobre sequência de ativação |
| Armário técnico | Click | Contém fusível sobressalente |
| Duto de ventilação | Click | Bilhete escondido com código parcial |
| Porta → Comando | Click | Volta ao Módulo de Comando |
| Porta → Cápsula | Click | Requer energia restaurada |

### Ambiente 3: Módulo da Cápsula (Saída)

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Painel de ignição | Click | Puzzle final — sequência de ignição |
| Visor da cápsula | Click | Mostra rota de fuga (pista) |
| Manual de emergência | Click | Dica sobre ordem de ativação |
| Porta → Energia | Click | Volta ao Módulo de Energia |

---

## Progressão e Gates

```
1. Jogador começa no Módulo de Comando
2. Coleta cartão de acesso + pistas do código
3. Usa cartão para acessar Módulo de Energia
4. No Módulo de Energia, encontra fusível e restaura energia
5. Com energia restaurada, acessa Módulo da Cápsula
6. No Módulo da Cápsula, usa todas as pistas coletadas para resolver
   a sequência de ignição (puzzle final)
7. Escape!
```

---

## Interface de Navegação

```
┌──────────────────────────────────────────────┐
│  [Comando]  [Energia]  [Cápsula]   ← tabs   │
│  (ativo)    (🔒)       (🔒)                  │
├──────────────────────────────────────────────┤
│                                              │
│         Canvas (900x600)                     │
│         Cenário + objetos do ambiente atual  │
│                                              │
├──────────────────────────────────────────────┤
│  Mensagem narrativa                          │
├──────────────────────────────────────────────┤
│  [ 🗝️ ] [ 🔌 ] [ 📝 ] [ ⚡ ] [ ... ]  ← inventário dinâmico │
└──────────────────────────────────────────────┘
```

- Abas no topo: ambientes disponíveis (🔒 = bloqueado)
- Ambiente ativo destacado visualmente
- Inventário cresce horizontalmente (flex-wrap ou overflow-x)
