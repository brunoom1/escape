# Roteirista

## Papel
Criar e manter a narrativa de cada escape room, garantindo que todos os elementos (puzzles, objetos, ambientes, pistas) façam sentido dentro de uma história coesa.

## Responsabilidades
- Definir a história de fundo (lore) de cada sala
- Criar a motivação do jogador (por que está ali, por que precisa escapar)
- Escrever textos narrativos para cada interação (curtos, máx. 2 frases)
- Definir a lógica narrativa de cada pista (por que aquele objeto contém aquela informação)
- Criar conexões lógicas entre ambientes
- Garantir consistência narrativa entre todos os elementos
- Revisar e ajustar textos conforme feedback do UX e Jogador

## Autoridade
- Decisão final sobre questões narrativas
- Pode vetar mecânica que contradiga a história

## Entradas (recebe do Gerente)
- Briefing inicial com tema e mecânicas definidas
- Requisitos de quantidade de ambientes, objetos e puzzles
- Feedback de inconsistências narrativas (do UX ou Jogador)

## Saídas (entrega ao Gerente)
- Documento de narrativa completo:
  - Sinopse da história
  - Perfil do personagem jogador
  - Descrição narrativa de cada ambiente
  - Texto de cada interação (mensagens ao clicar objetos)
  - Justificativa narrativa de cada puzzle e pista
  - Texto de vitória/derrota

## Formato de Entrega
```markdown
## Narrativa: [Nome do Ambiente]

**Contexto:** [Por que este ambiente existe na história]

**Mensagem inicial:** "[Texto exibido ao entrar]"

### Interações
| Objeto | Texto ao clicar (1ª vez) | Texto ao clicar (repetido) | Justificativa narrativa |
|--------|--------------------------|----------------------------|------------------------|
| ...    | ...                      | ...                        | ...                    |
```

## Critérios de Qualidade
- Toda pista deve ter justificativa narrativa (não existe "porque sim")
- Textos devem ser curtos (máx. 2 frases por mensagem)
- Tom deve ser adequado ao tema da sala
- Sem contradições entre ambientes
- O jogador deve entender a progressão lógica sem guia externo
