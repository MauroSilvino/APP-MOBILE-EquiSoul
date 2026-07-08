# Design system sync (Claude Design → Claude Code)

Esta pasta recebe o que é sincronizado do seu projeto em **claude.ai/design**. Ela é a fonte de
verdade visual do app — os componentes React Native em `src/` devem sempre refletir o que está
aqui, nunca o contrário.

## Como funciona a ponte Claude Design ↔ Claude Code

1. **No Claude Design**, finalize as telas dentro de um projeto do tipo *design system*
   (não um projeto solto). Isso é necessário porque a sincronização via Claude Code só
   escreve/lê projetos desse tipo.
2. **No Claude Code**, dentro deste repositório, peça para eu listar e ler o conteúdo do projeto
   (`list_projects`, `list_files`, `get_file`) — eu comparo o que existe lá com o que já está em
   `design-system/` e trago as diferenças (tokens novos, telas novas/alteradas).
3. Eu traduzo cada tela/componente sincronizado em componentes React Native reais dentro de
   `src/screens/` e `src/components/`, usando os tokens atualizados em `design-system/tokens/`.
4. Isso é incremental — uma tela ou componente por vez, nunca uma substituição em massa do projeto.

## O que colocar em cada pasta

- `tokens/` — `colors.json`, `typography.json`, `spacing.json`. Atualize estes arquivos com os
  valores exatos exportados do Claude Design (cores hex, escala tipográfica, spacing/radius).
  `src/theme/tokens.ts` lê esses arquivos diretamente.
- `screens/` — referência de cada tela (HTML/CSS ou descrição do spec) trazida do Claude Design,
  uma por tela, nomeada igual ao nome da tela lá (ex.: `screens/onboarding-welcome.html`). Serve
  como fonte de verdade para eu implementar `src/screens/OnboardingWelcomeScreen.tsx`.
- `components/` — mesma lógica, para componentes reutilizáveis (botões, cards, inputs) que se
  repetem entre telas.

## Pré-requisito de acesso

Na primeira vez que eu tentar listar/ler seu projeto do Claude Design, pode aparecer um prompt
pedindo para adicionar acesso de design ao seu login do claude.ai. Aceite esse prompt — sem ele eu
não consigo ler o projeto. Se você usa uma sessão sem login no claude.ai, rode `/design-login`
antes.

## Quando as telas estiverem prontas

Quando você terminar/atualizar telas no Claude Design, volte aqui e me avise (ex.: "sincronize as
telas de onboarding do projeto X"). Eu vou:

1. Listar o projeto e identificar o que é novo ou mudou.
2. Puxar tokens e specs para esta pasta.
3. Implementar/atualizar os componentes React Native correspondentes em `src/`.
4. Rodar `npx tsc --noEmit` e conferir visualmente a tela antes de considerar concluída.
