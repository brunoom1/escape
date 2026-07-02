# Sala 1 — O Escritório Abandonado: Requisitos de Revitalização

## Estado Atual (POC)

### O que existe
- Ambiente único com 5 objetos (emojis posicionados com CSS absoluto)
- Puzzle: código numérico de 4 dígitos (7342)
- Inventário fixo de 3 slots
- Renderização via DOM simples
- Pistas diretas e lineares ("o primeiro número é 7", "segundo dígito = 3")
- Sem narrativa de fundo (não há justificativa para por que o jogador está ali)
- Sem cenário visual (fundo preto com emojis)

### Problemas Identificados
- Sem história — o jogador não sabe por que está no escritório
- Visual pobre — emojis sobre fundo escuro, sem imersão
- Puzzle muito direto — pistas dizem literalmente os números
- Inventário limitado a 3 slots fixos
- Sem feedback visual nos objetos (sem hover glow)
- Sem ambientação sonora ou visual (sem animações, partículas)
- Sem múltiplos ambientes (tudo num único espaço plano)

---

## Tema Revitalizado

> **O Escritório do Detetive Desaparecido**
>
> Você é um jornalista investigativo que recebeu uma dica anônima para visitar o escritório do Detetive Moreira, desaparecido há 3 semanas. A porta trancou atrás de você. Para sair, precisa desvendar o caso que ele investigava — o código do cofre esconde a verdade.

---

## Ambientes (Multi-ambiente)

### Ambiente 1: Escritório Principal
O escritório em si — mesa, estante, quadro de investigação com fotos e fios conectando pistas.

### Ambiente 2: Arquivo Secreto
Uma sala oculta atrás da estante, revelada ao encontrar um mecanismo. Arquivos antigos, provas e documentos classificados.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | Deve ter 2 ambientes navegáveis (escritório + arquivo secreto) | Alta |
| RF-02 | Cada ambiente deve ter pelo menos 5 objetos interativos | Alta |
| RF-03 | Transição entre ambientes via fade no Canvas | Alta |
| RF-04 | Inventário dinâmico e expansível (sem limite fixo) | Alta |
| RF-05 | Puzzle final: código de cofre derivado de pistas narrativas (não literais) | Alta |
| RF-06 | Narrativa coesa: cada pista justificada dentro da história do detetive | Alta |
| RF-07 | Gate: arquivo secreto requer encontrar mecanismo no escritório | Alta |
| RF-08 | Cenário renderizado em Canvas com assets visuais (não emojis) | Alta |
| RF-09 | Animações ambientais (relógio, poeira, luz de luminária) | Média |
| RF-10 | Tela de sucesso com tempo e link lobby/próxima sala | Alta |
| RF-11 | Feedback visual em objetos interativos (glow ao hover) | Média |
| RF-12 | Mensagens narrativas que constroem a história progressivamente | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Renderização 100% em Canvas 2D |
| RNF-02 | Responsivo 360px a 1920px |
| RNF-03 | Zero dependências externas |
| RNF-04 | 60fps no game loop |
| RNF-05 | Carregamento < 1s |

---

## Puzzle Redesenhado

**Antes (POC):** Pistas dizem literalmente "primeiro número é 7", "segundo dígito = 3" → Código: 7342

**Depois (Revitalizado):** O código é derivado de pistas narrativas que o jogador precisa interpretar:
- Data de um relatório encontrado no arquivo (dia e mês)
- Número de um caso policial na foto do quadro de investigação
- Referência cruzada entre documentos de ambientes diferentes

O jogador precisa **deduzir**, não apenas **ler**.
