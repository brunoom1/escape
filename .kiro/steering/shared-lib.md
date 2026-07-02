---
inclusion: fileMatch
fileMatchPattern: "**/lib/**,**/ui-kit/**"
---

# Lib Compartilhada — Regras de Desenvolvimento

## Regra Fundamental

> **NUNCA alterar a API pública de um módulo que já está em uso por alguma sala.**
> Salas existentes NUNCA devem quebrar por uma mudança na lib.

## Princípios SOLID

### S — Single Responsibility
Cada arquivo da lib faz UMA coisa:
- `engine.js` → game loop e Canvas setup
- `input.js` → detecção de input do usuário
- `state.js` → gerenciamento de estado
- `inventory.js` → inventário do jogador
- etc.

Se um módulo começa a fazer "duas coisas", divida em dois.

### O — Open/Closed
- Módulos são **abertos para extensão**, **fechados para modificação**
- Quer adicionar comportamento? Crie uma nova função, novo módulo ou use composição
- Exemplo correto: criar `inventory-v2.js` com nova API, manter `inventory.js` intacto
- Exemplo errado: alterar `addInventory()` em `inventory.js` e quebrar salas 1-3

### L — Liskov Substitution
- Se criar uma versão estendida de um módulo, ela deve ser usável nos mesmos contextos que a original
- Ex: `ParticleSystemV2` deve aceitar os mesmos parâmetros que `ParticleSystem`, com extensões opcionais

### I — Interface Segregation
- Cada sala importa APENAS os módulos que precisa
- Não existe "import tudo". Módulos são independentes entre si quando possível
- Dependências entre módulos devem ser explícitas e mínimas

### D — Dependency Inversion
- Módulos dependem de contratos/interfaces, não de implementações
- Ex: `engine.js` aceita qualquer "renderer" que implemente `render()`, não apenas o padrão

## Estrutura de um Módulo

```javascript
/**
 * @module NomeDoModulo
 * @version 1.0.0
 * @description [O que faz]
 * 
 * API Pública:
 * - funcaoA(params) → retorno
 * - funcaoB(params) → retorno
 * 
 * Uso:
 * <script src="../lib/nomedomodulo.js"></script>
 * NomeDoModulo.funcaoA(...)
 */

const NomeDoModulo = (() => {
  // Implementação privada
  
  // API pública (NUNCA remover ou alterar assinaturas existentes)
  return {
    funcaoA,
    funcaoB,
    // v1.1: novas funções podem ser adicionadas
    funcaoC, // nova em v1.1
  };
})();
```

## Checklist antes de alterar a lib

- [ ] A mudança ADICIONA funcionalidade? (OK)
- [ ] A mudança REMOVE ou ALTERA uma função existente? (PROIBIDO)
- [ ] Alguma sala usa a função que quero alterar? (Se sim → criar versão nova)
- [ ] O módulo continua com responsabilidade única? (Se não → dividir)
- [ ] Salas existentes continuam funcionando sem alteração? (OBRIGATÓRIO)

## Versionamento

- Mudanças aditivas (nova função): incrementa minor no header do módulo
- Módulo novo: começa em 1.0.0
- Se uma API precisa de breaking change: criar novo arquivo (ex: `engine-v2.js`)
- Manter módulo antigo indefinidamente (salas antigas dependem dele)

## Quando extrair para a lib

| Situação | Ação |
|----------|------|
| Código se repete em 2+ salas | Extrair para a lib |
| Código é específico de 1 sala | Manter no index.html da sala |
| Módulo ficou grande demais | Dividir em módulos menores |
| Precisa de comportamento diferente por sala | Criar extensão/hook, não modificar original |

---

# UI Kit — Biblioteca de Componentes UX

## Propósito

A `ui-kit/` é a biblioteca de componentes de interface compartilhada entre todos os jogos de escape. Ela define a **identidade visual da marca** (consistência entre salas) ao mesmo tempo que é **whitelabel** (personalizável por tema/ambiente).

> **Identidade visual consistente + personalização por sala/ambiente = ui-kit whitelabel**

