---
inclusion: auto
---

# Lições Aprendidas — Erros Comuns e Como Evitá-los

Este documento registra problemas encontrados durante o desenvolvimento e revitalização das salas. Todo agente DEVE consultar estas regras antes de entregar qualquer trabalho.

---

## 1. Hit Areas Desalinhadas com Render Visual

**Problema:** Os retângulos de clique (hit detection) estavam em posições completamente diferentes de onde os objetos eram visualmente desenhados no Canvas. O jogador clicava no "ar" e acionava objetos, ou clicava em objetos visíveis sem resposta.

**Causa raiz:** O render.js (Design) e o index.html (Frontend) foram criados separadamente sem sincronizar coordenadas. O Designer posicionou objetos em um lugar, o Frontend usou coordenadas antigas de outra versão.

**Regra:**
> Sempre que um objeto é desenhado no render (ex: `fillRect(x, y, w, h)`), o hit area no index.html DEVE usar EXATAMENTE os mesmos valores `{x, y, w, h}`.

**Processo obrigatório:**
1. Designer define posição visual no render.js: `ctx.fillRect(620, 80, 110, 100)` (cofre)
2. Frontend copia EXATAMENTE para o objeto: `{ id: 'cofre', x: 620, y: 80, w: 110, h: 100 }`
3. Se o Designer mover um objeto, o Frontend DEVE atualizar o hit area na mesma entrega
4. Nunca entregar render.js sem uma tabela de posições para o Frontend

**Formato de entrega do Designer ao Frontend:**
```
| Objeto | x | y | w | h |
|--------|---|---|---|---|
| cofre  | 620 | 80 | 110 | 100 |
| porta  | 810 | 130 | 70 | 290 |
```

---

## 2. Math.random() Dentro do Game Loop

**Problema:** Livros na estante "tremiam" incontrolavelmente, como se estivessem vibrando.

**Causa raiz:** `Math.random()` era chamado dentro da função de render que executa a 60fps. A cada frame os valores mudavam, causando movimento aleatório constante.

**Regra:**
> NUNCA usar `Math.random()` dentro de funções de render que rodam no game loop. Valores aleatórios devem ser pré-calculados UMA vez e reutilizados.

**Errado:**
```javascript
function render(ctx) {
  const h = 40 + Math.random() * 15; // TREMOR a 60fps!
  ctx.fillRect(x, y, 20, h);
}
```

**Correto:**
```javascript
const heights = [48, 42, 53, 45, 50]; // pré-calculado
function render(ctx) {
  ctx.fillRect(x, y, 20, heights[i]); // estável
}
```

---

## 3. Tag `<script>` Faltante

**Problema:** O jogo não carregava — erro de sintaxe no HTML. Código JavaScript aparecia solto no body sem tag de abertura.

**Causa raiz:** Ao reorganizar scripts (separar render.js do inline), a tag `<script>` de abertura do bloco inline foi acidentalmente removida.

**Regra:**
> Após qualquer refatoração que mova scripts, SEMPRE verificar que:
> 1. Todo `<script src="..."></script>` está fechado
> 2. O bloco de script inline tem `<script>` antes e `</script>` depois
> 3. Não há código JS solto entre tags HTML

**Checklist pós-refatoração:**
```
- [ ] Contar tags <script> abertas = contar </script> fechadas
- [ ] Código inline não começa sem <script>
- [ ] Nenhum erro no console ao abrir a página
```

---

## 4. Parâmetro Faltante na Chamada de Função

**Problema:** `TypeError: Cannot read properties of undefined (reading 'get')` — o jogo crashava ao tentar renderizar.

**Causa raiz:** A função `renderEscritorio(ctx, state)` esperava `state` como parâmetro, mas era chamada como `renderEscritorio(ctx)` — sem o segundo argumento.

**Regra:**
> Quando uma função é extraída para arquivo externo (render.js), VERIFICAR que todas as chamadas passam os mesmos parâmetros que a assinatura exige.

