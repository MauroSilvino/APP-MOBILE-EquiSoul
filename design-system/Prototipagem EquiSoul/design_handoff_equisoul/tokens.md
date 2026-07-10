# EquiSoul — Design Tokens

Fonte canônica: `screens/00_identidade_visual/Identidade Visual - EquiSoul.dc.html` (opção "1b — Social Instagram"). Todos os tokens abaixo foram extraídos desse arquivo e são usados de forma consistente em todas as telas do protótipo.

## Cores

### Neutros / base
| Token | Hex | Uso |
|---|---|---|
| `bg-base` | `#FBF9F4` | Fundo branco quente — tela/cards principais |
| `text-primary` | `#2B2924` | Texto principal, títulos, superfícies escuras (tab bar, cards de destaque) |
| `text-secondary` | `#6b6558` | Texto secundário / muted |
| `text-tertiary` | `#a39c8a` | Timestamps, placeholders de texto, estados desabilitados |

### Acento
| Token | Hex | Uso |
|---|---|---|
| `accent-gold` | `#C9A15A` | Cor primária de CTA — botões de ação, destaques, badges de não-lida, IA/Premium |
| `olive` | `#6B7353` | Verde oliva — toggles ativos, ícones de comunidade/eventos |
| `moss` | `#4F5D45` | Verde musgo — variação mais escura de oliva (ícones, texto sobre oliva) |
| `leather` | `#8A6E4B` | Marrom couro — uso secundário, ícones de saúde/marketplace, links de ação (CTA de texto) |

### Superfícies escuras
| Token | Hex | Uso |
|---|---|---|
| `surface-dark` | `#2B2924` | Tab bar flutuante, cards de destaque (ex: card "Percebido pela IA"), telas de carta/imersão |

### Fundo do "canvas" fora do device
`#EDE8DE` — usado só como fundo do mockup no protótipo (fora da tela do app); não é um token de produto.

## Tipografia
- Família única: **Nunito** (Google Fonts), pesos 400/500/600/700/800/900.
- Títulos de tela: peso 800, ~20–24px, tracking levemente negativo.
- Subtítulos de seção: peso 700, 11–12px, uppercase, letter-spacing 0.04–0.05em, cor `leather` (#8A6E4B).
- Corpo: peso 500, 12–14px, line-height ~1.5–1.7.
- Labels/microtexto (timestamps, badges): peso 600, 10–11px.
- CTAs em texto (links de ação dentro de cards): peso 700, 10–12px, cor `leather`.

## Espaçamento e formas
- Cards: `border-radius` 16–24px (a maioria 16–18px; cards grandes/heros 20–24px), `box-shadow: 0 4px 14px rgba(43,41,36,.05)` (leve) ou `0 30px 70px rgba(43,41,36,.22)` (elevação de device).
- Padding interno de card: 12–18px.
- Gap padrão entre elementos de lista: 8–12px; entre seções: 16–24px.
- Chips/pills de filtro: `border-radius: 18–20px`, padding `9px 15–16px`.
- Botões primários: altura 44–56px, `border-radius` = altura/2 (pill).

## Componente: Tab bar flutuante
- Container: `position:absolute; left:20px; right:20px; bottom:20px; height:64px; border-radius:32px; background:#2B2924; box-shadow:0 10px 30px rgba(43,41,36,.25)`.
- 5 itens em `justify-content:space-around`: Home, item contextual (Timeline/Calendário/Agenda), botão central "+" (48px, círculo dourado `#C9A15A`, elevado ~8–18px acima da pílula — **manter dentro dos limites da pílula, sem furar a borda**), Comunidade, Perfil.
- Ícones inativos: stroke `rgba(247,243,236,.5)`; ícone ativo/contextual: stroke `#C9A15A`.
- Presente em todas as telas principais do app (não aparece em telas secundárias/modais como Notificações, que tem seu próprio botão de voltar).

## Ícones
Line icons SVG, stroke ~1.8–2px, sem preenchimento (`fill:none`), estilo uniforme e minimalista. Não usar ícones de biblioteca de terceiros — seguir o mesmo traço fino em qualquer ícone novo.

## Placeholders de imagem
Fundo com padrão de listras diagonais sutis:
```css
background-image: repeating-linear-gradient(135deg, rgba(0,0,0,.06) 0px, rgba(0,0,0,.06) 2px, transparent 2px, transparent 12px);
background-color: #EAE4D6;
```
Acompanhado de legenda monospace centralizada descrevendo o que deve entrar ali (ex: "foto grande · Bela em primeiro plano"). **Toda imagem real (fotos de cavalos, avatares, mídia de posts) precisa ser substituída por assets reais ou integração de upload/câmera** — isso não é decorativo, é um placeholder funcional.

## Stories/avatares
Anel gradiente dourado → couro → oliva ao redor do avatar (indica story não visto), usado em Comunidade e Perfis.
