# Sala 8 — A Pirâmide de Khufu: Requisitos

## Tema

> Expedição arqueológica no Egito, 1927. Você entrou na câmara recém-descoberta da Pirâmide de Khufu. Um mecanismo antigo selou a entrada atrás de você. As paredes estão cobertas de hieróglifos que parecem ser instruções — mas estão em código. Decifre a linguagem dos antigos para abrir a passagem secreta.

## Conceito Principal — Dificuldade: ★★★★★ (Expert)

**Mecânica diferenciadora:** Sistema de **decifração de hieróglifos**. O jogador encontra uma "pedra de roseta" parcial que traduz alguns símbolos. Precisa deduzir o restante por padrões e contexto. O puzzle final exige inserir uma sequência de hieróglifos específica (como um idioma a ser decifrado). Adicionalmente, "armadilhas" visuais indicam caminhos falsos.

---

## Ambientes

### Ambiente 1: Antecâmara
Entrada da pirâmide. Pinturas murais, tocha, inscrições iniciais. A "pedra de roseta" parcial está aqui.

### Ambiente 2: Corredor das Armadilhas
Passagem estreita com placas no chão (algumas são armadilhas visuais — piscar vermelho). Hieróglifos nas paredes indicam o caminho seguro.

### Ambiente 3: Câmara do Faraó
Sarcófago, altar, a grande parede com a sequência final. O puzzle de decifração acontece aqui.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes | Alta |
| RF-02 | Sistema de hieróglifos: 8 símbolos, cada um = uma letra/conceito | Alta |
| RF-03 | "Pedra de roseta" parcial: revela 4 de 8 traduções | Alta |
| RF-04 | Jogador deduz os 4 restantes por contexto dos murais | Alta |
| RF-05 | Puzzle final: inserir sequência de 5 hieróglifos corretos | Alta |
| RF-06 | "Armadilhas" visuais: caminhos falsos piscam vermelho (não causam game over) | Média |
| RF-07 | Puzzle secundário: decifrar a ordem das placas no corredor | Alta |
| RF-08 | Cross-ambiente: roseta na antecâmara, contexto no corredor, puzzle na câmara | Alta |
| RF-09 | Gate 1: corredor acessível após encontrar tocha | Alta |
| RF-10 | Gate 2: câmara acessível após resolver corredor | Alta |
| RF-11 | Dificuldade máxima — requer raciocínio lógico + reconhecimento de padrões | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Canvas 2D, 900x600 |
| RNF-02 | Responsivo |
| RNF-03 | Zero dependências |
| RNF-04 | Hieróglifos renderizados como símbolos Unicode ou shapes no Canvas |

## Puzzle Principal

8 hieróglifos representam conceitos: Sol, Lua, Água, Fogo, Terra, Ar, Vida, Morte.
- Pedra de roseta traduz 4: Sol=☀, Água=💧, Terra=🏔, Vida=🌱
- Murais no corredor mostram "oposto de Sol" ao lado de Lua → deduz Lua=🌙
- Outro mural: "oposto de Vida" com uma caveira → deduz Morte=💀
- Contexto: "o que queima sem água" → Fogo=🔥
- Eliminação: sobra Ar=💨

Sequência final (5 símbolos): representa uma frase ritual que o jogador monta a partir de fragmentos encontrados nos 3 ambientes.

## Integração com Lobby
- Emoji: 🏺
- Título: "Sala 8 — A Pirâmide de Khufu"
- Descrição: "Hieróglifos antigos guardam o segredo. Decifre a linguagem dos faraós para escapar da câmara selada."
- Dificuldade: ★★★★★
