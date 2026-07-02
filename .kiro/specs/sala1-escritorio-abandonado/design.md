# Sala 1 — Design Técnico (Revitalização)

## Ambientes

### Ambiente 1: Escritório Principal

```
┌─────────────────────────────────────────────────┐
│  Escritório do Detetive Moreira                  │
│                                                   │
│  ┌──────────┐           ┌─────────────────────┐ │
│  │ Estante  │           │ Quadro de           │ │
│  │ (livros) │           │ Investigação        │ │
│  │ [mech.]  │           │ (fotos + fios)      │ │
│  └──────────┘           └─────────────────────┘ │
│                                                   │
│       ┌───────────────────┐      ┌─────┐        │
│       │   Mesa do detetive│      │Cofre│        │
│       │  (gaveta, laptop) │      │ 🔒  │        │
│       └───────────────────┘      └─────┘        │
│                                                   │
│  💡 Luminária        🗑️ Lixeira     🚪 Porta    │
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Quadro de investigação | Click | Revela fotos, fios e caso #0847 |
| Mesa (gaveta) | Click | Contém agenda com datas riscadas |
| Mesa (laptop) | Click | Tela travada, mostra último acesso: "14/03" |
| Estante | Click (após pista) | Mecanismo revela passagem para Arquivo |
| Luminária | Click | Ilumina bilhete caído no chão |
| Lixeira | Click | Papel amassado com anotação parcial |
| Cofre | Click | Painel de código (puzzle final) |
| Porta | Click | Trancada — "você precisa do que está no cofre" |

### Ambiente 2: Arquivo Secreto

```
┌─────────────────────────────────────────────────┐
│  Arquivo Secreto (atrás da estante)              │
│                                                   │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐       │
│  │Gaveta│  │Gaveta│  │Gaveta│  │Gaveta│       │
│  │  A   │  │  B   │  │  C   │  │  D   │       │
│  └──────┘  └──────┘  └──────┘  └──────┘       │
│                                                   │
│  ┌────────────────────┐     ┌──────────┐        │
│  │  Mural de recortes │     │ Cofre    │        │
│  │  de jornal         │     │ pequeno  │        │
│  └────────────────────┘     └──────────┘        │
│                                                   │
│  📁 Pasta de caso     🔙 Voltar ao escritório   │
└─────────────────────────────────────────────────┘
```

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Gaveta A | Click | Relatório policial com data: 08/47 |
| Gaveta B | Click | Vazia — "só poeira" |
| Gaveta C | Click | Foto de suspeito com número de badge |
| Gaveta D | Click | Trancada (precisa da chave do escritório) |
| Mural de recortes | Click | Manchetes com números circulados |
| Pasta de caso | Click | Resume as conexões (meta-pista) |
| Cofre pequeno | Click | Contém chave da porta (liberado após puzzle principal) |
| Voltar | Click | Retorna ao escritório |

---

## Progressão

```
1. Jogador começa no Escritório Principal
2. Explora mesa, quadro, luminária → coleta pistas narrativas
3. Encontra mecanismo na estante → desbloqueia Arquivo Secreto
4. No Arquivo: encontra relatórios e datas que complementam pistas do escritório
5. Com todas as pistas, deduz o código do cofre principal
6. Cofre abre → contém chave/documento que libera a porta
7. Escape!
```

---

## Assets Necessários

### Cenários (Canvas backgrounds)
- `escritorio_bg.png` — Escritório escuro com mesa, estante, janela com persiana
- `arquivo_bg.png` — Sala de arquivo com gavetas metálicas, luz fria

### Objetos interativos
- Quadro de investigação (com fotos, fios, pins)
- Mesa com laptop e gaveta
- Estante com livros (um livro é trigger)
- Luminária (toggle de luz)
- Cofre de parede
- Gavetas metálicas (A-D)
- Mural de jornal
- Pasta de arquivo

### UI
- Painel de código do cofre (4 dígitos com dial)
- Indicador de ambiente (tabs: Escritório | Arquivo)

---

## Interface

```
┌──────────────────────────────────────────────┐
│  [Escritório]  [Arquivo 🔒]         ← tabs  │
├──────────────────────────────────────────────┤
│                                              │
│         Canvas (900x600)                     │
│         Cenário atual com objetos            │
│                                              │
├──────────────────────────────────────────────┤
│  Mensagem narrativa                          │
├──────────────────────────────────────────────┤
│  [ items... ]                ← inventário    │
└──────────────────────────────────────────────┘
```
