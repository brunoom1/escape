# Narrativa — O Escritório do Detetive Desaparecido

## Sinopse

O Detetive Augusto Moreira desapareceu há 3 semanas enquanto investigava o caso da fraude financeira da Construtora Meridian. Você é um jornalista freelancer que recebeu um bilhete anônimo: *"O escritório de Moreira tem a verdade. Vá antes que eles limpem tudo."*

Ao entrar, a porta tranca automaticamente — um mecanismo de segurança que Moreira instalou. Para sair, você precisa abrir o cofre onde ele guardou as provas, e usar o conteúdo para destrancar a saída.

## Código do Cofre

O cofre exige o código **0847** — o número do caso policial que Moreira investigava. O jogador precisa:
1. Encontrar referência ao "caso #847" no quadro de investigação (sem o zero à esquerda)
2. Ver no laptop que o formato é 4 dígitos (log mostra: "Cofre atualizado: formato 4 dígitos")
3. Deduzir que precisa do zero à esquerda: **0847**

---

## Ambiente 1: Escritório Principal

**Contexto:** O escritório pessoal de Moreira. Mesa de trabalho, quadro de investigação com fotos e fios, estante com livros, luminária, lixeira. Tudo coberto por uma fina camada de poeira — ninguém entrou aqui em semanas.

**Mensagem inicial:** "O escritório do Detetive Moreira. Poeira cobre tudo. O ar está parado há semanas. A porta trancou atrás de você."

### Interações

| Objeto | Texto ao clicar (1ª vez) | Texto ao clicar (repetido) | Justificativa narrativa |
|--------|--------------------------|----------------------------|-------------------------|
| Quadro de investigação | "Um quadro cheio de fotos, recortes e fios vermelhos. No centro: 'CASO #847 — Meridian'. Fios conectam nomes a uma conta bancária." | "Caso #847 — Meridian. Os fios levam a um nome: 'V. Torres'." | Dá o número do caso (pista principal do código) |
| Mesa (laptop) | "O laptop está em standby. A tela acende: último acesso há 22 dias. Log do sistema: 'Cofre atualizado: formato 4 dígitos'. Bateria em 3%." | "Log: 'formato 4 dígitos'. A bateria está quase acabando." | Indica formato do código (4 dígitos = precisa do zero) |
| Mesa (gaveta) | "Na gaveta há uma agenda. A maioria das páginas foi arrancada. Sobrou uma anotação: 'Estante — 3º livro vermelho — puxar'." | "Agenda: 'Estante — 3º livro vermelho — puxar'." | Pista para encontrar a passagem para o arquivo |
| Estante (geral) | "Uma estante cheia de livros. Alguns sobre direito penal, outros sobre contabilidade. Um livro vermelho se destaca na 3ª posição." | "O livro vermelho na 3ª posição parece diferente." | Cenário — prepara para a interação com o livro |
| Estante (livro vermelho) | "Você puxa o livro vermelho. Um click mecânico. A estante desliza revelando uma passagem escura para um arquivo secreto!" | "A passagem para o arquivo está aberta." | Gate para o Ambiente 2 — justificado pela paranoia do detetive |
| Luminária | "Ao acender a luminária, um bilhete no chão fica visível: 'Eles sabem do caso. Protocolei tudo no arquivo. — M'" | "Bilhete: 'Protocolei tudo no arquivo. — M'" | Reforça que as provas estão no arquivo (motiva explorar) |
| Lixeira | "Papéis amassados. Um deles tem rabiscos: 'Não pode ser 847... é #0847? Sistema exige 4.' E um X riscado sobre '847'." | "Rabisco: '#0847? Sistema exige 4.' — riscado com frustração." | Pista decisiva: o código tem zero à esquerda |
| Cofre | *Abre painel de código* "Um cofre embutido na parede. Teclado numérico com 4 posições. Uma placa diz: 'Protocolo de Segurança Moreira'." | *Abre painel de código* | Puzzle principal — exige dedução |
| Porta | "A porta está trancada por dentro. O mecanismo exige um cartão magnético que está dentro do cofre." | "Trancada. Precisa do cartão que está no cofre." | Explica por que o cofre é necessário para escapar |

---

## Ambiente 2: Arquivo Secreto

**Contexto:** Uma sala estreita atrás da estante. Gavetas metálicas numeradas, mural de recortes de jornal, uma pasta aberta sobre uma mesa pequena. Luz fria de neon.

**Mensagem ao entrar:** "Uma sala oculta. Gavetas metálicas, luz de neon fria. Moreira era mais paranóico do que diziam."

### Interações

| Objeto | Texto ao clicar (1ª vez) | Texto ao clicar (repetido) | Justificativa narrativa |
|--------|--------------------------|----------------------------|-------------------------|
| Gaveta A (caso 847) | "Pasta etiquetada '#0847 — Meridian'. Dentro: fotos de reuniões secretas, extratos bancários. Uma nota: 'Torres é o intermediário'." | "Caso #0847. A etiqueta confirma: quatro dígitos com zero." | Confirma formato do caso como 0847 (validação) |
| Gaveta B | "Vazia. Apenas poeira e um clipe de papel." | "Vazia." | Red herring — nem tudo tem utilidade |
| Gaveta C | "Caso antigo. Irrelevante para a situação." | "Caso antigo. Nada útil aqui." | Ambiência — mostra que há mais casos |
| Gaveta D (trancada) | "Trancada. Parece que precisaria de uma chave que você não tem. Não é relevante agora." | "Trancada. Não é prioridade." | Sugere que há mais para descobrir (futuro) |
| Mural de recortes | "Manchetes de jornal: 'Construtora Meridian fecha contrato milionário'. Uma foto circulada em vermelho: rosto de um homem de terno." | "Manchetes sobre a Meridian. O rosto circulado... Torres?" | Ambientação — reforça a história |
| Pasta aberta | "Uma pasta com a conclusão de Moreira: 'Provas no cofre. Se algo me acontecer, o código é o caso. Quem me conhece, sabe.' Assinado A.M." | "'O código é o caso.' — Augusto Moreira." | Pista final direta: o código É o número do caso |
| Voltar ao escritório | *Transição* "Você volta ao escritório." | *Transição* | Navegação |

---

## Tela de Sucesso

**Título:** "🎉 VOCÊ ESCAPOU!"
**Subtítulo:** "As provas da fraude Meridian estão seguras. O caso do Detetive Moreira vai ser reaberto."
**Tempo:** exibir cronômetro

---

## Progressão Completa

```
1. Jogador entra no escritório → porta tranca
2. Explora: quadro (caso #847), laptop (4 dígitos), luminária (bilhete)
3. Encontra na gaveta a pista da estante (livro vermelho)
4. Puxa o livro → passagem para o arquivo secreto
5. No arquivo: gaveta A confirma "#0847", pasta confirma "código é o caso"
6. Lixeira no escritório: reforça "não pode ser 847, é 0847"
7. Vai ao cofre → digita 0847 → cofre abre
8. Dentro: cartão magnético + pendrive com provas
9. Usa cartão na porta → escapa
10. Tela de sucesso
```

## Tom
- Tenso, investigativo, noir
- Frases curtas e diretas
- Sensação de urgência leve (alguém pode vir)
- O jogador se sente como um aliado do detetive desaparecido
