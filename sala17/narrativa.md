# Narrativa — O Sanatório Santa Clara

## Sinopse

O Sanatório Santa Clara foi fundado em 1947 pelo Dr. Henrique Moretti, um psiquiatra visionário que acreditava poder "curar a mente humana" através de métodos revolucionários. O que começou como um hospital psiquiátrico de prestígio se transformou em um centro de experimentos clandestinos.

**Linha do Tempo:**
- **1947** — Fundação por Dr. Moretti
- **1953** — Internação de João Ribeiro, o Paciente Zero
- **1967** — Síntese do Composto #9
- **1982** — Revolta liderada por Elena Castillo; denúncia de Lúcia Vargas
- **1994** — Incidente que causou o fechamento

Você é o Repórter **Daniel Nunes**, que invadiu o local em busca de provas para um documentário investigativo. Ao entrar, a porta de ferro desaba atrás de você — o antigo mecanismo de segurança anti-invasão foi ativado. Para sair, você precisa restaurar a energia, acessar a diretoria do Dr. Moretti e encontrar a chave mestra trancada em seu cofre pessoal.

---

## Personagens

| Personagem | Papel |
|-----------|-------|
| **Dr. Henrique Moretti** | Fundador e diretor. Gênio e monstro. Obsessão por controle da mente humana. |
| **Enfª Lúcia Vargas** | Enfermeira que denunciou os experimentos em 1982. Desapareceu após o Incidente de 1994. |
| **João Ribeiro** | Paciente Zero. Primeiro a receber o Composto #9 em 1953. Morreu sob "circunstâncias não documentadas". |
| **Elena Castillo** | Paciente que liderou a revolta de 1982. Transferida para "ala especial" após o motim. |

---

## Ambientes

### Ambiente 1: Recepção / Administração

**Contexto visual:** A recepção principal do sanatório. Balcão empoeirado, quadro do fundador na parede, arquivo morto com pastas, porta de ferro maciço. Papel de parede desbotado, azulejos trincados, luz fluorescente piscando.

**Mensagem ao entrar:** "Sanatório Santa Clara. O silêncio é pesado. Cheiro de mofo e desinfetante velho. A porta de ferro rangeu atrás de você — trancada."

**Objetos interativos (6):**

