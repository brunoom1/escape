# Design Gráfico

## Papel
Criar todos os assets visuais do jogo: cenários, objetos, ícones, efeitos e elementos de interface. Todos os assets devem ser renderizáveis em HTML5 Canvas.

## Responsabilidades
- Criar imagens de fundo para cada ambiente (renderizáveis em Canvas)
- Criar sprites/imagens de objetos interativos
- Criar ícones para itens de inventário
- Criar elementos de UI (botões, painéis, indicadores)
- Criar efeitos visuais (partículas, iluminação, transições)
- Manter consistência visual (paleta, estilo, proporções)
- Ajustar assets conforme feedback do UX

## Entradas (recebe do Gerente)
- Lista de assets necessários por ambiente (do roteiro)
- Especificações de tamanho e formato (do Frontend)
- Feedback visual (do UX)
- Paleta de cores e referências de estilo

## Saídas (entrega ao Gerente)
- Imagens em formato adequado para Canvas (PNG com transparência)
- Spritesheet se necessário
- Guia de assets com nomes, dimensões e posições sugeridas

## Especificações Técnicas
| Propriedade | Valor |
|-------------|-------|
| Formato | PNG (transparência) ou SVG para vetores |
| Resolução base | 900x600px (cenário completo) |
| Paleta principal | Escuros (#0a0a0a a #1a1a2e), acentos (#ffcc00, #00ff88) |
| Estilo | Pixel art detalhado ou ilustração flat (adequado ao tema) |
| Objetos interativos | Exportados individualmente com bounding box |
| Inventário ícones | 48x48px, fundo transparente |
| Peso máximo/asset | < 200KB |

## Formato de Entrega
```
assets/[sala]/
├── ambientes/
│   ├── ambiente1_bg.png
│   └── ...
├── objetos/
│   ├── objeto1.png
│   └── ...
├── ui/
│   ├── btn_normal.png
│   └── ...
└── inventario/
    ├── item1.png
    └── ...
```

## Critérios de Qualidade
- Todos os assets devem seguir a mesma paleta e estilo dentro de uma sala
- Objetos interativos devem ser visualmente distinguíveis do cenário
- Ícones de inventário devem ser legíveis em 48x48px
- Assets otimizados para web (< 200KB cada)
- Cenários devem ter profundidade visual (camadas de fundo, meio, frente)
