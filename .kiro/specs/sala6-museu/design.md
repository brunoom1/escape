# Sala 6 — Design Técnico

## Sistema de Lasers

Linhas vermelhas no Canvas que bloqueiam áreas. Objetos "atrás" de um laser não são clicáveis até o sensor correspondente ser desativado.

```javascript
const lasers = [
  { id: 'L1', x1: 200, y1: 0, x2: 200, y2: 600, active: true, blocks: ['escultura1'] },
  { id: 'L2', x1: 0, y1: 300, x2: 500, y2: 300, active: true, blocks: ['vitrine'] },
  // ...
];

// Render: linhas vermelhas pulsantes
// Hit detection: objetos bloqueados por laser ativo não respondem a click
```

## Ambientes

### Ambiente 1: Galeria Principal

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Quadro "Noite Estrelada" | Click | Placa: "Van Gogh, 1889" — número 1889 é pista |
| Quadro "O Grito" | Click | Placa: "Munch, 1893" |
| Escultura (bloqueada por laser) | Click (após desativar L1) | Base tem bilhete do turno anterior com crachá |
| Vitrine (bloqueada por laser) | Click (após desativar L2) | Contém ferramenta para desmontar painel |
| Banco do segurança | Click | Mochila com lanterna UV |
| Porta → Segurança | Click | Requer crachá |

### Ambiente 2: Sala de Segurança

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Monitores | Click | Mostram feeds das câmeras — revelam posição dos sensores |
| Diagrama de circuito | Click | Mostra hierarquia dos sensores: S1→S2→S3→S4 |
| Painel de sensores | Click | Puzzle: desativar 4 sensores na ordem do diagrama |
| Caixa de ferramentas | Click | Chave phillips (para painel da Ala Egípcia) |
| Terminal de acesso | Click | Exige código 4 dígitos para Ala Egípcia |
| Voltar | Click | Transição |

### Ambiente 3: Ala Egípcia

| Elemento | Interação | Resultado |
|----------|-----------|-----------|
| Sarcófago | Click | Inscrição com pista final |
| Painel de override | Click | Puzzle final: inserir sequência master |
| Vitrine de joias | Click | Escaravelho com símbolos (pista para override) |
| Hieróglifos na parede | Click | Tradução parcial — posições dos símbolos |
| Voltar | Click | Transição |

## Progressão

```
1. Galeria: lasers bloqueiam escultura e vitrine
2. Encontra lanterna UV no banco → revela mensagem invisível na parede
3. Mensagem indica onde está o crachá (atrás da escultura)
4. Precisa desativar laser L1 → mas como? Precisa ir à Segurança primeiro
5. Segurança (via crachá do turno anterior achado em outro objeto acessível)
6. Na Segurança: diagrama de circuito → desativa sensores na ordem
7. Lasers caem → acessa escultura e vitrine
8. Terminal: código = combinação das datas dos quadros (1889 + 1893 → ???)
9. Ala Egípcia desbloqueada
10. Override final com sequência dos hieróglifos → Escape!
```

## Tema Visual
- Paleta: preto (#0a0a0a), lasers vermelhos (#ff0000, pulsante), vitrines com luz quente (#ffcc00)
- Ambiência: museu à noite, silêncio, lanternas
- Efeito: lasers animados (opacidade pulsante), vitrines com glow
