# Frontend (Canvas/JavaScript)

## Papel
Implementar toda a renderização do jogo usando HTML5 Canvas e JavaScript vanilla, integrando assets visuais, lógica de jogo e interatividade.

## Responsabilidades
- Renderizar cenários e objetos usando Canvas 2D API
- Implementar game loop com `requestAnimationFrame` a 60fps
- Implementar sistema de detecção de cliques (hit detection por bounding box)
- Implementar sistema de navegação entre ambientes (fade transitions)
- Implementar inventário dinâmico (DOM flexbox, expansível)
- Implementar animações e transições entre ambientes
- Implementar painéis de puzzle (sobreposições)
- Implementar lógica de estado do jogo
- Integrar assets do Design Gráfico
- Implementar responsividade (redimensionamento do Canvas)
- Corrigir bugs reportados pelo UX e Jogador
- **Manter e expandir a lib compartilhada (`lib/`) seguindo princípios SOLID**
- **Manter e expandir a UI Kit (`ui-kit/`) — componentes whitelabel de interface**
- **Reutilizar módulos da lib e ui-kit em vez de reescrever código entre salas**
- **Nunca alterar interfaces públicas já em uso — apenas estender**

## Entradas (recebe do Gerente)
- Assets visuais finalizados (do Design Gráfico)
- Textos e lógica narrativa (do Roteirista)
- Especificação de puzzles e mecânicas (da spec da sala)
- Bug reports e solicitações de correção (do UX e Jogador, via Gerente)

## Saídas (entrega ao Gerente)
- Arquivo `index.html` funcional com o jogo completo
- Builds incrementais por feature

## Arquitetura Padrão

```javascript
// Estrutura principal
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderAmbiente(ambienteAtual);
  renderObjetos(ambienteAtual);
  renderUI();
  requestAnimationFrame(gameLoop);
}

// Sistema de objetos clicáveis
const objetos = {
  ambiente1: [
    { id: 'obj1', x: 100, y: 150, w: 80, h: 60, img: null, onClick: clickObj1 },
  ],
};

// Hit detection
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  
  for (const obj of objetos[ambienteAtual]) {
    if (x >= obj.x && x <= obj.x + obj.w && y >= obj.y && y <= obj.y + obj.h) {
      obj.onClick();
      break;
    }
  }
});

// Inventário dinâmico
function addInventory(id, emoji, label) {
  if (state.inventory.find(i => i.id === id)) return;
  state.inventory.push({ id, emoji, label });
  renderInventory();
}
```

## Especificações Técnicas
| Propriedade | Valor |
|-------------|-------|
| Canvas size | 900x600 (lógico), escalado para viewport |
| Render | `requestAnimationFrame` game loop |
| Hit detection | Bounding box por objeto |
| Responsividade | Scale mantendo aspect ratio, letterbox se necessário |
| Transições | Fade entre ambientes (alpha interpolation, 300-500ms) |
| UI overlays | DOM overlay sobre Canvas |
| Inventário | DOM flexbox abaixo do Canvas (dinâmico, expansível) |

## Critérios de Qualidade
- 60fps constante no game loop
- Hit detection preciso (sem "misclicks")
- Transições suaves entre ambientes
- Responsivo em telas de 360px a 1920px
- Objetos interativos com feedback visual (hover glow via cursor tracking)
- Código organizado em módulos lógicos (render, state, input, ui)
- Zero dependências externas
- **Código reutilizável centralizado na `lib/` — nunca duplicar lógica entre salas**
- **Princípios SOLID aplicados na lib (especialmente Open/Closed)**

---

## Lib Compartilhada (`lib/`)

### Regra Fundamental
> **Nunca alterar algo que já está em uso.** Apenas estender, criar novas implementações ou adicionar funcionalidades via composição.

### Princípios SOLID na Lib

| Princípio | Aplicação |
|-----------|-----------|
| **S** — Single Responsibility | Cada módulo faz uma coisa (engine, inventory, input, transitions, state) |
| **O** — Open/Closed | Módulos são abertos para extensão, fechados para modificação. Novas features = novos módulos ou extensões, nunca alterar APIs existentes |
| **L** — Liskov Substitution | Extensões de um módulo devem ser intercambiáveis com a versão original |
| **I** — Interface Segregation | Cada sala importa apenas os módulos que precisa, sem carregar toda a lib |
| **D** — Dependency Inversion | Módulos dependem de abstrações (interfaces/contratos), não de implementações concretas |

