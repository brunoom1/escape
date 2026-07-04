# Especificacao do Projeto — Escape Room Platform

## 1. Visao Geral

Plataforma de jogos de escape room baseados em navegador, renderizados inteiramente em HTML5 Canvas 2D, sem frameworks ou dependencias externas. Cada sala e um jogo independente com narrativa propria, puzzles de deducao e multiplos ambientes navegaveis.

**URL de producao:** https://gabrielmendonca.com.br/escape  
**Repositorio:** https://github.com/brunoom1/escape  
**Branch principal:** master

---

## 2. Arquitetura do Projeto

```
escape-room/
├── .kiro/
│   ├── steering/          ← Regras globais (auto-incluidas no contexto)
│   ├── agents/            ← 9 agentes especializados
│   ├── specs/             ← Especificacoes por sala + este documento
│   └── hooks/             ← Hooks de automacao
├── lib/                   ← Biblioteca compartilhada (engine do jogo)
├── ui-kit/                ← Componentes de interface whitelabel
│   ├── tokens.js          ← Design tokens base
│   ├── themes/            ← Temas personalizaveis por sala
│   └── components/        ← Inventario, tabs, panels, mensagens, overlays
├── assets/thumbnails/     ← Thumbnails para o lobby
├── index.html             ← Lobby (vitrine dos jogos)
├── style.css              ← Estilos do lobby
├── sala1/                 ← Sala 1: Escritorio do Detetive
│   ├── index.html         ← Estrutura + logica do jogo
│   └── render.js          ← Renderizacao cinematografica (8 camadas)
├── sala2/                 ← Sala 2: Laboratorio Helix
├── sala3/                 ← Sala 3: Mansao dos Blackwood
├── escape4/               ← Sala 4: Estacao Espacial
├── sala5/                 ← Sala 5: Submarino Abyss
├── sala6/                 ← Sala 6: Museu Imperial
├── sala7/                 ← Sala 7: Orient Express
├── sala8/                 ← Sala 8: Piramide de Khufu
└── sala9/                 ← Sala 9: Bunker Soviético
```

---

## 3. Stack Tecnica

| Camada | Tecnologia | Restricoes |
|--------|-----------|------------|
| Linguagem | JavaScript ES6+ (vanilla) | Zero frameworks |
| Renderizacao | HTML5 Canvas 2D | 900x600 logico, responsivo |
| Estilo | CSS3 inline + tokens | Sem preprocessadores |
| Hospedagem | Arquivos estaticos (GitHub Pages) | Sem servidor backend |
| Versionamento | Git (branch master) | Commits semanticos |
| Build | Nenhum | Sem bundlers, transpilers |

