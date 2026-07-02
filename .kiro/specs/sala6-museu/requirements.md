# Sala 6 — O Museu à Noite: Requisitos

## Tema

> Você é um segurança noturno no Museu Nacional de Arte. Às 3h da manhã, o sistema de alarme travou com você dentro. As portas selaram, lasers de segurança ativaram em padrões aleatórios. Precisa alcançar o painel central de segurança para fazer o override — mas os sensores bloqueiam seu caminho.

## Conceito Principal — Dificuldade: ★★★☆☆ (Médio)

**Mecânica diferenciadora:** Sistema de "lasers" visuais que bloqueiam acesso a certos objetos até serem desabilitados. O jogador precisa desativar sensores em sequência correta, "desbloqueando" áreas do cenário progressivamente. Visualmente, linhas vermelhas cruzam o Canvas e desaparecem conforme puzzles são resolvidos.

---

## Ambientes

### Ambiente 1: Galeria Principal
Salão com pinturas, esculturas, vitrines. Lasers vermelhos cruzam entre os quadros. Algumas áreas inacessíveis.

### Ambiente 2: Sala de Segurança
Monitores, painel de controle, caixa de ferramentas. O coração do sistema de alarme.

### Ambiente 3: Ala Egípcia
Sarcófagos, hieróglifos, joias. O painel de override está escondido aqui — protegido pelo último nível de segurança.

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF-01 | 3 ambientes navegáveis | Alta |
| RF-02 | Sistema de "lasers" visuais que bloqueiam objetos | Alta |
| RF-03 | Desabilitar sensores desbloqueia áreas progressivamente | Alta |
| RF-04 | Cada ambiente com 5+ objetos interativos | Alta |
| RF-05 | Puzzle principal: sequência de desativação de 4 sensores (lógica de circuito) | Alta |
| RF-06 | Puzzle secundário: código de acesso à Ala Egípcia (derivado de datas nas obras) | Alta |
| RF-07 | Cross-ambiente: números nas placas das obras + monitor na segurança | Alta |
| RF-08 | Gate 1: Sala de Segurança requer crachá do turno anterior | Alta |
| RF-09 | Gate 2: Ala Egípcia requer código de 4 dígitos | Alta |
| RF-10 | Tema visual: escuro com lasers vermelhos, vitrines iluminadas | Alta |

## Requisitos Não-Funcionais

| ID | Requisito |
|----|-----------|
| RNF-01 | Canvas 2D, 900x600 |
| RNF-02 | Responsivo 360-1920px |
| RNF-03 | Zero dependências |
| RNF-04 | Animação de lasers (linhas vermelhas pulsantes) |

## Puzzle Principal

4 sensores em locais diferentes precisam ser desativados em ordem baseada num esquema de circuito encontrado na Sala de Segurança. O jogador precisa:
1. Encontrar o diagrama de circuito (Segurança)
2. Identificar qual sensor alimenta qual (dependência)
3. Desativar na ordem correta: desativar o "raiz" primeiro, senão o sistema reseta

## Integração com Lobby
- Emoji: 🏛️
- Título: "Sala 6 — O Museu à Noite"
- Descrição: "Lasers de segurança ativaram. Navegue entre as obras e desative o sistema antes do amanhecer."
- Dificuldade: ★★★☆☆