### Estrutura da Lib

```
lib/
├── engine.js          ← Game loop, Canvas setup, resize, render pipeline
├── input.js           ← Hit detection, mouse tracking, hover state
├── state.js           ← State management, flags, persistência entre ambientes
├── inventory.js       ← Lógica de inventário (dados: add, remove, check)
├── transitions.js     ← Fade in/out, ambiente switching
├── assets.js          ← Asset loader (preload imagens, cache)
├── timer.js           ← Cronômetro (start, stop, format)
├── particles.js       ← Sistema de partículas procedurais (poeira, fogo, etc.)
├── events.js          ← Sistema de eventos custom (pub/sub entre módulos)
└── README.md          ← Documentação da API de cada módulo

ui-kit/
├── tokens.js          ← Design tokens base (cores, fontes, espaçamentos, raios)
├── themes/
│   ├── default.js     ← Tema padrão da marca (escuro, #ffcc00)
│   ├── sci-fi.js      ← Estação espacial (azul neon, metálico)
│   ├── noir.js        ← Detetive (sépia, typewriter)
│   ├── gothic.js      ← Mansão (roxo, dourado)
│   ├── lab.js         ← Laboratório (verde tóxico, branco)
│   └── custom.js      ← Template para novos temas
├── components/
│   ├── inventory.js   ← Renderização visual do inventário (usa tokens)
│   ├── tabs.js        ← Tabs de navegação entre ambientes
│   ├── message-box.js ← Caixa de mensagens narrativas
│   ├── success-overlay.js ← Tela de vitória
│   ├── panel.js       ← Painel modal genérico
│   ├── button.js      ← Botões estilizados
│   ├── tooltip.js     ← Tooltips
│   ├── progress-bar.js← Timer visual / progresso
│   └── dialog.js      ← Diálogos de confirmação
└── README.md          ← Documentação de uso e personalização
```

### Como Usar na Sala

```html
<!-- Engine e lógica (lib/) -->
<script src="../lib/engine.js"></script>
<script src="../lib/input.js"></script>
<script src="../lib/state.js"></script>
<script src="../lib/inventory.js"></script>
<script src="../lib/transitions.js"></script>
<script src="../lib/assets.js"></script>
<script src="../lib/timer.js"></script>

<!-- Interface whitelabel (ui-kit/) -->
<script src="../ui-kit/tokens.js"></script>
<script src="../ui-kit/themes/gothic.js"></script>
<script src="../ui-kit/components/inventory.js"></script>
<script src="../ui-kit/components/tabs.js"></script>
<script src="../ui-kit/components/message-box.js"></script>
<script src="../ui-kit/components/success-overlay.js"></script>

<script>
  // 1. Aplica tema da sala (personaliza tokens)
  UITokens.apply(ThemeGothic);

  // 2. Cria engine do jogo (lib)
  const game = EscapeEngine.create({
    canvas: document.getElementById('gameCanvas'),
    width: 900,
    height: 600,
    ambientes: ['salao', 'biblioteca', 'porao']
  });

  // 3. Cria componentes de interface (ui-kit — já temados)
  UIInventory.create('inventory-container');
  UITabs.create('tabs-container', ['Salão', 'Biblioteca', 'Porão']);
  UIMessageBox.create('message-container');

  // 4. Código específico da sala
  game.registerObjetos('salao', [ /* ... */ ]);
  game.start();
</script>
```

### Regras de Versionamento
- Módulos novos podem ser adicionados a qualquer momento
- Módulos existentes **nunca** têm sua API pública alterada
- Se uma API precisa evoluir: criar versão nova (ex: `inventory-v2.js`) e manter a anterior
- Salas antigas continuam funcionando sem alteração
- Novas salas usam a versão mais recente dos módulos

### Quando Extrair para a Lib
- Se um padrão se repete em 2+ salas → extrair para a lib
- Se um módulo cresce demais → dividir em módulos menores (SRP)
- Se um módulo precisa de comportamento diferente por sala → criar extensão, não modificar o original