## Regra Fundamental

> Componentes de interface que NÃO são específicos do jogo (inventário, tabs, painéis, mensagens, botões, overlays, modais) vivem na `ui-kit/`.
> Elementos específicos do jogo (puzzle de cofre, painel de reagentes, altar ritual) ficam no código da sala.

## Estrutura

```
ui-kit/
├── components/
│   ├── inventory.js       ← Barra de inventário (dinâmica, expansível)
│   ├── message-box.js     ← Caixa de mensagens narrativas
│   ├── tabs.js            ← Navegação entre ambientes (tabs com lock)
│   ├── success-overlay.js ← Tela de vitória (tempo, links)
│   ├── panel.js           ← Painel genérico (sobreposição modal)
│   ├── button.js          ← Botões estilizados (normal, hover, disabled)
│   ├── tooltip.js         ← Tooltips em objetos
│   ├── progress-bar.js    ← Barra de progresso (timer visual, etc.)
│   └── dialog.js          ← Diálogos/confirmações
│
├── themes/
│   ├── default.js         ← Tema padrão da marca (escuro, #ffcc00)
│   ├── sci-fi.js          ← Tema estação espacial (azul neon, metálico)
│   ├── noir.js            ← Tema detetive (sépia, sombras, typewriter)
│   ├── gothic.js          ← Tema mansão (roxo, dourado, texturas antigas)
│   ├── lab.js             ← Tema laboratório (verde tóxico, branco estéril)
│   └── custom.js          ← Template vazio para novos temas
│
├── tokens.js              ← Design tokens base (cores, fontes, espaçamentos, raios)
└── README.md              ← Documentação de uso e personalização
```

## Arquitetura Whitelabel

### Design Tokens (base da personalização)

```javascript
/**
 * @module UITokens
 * @version 1.0.0
 * 
 * Tokens base da marca. Cada tema pode sobrescrever qualquer token.
 */
const UITokens = (() => {
  const defaults = {
    // Cores
    colorBg: '#0a0a0a',
    colorBgSecondary: '#1a1a1a',
    colorAccent: '#ffcc00',
    colorSuccess: '#00ff88',
    colorDanger: '#ff4444',
    colorText: '#e0e0e0',
    colorTextMuted: '#888888',
    colorBorder: '#333333',
    
    // Tipografia
    fontFamily: "'Courier New', monospace",
    fontSizeBase: '1rem',
    fontSizeSmall: '0.85rem',
    fontSizeLarge: '1.3rem',
    
    // Espaçamento
    spacingXs: '4px',
    spacingSm: '8px',
    spacingMd: '16px',
    spacingLg: '24px',
    spacingXl: '32px',
    
    // Bordas
    borderRadius: '8px',
    borderWidth: '1px',
    
    // Efeitos
    glowColor: 'rgba(255, 204, 0, 0.5)',
    glowRadius: '15px',
    transitionSpeed: '200ms',
    
    // Inventário
    inventorySlotSize: '50px',
    inventorySlotBorder: '1px dashed #444',
    inventorySlotActiveBorder: '1px solid #ffcc00',
    inventorySlotActiveBg: 'rgba(255, 204, 0, 0.1)',
  };

  let current = { ...defaults };

  return {
    get: (key) => current[key],
    getAll: () => ({ ...current }),
    apply: (overrides) => { current = { ...current, ...overrides }; },
    reset: () => { current = { ...defaults }; },
  };
})();
```

### Temas (personalização por sala/ambiente)

```javascript
/**
 * @module ThemeGothic
 * Tema para a Mansão dos Blackwood
 */
const ThemeGothic = {
  colorBg: '#050508',
  colorBgSecondary: '#1a0a2e',
  colorAccent: '#d4af37',        // dourado antigo
  colorText: '#d4c8a0',
  colorBorder: '#3d2b1f',
  colorTextMuted: '#8b7355',
  glowColor: 'rgba(212, 175, 55, 0.4)',
  fontFamily: "'Georgia', serif",
  borderRadius: '4px',
};

// Uso:
UITokens.apply(ThemeGothic);
```