**Checklist:**
```
- [ ] Assinatura da função: renderXxx(ctx, state) → 2 parâmetros
- [ ] Chamada no game loop: renderXxx(ctx, state) → 2 argumentos ✓
- [ ] NÃO: renderXxx(ctx) → falta state → crash
```

---

## 5. Regra Anti-Spoiler nos Labels de Inventário

**Problema:** O label do item no inventário dizia literalmente a solução do puzzle: "3 dígitos não bastam. Preencha com zeros à esquerda." — isso dava a resposta de bandeja.

**Causa raiz:** O Roteirista/Frontend escreveu o label pensando em ser descritivo, mas esqueceu que o inventário é inspecionável e o label é visível ao jogador.

**Regra:**
> Labels de inventário são VISÍVEIS ao jogador (via inspeção). Eles NUNCA podem conter:
> - A resposta do puzzle
> - Instruções que eliminem a necessidade de dedução
> - Combinações numéricas ou sequências completas

**Errado:** `'Nota: "3 dígitos não bastam. Preencha com zeros à esquerda."'`
**Correto:** `'Nota: "O sistema rejeitou. Preciso completar o formato."'`

**Teste:** Ler APENAS o label — se resolvo o puzzle com essa info sozinha → PROIBIDO.

---

## 6. Posição Visual vs Narrativa Inconsistente

**Problema:** A narrativa dizia "3º livro vermelho" mas visualmente o livro estava na 2ª posição da 2ª fileira. O jogador vê uma coisa e lê outra.

**Causa raiz:** O Designer posicionou o livro sem consultar a narrativa do Roteirista. Cada um trabalhou isoladamente.

**Regra:**
> Todo objeto que é REFERENCIADO por texto narrativo DEVE estar visualmente na posição que o texto descreve. Se a narrativa diz "3º livro", ele DEVE ser o 3º visualmente.

**Processo:**
1. Roteirista define: "3º livro vermelho na estante"
2. Designer OBRIGATORIAMENTE posiciona na 3ª posição da estante
3. Se o Designer precisar mudar por questão estética, deve solicitar ao Roteirista a alteração do texto
4. Nunca entregar sem cruzar texto × posição visual

---

## 7. Funções de Render Duplicadas

**Problema:** Após extrair renderização para render.js, as funções antigas inline permaneceram no index.html. Resultava em conflito (duas versões da mesma função) e confusão sobre qual era usada.

**Causa raiz:** A refatoração foi parcial — adicionou o novo arquivo mas não removeu o código antigo completamente.

**Regra:**
> Ao extrair código para arquivo externo:
> 1. Criar o arquivo externo com as funções
> 2. Adicionar `<script src="arquivo.js">` no HTML
> 3. REMOVER completamente as funções inline equivalentes
> 4. Testar que não há redeclaração no console

---

## Resumo de Regras para Cada Agente

### Design Gráfico
- Entregar tabela de posições `{x, y, w, h}` junto com o render
- Nunca usar `Math.random()` no render (pré-calcular valores)
- Posicionar objetos conforme a narrativa (3º = 3ª posição visual)

### Frontend
- Hit areas DEVEM copiar coordenadas exatas do render
- Verificar tags `<script>` após refatoração
- Verificar parâmetros de funções externas
- Remover código antigo ao substituir por arquivo externo

### Roteirista
- Labels de inventário são visíveis — aplicar Anti-Spoiler neles também
- Descrever posições de objetos com precisão (o Designer vai seguir literalmente)

### Jogador Profissional
- Testar clicando em cada objeto visual e confirmar que responde
- Inspecionar cada label de inventário e validar Anti-Spoiler
- Verificar consistência texto × visual (o que leio = o que vejo)

### Gerente
- Exigir tabela de posições na entrega do Designer
- Cruzar narrativa com posições visuais antes de enviar para Frontend
- Testar build antes de enviar para UX/Jogador (erros de console = blocker)
