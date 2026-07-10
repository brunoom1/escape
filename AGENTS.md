# Projeto Escape Room — Instruções Gerais

Este é um projeto de jogos de escape room baseados em navegador.

## Stack e Regras Fundamentais
- HTML5, CSS3, JavaScript vanilla — ZERO frameworks, ZERO bundlers, ZERO dependências externas
- Cada sala fica em seu próprio diretório com `index.html` como arquivo principal
- Renderização via **HTML5 Canvas 2D** com game loop (`requestAnimationFrame`)
- Lobby em `index.html` na raiz com cards para cada sala
- Responsividade: Canvas escala mantendo aspect ratio (900x600 lógico)
- **Código reutilizável centralizado em `lib/`** — nunca duplicar lógica entre salas
- **Princípios SOLID na lib** — nunca alterar APIs em uso, apenas estender
- **UI Kit whitelabel em `ui-kit/`** — componentes de interface compartilhados com identidade visual da marca, personalizáveis via temas por sala

## Estrutura do Projeto
```
escape-room/
├── .opencode/              ← Configurações opencode (agents)
├── .kiro/                  ← Configurações Kiro (steering, agents, specs)
├── lib/                    ← Lib compartilhada — engine, lógica de jogo (SOLID)
├── ui-kit/                 ← Componentes UX whitelabel — interface compartilhada
│   ├── components/         ← Inventário, tabs, painéis, botões, etc.
│   ├── themes/             ← Temas personalizáveis por sala
│   └── tokens.js           ← Design tokens base da marca
├── assets/thumbnails/      ← Thumbnails dos jogos para o site principal
├── index.html              ← Site principal (lobby/vitrine dos jogos)
├── style.css               ← Estilos globais (lobby, componentes comuns)
├── sala1/index.html        ← Sala 1: O Escritório do Detetive
├── sala2/index.html        ← Sala 2: O Laboratório de Virologia
├── sala3/index.html        ← Sala 3: A Mansão dos Blackwood
└── escape4/index.html      ← Sala 4: Estação Espacial (em dev)
```

## Equipe de Agentes
O desenvolvimento é conduzido por agentes especializados:
- **Gerente de Projeto** — Orquestra tarefas e ciclos de feedback
- **Spec Designer** — Cria especificações completas de novas salas a partir de ideias
- **Roteirista** — Cria narrativa coesa para cada sala
- **Design Gráfico** — Cria assets visuais para Canvas
- **Frontend (Canvas/JS)** — Implementa o jogo (lib + ui-kit + sala)
- **Webmaster** — Cria e atualiza o site principal (lobby) com cards de cada jogo
- **Especialista UX** — Valida interface e usabilidade
- **Jogador Profissional** — Testa gameplay e encontra bugs
- **DevOps** — Commits, versionamento e publicação via Git

## Fluxo de Trabalho
```
Ideia (ou invenção) → Spec Designer (spec completa: requirements + design + tasks)
  → Gerente lê spec → Roteirista (narrativa) → Design (assets + thumbnail)
  → Frontend (implementação) → UX + Jogador (validação)
  → Webmaster (atualiza site principal com novo card)
  → Correções se necessário → Aprovado
```

## Regras de Operação da Equipe

1. **Nenhum agente se comunica diretamente com outro** — tudo passa pelo Gerente
2. **Toda entrega deve ser validada** antes de ser passada adiante
3. **Feedback negativo gera tarefa de correção**, nunca retrabalho sem registro
4. **Máximo 3 ciclos de correção** por item antes de revisão de escopo
5. **O Roteirista tem autoridade final** sobre decisões narrativas
6. **O UX tem autoridade final** sobre decisões de interface
7. **O Gerente tem autoridade final** sobre priorização e prazos

## Dependências
```
Narrativa → Assets → Implementação → Validação → Correção (se necessário)
```
- Nunca enviar tarefa ao Frontend sem assets do Design
- Nunca enviar build para teste sem textos do Roteirista

