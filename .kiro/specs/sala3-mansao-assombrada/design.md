# Sala 3 — Design Técnico (Revitalização)

## Ambientes

### Ambiente 1: Salão Principal

```
┌─────────────────────────────────────────────────┐
│  Salão Principal — Mansão Blackwood              │
│                                                   │
│  ┌────────┐        ┌──────────┐   ┌──────────┐ │
│  │Retrato │        │  Lustre  │   │ Retrato  │ │
│  │família │        │ (flicker)│   │ filha    │ │
│  └────────┘        └──────────┘   └──────────┘ │
│                                                   │
│  ┌──────────────┐              ┌───────────┐    │
│  │   Lareira    │              │ Escadaria │    │
│  │  (fogo anim.)│              │ (blocked) │    │
│  │  [cofre]     │              └───────────┘    │
│  └──────────────┘                               │
│                                                   │
│  🕰️ Relógio avô     🪑 Poltrona    🚪 Biblioteca(🔒) │
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Retrato da família | Click | Revela rostos, posições dos membros (pista para altar) |
| Retrato da filha | Click (2x) | Primeiro: olhos parecem seguir você. Segundo: moldura se move → cofre |
| Lareira | Click | Inscrição na pedra da lareira: símbolo do Norte |
| Cofre (atrás retrato) | Click | Puzzle de combinação → contém Cálice |
| Relógio de avô | Click | Parado em hora específica (pista para puzzle biblioteca) |
| Poltrona | Click | Embaixo: chave antiga da biblioteca |
| Lustre | Click | Balança — revela marca no teto (símbolo) |
| Porta → Biblioteca | Click | Requer chave encontrada na poltrona |

### Ambiente 2: Biblioteca

```
┌─────────────────────────────────────────────────┐
│  Biblioteca — Ala Oeste                          │
│                                                   │
│  ┌──────────────────────────────────────────┐   │
│  │  Estantes (chão ao teto)                  │   │
│  │  [livro vermelho diferente = Grimório]    │   │
│  └──────────────────────────────────────────┘   │
│                                                   │
│  ┌──────────────┐    ┌──────────┐              │
│  │ Escrivaninha │    │  Globo   │              │
│  │ (diário +    │    │terrestre │              │
│  │  adaga)      │    └──────────┘              │
│  └──────────────┘                               │
│                                                   │
│  🪞 Espelho        🕯️ Candelabro   📖 Diário    │
│                                                   │
│  🔙 Salão          🚪 Porão (🔒 — painel secreto)│
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Estantes | Click | Muitos livros. Um com capa vermelha se destaca → Grimório (artefato) |
| Escrivaninha (gaveta) | Click | Contém Adaga Cerimonial (artefato) |
| Escrivaninha (diário) | Click | Relatos da família: "Norte=Cálice, Sul=Adaga, Leste=Amuleto, Oeste=Grimório" (encriptado) |
| Globo terrestre | Click | Gira e revela compartimento (pista sobre pontos cardeais) |
| Espelho | Click | Reflexo mostra símbolo não visível a olho nu (pista) |
| Candelabro | Click | Ao acender na posição certa, revela painel secreto para o porão |
| Diário completo | Click | Múltiplas páginas com pistas do ritual |
| Porta → Porão | Click | Painel secreto — requer puzzle do candelabro + globo + espelho |
| Voltar ao Salão | Click | Retorna |

### Ambiente 3: Porão / Sala do Ritual

