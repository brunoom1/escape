# Sala 9 — O Bunker da Guerra Fria: Requisitos

## Tema

> Berlim, 1962. Você é um espião duplo preso num bunker soviético. Sua cobertura foi descoberta. Têm 20 minutos antes da patrulha voltar. Precisa enviar uma mensagem cifrada ao quartel-general aliado via rádio e escapar pelo túnel secreto — mas a frequência, o código e a saída estão trancados atrás de camadas de segurança soviética.

## Conceito Principal — Dificuldade: ★★★☆☆ (Médio)

**Mecânica diferenciadora:** Sistema de **comunicação via rádio cifrada**. O jogador precisa montar uma mensagem usando uma cifra de substituição (encontrada em partes nos ambientes), ajustar a frequência correta do rádio e transmitir. O puzzle final combina criptografia básica + operação de equipamento vintage.

---

## Ambientes

### Ambiente 1: Escritório do Coronel
Sala de comando com mesa, mapas, documentos classificados. A cifra está parcialmente aqui.

### Ambiente 2: Sala de Comunicações
Rádio, equipamentos de transmissão, livro de códigos. O ponto de envio da mensagem.

### Ambiente 3: Sala de Arquivos
Estantes com dossiês, microfilmes, cofre. A frequência e a chave do túnel estão aqui.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes | Alta |
| RF-02 | Sistema de cifra de substituição (A=D, B=E, etc. — shift variável) | Alta |
| RF-03 | Jogador precisa descobrir o valor do shift a partir de pistas | Alta |
| RF-04 | Puzzle do rádio: ajustar frequência correta (dials giratórios) | Alta |
| RF-05 | Puzzle final: digitar mensagem cifrada corretamente | Alta |
| RF-06 | Cross-ambiente: shift no escritório, frequência nos arquivos, transmissão na sala de comunicação | Alta |
| RF-07 | Gate 1: Comunicações requer chave do escritório | Alta |
| RF-08 | Gate 2: Arquivos requer resolver puzzle no escritório | Alta |
| RF-09 | Cada ambiente com 5+ objetos | Alta |
| RF-10 | Tema visual: concreto soviético, vermelho/cinza, propaganda | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Canvas 2D, 900x600 |
| RNF-02 | Responsivo |
| RNF-03 | Zero dependências |
| RNF-04 | Efeito visual: estática no rádio ao ajustar frequência |

## Puzzle Principal

1. No escritório: documento parcialmente queimado mostra "CIPHER: +3" (shift de César = 3)
2. Nos arquivos: dossiê revela frequência de extração: "Canal Alfa = 103.7 MHz"
3. Na comunicação: o jogador precisa:
   - Ajustar rádio para 103.7 MHz (dial giratório)
   - Digitar a palavra-código cifrada: "EXTRAIR" com shift +3 = "HWUDLU"
   - A palavra-código original "EXTRAIR" é descoberta em fragmentos espalhados

O jogador cruza: shift(+3) + palavra(EXTRAIR) + frequência(103.7) = transmissão correta → túnel desbloqueia.

## Integração com Lobby
- Emoji: ☢️
- Título: "Sala 9 — O Bunker"
- Descrição: "Berlim, 1962. Sua cobertura caiu. Cifre a mensagem e transmita antes que a patrulha volte."
- Dificuldade: ★★★☆☆
