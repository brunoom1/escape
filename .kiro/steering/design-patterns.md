---
inclusion: fileMatch
fileMatchPattern: "**/*.html,**/*.css,**/*.js"
---

# Padrões de Design — Escape Room

## Padrão Visual
- **Tema escuro** — fundo #0a0a0a a #1a1a2e
- **Cor de acento** — amarelo #ffcc00 (interações, destaques)
- **Cor de sucesso** — verde #00ff88
- **Fonte** — `Courier New`, monospace
- **Objetos interativos** — feedback visual claro (glow, escala)

## Arquitetura Canvas (Sala 4+)
```javascript
// Game loop padrão
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderAmbiente(ambienteAtual);
  renderObjetos(ambienteAtual);
  renderUI();
  requestAnimationFrame(gameLoop);
}
```

## Mecânicas Obrigatórias
1. **Objetos clicáveis** — Hit detection via bounding box no Canvas
2. **Estado do jogo** — Objeto `state` em JS com flags de progressão
3. **Inventário dinâmico** — Sem limite fixo, cresce com itens coletados
4. **Caixa de mensagens** — Texto narrativo atualizado a cada interação
5. **Cronômetro** — `Date.now()` para medir tempo de resolução
6. **Tela de sucesso** — Overlay com tempo + link lobby

## Padrão de Hit Detection
```javascript
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
```

## Especificações de Assets
| Propriedade | Valor |
|-------------|-------|
| Canvas lógico | 900x600px |
| Formato imagens | PNG com transparência |
| Ícones inventário | 48x48px |
| Peso máximo/asset | < 200KB |
| Paleta | Escuros + acentos (#ffcc00, #00ff88) |

## Requisitos Não-Funcionais
- 60fps no game loop
- Responsivo 360px a 1920px
- Sem dependências externas
- Carregamento < 1s
- Funciona como arquivos estáticos (sem servidor)

## Lib Compartilhada (`lib/`) e UI Kit (`ui-kit/`)

### lib/ — Engine e Lógica
Todo código reutilizável de engine/gameplay entre salas está em `lib/`. Salas importam apenas os módulos necessários.

### ui-kit/ — Interface Whitelabel
Todos os componentes de **interface** (não de jogo) estão em `ui-kit/`. Componentes usam design tokens e são personalizáveis via temas.

- **Identidade visual da marca** — tokens base garantem consistência entre salas
- **Whitelabel** — cada sala aplica um tema que sobrescreve tokens visuais
- Componentes: inventário, tabs, message-box, overlays, botões, tooltips, panels

### Princípios SOLID (obrigatório em ambos)
- **Nunca modificar** APIs públicas de módulos já em uso por salas existentes
- **Sempre estender** via novos módulos, novas funções ou composição
- Cada módulo tem responsabilidade única
- Salas antigas nunca quebram por atualizações

### Módulos `lib/`
```
lib/engine.js       — Game loop, Canvas, resize
lib/input.js        — Hit detection, hover
lib/state.js        — State management
lib/inventory.js    — Lógica de inventário (dados)
lib/transitions.js  — Fade, ambiente switching
lib/assets.js       — Asset preloader
lib/timer.js        — Cronômetro
lib/particles.js    — Partículas procedurais
lib/events.js       — Pub/sub entre módulos
```

### Módulos `ui-kit/`
```
ui-kit/tokens.js              — Design tokens base (cores, fontes, espaçamentos)
ui-kit/themes/default.js      — Tema padrão da marca
ui-kit/themes/[tema].js       — Temas por sala (sci-fi, noir, gothic, lab)
ui-kit/components/inventory.js   — Renderização do inventário
ui-kit/components/tabs.js        — Tabs de navegação
ui-kit/components/message-box.js — Caixa de mensagens
ui-kit/components/panel.js       — Painéis modais
ui-kit/components/button.js      — Botões
ui-kit/components/success-overlay.js — Tela de vitória
```

### Regras de decisão
| Pergunta | Resposta |
|----------|----------|
| É lógica de jogo (engine, state, input)? | → `lib/` |
| É componente visual de interface genérico? | → `ui-kit/` |
| É específico de UMA sala (puzzle, altar)? | → código da sala |
| Outro jogo de escape poderia usar com outro tema? | → `ui-kit/` |


## Regra Anti-Spoiler (OBRIGATÓRIA em todas as salas)

> **NENHUMA pista, texto, item de inventário ou interação pode conter a solução completa de um puzzle.**
> O jogador SEMPRE deve precisar de dedução, interpretação ou cruzamento de pelo menos 2 pistas de fontes diferentes.

### Critérios de validação para CADA pista criada:
1. Se ler APENAS esta pista, resolve o puzzle? → **PROIBIDO**
2. Precisa combinar com outra fonte? → OK
3. A resposta está escrita literalmente? → **PROIBIDO**
4. Existe ambiguidade que exige raciocínio? → OK

### Labels de inventário:
- NUNCA conter a resposta (ex: ❌ "Código: 0847" / ✅ "Nota: formato 4 dígitos")

### Regra de mínimo:
- Todo puzzle principal deve exigir **mínimo 2 pistas de ambientes/objetos diferentes** para ser resolvido
- Nenhuma pista isolada pode revelar mais de 50% da solução