---

## Padrões de Design

### Padrão Visual
- **Tema escuro** — fundo #0a0a0a a #1a1a2e
- **Cor de acento** — amarelo #ffcc00 (interações, destaques)
- **Cor de sucesso** — verde #00ff88
- **Fonte** — `Courier New`, monospace
- **Objetos interativos** — feedback visual claro (glow, escala)

### Arquitetura Canvas (Sala 4+)
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

### Mecânicas Obrigatórias
1. **Objetos clicáveis** — Hit detection via bounding box no Canvas
2. **Estado do jogo** — Objeto `state` em JS com flags de progressão
3. **Inventário dinâmico** — Sem limite fixo, cresce com itens coletados
4. **Caixa de mensagens** — Texto narrativo atualizado a cada interação
5. **Cronômetro** — `Date.now()` para medir tempo de resolução
6. **Tela de sucesso** — Overlay com tempo + link lobby

### Especificações de Assets
| Propriedade | Valor |
|-------------|-------|
| Canvas lógico | 900x600px |
| Formato imagens | PNG com transparência |
| Ícones inventário | 48x48px |
| Peso máximo/asset | < 200KB |
| Paleta | Escuros + acentos (#ffcc00, #00ff88) |

### Requisitos Não-Funcionais
- 60fps no game loop
- Responsivo 360px a 1920px
- Sem dependências externas
- Carregamento < 1s
- Funciona como arquivos estáticos (sem servidor)

---

## Lib Compartilhada (`lib/`) e UI Kit (`ui-kit/`)

### lib/ — Engine e Lógica
Todo código reutilizável de engine/gameplay entre salas está em `lib/`. Salas importam apenas os módulos necessários.

### ui-kit/ — Interface Whitelabel
Todos os componentes de **interface** (não de jogo) estão em `ui-kit/`. Componentes usam design tokens e são personalizáveis via temas.

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

---

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

---

## Lições Aprendidas — Erros Comuns e Como Evitá-los

### 1. Hit Areas Desalinhadas com Render Visual
> Sempre que um objeto é desenhado no render (ex: `fillRect(x, y, w, h)`), o hit area no index.html DEVE usar EXATAMENTE os mesmos valores `{x, y, w, h}`.

**Processo obrigatório:**
1. Designer define posição visual no render.js: `ctx.fillRect(620, 80, 110, 100)` (cofre)
2. Frontend copia EXATAMENTE para o objeto: `{ id: 'cofre', x: 620, y: 80, w: 110, h: 100 }`
3. Se o Designer mover um objeto, o Frontend DEVE atualizar o hit area na mesma entrega
4. Nunca entregar render.js sem uma tabela de posições para o Frontend

### 2. Math.random() Dentro do Game Loop
> NUNCA usar `Math.random()` dentro de funções de render que rodam no game loop. Valores aleatórios devem ser pré-calculados UMA vez e reutilizados.

### 3. Tag `<script>` Faltante
> Após qualquer refatoração que mova scripts, SEMPRE verificar que todos os `<script src="..."></script>` estão fechados e o bloco de script inline tem `<script>` antes e `</script>` depois.

### 4. Parâmetro Faltante na Chamada de Função
> Quando uma função é extraída para arquivo externo (render.js), VERIFICAR que todas as chamadas passam os mesmos parâmetros que a assinatura exige.

### 5. Regra Anti-Spoiler nos Labels de Inventário
> Labels de inventário são VISÍVEIS ao jogador (via inspeção). Eles NUNCA podem conter a resposta do puzzle.

### 6. Posição Visual vs Narrativa Inconsistente
> Todo objeto que é REFERENCIADO por texto narrativo DEVE estar visualmente na posição que o texto descreve.

### 7. Funções de Render Duplicadas
> Ao extrair código para arquivo externo: criar o arquivo externo, adicionar `<script src="arquivo.js">`, REMOVER completamente as funções inline equivalentes, testar que não há redeclaração no console.
