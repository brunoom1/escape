# Sala 15 — A Oficina do Relojoeiro: Requisitos

## Propósito

Sala **de teste** para validar a característica de **puzzles manipulativos** descrita em `.kiro/specs/mini-puzzles-interativos/repertorio.md`. Se a mecânica for aprovada pelo validador humano, o repertório migra para steering e passa a orientar a geração de todas as salas.

Esta especificação define a versão definitiva da sala. Diretrizes de acessibilidade aplicadas:

- **Nenhum puzzle exige conhecimento externo** (xadrez, teoria musical, etc.). Toda solução é deduzível dentro do jogo.
- **Quebra-cabeça é de imagem real**: os cacos, ao serem remontados, **formam visualmente uma figura** cujo código está gravado nela — o jogador lê o número da própria imagem, nunca de um rótulo na peça.

## Tema

> O velho relojoeiro Sr. Ventura desapareceu, deixando a oficina trancada por dentro. Seus enigmas mecânicos guardam o caminho para fora.

## Conceito Principal — Dificuldade: ★★★☆☆ (Média)

Dois ambientes (Oficina → Depósito) com **3 puzzles manipulativos e acessíveis**, cada um validando uma mecânica do repertório:

| # | Mecânica (repertório) | Aplicação na Sala 15 |
|---|-----------------------|----------------------|
| 1 | Ajuste de Relógio | Encaixar o ponteiro e girar até o horário do enigma → abre o compartimento com os cacos do mostrador |
| 2 | Remontagem de Imagem (quebra-cabeça deslizante) | Deslizar peças pelo espaço vazio (8-puzzle) até **formar o mostrador**; a figura montada revela o código gravado |
| 3 | Blocos Deslizantes (Sokoban) | Um operário empurra (nunca puxa) dois engradados até duas marcas → destrava a escotilha de saída |

**Mecânica diferenciadora:** manipulação direta (ajustar, remontar, empurrar) com estado visível em tempo real — o prazer vem da manipulação, não só da dedução.

---

## Ambientes

### Ambiente 1: Oficina
Relógio de parede, gaveta, caixa de ferramentas, bancada de remontagem, porta blindada para o depósito. Hub inicial.

### Ambiente 2: Depósito
Engradado empurrável (grade Sokoban), marca "✕" no piso, esquema na parede, escotilha de saída.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 2 ambientes navegáveis (Oficina ↔ Depósito) | Alta |
| RF-02 | Puzzle do relógio: encaixar ponteiro (item) + girar ponteiros até o horário correto | Alta |
| RF-03 | Puzzle de remontagem: quebra-cabeça deslizante (8-puzzle) com um espaço vazio; peças vizinhas ao vazio deslizam para ele até **formar uma figura real** | Alta |
| RF-04 | A figura montada **revela visualmente** o código (nunca por rótulo/texto na peça) | Alta |
| RF-05 | Puzzle Sokoban real: operário empurra (nunca puxa) 3 engradados até 3 marcas numa sala 6×7 murada; paredes internas dividem a sala e forçam ordem/reposicionamento; teclado (setas/WASD) e botões; contador de movimentos; reiniciar | Alta |
| RF-06 | Gate: código lido na figura remontada abre a porta blindada do depósito | Alta |
| RF-07 | Nenhum puzzle exige conhecimento externo (xadrez, música, etc.) | Alta |
| RF-08 | Estado de cada puzzle visível em tempo real (relógio, grade, engradado) | Alta |
| RF-09 | Feedback claro e não-destrutivo em acerto e erro | Alta |
| RF-10 | Integração login/timer/ranking (`EscapeAPI.registrarResultado`) | Alta |
| RF-11 | Aviso de jogador não logado | Média |
| RF-12 | Tema visual clockwork (latão + turquesa sobre fundo âmbar escuro) | Alta |

---

## Fluxo de Progressão (Gates)