```
┌─────────────────────────────────────────────────┐
│  Porão — Sala do Ritual                          │
│                                                   │
│              ┌──────────────────┐                │
│              │  Círculo ritual  │                │
│              │                  │                │
│              │   N:[ ]  altar  │                │
│              │ O:[ ]      E:[ ]│                │
│              │   S:[ ]         │                │
│              │                  │                │
│              └──────────────────┘                │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Gravuras │  │  Velas   │  │ Amuleto no   │  │
│  │ parede   │  │(dispostas│  │ pedestal     │  │
│  └──────────┘  │em padrão)│  └──────────────┘  │
│                └──────────┘                      │
│                                                   │
│  🔙 Biblioteca       🚪 Porta selada (saída)    │
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Círculo ritual / Altar | Click | Puzzle final — posicionar 4 artefatos nos pontos cardeais |
| Gravuras na parede | Click | Ilustrações da família em posições (N, S, L, O) — pista visual |
| Velas | Click | Padrão de disposição indica sequência |
| Amuleto no pedestal | Click | Coleta Amuleto (artefato) — "estava aqui desde o início" |
| Porta selada | Click | "Símbolos brilham. O ritual precisa ser completado." |
| Voltar à Biblioteca | Click | Retorna |

---

## Progressão

```
1. Jogador começa no Salão Principal
2. Explora retratos, lareira, relógio → coleta pistas e chave
3. Usa chave → desbloqueia Biblioteca
4. Na Biblioteca: encontra diário, Grimório, Adaga, pistas do ritual
5. Resolve puzzle do candelabro/globo/espelho → desbloqueia Porão
6. No Porão: coleta Amuleto, lê gravuras
7. No Salão: retorna ao cofre (resolve com pistas cruzadas) → coleta Cálice
8. Volta ao Porão com os 4 artefatos
9. Posiciona artefatos nos pontos cardeais corretos (pistas: diário + gravuras + retrato)
10. Ritual completo → selo quebrado → Porta aberta → Escape!
```

---

## Eventos Sobrenaturais (Imersão)

Eventos contextuais que acontecem durante o jogo para aumentar tensão:

| Momento | Evento | Efeito |
|---------|--------|--------|
| Ao entrar na biblioteca | Porta bate sozinha | Animação + som + msg: "O ar esfriou..." |
| Ao pegar o Grimório | Lustre do salão balança | Se voltar ao salão, lustre oscila |
| Ao entrar no porão | Velas acendem sozinhas | Animação sequencial |
| Ao posicionar 3 artefatos | Tremor | Tela vibra sutilmente (CSS shake) |
| Ao completar o ritual | Luz intensa | Flash branco → tela de sucesso |

---

## Assets Necessários

### Cenários (Canvas backgrounds)
- `salao_bg.png` — Hall gótico com lareira, retratos, escadaria, chão de madeira escura
- `biblioteca_bg.png` — Sala com estantes enormes, escrivaninha, velas, tons quentes
- `porao_bg.png` — Subsolo de pedra, círculo no chão, velas, atmosfera sobrenatural

### Objetos interativos
- Retratos (família, filha) com molduras ornamentadas
- Lareira com fogo procedural
- Relógio de avô
- Cofre antigo (atrás de retrato)
- Estantes com livros (Grimório destacado)
- Escrivaninha com diário e gaveta
- Globo terrestre
- Espelho ornamentado
- Candelabro
- Altar de pedra com 4 posições (N, S, L, O)
- Gravuras na parede
- Velas (padrão)
- 4 Artefatos: Cálice, Adaga, Amuleto, Grimório

### Animações procedurais (Canvas)
- Fogo da lareira (partículas + gradient)
- Flicker de velas
- Partículas de poeira flutuando
- Sombras que se movem
- Nuvens passando pela janela (lua)
- Brilho dos símbolos no porão

### UI
- Puzzle do altar (4 slots nos pontos cardeais, drag/select de artefatos)
- Puzzle do cofre (combinação rotativa)
- Indicador de ambientes (tabs: Salão | Biblioteca | Porão)

---

## Interface

```
┌──────────────────────────────────────────────────┐
│  [Salão]  [Biblioteca 🔒]  [Porão 🔒]    ← tabs │
├──────────────────────────────────────────────────┤
│                                                    │
│         Canvas (900x600)                           │
│         Cenário gótico + objetos + animações       │
│                                                    │
├──────────────────────────────────────────────────┤
│  💀 Mensagem narrativa / diálogo                  │
├──────────────────────────────────────────────────┤
│  [ items... ]                   ← inventário      │
└──────────────────────────────────────────────────┘
```
