# Narrativa — O Submarino Afundado

## Sinopse
O submarino K-47, em missão de reconhecimento no Atlântico Norte, sofreu uma falha no reator. A explosão inundou os compartimentos de popa. Você é o Tenente Vasquez, o único consciente na seção de proa. A água infiltra pelas frestas do casco. A escotilha de emergência no módulo de máquinas é a única saída — mas está selada eletronicamente.

## Código das Válvulas
Ordem correta: **Azul (12 PSI) → Vermelha (45 PSI) → Amarela (78 PSI)** — pressão crescente.

Dedução a partir de:
- Manual na proa: "Ativar válvulas na ordem de PRESSÃO CRESCENTE para evitar ruptura nas junções"
- Manômetros nas máquinas: cada válvula tem um valor diferente (12, 45, 78)
- Nenhuma pista diz a ordem diretamente — jogador precisa ler os 3 manômetros e aplicar a regra do manual

## Ambiente 1: Compartimento de Proa

**Mensagem inicial:** "O casco geme. Água infiltra pelas frestas. Você é o único acordado. A escotilha de emergência está na sala de máquinas."

| Objeto | Texto (1ª vez) | Texto (repetido) | Justificativa |
|--------|----------------|-------------------|---------------|
| Periscópio | "Superfície a 340 metros acima. Nenhum resgate à vista. A única saída é pela escotilha de máquinas." | "340m de profundidade. Saída pelas máquinas." | Contextual — mostra a gravidade |
| Mesa de navegação | "Carta náutica com anotação a caneta: 'Canal 7 — emergência'. Uma frequência está circulada." | "Canal 7 marcado na carta náutica." | Pista para o rádio nas máquinas (contexto, não puzzle principal) |
| Armário de suprimentos | "Trancado. Mas a fechadura está enferrujada... força! Dentro: chave de manutenção com etiqueta 'MÁQUINAS'." | "Armário vazio. Chave já coletada." | Gate item para sala de máquinas |
| Manual de emergência | "Capítulo 9 — Reinício do Gerador: 'Ativar válvulas na ordem de PRESSÃO CRESCENTE para evitar ruptura nas junções.'" | "Válvulas: pressão crescente." | Pista #1: regra da ordem |
| Painel de comunicação | "Rádio com estática. O display mostra: 'Canal 7 = 147.3 MHz'. Sem energia para transmitir daqui." | "Canal 7 = 147.3 MHz. Sem energia." | Pista secundária para rádio nas máquinas |
| Escotilha → Máquinas | *Transição se tem chave* / "Selada. Precisa da chave de manutenção." | — | Gate |

## Ambiente 2: Sala de Máquinas

**Mensagem ao entrar:** "A sala de máquinas. Tubulações por toda parte. Três válvulas coloridas controlam o gerador. Manômetros indicam a pressão de cada uma."

| Objeto | Texto (1ª vez) | Texto (repetido) | Justificativa |
|--------|----------------|-------------------|---------------|
| Válvula Azul | "Válvula azul. Manômetro acoplado indica: 12 PSI." | "Válvula azul: 12 PSI." | Dado bruto — menor pressão |
| Válvula Vermelha | "Válvula vermelha. Manômetro: 45 PSI." | "Válvula vermelha: 45 PSI." | Dado bruto — pressão média |
| Válvula Amarela | "Válvula amarela. Manômetro: 78 PSI." | "Válvula amarela: 78 PSI." | Dado bruto — maior pressão |
| Painel do gerador | *Abre puzzle* "Painel de controle. Selecione a ordem de ativação das 3 válvulas." | *Abre puzzle* | Puzzle principal |
| Rádio de emergência | "Rádio funcional! Ajuste a frequência e transmita. Um dial para MHz." / *Após ajustar 147.3:* "Estática... depois uma voz: 'K-47, resgate a caminho. Aguentem.' Recebido!" | "Resgate confirmado em 147.3 MHz." | Puzzle secundário (opcional, narrativo) |
| Escotilha de fuga | *Se gerador ativo:* Escape! / "Selada eletronicamente. O gerador precisa estar online." | — | Saída final |
| Voltar à Proa | *Transição* | — | Navegação |

## Validação Anti-Spoiler

| Pista | Resolve sozinha? | Veredicto |
|-------|:----------------:|:---------:|
| "Pressão crescente" | ❌ Não diz os valores | ✅ |
| "12 PSI" (azul) | ❌ Dado isolado | ✅ |
| "45 PSI" (vermelha) | ❌ Dado isolado | ✅ |
| "78 PSI" (amarela) | ❌ Dado isolado | ✅ |
| Todas combinadas: regra + 3 valores | ✅ Dedução completa | ✅ |

## Tela de Sucesso
**Título:** "🚢 ESCOTILHA ABERTA!"
**Subtítulo:** "O gerador ronca. A escotilha cede. Você escapa para a câmara de resgate. O K-47 não levou todos."