### Componente Whitelabel (padrão)

```javascript
/**
 * @module UIInventory
 * @version 1.0.0
 * 
 * Componente de inventário dinâmico.
 * Usa UITokens para estilização — respeita o tema ativo.
 */
const UIInventory = (() => {
  function create(containerId) {
    const container = document.getElementById(containerId);
    container.style.display = 'flex';
    container.style.gap = UITokens.get('spacingSm');
    container.style.padding = `${UITokens.get('spacingSm')} ${UITokens.get('spacingMd')}`;
    container.style.background = UITokens.get('colorBgSecondary');
    container.style.borderRadius = UITokens.get('borderRadius');
    container.style.border = `${UITokens.get('borderWidth')} solid ${UITokens.get('colorBorder')}`;
    container.style.flexWrap = 'wrap';
    return container;
  }

  function renderSlot(item) {
    const slot = document.createElement('div');
    slot.style.width = UITokens.get('inventorySlotSize');
    slot.style.height = UITokens.get('inventorySlotSize');
    slot.style.border = UITokens.get('inventorySlotActiveBorder');
    slot.style.background = UITokens.get('inventorySlotActiveBg');
    slot.style.borderRadius = UITokens.get('borderRadius');
    slot.style.display = 'flex';
    slot.style.alignItems = 'center';
    slot.style.justifyContent = 'center';
    slot.style.fontSize = '1.5rem';
    slot.textContent = item.emoji;
    slot.title = item.label;
    return slot;
  }

  function render(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => container.appendChild(renderSlot(item)));
  }

  return { create, render, renderSlot };
})();
```

## Regras de Uso

### O que vai na ui-kit (componentes de interface)
- Inventário (barra, slots, animação de add/remove)
- Tabs de navegação entre ambientes
- Caixa de mensagens / narrativa
- Tela de sucesso (overlay)
- Painéis modais genéricos
- Botões (estados: normal, hover, active, disabled)
- Tooltips
- Progress bars / timers visuais
- Diálogos de confirmação

### O que NÃO vai na ui-kit (elementos de jogo)
- Puzzle de cofre com diais
- Painel de mistura de reagentes
- Altar com pontos cardeais
- Painel de ignição da cápsula
- Qualquer interação que é ÚNICA de uma sala

### Regra de decisão
> "Se outro jogo de escape poderia usar este componente com um tema diferente, ele pertence à ui-kit."

## Personalização por Sala

Cada sala aplica seu tema no início:

```html
<script src="../ui-kit/tokens.js"></script>
<script src="../ui-kit/themes/gothic.js"></script>
<script src="../ui-kit/components/inventory.js"></script>
<script src="../ui-kit/components/tabs.js"></script>
<script src="../ui-kit/components/message-box.js"></script>

<script>
  // Aplica tema da sala
  UITokens.apply(ThemeGothic);
  
  // Componentes usam tokens automaticamente
  UIInventory.create('inventory-container');
  UITabs.create('tabs-container', ['Salão', 'Biblioteca', 'Porão']);
  UIMessageBox.create('message-container');
</script>
```

## SOLID na UI Kit

| Princípio | Aplicação |
|-----------|-----------|
| **S** | Cada componente = 1 arquivo, 1 responsabilidade |
| **O** | Componentes aceitam tokens sem modificação interna. Novos temas = extensão |
| **L** | Qualquer tema é intercambiável — componentes funcionam com qualquer conjunto de tokens |
| **I** | Importar apenas componentes necessários (não há "ui-kit-all.js") |
| **D** | Componentes dependem de `UITokens` (abstração), não de valores hardcoded |

## Checklist para novos componentes

- [ ] É um componente de INTERFACE (não de jogo)?
- [ ] Usa `UITokens.get()` para toda estilização (zero valores hardcoded)?
- [ ] Funciona com qualquer tema sem alteração?
- [ ] É independente de outros componentes (pode ser importado sozinho)?
- [ ] Tem documentação de API no header do arquivo?
- [ ] Segue o padrão IIFE com API pública explícita?