```
Gaveta → ponteiro          Ferramentas → bilhete (horário)
        └──────────┬───────────────┘
                   ▼
        Relógio: ajustar até o horário do enigma
                   ▼
        Compartimento abre → cacos do mostrador
                   ▼
        Bancada: remontar mostrador (swap de peças)
                   ▼
        Figura formada → código gravado legível
                   ▼
        Porta blindada: digitar o código → abre o Depósito
                   ▼
        Esquema (pista) + Sokoban: empurrar engradado até "✕"
                   ▼
        Escotilha destrava → VITÓRIA
```

---

## Puzzles (Anti-Spoiler)

### 1. Relógio → horário do enigma
- **Ponteiro** (na gaveta): item obrigatório para operar o relógio. Sem ele, os ponteiros não giram.
- **Bilhete** (na caixa de ferramentas): "Ventura almoçava sempre meia hora após o meio-dia, nem um minuto além."
- O jogador **deduz** o horário (meia hora após o meio-dia) — nunca escrito literalmente. Ao acertar, o compartimento atrás do relógio se abre e revela os **cacos do mostrador**.
- **Feedback:** ponteiros giram em tempo real; horário exibido no painel; erro devolve dica sem punição.

### 2. Remontagem do mostrador → código
- Os cacos são **fatias de uma imagem real** (o mostrador de um relógio, desenhado em SVG), dispostos numa grade 3×3 com **um espaço vazio** (canto inferior-direito, onde não há dígitos).
- Quebra-cabeça **deslizante** (8-puzzle): clicar numa peça vizinha ao espaço vazio faz a peça deslizar para lá, abrindo um novo vazio. Repete-se até a figura ficar correta. As peças que podem mover são destacadas; um botão **Embaralhar** reinicia.
- O embaralhamento é feito por jogadas legais a partir do estado resolvido, garantindo que **sempre há solução**.
- A figura completa mostra, gravado no aro, um **código de 3 dígitos** (linha do meio, não afetada pelo espaço vazio) — o jogador **lê** o número da própria imagem montada.
- **Regra obrigatória:** não há rótulo dizendo onde cada peça vai; o encaixe é visual. O código nunca aparece como texto numa peça isolada, apenas na figura completa.

### 3. Sokoban → saída
- **Esquema na parede** (pista): revela que os engradados devem repousar sobre as marcas "✕" e adverte que só é possível **empurrar, nunca puxar** — logo, é preciso escolher de que lado se posicionar.
- Sokoban de verdade: o jogador controla um operário (◉) que empurra os engradados (▩) por uma sala murada 6×7. Um engradado só anda se a célula além dele estiver livre (não empurra contra parede nem contra outro engradado). **Não há como puxar.**
- Três engradados devem cobrir as três marcas. Paredes internas dividem a sala em duas zonas ligadas apenas pela fileira de cima e pela marca central, obrigando a rodear e a planejar a ordem dos empurrões (um engradado empurrado para o canto errado trava o caminho). Botão **Reiniciar** recupera de becos sem saída (feedback não-destrutivo).
- Controles por teclado (setas/WASD) e por botões na tela; contador de movimentos visível.
- **Anti-spoiler:** a solução é espacial e de planejamento, não numérica.

---

## Critérios de Aceite (Checklist de Validação do Teste)

- [ ] Cada interação é manipulativa (ajustar / remontar / empurrar), não apenas digitar um código
- [ ] Estado de cada puzzle é visível em tempo real
- [ ] Nenhum puzzle exige conhecimento externo (RF-07)
- [ ] O quebra-cabeça forma uma figura coerente e o código é lido da imagem, não de um rótulo (RF-03, RF-04)
- [ ] Anti-spoiler respeitado: 2+ pistas, nada literal
- [ ] Acerto/erro com feedback claro e não-destrutivo
- [ ] Funciona bem com clique e é responsivo
- [ ] Diversão e originalidade confirmadas pelo validador humano

---

## Integração com Lobby
- Emoji: 🕰️
- Título: "Sala 15 — A Oficina do Relojoeiro"
- Descrição: "O relojoeiro sumiu e trancou a oficina por dentro. Ajuste o relógio, remonte o mostrador e empurre o caminho até a saída."
- Dificuldade: ★★★☆☆
- Tema UI Kit: `themes/clockwork.js`
