# Repertório de Mini-Puzzles Interativos (Manipulativos)

> **Status:** RASCUNHO / EM VALIDAÇÃO. Este documento NÃO é steering ativo ainda.
> A ideia será validada com a Sala 15 (teste). Se aprovada, migra para steering e passa a orientar a geração de todas as salas.

## Objetivo

Elevar os puzzles de "clicar e receber uma dica" para **interações manipulativas**: o jogador **monta, move, ajusta, empurra ou reordena** elementos do cenário para liberar a pista ou a saída. O prazer vem da manipulação direta, não só da dedução.

## Princípios de Design

1. **Manipulação direta** — o jogador age sobre o objeto (arrastar, girar, empurrar, encaixar), não apenas digita um código.
2. **Estado visível** — o resultado da manipulação é mostrado no Canvas ou no painel em tempo real.
3. **Anti-spoiler mantido** — a mecânica exige pelo menos 2 pistas ou dedução; a interação nunca "entrega" a solução (ex.: o relógio não mostra o horário-alvo escrito).
4. **Feedback claro** — acerto e erro têm resposta visual/textual imediata, sem punição destrutiva.
5. **Reaproveitável** — cada mecânica vira um "molde" que pode ser tematizado por sala (whitelabel).

Conteúdo foi reformulado a partir de referências públicas sobre design de puzzles de escape room e adventure games, para conformidade com licenciamento. Fontes: [Free to Play Puzzles](https://www.freetoplaypuzzles.com/blog/escape-room-puzzle-types-locks-codes-riddles), [Trap Door Escape](https://www.trapdoorescape.com/escape-room-puzzles/), [Creative Craft House — glossário](https://www.creativecrafthouse.com/blogs/puzzles-games-blog/puzzlers-lexicon-a-z-guide-to-puzzle-terms-types), [Game Developer — Designing Video Game Puzzles](https://www.gamedeveloper.com/design/designing-video-game-puzzles).

---

## Catálogo de Mecânicas

### 1. Ajuste de Relógio (Clock Setting)
- **Interação:** o jogador encontra um ponteiro solto e o encaixa; depois gira os ponteiros (hora/minuto) até o horário-alvo.
- **Liberação:** ao atingir o horário certo, abre-se um compartimento / solta-se uma pista.
- **Pistas (2+):** um bilhete diz "meia hora após o meio-dia"; a caixa de música toca uma melodia associada à hora; a sombra de um relógio de sol aponta a hora.
- **Anti-spoiler:** nunca escrever "12:30" literalmente — deduzir de descrição.
- **Exemplo:** ajustar para 12:30 abre a portinhola atrás do relógio.

### 2. Xadrez — Lance Decisivo (Chess Move) ⚠️ USO RESTRITO
- **Interação:** um tabuleiro com uma partida em andamento; o jogador clica na casa de destino da peça que dá xeque-mate.
- **⚠️ Acessibilidade (lição da Sala 15):** exige conhecimento de xadrez — **NÃO usar como puzzle obrigatório**. A maioria dos jogadores não joga xadrez, o que frustra e quebra o ritmo. Só usar como puzzle **opcional/bônus** ou em salas explicitamente temáticas de xadrez, sempre com uma alternativa.
- **Anti-spoiler:** exige ler a posição; não indicar a casa exata.

### 3. Blocos Deslizantes / Empurrar Caixas (Sokoban)
- **Interação:** grade onde o jogador empurra blocos (setas) até uma marca no chão.
- **Liberação:** com o bloco na posição-alvo, uma passagem/escotilha se abre; ou o bloco vira degrau para alcançar algo alto.
- **Pistas (2+):** marca "X" no piso; um esquema na parede mostra a posição final.
- **Anti-spoiler:** a solução é espacial, não numérica.
- **Exemplo:** empurrar a caixa pesada sobre a placa de pressão libera a saída.

### 4. Quebra-Cabeça / Remontagem de Imagem (Jigsaw / Assembly)
- **Interação:** peças que são **fatias de uma imagem real** (foto/mostrador/mapa) embaralhadas; o jogador as **troca de posição** (ou desliza) até a figura se formar.
- **REGRA OBRIGATÓRIA (lição da Sala 15):** as peças DEVEM compor visualmente uma figura coerente — as bordas precisam se alinhar de verdade. **NUNCA** rotular peças ("esta é a da esquerda") nem resolver por dropdown de posição: isso não é quebra-cabeça, é preencher formulário e mata a graça.
- **Implementação recomendada:** desenhar a imagem (SVG/Canvas) e fatiar por `viewBox`/`background-position` em NxN; o jogador troca tiles clicando em dois; resolvido quando todos estão na célula de origem.
- **Liberação:** a figura completa **mostra visualmente** um código/símbolo que o jogador **lê da própria imagem** (nunca de um texto na peça).
- **Exemplo (Sala 15):** remontar o mostrador de um relógio revela o número "504" gravado no aro.

### 5. Encaixe de Peças / Peça Deslocada (Displaced Object)
- **Interação:** um objeto que "não pertence" ao lugar (ex.: engrenagem no chão) deve ser levado ao ponto correto próximo (eixo vazio, suporte, nicho).
- **Liberação:** o objeto recolocado ativa um mecanismo.
- **Pistas (2+):** um espaço visivelmente vazio com o formato da peça; marca de poeira/desgaste.
- **Exemplo:** recolocar a engrenagem faltante faz o mecanismo girar.

### 6. Discos/Anéis Rotativos (Cryptex / Combination Rings)
- **Interação:** girar anéis concêntricos para alinhar símbolos/letras/números.
- **Liberação:** alinhamento correto abre o cilindro.
- **Pistas (2+):** símbolos espalhados pela sala definem cada anel.
- **Exemplo:** alinhar 4 símbolos zodiacais na ordem de uma tapeçaria.

### 7. Ligar Pontos / Circuito (Wiring / Connect)
- **Interação:** conectar fios/nós entre terminais sem cruzar, ou fechar um circuito.
- **Liberação:** circuito completo acende algo / abre porta.
- **Pistas (2+):** diagrama parcial; cores nos terminais.
- **Exemplo:** ligar cada fio à cor correspondente energiza o painel.

### 8. Balança / Peso (Weight Balance)
- **Interação:** distribuir pesos nos pratos até equilibrar (ou atingir um valor).
- **Liberação:** equilíbrio libera o compartimento.
- **Pistas (2+):** valores gravados nos pesos; alvo indicado por marca.
- **Exemplo:** somar exatamente o peso indicado destrava a gaveta.

### 9. Labirinto de Esfera (Tilt Maze)
- **Interação:** guiar uma esfera por um labirinto inclinando (setas) até o buraco-alvo.
- **Liberação:** esfera no destino aciona um contato.
- **Anti-spoiler:** habilidade espacial, sem código.

### 10. Sequência por Observação (Simon / Pattern Replay)
- **Interação:** repetir uma sequência de luzes/sons observada no cenário.
- **Liberação:** sequência correta abre o próximo passo.
- **Pistas (2+):** a sequência é insinuada por um objeto (ex.: ordem em que quadros acendem).

---

## Contrato Técnico (para o Frontend)

- Cada mecânica é implementada como um **painel interativo** (via `UIPanel`) OU como manipulação direta no **Canvas** (hit areas dinâmicas).
- Estado do puzzle vive em `state` (flags) — nunca `Math.random()` no game loop.
- Mecânicas visuais reaproveitáveis podem virar componentes da `ui-kit/` no futuro (ex.: `ui-kit/components/clock.js`, `sokoban.js`) — **somente após validação**.
- Toda mecânica deve funcionar com mouse (clique) e ser responsiva.

## Checklist de Validação (Sala 15 — teste)

- [ ] A interação é manipulativa (montar/mover/ajustar), não só digitar código
- [ ] Estado do puzzle é visível em tempo real
- [ ] Anti-spoiler respeitado (2+ pistas, nada literal)
- [ ] Acerto/erro com feedback claro e não-destrutivo
- [ ] Funciona bem com clique/responsivo
- [ ] Diversão e originalidade confirmadas pelo validador humano
