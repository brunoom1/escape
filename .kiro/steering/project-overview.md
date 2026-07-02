---
inclusion: auto
---

# Projeto Escape Room — Contexto Geral

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
├── .kiro/                 ← Configurações Kiro (steering, agents, specs)
├── lib/                   ← Lib compartilhada — engine, lógica de jogo (SOLID)
├── ui-kit/                ← Componentes UX whitelabel — interface compartilhada
│   ├── components/        ← Inventário, tabs, painéis, botões, etc.
│   ├── themes/            ← Temas personalizáveis por sala
│   └── tokens.js          ← Design tokens base da marca
├── assets/thumbnails/     ← Thumbnails dos jogos para o site principal
├── index.html             ← Site principal (lobby/vitrine dos jogos)
├── style.css              ← Estilos globais (lobby, componentes comuns)
├── sala1/index.html       ← Sala 1: O Escritório do Detetive
├── sala2/index.html       ← Sala 2: O Laboratório de Virologia
├── sala3/index.html       ← Sala 3: A Mansão dos Blackwood
└── escape4/index.html     ← Sala 4: Estação Espacial (em dev)
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
