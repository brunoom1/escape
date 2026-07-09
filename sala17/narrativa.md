# Narrativa — O Sanatório Abandonado

## Sinopse

O Sanatório Santa Clara foi palco de experimentos clandestinos nos anos 50 e fechado após o Incidente de 1994. Você é o Repórter Daniel Nunes, que invadiu o local em busca de provas para um documentário. Ao entrar, a porta de ferro desaba atrás de você — o mecanismo de segurança anti-invasão foi ativado. Para sair, precisa reativar o gerador do porão, encontrar o código do cofre da diretoria e usar a chave mestra para abrir a porta principal.

## Código do Cofre

O cofre exige o código **1947** — o ano de fundação do sanatório pelo Dr. Moretti. O jogador precisa:
1. Encontrar o quadro do Dr. Moretti na recepção com a inscrição "1947"
2. Ler o relatório do Incidente de 1994 que menciona "Diretor usava código pessoal — ano de fundação"
3. Restaurar energia para acessar a diretoria
4. Na diretoria, encontrar o bilhete confirmando "o ano que tudo começou"
5. Deduzir que o código de 4 dígitos é **1947**

---

## Ambiente 1: Recepção / Administração

**Contexto:** A recepção principal do sanatório. Balcão empoeirado, quadro de avisos na parede, arquivo morto com pastas, porta de ferro maciço à vista. Papel de parede desbotado, azulejos trincados.

**Mensagem inicial:** "Sanatório Santa Clara. O silêncio é pesado. Cheiro de mofo e desinfetante velho. A porta de ferro rangeu atrás de você — trancada."

### Interações

| Objeto | Texto ao clicar (1ª vez) | Texto ao clicar (repetido) | Justificativa narrativa |
|--------|--------------------------|----------------------------|-------------------------|
| Porta principal | "Porta de ferro maciço, enferrujada. Uma fechadura eletrônica desativada ao lado. Apenas a chave mestra pode abrir manualmente." | "Porta trancada. Precisa da chave mestra para abrir." | Gate final — mostra o objetivo |
| Quadro Dr. Moretti | "Foto empoeirada em moldura dourada. Dr. Henrique Moretti, olhar severo. Placa: 'Dr. Henrique Moretti — Fundador — 1947'. Abaixo, gravado: 'A mente é o maior dos labirintos.'" | "Dr. Moretti, 1947. 'A mente é o maior dos labirintos.'" | Pista #1 — expõe o ano 1947 |
| Arquivo morto | "Pastas amareladas. Uma se destaca: 'INCIDENTE 1994 — CONFIDENCIAL'. Relatório: 'Diretor Moretti mantinha tudo trancado no cofre da diretoria. Usava código de 4 dígitos — o ano de fundação do sanatório.'" | "Relatório: 'Código do cofre = ano de fundação, 4 dígitos.'" | Pista #2 — confirma que o código é o ano de fundação |
| Gaveta da recepção | "Gaveta emperrada. Com um puxão forte, abre. Dentro: uma chave enferrujada com etiqueta 'GERADOR — PORÃO'." | "Chave do gerador já coletada." | Gate item — desbloqueia o porão |
| Porta → Porão | *Transição se tem chave* / "Porta para o porão. Trancada. A etiqueta na fechadura: 'GERADOR'. Precisa da chave do gerador." | — | Gate porão |

---

## Ambiente 2: Porão / Diretoria

**Contexto:** O porão úmido do sanatório. Canos expostos, o gerador a diesel num canto, uma sala anexa que era a diretoria particular do Dr. Moretti. Luz fraca de uma janela alta.

**Mensagem ao entrar:** "O porão. Escuro, abafado. Canos gotejam. O gerador está silencioso. Uma porta entreaberta leva à antiga diretoria."

### Interações

| Objeto | Texto ao clicar (1ª vez) | Texto ao clicar (repetido) | Justificativa narrativa |
|--------|--------------------------|----------------------------|-------------------------|
| Gerador | "Gerador a diesel modelo antigo. Tanque vazio. Precisa de combustível para funcionar." | "Tanque vazio. Precisa de diesel." | Puzzle mecânico — encontrar diesel |
| Caixotes (diesel) | "Caixotes empilhados. Atrás deles, um galão de diesel enferrujado. Ainda tem combustível!" | "Galão de diesel já coletado." | Item para o gerador |
| Gerador (abastecido) | "O gerador tosse, tosse... e ronca. As luzes do porão acendem. Um zumbido elétrico percorre o prédio. A diretoria agora está acessível." | "Gerador funcionando. Energia restaurada." | Gate — desbloqueia diretoria |
| Diretoria (mesa) | "Mesa de carvalho do Dr. Moretti. Papéis espalhados. Um relógio de parede parado marca 19:47." | "Relógio parado: 19:47." | Pista #3 — reforço visual de 1947 |
| Diretoria (gaveta) | "Gaveta trancada. Sem energia elétrica, não abre. *Após gerador ligado:* A gaveta destrava. Dentro: bilhete 'O cofre guarda a chave mestra. Gire o código — o ano que tudo começou.'" | "Bilhete: 'Ano que tudo começou.'" | Pista #4 — confirma que o código é o ano de fundação |
| Cofre | *Abre painel de código* "Cofre antigo embutido na parede. Mostrador numérico de 4 dígitos. Gravado: 'Moretti — Propriedade Pessoal'." | *Abre painel de código* | Puzzle principal — exige dedução |
| Voltar à recepção | *Transição* "Você volta à recepção." | *Transição* | Navegação |

---

## Validação Anti-Spoiler

| Pista | Ambiente | O que revela | Resolve sozinha? |
|-------|----------|-------------|:----------------:|
| "1947" no quadro | Recepção | O ano de fundação | ❌ (pode ser só informação) |
| "Ano de fundação = código" | Recepção | Código é o ano de fundação | ❌ (não diz qual ano) |
| "19:47" no relógio | Diretoria | Reforço visual do número | ❌ (pode ser horário) |
| "Ano que tudo começou" | Diretoria | Confirma que é o ano de fundação | ❌ (não diz o número) |
| **Todas combinadas** | Cross | 1947 é o código | ✅ Dedução completa |

---

## Tela de Sucesso

**Título:** "🏥 VOCÊ ESCAPOU!"
**Subtítulo:** "As provas dos experimentos de Santa Clara estão seguras. O documentário de Daniel Nunes vai expor a verdade."
**Tempo:** exibir cronômetro

---

## Progressão Completa

```
1. Jogador entra na recepção → porta tranca
2. Explora: quadro (1947), arquivo (código = ano de fundação)
3. Encontra chave do gerador na gaveta
4. Vai ao porão com a chave
5. Encontra galão de diesel nos caixotes
6. Abastece o gerador → energia restaurada
7. Diretoria destrancada — relógio (19:47), gaveta com bilhete
8. Cofre: digita 1947 → abre
9. Dentro: chave mestra
10. Usa chave na porta principal → escapa
11. Tela de sucesso
```

## Tom
- Abandono, decadência, suspense psicológico
- Silêncio interrompido por rangidos e goteiras
- Sensação de estar sendo observado (sem estar)
- Verde hospitalar desbotado, ferrugem, mofo
