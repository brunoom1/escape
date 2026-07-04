# Sala 16 — O Cofre do Banco: Requisitos

## Propósito

Sala introdutória focada em exploração e dedução narrativa. O jogador cruza duas pistas visuais — um certificado com o ano parcial e um calendário — para descobrir o código de 4 dígitos do cofre. Sem mecânicas complexas; ideal para jogadores iniciantes.

## Tema

> Um banco art déco dos anos 30. Você é o vigia noturno que ficou trancado na tesouraria após um assalto. Os sistemas de segurança reativam ao amanhecer. Decifre os enigmas do gerente e arrombe o cofre para escapar.

## Conceito Principal — Dificuldade: ★★☆☆☆ (Fácil)

Dois ambientes (Tesouraria → Escritório) com progressão linear baseada em coleta e leitura:

| # | Mecânica | Aplicação na Sala 16 |
|---|----------|----------------------|
| 1 | Coleta de item | Achar chave dentro de livro oco na prateleira |
| 2 | Uso de item | Abrir caixa forte com a chave → obter certificado |
| 3 | Leitura de pista | Calendário na escrivaninha revela o ano completo |
| 4 | Código numérico | Cruzar certificado (19__) + calendário (1947) = 1947 |

**Mecânica diferenciadora:** dedução pura — o código nunca está escrito em lugar nenhum; o jogador precisa unir as duas metades da informação.

---

## Ambientes

### Ambiente 1: Tesouraria
Cofre principal do banco. Porta maciça de aço, balcão de mármore verde, prateleiras com livros contábeis, caixa forte lateral. Contém a saída (porta do cofre).

### Ambiente 2: Escritório do Gerente
Sala elegante com mobília de madeira escura, relógio de pêndulo, quadro a óleo, escrivaninha com calendário. Contém a pista final (ano de fundação).

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 2 ambientes navegáveis (Tesouraria ↔ Escritório) | Alta |
| RF-02 | Puzzle da prateleira: examinar livros → achar chave em livro oco | Alta |
| RF-03 | Puzzle da caixa forte: usar chave → obter certificado "Fundado em 19__" | Alta |
| RF-04 | Gate: passar pela grade só após obter o certificado | Alta |
| RF-05 | Puzzle do calendário: escrivaninha mostra "Fundado em 1947" | Alta |
| RF-06 | Puzzle final: inserir código 1947 na porta do cofre → escapar | Alta |
| RF-07 | Inventário com itens: chave, certificado, bilhete, ano | Alta |
| RF-08 | Integração login/timer/ranking (EscapeAPI.registrarResultado) | Alta |
| RF-09 | Aviso de jogador não logado | Média |
| RF-10 | Tema visual art déco (dourado, madeira escura, mármore verde) | Alta |

---

## Fluxo de Progressão (Gates)

```
Prateleira → achar chave em livro oco
       ▼
Caixa forte → usar chave → certificado "Fundado em 19__" + bilhete
       ▼
Grade → destranca (com certificado) → Escritório
       ▼
Escrivaninha → calendário "Fundado em 1947"
       ▼
Voltar → Tesouraria
       ▼
Porta do cofre → código 1947 → VITÓRIA
```

---

## Puzzles (Anti-Spoiler)

### 1. Prateleira → chave
- O jogador examina a prateleira e vê livros contábeis. Um deles, "Código Bancário", tem uma cavidade no miolo.
- Dentro da cavidade: uma chave de latão.
- **Feedback:** painel mostra o livro aberto; botão "Examinar cavidade" revela a chave.

### 2. Caixa forte → certificado
- A caixa forte está trancada. O jogador usa a chave de latão.
- Dentro: "Certificado de Fundação — O BANCO CENTRAL foi fundado em 19__." O último dígito está ilegível (mancha de tinta).
- Bilhete anexo: "O gerente guarda o dígito que falta no calendário da escrivaninha dele."
- **Anti-spoiler:** o certificado mostra apenas "19__" — o jogador precisa da segunda fonte.
- Ao pegar o certificado, a grade para o escritório é destrancada.

### 3. Calendário → ano completo
- Na escrivaninha do escritório, um calendário de mesa de 1947, aberto em julho, com o dia 19 circulado.
- Abaixo: "BANCO CENTRAL — Fundado em 19 de julho de 1947."
- O jogador anota 1947.
- **Anti-spoiler:** o calendário só é acessível após o certificado (gate). Nenhum item isolado dá a resposta completa.

### 4. Porta do cofre → código 1947
- A porta exige 4 dígitos. O jogador insere 1947.
- **Feedback:** erro = "Código incorreto. Lembre-se: certificado + calendário."; acerto = portas se abrem.
- **Anti-spoiler:** o jogador cruzou certificado (19__) + calendário (1947) — nenhuma fonte isolada revela >50%.

---

## Critérios de Aceite

- [ ] Progressão linear sem softlock (sempre há o que fazer)
- [ ] Anti-spoiler respeitado: 2+ pistas, nada literal
- [ ] Certificado mostra só "19__" (nunca "1947")
- [ ] Calendário mostra o ano completo
- [ ] Gate: grade só libera após pegar certificado
- [ ] Acerto/erro com feedback claro
- [ ] Funciona bem com clique e é responsivo
- [ ] Console sem erros

---

## Integração com Lobby

- Emoji: 🏦
- Título: "Sala 16 — O Cofre do Banco"
- Descrição: "O banco foi assaltado e você ficou trancado na tesouraria. Investigue o escritório do gerente, encontre o ano de fundação e arrombe o cofre."
- Dificuldade: ★★☆☆☆
- Tema UI Kit: `themes/artdeco.js`
