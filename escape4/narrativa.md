# Narrativa — Estação Espacial Abandonada

## Sinopse

A Estação Orbital Prometheus foi desativada há 6 meses após um "incidente não-classificado". Você é o Engenheiro de Sistemas Kael Ortiz, enviado para uma missão solo de recuperação de dados. Ao acoplar, os sistemas da estação entraram em pane — seu módulo de transporte foi desacoplado automaticamente. A única saída é a cápsula de emergência no módulo 3, mas toda a estação está sem energia.

## Motivação do Jogador

Kael precisa:
1. Encontrar autorização para acessar os módulos internos
2. Restaurar energia ao gerador principal
3. Ativar a cápsula de fuga na sequência correta de ignição

## Código de Ignição

A sequência correta é: **Motor → Oxigênio → Navegação → Propulsão**

A dedução exige cruzar 4 pistas de ambientes diferentes:
- **Terminal (Comando):** "Ativar na ordem de dependência" — cada sistema alimenta o próximo
- **Gerador (Energia):** "Motor alimenta sistema de O2" — Motor vem primeiro, O2 é segundo
- **Duto (Energia):** "O2 deve estar ativo antes da navegação" — O2 antes de Navegação
- **Manual (Cápsula):** "Propulsão é sempre o último" — Propulsão no fim

Nenhuma pista diz a sequência completa. O jogador precisa montar: Motor(1º por ser base) → O2(2º por depender do motor) → Navegação(3º por depender de O2) → Propulsão(sempre último).

---

## Ambiente 1: Módulo de Comando

**Contexto:** Centro de operações da estação. Telas apagadas, cadeira do capitão, terminal parcialmente funcional. A última pessoa aqui foi o Capitão Torres antes da evacuação.

**Mensagem inicial:** "Módulo de Comando. Telas apagadas, luzes de emergência. O silêncio do espaço é absoluto."

### Interações

| Objeto | Texto (1ª vez) | Texto (repetido) | Justificativa narrativa |
|--------|----------------|-------------------|------------------------|
| Terminal principal | "Terminal parcialmente funcional. Último log: 'PROTOCOLO DE FUGA: Ativar sistemas na ordem de dependência. Cada sistema alimenta o próximo.'" | "Log: 'Ativar na ordem de dependência. Cada sistema alimenta o próximo.'" | Pista #1: estabelece que há uma ORDEM baseada em dependência |
| Mapa da estação | "Mapa holográfico da estação. Três módulos conectados em série. Comando → Energia → Cápsula." | "Mapa: Comando → Energia → Cápsula." | Contextual: mostra a estrutura, não resolve puzzle |
| Cadeira do capitão | "Embaixo da cadeira: cartão de autorização magnético. 'Cap. Torres — Nível Máximo'. Com isso você acessa o módulo de energia." | "Nada mais sob a cadeira." | Gate item: desbloqueia módulo de energia |
| Janela espacial | "Escuridão total exceto uma estrela brilhante. Placa: 'Proxima Centauri — Referência de Navegação'. A cápsula precisa saber para onde ir." | "Proxima Centauri. Referência de navegação." | Ambiência + reforça que Navegação é um sistema da cápsula |
| Porta → Energia | *Transição se tem cartão* / "Porta trancada. Precisa de cartão de autorização." | — | Gate: exige cartão |

---

## Ambiente 2: Módulo de Energia

**Contexto:** Sala do gerador principal. Fusíveis queimados, armários técnicos, dutos de ventilação. O coração energético da estação está offline.

**Mensagem ao entrar:** "Módulo de Energia. O gerador principal está offline. Fusíveis queimados. Precisa restaurar."

### Interações

| Objeto | Texto (1ª vez) | Texto (repetido) | Justificativa narrativa |
|--------|----------------|-------------------|------------------------|
| Painel de fusíveis | "Painel de fusíveis. Slot 3 vazio e queimado. Sem este fusível, o gerador não reinicia." / *Com fusível:* "✅ Fusível instalado! O gerador ronca. Luzes acendem. Cápsula desbloqueada!" | "Painel completo. Energia restaurada." | Puzzle mecânico: encontrar fusível → instalar → gate para cápsula |
| Gerador principal | "Gerador offline. Placa técnica: 'Fluxo de energia: MOTOR → Sistema O2 → demais sistemas.' O motor é a base de tudo." | "Motor alimenta O2, que alimenta o restante." | Pista #2: Motor é primeiro, O2 depende dele |
| Armário técnico | "Dentro: fusível sobressalente compatível com Slot 3! Leve ao painel de fusíveis." | "Armário vazio. Fusível já coletado." | Item para resolver gate do painel |
| Duto de ventilação | "Placa de manutenção: 'ATENÇÃO: Ventilação(O2) DEVE estar ativa antes de iniciar navegação. Risco de hipóxia na cabine.'" | "O2 deve estar ativo antes da navegação." | Pista #3: O2 vem antes de Navegação |
| Porta → Comando | *Transição* | — | Navegação |
| Porta → Cápsula | *Transição se energia restaurada* / "Sem energia. Restaure o gerador." | — | Gate: energia |

---

## Ambiente 3: Módulo da Cápsula

**Contexto:** A cápsula de emergência. Painel de ignição com 4 slots para sequência de ativação. Visor mostrando o espaço. Manual de procedimentos.

**Mensagem ao entrar:** "Módulo da Cápsula. O painel de ignição aguarda a sequência correta para lançamento."

### Interações

| Objeto | Texto (1ª vez) | Texto (repetido) | Justificativa narrativa |
|--------|----------------|-------------------|------------------------|
| Painel de ignição | *Abre puzzle* "Painel com 4 slots: selecione a ordem de ativação dos sistemas (Motor, Oxigênio, Navegação, Propulsão)." | *Abre puzzle* | Puzzle final: requer dedução das 4 pistas |
| Visor da cápsula | "Rota calculada. Nota: 'Navegação requer referência estelar + O2 estável para tripulação.'" | "Navegação requer O2 estável + referência estelar." | Reforço: Navegação depende de O2 (complementa pista #3) |
| Manual de emergência | "Cap. 7: 'Em qualquer sequência de ignição, PROPULSÃO é o último sistema a ser ativado. Nunca inicie propulsão sem todos os outros online.'" | "Propulsão é sempre o último." | Pista #4: Propulsão é posição 4 |
| Porta → Energia | *Transição* | — | Navegação |

---

## Validação Anti-Spoiler

| Pista | Ambiente | O que revela | Resolve sozinha? |
|-------|----------|-------------|:----------------:|
| "Ordem de dependência" | Comando | Existe uma ordem, baseada em dependência | ❌ (não diz qual) |
| "Motor → O2" | Energia | Motor é 1º, O2 é 2º | ❌ (faltam posições 3 e 4) |
| "O2 antes de Navegação" | Energia | O2 vem antes de Nav | ❌ (não diz posição exata) |
| "Propulsão sempre último" | Cápsula | Propulsão = 4º | ❌ (faltam 1º, 2º, 3º) |
| **Todas combinadas** | Cross | Motor→O2→Nav→Propulsão | ✅ Dedução completa |

---

## Tela de Sucesso

**Título:** "🚀 IGNIÇÃO BEM-SUCEDIDA!"
**Subtítulo:** "A cápsula se desacopla da estação. Você está a caminho de Proxima Centauri. Sobreviveu."

## Tom
- Isolamento, silêncio espacial, tensão sci-fi
- Termos técnicos (mas compreensíveis)
- Solidão — você é o único ser vivo nesta estação