| ID | Objeto | 1º Clique | Repetido | Gate / Item |
|----|--------|-----------|----------|-------------|
| `portaPrincipal` | Porta de ferro | "Porta de ferro maciço. Fechadura eletrônica desativada. Apenas a chave mestra pode abrir." | "Porta trancada. Precisa da chave mestra." | Gate final |
| `quadroMoretti` | Quadro Dr. Moretti | Foto do Dr. Moretti. Placa: "Fundador — 1947". (Pista #1: ano 1947) | "Dr. Moretti, fundador em 1947." | Adiciona pista |
| `arquivoMorto` | Arquivo morto | Relatório "INCIDENTE 1994 — CONFIDENCIAL". "Código do cofre = ano de fundação, 4 dígitos." (Pista #2: código = ano fundação) | "Código = ano de fundação, 4 dígitos." | Adiciona pista |
| `gaveta` | Gaveta da recepção | Gaveta abre. Chave com etiqueta "ENFERMARIA — ALA B". | "Gaveta vazia." | Desbloqueia Enfermaria |
| `cartaLucia` | Carta da Enfª Lúcia | Carta de Lúcia Vargas, 1982: denunciou experimentos. Elena Castillo liderou a revolta. (Pista #3: ano 1982) | "Carta de Lúcia: denúncia de 1982." | Adiciona pista |
| `portaEnfermaria` | Porta → Enfermaria | Transição (se tem chave) / "Trancada. Precisa da chave." | — | Gate |

### Ambiente 2: Enfermaria / Laboratório

**Contexto visual:** Corredor da Ala B. Macas vazias enfileiradas, armário de medicamentos saqueado, canos expostos no teto, um painel cronológico na parede, o disjuntor principal ao fundo. Pintura verde hospitalar descascando.

**Mensagem ao entrar:** "Corredor da Enfermaria. Macas vazias, armários revirados. O silêncio é ainda mais pesado aqui."

**Objetos interativos (7):**

| ID | Objeto | 1º Clique | Repetido | Gate / Item |
|----|--------|-----------|----------|-------------|
| `prontuarioJoao` | Prontuário na maca | João Ribeiro, internado 1953. Paciente Zero. (Pista #4: ano 1953) | "João Ribeiro, 1953. Paciente Zero." | Adiciona pista |
| `diarioExperimentos` | Diário de experimentos | Composto #9 sintetizado em 1967. (Pista #5: ano 1967) | "Composto #9, 1967." | Adiciona pista |
| `painelCronologico` | Painel cronológico | Abre puzzle: ordenar 4 anos corretamente (1947, 1953, 1967, 1982) | "Painel já resolvido." | PUZZLE 1 |
| `disjuntor` | Disjuntor | Ativado após puzzle resolvido / "Verificação de sequência necessária" | "Energia restaurada." | Gate Porão |
| `armarioMedicamentos` | Armário de medicamentos | Frascos vazios de Composto #9. Saqueados às pressas. | "Armário vazio." | Lore |
| `portaRecepcao` | Voltar à Recepção | Transição | Transição | Navegação |
| `portaPorao` | Porta → Porão | Transição (se energia restaurada) / "Trancada. Sem energia." | — | Gate |

### Ambiente 3: Porão / Diretoria

**Contexto visual:** Porão úmido com canos expostos, o gerador a diesel, caixotes empilhados. Uma porta de ferro leva à sala da diretoria. Com energia, a sala do Dr. Moretti se revela: mesa de carvalho, relógio parado, cofre embutido na parede.

**Mensagem ao entrar:** "O porão. Escuro, abafado. Canos gotejam. O gerador está silencioso. Há uma porta marcada DIRETORIA."

**Objetos interativos (8):**

| ID | Objeto | 1º Clique | Repetido | Gate / Item |
|----|--------|-----------|----------|-------------|
| `gerador` | Gerador diesel | Tanque vazio / (com diesel) Liga! Restaura energia do porão. | "Gerador funcionando." | Gate diretoria |
| `caixotes` | Caixotes | Galão de diesel atrás — ainda tem combustível! | "Só poeira." | Item |
| `portaDiretoria` | Porta → Diretoria | "Trancada. Precisa de energia." | — | Gate visual |
| `mesaDiretoria` | Mesa do Dr. Moretti | Relógio parado: 19:47. (Pista #6: 19:47 visual) | "Relógio: 19:47." | Adiciona pista |
| `gavetaDiretoria` | Gaveta da mesa | Bilhete: "O código é o ano que tudo começou. — H.M." (Pista #7: confirmação) | "Gaveta vazia." | Adiciona pista |
| `diarioMoretti` | Diário do Dr. Moretti | Entrada final: "O ano que tudo começou é a chave." (Pista #8: reforço) | "Já lido." | Adiciona pista |
| `cofre` | Cofre Moretti | Abre painel de código / "Cofre aberto." | — | PUZZLE 2 |
| `voltar` | Voltar à Enfermaria | Transição | Transição | Navegação |

---

## Puzzles

### Puzzle 1: Painel Cronológico (Enfermaria)

**Mecânica:** Clique nos 4 anos na ordem cronológica correta: 1947 → 1953 → 1967 → 1982. Errar a ordem reseta a seleção.

**Pistas necessárias (mínimo 3 de fontes diferentes):**
- Pista A — Quadro do Moretti (Recepção): "Fundador — 1947"
- Pista B — Prontuário do João (Enfermaria): "Internado em 1953"
- Pista C — Diário de experimentos (Enfermaria): "Composto #9 sintetizado em 1967"
- Pista D — Carta da Lúcia (Recepção): "Denunciei em 1982"

**Recompensa:** Energia parcial restaurada → acesso ao Porão.

### Puzzle 2: Cofre do Moretti (Porão/Diretoria)

**Mecânica:** Digitar código numérico de 4 dígitos: **1947**.

**Pistas necessárias (mínimo 3 de fontes diferentes):**
- Pista 1 — Quadro do Moretti (Recepção): Placa "Fundador — 1947"
- Pista 2 — Arquivo morto (Recepção): "Código = ano de fundação, 4 dígitos"
- Pista 3 — Relógio na mesa (Diretoria): Parado em 19:47
- Pista 4 — Bilhete na gaveta (Diretoria): "O ano que tudo começou"
- Pista 5 — Diário do Moretti (Diretoria): "O ano que tudo começou é a chave"

**Recompensa:** Chave mestra → abrir porta principal → escapar.

---

## Validação Anti-Spoiler

### Puzzle 1 (Painel Cronológico)

| Pista | Origem | O que revela | Resolve sozinha? |
|-------|--------|-------------|:---:|
| "Fundador — 1947" | Recepção | Ano 1947 | ❌ (1 de 4 datas) |
| "Internado em 1953" | Enfermaria | Ano 1953 | ❌ (1 de 4 datas) |
| "Sintetizado em 1967" | Enfermaria | Ano 1967 | ❌ (1 de 4 datas) |
| "Denunciei em 1982" | Recepção | Ano 1982 | ❌ (1 de 4 datas) |
| **Todas combinadas** | Cross | Ordem cronológica completa | ✅ |

### Puzzle 2 (Cofre)

| Pista | Origem | O que revela | Resolve sozinha? |
|-------|--------|-------------|:---:|
| "Fundador — 1947" | Recepção | O ano 1947 | ❌ (pode ser só informação) |
| "Código = ano de fundação" | Recepção | Código é o ano de fundação | ❌ (não diz qual ano) |
| "19:47" no relógio | Diretoria | Número 1947 visual | ❌ (pode ser horário) |
| "Ano que tudo começou" | Diretoria | Confirma ser ano de fundação | ❌ (não diz o número) |
| **Todas combinadas** | Cross | 1947 é o código | ✅ |

**Labels de inventário — validação:**
- ✅ "Placa do Dr. Moretti — Fundador" (não contém 1947)
- ✅ "Relatório: código = ano de fundação" (não contém o número)
- ✅ "Relógio parado marcando 19:47" (formato ambíguo: horário ou ano?)
- ✅ '"O ano que tudo começou"' (não contém o número)
- ✅ "Carta da Enfª Lúcia Vargas" (não contém datas)

---

## Progressão Completa (passo a passo)

```
 1. Jogador entra na Recepção → porta tranca
 2. Explora Recepção:
    - Quadro: "Fundador — 1947"
    - Arquivo: "Código = ano de fundação"
    - Gaveta: chave da Enfermaria
    - Carta Lúcia: revolta de 1982
 3. Acessa Enfermaria com a chave
 4. Explora Enfermaria:
    - Prontuário João: 1953
    - Diário experimentos: 1967
    - Armário: Composto #9 (lore)
 5. Resolve Painel Cronológico (1947, 1953, 1967, 1982)
 6. Ativa o Disjuntor → energia restaurada
 7. Acessa o Porão
 8. Explora Porão:
    - Caixotes: galão de diesel
    - Gerador: abastece → liga → diretoria abre
 9. Explora Diretoria:
    - Mesa: relógio 19:47
    - Gaveta: bilhete "ano que tudo começou"
    - Diário Moretti: confirmação
10. Abre Cofre (código 1947) → chave mestra
11. Usa chave na porta principal → ESCAPA
12. Tela de sucesso
```

## Tela de Sucesso

- **Título:** "🏥 VOCÊ ESCAPOU!"
- **Subtítulo:** "As provas dos experimentos de Santa Clara estão seguras. O documentário de Daniel Nunes vai expor a verdade."
- **Tempo:** exibir cronômetro

## Tom

- Abandono, decadência, suspense psicológico
- Silêncio interrompido por rangidos e goteiras
- Sensação de estar sendo observado
- Verde hospitalar desbotado, ferrugem, mofo
- Entre o horror médico e o thriller investigativo