### Restricoes Absolutas
- **ZERO** dependencias npm/CDN
- **ZERO** bundlers (webpack, vite, rollup)
- **ZERO** frameworks (React, Vue, Angular)
- Funciona abrindo `index.html` diretamente no browser (file://)
- Cada sala e autonoma — pode ser jogada isoladamente

---

## 4. Biblioteca Compartilhada (lib/)

A lib segue principios SOLID rigorosos:
- **S** — Cada modulo tem responsabilidade unica
- **O** — Aberto para extensao, fechado para modificacao
- **L** — Modulos substituiveis sem quebrar salas existentes
- **I** — Interfaces minimas e focadas
- **D** — Salas dependem de abstracoes, nao implementacoes

### Modulos

| Modulo | Responsabilidade |
|--------|-----------------|
| `engine.js` | Game loop (rAF), Canvas setup, resize responsivo |
| `input.js` | Hit detection (bounding box), hover tracking, eventos |
| `state.js` | State management (flags, ambiente atual, getters/setters) |
| `inventory.js` | Logica de inventario (add, remove, getAll) |
| `transitions.js` | Crossfade entre ambientes, controle de transicao |
| `timer.js` | Cronometro de jogo (start, stop, format) |
| `particles.js` | Sistema de particulas procedurais (sem Math.random no render) |
| `events.js` | Pub/sub entre modulos (desacoplamento) |
| `assets.js` | Preloader de assets (imagens, sprites) |

### Regra de Ouro
> **Nunca alterar a API publica de um modulo ja em uso.** Salas publicadas dependem dessas interfaces. Sempre criar nova funcao/modulo para novos comportamentos.

---

## 5. UI Kit Whitelabel (ui-kit/)

Sistema de componentes de interface compartilhados entre todas as salas, com personalizacao via temas.

### Design Tokens (`tokens.js`)
```javascript
// Tokens base da marca — identidade visual consistente
UITokens = {
  colorBg: '#0a0a0a',
  colorText: '#e0e0e0',
  colorAccent: '#ffcc00',
  colorSuccess: '#00ff88',
  colorError: '#ff4444',
  fontFamily: "'Courier New', monospace",
  borderRadius: '8px',
  glowColor: 'rgba(255, 204, 0, 0.6)'
}
```

### Temas por Sala
Cada sala define um tema que sobrescreve tokens visuais:
- `themes/noir.js` — Sala 1 (escritorio, tons sepia/ambar)
- `themes/lab.js` — Sala 2 (verde toxico, vermelho alarme)
- `themes/gothic.js` — Sala 3 (dourado antigo, sombras)
- `themes/scifi.js` — Sala 4 (azul neon, holografico)
- `themes/nautical.js` — Sala 5 (azul profundo, pressao)
- `themes/imperial.js` — Sala 6 (dourado/vermelho real)
- `themes/vintage.js` — Sala 7 (madeira, veludo, latao)
- `themes/desert.js` — Sala 8 (areia, ouro, hieroglifos)
- `themes/military.js` — Sala 9 (verde militar, metal frio)

### Componentes

| Componente | Funcao |
|-----------|--------|
| `inventory.js` | Renderiza grid de itens coletados (inspecionavel) |
| `tabs.js` | Navegacao entre ambientes (com lock/unlock) |
| `message-box.js` | Exibe texto narrativo ao jogador |
| `panel.js` | Modais de puzzle (sobreposicao no canvas) |
| `button.js` | Botoes estilizados com hover/active states |
| `success-overlay.js` | Tela de vitoria (tempo + links) |

---

## 6. Padrao de Renderizacao — 8 Camadas Cinematograficas

Cada sala implementa a renderizacao em `render.js` seguindo exatamente 8 camadas:

```
Camada 1: Background      — Gradientes de fundo, cores base do ambiente
Camada 2: Arquitetura     — Paredes, piso, teto, estrutura do cenario
Camada 3: Iluminacao      — Luzes, sombras, brilhos (sem Math.random)
Camada 4: Detalhes        — Texturas, manchas, rachaduras, desgaste
Camada 5: Decoracao       — Props nao-interativos (quadros, vasos, livros)
Camada 6: Objetos         — Elementos interativos (com glow ao hover)
Camada 7: Atmosfera       — Particulas, poeira, vapor, neblina
Camada 8: Overlay         — Efeitos de pos-processamento, vinheta
```

### Regras de Render
- **NUNCA** usar `Math.random()` dentro de funcoes de render
- Valores aleatorios devem ser pre-calculados em arrays constantes
- Animacoes usam `Math.sin(Date.now() / velocidade)` para pulso suave
- Cada ambiente (tab) tem sua propria funcao render completa (8 camadas)

### Formato de Entrega (Designer → Frontend)

O Designer OBRIGATORIAMENTE entrega junto com o render.js uma tabela de posicoes:

```markdown
## POSITION TABLE — [Nome do Ambiente]

| Objeto | x | y | w | h | Descricao |
|--------|---|---|---|---|-----------|
| cofre  | 620 | 80 | 110 | 100 | Cofre de parede |
| mesa   | 300 | 320 | 250 | 150 | Mesa principal |
```

O Frontend copia EXATAMENTE esses valores para os objetos de hit detection.

---

## 7. Regra Anti-Spoiler (OBRIGATORIA)

> **Nenhuma pista, texto, label de inventario ou interacao pode conter a solucao completa de um puzzle.**

### Criterios de Validacao

| Teste | Resultado |
|-------|----------|
| Lendo APENAS esta pista, resolvo o puzzle? | PROIBIDO |
| Preciso combinar com outra fonte/ambiente? | OK |
| A resposta esta escrita literalmente? | PROIBIDO |
| Existe ambiguidade que exige raciocinio? | OK |

### Requisitos Minimos de Puzzle
- Todo puzzle principal exige **minimo 2 pistas de fontes diferentes**
- Nenhuma pista isolada revela mais de 50% da solucao
- Labels de inventario descrevem o item, nao a solucao
- Codigos numericos nunca aparecem completos em uma unica interacao

### Exemplos

**PROIBIDO:**
- Label: `"Codigo: 0847"`
- Hint: `"A senha e 3-7-1-9"`
- Inventario: `"3 digitos nao bastam. Preencha com zeros a esquerda."`

**CORRETO:**
- Label: `"Nota com numeros parciais"`
- Hint: `"O relatorio menciona uma data... mas qual parte?"`
- Inventario: `"Documento: formato rejeitado pelo sistema"`

---

## 8. Equipe de Agentes

### Papeis

| Agente | Responsabilidade |
|--------|-----------------|
| Gerente de Projeto | Orquestra o ciclo completo, distribui tarefas, valida entregas |
| Spec Designer | Cria especificacoes completas (requirements + design + tasks) |
| Roteirista | Narrativa, dialogos, textos de interacao, logica de pistas |
| Design Grafico | Renderizacao visual (render.js), paleta, assets Canvas |
| Frontend (Canvas/JS) | Implementacao: engine, input, puzzles, integracao |
| Especialista UX | Valida usabilidade, fluxo, feedback visual, acessibilidade |
| Jogador Profissional | Testa gameplay, dificuldade, Anti-Spoiler, bugs |
| Webmaster | Atualiza lobby com novos cards e thumbnails |
| DevOps | Commits semanticos, push, verificacao de publicacao |

### Fluxo de Trabalho

```
1. IDEIA (usuario ou Spec Designer inventa)
       ↓
2. SPEC DESIGNER → Cria requirements.md + design.md + tasks.md
       ↓
3. GERENTE → Le spec, distribui tarefas na ordem:
       ↓
4. ROTEIRISTA → Narrativa completa + textos de interacao
       ↓
5. DESIGN GRAFICO → render.js (8 camadas) + tabela de posicoes + tema
       ↓
6. FRONTEND → index.html (integracao lib + ui-kit + render + logica)
       ↓
7. UX + JOGADOR → Validacao (paralelo)
   - UX: fluxo, feedback, responsividade
   - Jogador: Anti-Spoiler, dificuldade, bugs, hit areas
       ↓
8. CORRECOES (se necessario, volta ao agente responsavel)
       ↓
9. WEBMASTER → Atualiza lobby com novo card
       ↓
10. DEVOPS → Commit + push + verificacao em producao
```

### Regras de Handoff

- Designer DEVE entregar tabela de posicoes com render.js
- Frontend DEVE copiar coordenadas EXATAS da tabela
- Roteirista DEVE descrever posicoes de objetos que sao referenciados em texto
- Designer DEVE posicionar visualmente conforme descricao do Roteirista
- Jogador DEVE inspecionar todos os labels de inventario (Anti-Spoiler)
- Gerente DEVE cruzar narrativa × posicoes visuais antes de enviar ao Frontend

---

## 9. Estrutura de Uma Sala (Template)

### Arquivos Obrigatorios

```
salaN/
├── index.html      ← Estrutura HTML + scripts + logica inline do jogo
└── render.js       ← Renderizacao cinematografica (8 camadas, separada)
```

### Estrutura do index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sala N — [Titulo]</title>
  <style>/* estilos inline da sala */</style>
</head>
<body>
  <div id="tabs"></div>
  <div id="game-wrapper">
    <canvas id="gameCanvas" width="900" height="600"></canvas>
    <div id="puzzle-panel"></div>
    <div id="success-overlay"></div>
  </div>
  <div id="message"></div>
  <div id="inventory"></div>

  <!-- Lib -->
  <script src="../lib/engine.js"></script>
  <script src="../lib/input.js"></script>
  <script src="../lib/state.js"></script>
  <script src="../lib/inventory.js"></script>
  <script src="../lib/transitions.js"></script>
  <script src="../lib/timer.js"></script>
  <script src="../lib/events.js"></script>
  <script src="../lib/particles.js"></script>

  <!-- UI Kit -->
  <script src="../ui-kit/tokens.js"></script>
  <script src="../ui-kit/themes/[tema].js"></script>
  <script src="../ui-kit/components/inventory.js"></script>
  <script src="../ui-kit/components/tabs.js"></script>
  <script src="../ui-kit/components/message-box.js"></script>
  <script src="../ui-kit/components/panel.js"></script>
  <script src="../ui-kit/components/success-overlay.js"></script>

  <!-- Render cinematografico -->
  <script src="render.js"></script>

  <script>
    // === SETUP ===
    // === STATE ===
    // === TABS ===
    // === OBJETOS (posicoes EXATAS do render.js) ===
    // === INTERACOES ===
    // === PUZZLES ===
    // === INPUT ===
    // === RENDER LOOP ===
    // === START ===
  </script>
</body>
</html>
```

### Estrutura do render.js

```javascript
/**
 * @module SalaNRender
 * @version X.Y.Z
 * @description Renderizacao cinematografica da Sala N — [Titulo]
 * Padrao: 8 camadas (bg, arquitetura, iluminacao, detalhes, decoracao, objetos, atmosfera, overlay)
 * Ambientes: [lista de ambientes]
 * Paleta: Theme[Nome] — bg #XXXXXX, accent #XXXXXX, border #XXXXXX
 */

// ============ VARIAVEIS PRE-CALCULADAS (sem Math.random no render) ============
const PRE_CALC_VALUES = [...]; // posicoes, tamanhos, angulos fixos

// ============ AMBIENTE 1 ============

function renderAmbiente1(ctx, state) {
  renderAmb1_Background(ctx);
  renderAmb1_Arquitetura(ctx);
  renderAmb1_Iluminacao(ctx, state);
  renderAmb1_Detalhes(ctx);
  renderAmb1_Decoracao(ctx);
  renderAmb1_Objetos(ctx, state);
  renderAmb1_Atmosfera(ctx);
  renderAmb1_Overlay(ctx);
}

// ... (8 funcoes por ambiente)

// ============ AMBIENTE 2 ============
// ... (mesma estrutura)
```

---

## 10. Requisitos de Qualidade

### Codificacao
- Todos os arquivos DEVEM ser salvos em **UTF-8 sem BOM**
- Caracteres acentuados (acao, informacao, nao) devem renderizar corretamente
- Em dash (—) e emojis devem funcionar sem mojibake
- Testar abrindo no browser apos salvar — se aparece `Ã§` ou `â€"`, ha problema

### Performance
- 60fps no game loop (sem jank)
- Carregamento < 1s (sem assets pesados)
- Sem memory leaks (particulas reciclam, nao criam novos objetos)

### Responsividade
- Canvas escala mantendo aspect ratio 3:2 (900x600)
- Funciona de 360px (mobile) a 1920px (desktop)
- Hit detection ajustada ao scale do canvas

### Compatibilidade
- Chrome, Firefox, Edge, Safari (ultimas 2 versoes)
- Funciona via file:// (sem CORS issues)
- Funciona via HTTPS (GitHub Pages)

---

## 11. Processo de Publicacao

### Commits Semanticos

```
<tipo>(<escopo>): <descricao>
```

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feat` | Nova funcionalidade (sala, modulo, componente) | `feat: implementar Sala 16` |
| `fix` | Correcao de bug | `fix(sala16): hit area da gaveta desalinhada` |
| `refactor` | Reestruturacao sem mudanca funcional | `refactor(lib): extrair modulo de audio` |
| `docs` | Documentacao (specs, steering, narrativa) | `docs: adicionar spec da Sala 16` |
| `style` | Ajustes visuais (CSS, tokens, temas) | `style(sala3): corrigir contraste do texto` |
| `chore` | Manutencao (configs, estrutura, gitignore) | `chore: adicionar README` |

**Regra:** o primeiro commit de uma nova sala DEVE ser a spec (`docs: adicionar spec da Sala N`). Commits de implementacao vem depois.

### Sequencia de Commits por Sala

```
1. docs: adicionar spec da Sala N          ← spec completa em .kiro/specs/salaN-slug/
2. feat: implementar Sala N — Nome         ← index.html + render.js + assets
3. feat(site): adicionar card da Sala N    ← atualizar index.html (lobby + ranking)
4. fix(salaN): ...                         ← correcoes pos-validacao (se necessario)
```

### Push

```bash
git push origin master
```

### Verificacao Pos-Deploy
1. Acessar https://gabrielmendonca.com.br/escape
2. Verificar lobby carrega com todos os cards
3. Clicar em cada sala nova e confirmar carregamento
4. Testar puzzle completo pelo menos uma vez
5. Verificar console sem erros

---

## 12. Criacao de Nova Sala — Checklist

### Pre-Producao
- [ ] Ideia do ambiente (cenario, tematica, nivel de dificuldade)
- [ ] Spec Designer cria pasta `.kiro/specs/salaN-slug/` com `requirements.md`
- [ ] Commit da spec: `docs: adicionar spec da Sala N`
- [ ] Gerente aprova spec e inicia o ciclo

### Producao
- [ ] Roteirista: narrativa + textos de interacao + logica de pistas
- [ ] Design: render.js (8 camadas) + tabela de posicoes + tema no ui-kit
- [ ] Frontend: index.html integrado com lib + ui-kit + render
- [ ] Cruzamento: narrativa × posicoes visuais × hit areas

### Validacao
- [ ] UX: fluxo intuitivo, feedback em cada acao, responsividade
- [ ] Jogador: Anti-Spoiler em TODAS as pistas e labels
- [ ] Jogador: hit areas EXATAS (clicar no objeto visual = resposta)
- [ ] Jogador: puzzle resolvivel com deducao (nao leitura direta)
- [ ] Jogador: sem Math.random tremendo elementos
- [ ] Console: zero erros/warnings

### Publicacao
- [ ] Webmaster: card no lobby com thumbnail e descricao
- [ ] DevOps: commit semantico + push + verificacao em producao
- [ ] Verificar encoding UTF-8 no browser (sem mojibake)

---

## 13. Salas Existentes — Status

| Sala | Diretorio | Tema | Ambientes | Status |
|------|-----------|------|-----------|--------|
| 1 | `sala1/` | Escritorio do Detetive | Escritorio + Arquivo Secreto | Revitalizada |
| 2 | `sala2/` | Laboratorio Helix | Lab + Contencao + Deposito | Cinematografica |
| 3 | `sala3/` | Mansao dos Blackwood | Salao + Biblioteca + Porao | Cinematografica |
| 4 | `escape4/` | Estacao Espacial | Comando + Energia + Capsula | Cinematografica |
| 5 | `sala5/` | Submarino Abyss | Controle + Motor + Torpedos | Cinematografica |
| 6 | `sala6/` | Museu Imperial | Hall + Egito + Cofre | Cinematografica |
| 7 | `sala7/` | Orient Express | Vagao + Restaurante + Bagageiro | Cinematografica |
| 8 | `sala8/` | Piramide de Khufu | Entrada + Camara + Sarcofago | Cinematografica |
| 9 | `sala9/` | Bunker Sovietico | Sala Comando + Reator + Saida | Cinematografica |
| 10 | `sala10/` | Farol da Tempestade | — | — |
| 11 | `sala11/` | O Grande Hotel | — | — |
| 12 | `sala12/` | O Teatro Fantasma | — | — |
| 13 | `sala13/` | A Mina Abandonada | — | — |
| 14 | `sala14/` | O Observatorio | — | — |
| 15 | `sala15/` | A Oficina do Relojoeiro | — | — |
| 16 | `sala16/` | O Cofre do Banco | Tesouraria + Escritorio | Publicada |

---

## 14. Niveis de Dificuldade

| Nivel | Descricao | Puzzles | Ambientes | Exemplo |
|-------|-----------|---------|-----------|---------|
| Facil | Pistas mais diretas, menos cruzamento | 1-2 | 2 | Sala 1 |
| Medio | Cruzamento entre 2 fontes, 1 puzzle extra | 2-3 | 2-3 | Salas 2, 3 |
| Dificil | Cruzamento multi-ambiente, red herrings | 3-4 | 3 | Salas 7, 8 |
| Expert | Meta-puzzles, sequencias longas, deducao complexa | 4+ | 3+ | Sala 9 |

---

## 15. Erros Comuns e Prevencao

Referencia completa em `.kiro/steering/lessons-learned.md`. Resumo:

1. **Hit areas desalinhadas** → Copiar coordenadas EXATAS do render
2. **Math.random no render** → Pre-calcular arrays
3. **Tag script faltante** → Contar abertura = fechamento
4. **Parametro faltante** → Verificar assinatura × chamada
5. **Anti-Spoiler violado** → Jogador valida TODOS os labels
6. **Posicao visual ≠ narrativa** → Cruzar texto × render
7. **Funcoes duplicadas** → Remover inline ao extrair para arquivo

---

## 16. Extensibilidade Futura

### Novas Salas
- Criar spec em `.kiro/specs/salaN-slug/requirements.md`
- Primeiro commit DEVE ser a spec (`docs: adicionar spec da Sala N`)
- Seguir template da secao 9
- Nunca modificar lib/ de forma que quebre salas existentes

### Novos Componentes UI
- Adicionar em `ui-kit/components/`
- Registrar no tema base em `tokens.js`
- Documentar API publica

### Novos Modulos de Engine
- Adicionar em `lib/`
- Manter independencia (nao depender de modulos existentes internamente)
- Salas optam por importar ou nao (nao e mandatorio)

### Melhorias Planejadas
- Sistema de save/load (localStorage)
- Sistema de hints progressivos (pedir ajuda)
- Soundtrack ambient por sala (Web Audio API)
- Achievements/badges
- Multiplayer cooperativo (WebRTC ou similar — futuro distante)
