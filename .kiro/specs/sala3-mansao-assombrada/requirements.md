# Sala 3 — A Mansão Assombrada: Requisitos de Revitalização

## Estado Atual (POC)

### O que existe
- Ambiente único com cenário CSS elaborado (layers, animações de fogo, partículas)
- Objetos: retrato, relógio, livro roxo, chave, cofre, porta
- Puzzle: combinação de cofre (9-3-7, derivada do relógio parado às 9:37) + coleta de itens (chave + medalha)
- Inventário de 4 slots fixos
- Renderização via DOM com CSS layers e animações
- Cenário mais imersivo que salas 1-2 (lareira com fogo, lustre, lua, partículas de poeira)
- Narrativa mínima: "porta bateu, ar gelado, investigue"

### O que funciona bem (manter na revitalização)
- Cenário em camadas com profundidade visual
- Animações ambientais (fogo da lareira, flicker de vela, nuvens, poeira)
- Puzzle em duas etapas (cofre → medalha → porta)
- Pista não-literal (9:37 do relógio → código do cofre)

### Problemas Identificados
- Narrativa rasa — não há história de fundo (quem morava ali? por que está assombrada?)
- Ambiente único — uma mansão teria vários cômodos
- Puzzle do cofre é direto demais (relógio → código sem interpretação intermediária)
- Inventário fixo de 4 slots
- Sem progressão entre áreas (tudo acessível de início)
- Objetos decorativos e interativos se confundem visualmente
- A "assombração" é apenas estética (poeira, fogo) — não afeta gameplay
- Renderização em DOM/CSS (deveria ser Canvas no padrão novo)

---

## Tema Revitalizado

> **A Mansão dos Blackwood — O Ritual Interrompido**
>
> A família Blackwood desapareceu em 1923 durante um ritual no porão da mansão. Você é um pesquisador paranormal que entrou para documentar o caso. A porta selou-se com símbolos arcanos. Para sair, precisa completar o que os Blackwood começaram — reunir os 4 artefatos espalhados pela mansão e executar o contra-ritual que desfaz o selo da porta.

---

## Ambientes (Multi-ambiente)

### Ambiente 1: Salão Principal
O grande hall com lareira, retratos da família, lustre e escadaria. Atmosfera gótica com iluminação dramática.

### Ambiente 2: Biblioteca
Sala com estantes do chão ao teto, escrivaninha com diário, globo terrestre e passagem oculta. Livros antigos e velas.

### Ambiente 3: Porão / Sala do Ritual
Subsolo da mansão com círculo ritualístico no chão, velas dispostas, altar de pedra e símbolos nas paredes. O puzzle final acontece aqui.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | Deve ter 3 ambientes navegáveis (salão + biblioteca + porão) | Alta |
| RF-02 | Cada ambiente deve ter pelo menos 5 objetos interativos | Alta |
| RF-03 | Transição entre ambientes via fade no Canvas | Alta |
| RF-04 | Inventário dinâmico e expansível (sem limite fixo) | Alta |
| RF-05 | Puzzle principal: reunir 4 artefatos e posicionar no altar na ordem correta | Alta |
| RF-06 | Puzzle secundário: abrir passagem para o porão (combinar pistas da biblioteca + salão) | Alta |
| RF-07 | Narrativa coesa: história da família Blackwood revelada progressivamente | Alta |
| RF-08 | Gate 1: biblioteca acessível após encontrar chave no salão | Alta |
| RF-09 | Gate 2: porão acessível após resolver puzzle na biblioteca | Alta |
| RF-10 | Cenário renderizado em Canvas com assets visuais góticos | Alta |
| RF-11 | Animações ambientais (fogo, velas, sombras, partículas de poeira, algo "sobrenatural") | Alta |
| RF-12 | Eventos sobrenaturais contextuais (retrato que muda, objeto que se move, som) | Média |
| RF-13 | Tela de sucesso com tempo e link lobby/próxima sala | Alta |
| RF-14 | Feedback visual em objetos interativos (glow ao hover) | Média |
| RF-15 | Pistas cross-ambiente: diário na biblioteca referencia objetos no salão e porão | Alta |
| RF-16 | 4 artefatos espalhados pelos 3 ambientes (coleta progressiva) | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Renderização 100% em Canvas 2D |
| RNF-02 | Responsivo 360px a 1920px |
| RNF-03 | Zero dependências externas |
| RNF-04 | 60fps no game loop |
| RNF-05 | Carregamento < 1s |
| RNF-06 | Animações de fogo e partículas procedurais (sem sprites animados pesados) |

---

## Puzzle Redesenhado

**Antes (POC):** Relógio parado às 9:37 → código do cofre é 9-3-7 → pega medalha → combina com chave → abre porta.

**Depois (Revitalizado):**

### Puzzle Secundário (acesso ao Porão)
- Na biblioteca: diário menciona "a passagem se revela quando os símbolos se alinham"
- Globo terrestre + espelho + posição das velas = combinação para abrir painel secreto
- O jogador precisa **interpretar metáforas do diário** e aplicar nos objetos da biblioteca

### Puzzle Principal (Ritual no Porão)
- 4 artefatos coletados progressivamente nos 3 ambientes:
  - **Cálice** (salão — dentro do cofre atrás do retrato)
  - **Adaga cerimonial** (biblioteca — gaveta da escrivaninha)
  - **Amuleto** (porão — encontrado ao chegar)
  - **Grimório** (biblioteca — estante, livro com capa diferente)
- No altar do porão: posicionar os 4 artefatos nos pontos cardeais corretos
- Pistas sobre a ordem correta vêm do diário + gravuras nas paredes do porão + retrato da família
- O jogador precisa **cruzar referências visuais e textuais** de todos os ambientes
