# Sala 16 — O Cofre do Banco

## Requirements

### Tema
> Um banco art déco dos anos 30. Você é um vigia noturno que ficou trancado na tesouraria após um assalto. Os sistemas de segurança reativam ao amanhecer — você precisa decifrar os enigmas do gerente e arrombar o cofre para escapar.

### Conceito Principal
Sala introdutória focada em dedução narrativa: o jogador cruza duas pistas (certificado com ano parcial + calendário do gerente) para descobrir o código de 4 dígitos do cofre. Sem mecânicas complexas — exploração e leitura.

### Ambientes

#### Ambiente 1: Tesouraria
Cofre principal do banco. Porta maciça de aço, balcão de mármore verde, prateleiras com livros contábeis, caixa forte lateral.

#### Ambiente 2: Escritório do Gerente
Sala elegante com mobília de madeira escura, relógio de pêndulo, quadro a óleo, escrivaninha com calendário.

### Requisitos Funcionais
| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF1 | Jogador deve poder examinar a prateleira e encontrar chave em livro oco | Alta |
| RF2 | Jogador deve poder abrir a caixa forte com a chave e obter o certificado | Alta |
| RF3 | Jogador deve poder passar a grade para o escritório após obter o cartão | Alta |
| RF4 | Jogador deve encontrar o ano de fundação no calendário da escrivaninha | Alta |
| RF5 | Jogador deve inserir o código 1947 na porta do cofre para escapar | Alta |
| RF6 | Jogador deve poder alternar entre ambientes via tabs | Média |
| RF7 | Inventário deve refletir itens coletados | Média |

### Puzzle Principal
Código de 4 dígitos (1947) descoberto pelo cruzamento de duas pistas:
1. Certificado de fundação na caixa forte: "Fundado em 19__" (faltando o último dígito)
2. Calendário na escrivaninha do escritório: mostra "Fundado em 1947"

### Integração com Lobby
Card: 🏦 "Sala 16 — O Cofre do Banco" — Dificuldade: ★★☆☆☆

---

## Design

### Ambientes

#### Tesouraria (900x600)
```
┌──────────────────────────────────────────────────┐
│  ┌──────┐          ┌──────────┐  ┌──────────┐    │
│  │ Cofre │          │ Caixa    │  │Prateleira│    │
│  │ porta │          │ Forte    │  │ (livros) │    │
│  │       │          │          │  │          │    │
│  │  ⬤   │          │ [chave]  │  │ 🔑 oca  │    │
│  │       │          │          │  │          │    │
│  └──────┘          └──────────┘  └─────┬────┘    │
│                                        │         │
│  ┌──────── Balcão ────────┐            │         │
│  │    mármore verde       │      ┌─────┘         │
│  └────────────────────────┘      │ Grade →       │
│                                  │ Escritório    │
│           ── trilhos ──         └───────────────┘│
└──────────────────────────────────────────────────┘
```

Objetos:
| ID | Nome | Posição (x,y,w,h) | Interação |
|----|------|-------------------|-----------|
| porta_cofre | Porta do cofre | 80,160,170,280 | Exige código 1947 (se calendarioOk) |
| gaveta | Caixa forte | 260,200,170,70 | Abre com chave → certificado |
| prateleira | Prateleira | 680,70,170,220 | Examina → acha chave em livro |
| grade | Grade → Escritório | 810,180,70,260 | Passagem (se cartaoColetado) |

#### Escritório (900x600)
```
┌──────────────────────────────────────────────────┐
│  ┌──────────┐         ┌──────────────┐           │
│  │Escrivan. │         │  Relógio de  │ ┌───────┐ │
│  │📅 1947   │         │  Pêndulo     │ │Quadro │ │
│  │          │         │    🕰️       │ │ paisag│ │
│  └──────────┘         └──────────────┘ └───────┘ │
│                                                    │
│  ┌────────────────────────────────────────────────┐│
│  │            Tapete oriental                      ││
│  └────────────────────────────────────────────────┘│
│  ┌──────────┐                                      │
│  │→ Tesour.│                                      │
│  └──────────┘                                      │
└──────────────────────────────────────────────────┘
```

Objetos:
| ID | Nome | Posição (x,y,w,h) | Interação |
|----|------|-------------------|-----------|
| escrivaninha | Escrivaninha | 50,200,180,120 | Mostra calendário → ano 1947 |
| relogio | Relógio de pêndulo | 350,40,180,360 | Apenas flavor text |
| quadro | Quadro | 720,60,140,170 | Apenas flavor text (reforça ano) |
| voltar | ← Tesouraria | 30,470,100,60 | Volta para tesouraria |

### Progressão

1. Tesouraria → examinar prateleira → achar chave no livro
2. Tesouraria → caixa forte → usar chave → obter "Certificado: Fundado em 19__"
3. Tesouraria → grade → escritório (destranca com certificado)
4. Escritório → escrivaninha → calendário "Fundado em 1947"
5. Escritório → voltar → tesouraria
6. Tesouraria → porta do cofre → inserir 1947 → escapar!

### Assets Necessários
Nenhum asset externo — tudo renderizado via Canvas 2D (formas geométricas, gradientes, texto).

### Interface
Layout padrão: tabs (topo) + canvas (centro, 900x600) + message box (abaixo) + inventory (abaixo).

### Tema
`ThemeArtDeco` — existente em `ui-kit/themes/artdeco.js`

---

## Tasks

### Fase 1: Implementação
- [ ] Criar `sala16/index.html` com lógica completa
- [ ] Criar `sala16/render.js` com funções renderTesouraria e renderEscritorio
- [ ] Usar `ThemeArtDeco` via `ui-kit/themes/artdeco.js`
- [ ] Implementar estados: livroOk, gavetaOk, cartaoColetado, calendarioOk, portaAberta

### Fase 2: Integração
- [ ] Adicionar card da Sala 16 no `index.html` (grid de jogos)
- [ ] Adicionar opção no filtro de ranking

### Fase 3: Validação
- [ ] Verificar hit detection de todos os objetos
- [ ] Verificar progressão (não ter softlock)
- [ ] Verificar que código 1947 funciona apenas após calendário
- [ ] Verificar que mensagens são claras e imersivas
