# Handoff: EquiSoul — App mobile (diário emocional + rede social + IA para cavaleiros e seus cavalos)

## Overview
EquiSoul é um app mobile híbrido (React Native) para cavaleiros registrarem memórias com seus cavalos, acompanharem saúde/bem-estar, se conectarem em comunidade, participarem de eventos, usarem IA para reflexões emocionais, e terem acesso a marketplace, gamificação e planos premium. Há também dois painéis administrativos (Backoffice Admin da plataforma e Portal Profissional para prestadores de serviço/organizadores) usados por perfis internos, não pelo usuário final.

Tom de produto: gentil, calmo, premium — nunca robótico ou técnico, mesmo nas telas de IA.

## Sobre os arquivos de design
Os arquivos `.dc.html` neste pacote são **referências de design em HTML** — prototypes clicáveis que mostram aparência e comportamento pretendidos, não código de produção para copiar diretamente. A tarefa é **recriar estes designs no ambiente já existente do app (React Native)**, usando os padrões, componentes e bibliotecas já estabelecidos nesse projeto (navegação, gerenciamento de estado, etc.) — não portar HTML/CSS literalmente.

Cada arquivo é auto-contido e abre direto no navegador. Internamente, cada arquivo simula **várias telas do fluxo** trocando entre estados (visível no código como `<sc-if value="{{ s0 }}">`, `s1`, `s2`... — cada um é uma tela separada do fluxo, navegável por index numérico). O inventário completo de telas por arquivo está na seção "Mapa de telas" abaixo.

## Fidelidade
**Alta fidelidade (hifi).** Cores, tipografia, espaçamento e a maioria das interações estão no nível final de acabamento visual. Recrie pixel a pixel usando os tokens em `tokens.md`, mas sinta-se livre para ajustar unidades de HTML/CSS (px, %) para os equivalentes corretos em React Native (ex: `StyleSheet`, `flex`, unidades independentes de densidade).

## Stack
Projeto já existente em **React Native (app híbrido)**. Implemente reaproveitando a navegação, componentes de UI, gerenciamento de estado e camada de dados já estabelecidos nesse codebase — não introduza uma stack paralela. Se algum padrão do design (ex: tab bar flutuante em pílula, cards com sombra) ainda não existir como componente reutilizável no projeto, este é o momento de criá-lo como componente compartilhado (ver `tokens.md`).

## Design tokens
Ver `tokens.md` — cores, tipografia, espaçamento, componente de tab bar, ícones e padrão de placeholders de imagem, todos centralizados num único documento (nos arquivos HTML eles aparecem repetidos inline em cada tela, por limitação do formato de prototipagem).

## Navegação global
### Tab bar flutuante (5 itens)
Presente em quase todas as telas de topo de fluxo (dashboard/hub de cada seção). Da esquerda para a direita:
1. **Home** → `Home e Diario` (tela 0 — Dashboard)
2. Item contextual da seção atual (ex: Timeline, Calendário/Agenda, ou o hub da própria seção) — ícone destacado em dourado quando é a seção ativa
3. **"+" central** (botão elevado, dourado) → `Criar Memoria` (tela 0 — Tipo de memória)
4. **Comunidade** → `Comunidade` (tela 0 — Feed)
5. **Perfil** → `Perfis` (tela 0 — Perfil do usuário)

Telas secundárias/modais dentro de um fluxo (ex: `Notificacoes`, telas de detalhe, checkout, confirmação) **não** repetem a tab bar — usam um botão de voltar no topo e retornam ao fluxo de origem.

### Entradas cruzadas entre seções (deep links)
- Sino de notificações no header do Home → `Notificacoes`
- Notificações individuais têm CTA que navega para a tela relevante (carta de IA → `Inteligencia Artificial`, comentário → `Comunidade`, evento → `Eventos`, pedido → `Marketplace`, tema desbloqueado → `Premium`)
- Cards de "Comunidade" no Home → `Comunidade`
- Botão "Ver perfil" no card do cavalo (Home) → `Perfis`
- Link "Gerenciar preferências de notificação" → `Configuracoes` (tela 5 — Notificações)
- Onboarding termina navegando para `Home e Diario`

**Importante para o Claude Code**: o protótipo usa links relativos entre arquivos `.dc.html` para simular esses deep links. Na implementação real, isso deve se tornar navegação nomeada entre telas dentro de uma única árvore de navegação (stack/tabs do React Navigation ou equivalente já usado no projeto).

## Mapa de telas (por domínio/pasta)

### `00_identidade_visual/`
Referência de sistema visual — não é uma tela do produto. Contém a exploração de direção visual (opção "1b — Social Instagram", que é a adotada) com exemplo canônico de Onboarding + Feed. Use como referência visual, não como tela a implementar.

### `01_onboarding/` — Onboarding
0. Splash · 1. Welcome · 2–4. Storytelling (3 telas) · 5. Login · 6. Cadastro · 7. Recuperar senha · 8. Nova senha · 9. Criar perfil · 10. Adicionar cavalo · 11. Relacionamento (com o cavalo) · 12. Preferências · 13. Permissões · 14. Tour inteligente · 15. Primeiro check-in · 16. Primeira carta da IA · 17. Dashboard inicial (transição para Home)

### `02_diario_e_memorias/` — Diário e Memórias
**Home e Diario**: 0. Dashboard Home · 1. Novo registro · 2. Memória completa · 3. Timeline · 4. Calendário · 5. Pesquisa de memórias · 6. Favoritos
**Criar Memoria**: 0. Tipo de memória · 1. Captura de mídia · 2. Informações rápidas · 3. Descrição · 4. Marcação · 5. Privacidade · 6. Prévia · 7. Memória publicada · 8. Histórico · 9. Álbuns inteligentes · 10. Comparação · 11. Rascunhos · 12. Álbum detalhe

### `03_social/` — Social
**Comunidade**: 0. Feed · 1. Stories viewer · 2. Reels · 3. Explorar · 4. Eventos (lista) · 5. Evento detalhe · 6. Grupos · 7. Grupo detalhe · 8. Mensagens · 9. Chat conversa · 10. Comentários
**Perfis**: 0. Perfil do usuário · 1. Editar perfil · 2. Perfil público · 3. Lista de cavalos · 4. Perfil do cavalo · 5. Linha do tempo do cavalo · 6. Saúde · 7. Evolução · 8. Galeria · 9. Cartas · 10. Compartilhar perfil do cavalo · 11. Adicionar cavalo

### `04_saude_e_bem_estar/` — Saúde e Bem-estar
**Saude e Bem-estar**: 0. Dashboard saúde · 1. Histórico geral · 2. Vacinas · 3. Vermifugação · 4. Medicamentos · 5. Ferrageamento · 6. Odontologia · 7. Alimentação · 8. Peso · 9. Exames · 10. Lesões · 11. Recuperação · 12. Veterinários · 13. Documentos · 14. Calendário saúde · 15. IA bem-estar

### `05_agenda_e_eventos/` — Agenda e Eventos
**Agenda e Analytics**: 0. Dashboard da agenda · 1. Calendário · 2. Agenda do dia · 3. Criar compromisso · 4. Planejamento semanal · 5. Metas · 6. Clima · 7. Analytics · 8. Evolução · 9. Linha do tempo analítica · 10. Insights inteligentes · 11. Relatórios
**Eventos**: 0. Descobrir eventos · 1. Página do evento · 2. Inscrição · 3. Calendário · 4. Clubes · 5. Comunidades locais · 6. Experiências · 7. Check-in · 8. Álbum colaborativo · 9. Networking · 10. Certificados · 11. Ranking do evento · 12. Meus eventos

### `06_inteligencia_artificial/` — Inteligência Artificial
0. IA hub · 1. Cartas · 2. Leitura da carta · 3. Insights · 4. Linha do tempo emocional · 5. Retrospectivas · 6. Histórias · 7. Sugestões · 8. Estúdio criativo · 9. Assistente inteligente (chat)

### `07_marketplace_e_premium/` — Marketplace e Premium
**Marketplace**: 0. Home marketplace · 1. Explorar · 2. Página de produto · 3. Página de serviço · 4. Perfil profissional · 5. Haras · 6. Reserva · 7. Carteira · 8. Histórico · 9. Favoritos · 10. Chat · 11. Checkout · 12. Avaliações · 13. Cupons · 14. Eventos · 15. Cursos
**Premium**: 0. Home Premium · 1. Benefícios · 2. IA Premium · 3. Temas · 4. Livros digitais · 5. Vídeos Premium · 6. Biblioteca Premium · 7. Clube Premium · 8. Eventos Premium · 9. Personalização · 10. Backup Premium · 11. Assinatura (planos) · 12. Criações exclusivas (avulsos IA) · 13. Founding members · 14. FAQ · 15. Histórico financeiro · 16. Checkout · 17. Sucesso · 18. Gerenciar assinatura · 19. Erro de pagamento

### `08_gamificacao/` — Gamificação
0. Centro de evolução · 1. Conquistas · 2. Selos · 3. Desafios · 4. Sequência (streak) · 5. Jornadas · 6. Missões · 7. Loja de recompensas · 8. Ranking · 9. Temporadas · 10. Objetivos

### `09_configuracoes_e_notificacoes/` — Configurações e Notificações
**Configuracoes**: 0. Configurações (hub) · 1. Conta · 2. Privacidade · 3. Segurança · 4. Configurações da IA · 5. Notificações (preferências) · 6. Aparência · 7. Idioma · 8. Backup · 9. Compartilhamento · 10. Premium · 11. Ajuda · 12. Sobre · 13. Desenvolvedor · 14. Editar informações · 15. Trocar senha · 16. Configurar 2FA
**Notificacoes**: tela única (feed de notificações) com: filtros por categoria, agrupamento por período (Hoje/Ontem/Esta semana/Mais antigas), marcar tudo como lido, silenciar por notificação (1h/hoje/este tipo/sempre), excluir notificação, resumo diário, estados vazios, paginação de itens antigos, toggle de silêncio automático durante treinos/competições.

### `10_admin_e_portal_profissional/` — Admin (seção separada, público interno)
**Backoffice Admin** (equipe EquiSoul): 0. Dashboard · 1. Usuários · 2. Cavalos · 3. Comunidade (moderação de conteúdo) · 4. Moderação · 5. Marketplace (admin) · 6. Eventos (admin) · 7. Clube Premium (admin) · 8. IA (admin) · 9. Analytics (admin) · 10. Financeiro · 11. CMS · 12. Notificações (admin) · 13. Suporte · 14. Auditoria · 15. Configurações globais · 16. Logs · 17. APIs · 18. Feature flags · 19. Usuário detalhe · 20. Cavalo detalhe · 21. Chamado detalhe · 22. CMS editor · 23. Criar evento
**Portal Profissional** (veterinários/ferradores/treinadores e organizadores de eventos — dois papéis no mesmo arquivo): 0. Dashboard profissional · 1. Agenda profissional · 2. Clientes · 3. Detalhe do cliente · 4. Cavalos atendidos · 5. Serviços · 6. Reservas · 7. Financeiro profissional · 8. Avaliações · 9. Analytics profissional · 10. Perfil público · 11. Portfólio · 12. Conteúdo · 13. Portal organizador (dashboard) · 14. Gestão de eventos (criar) · 15. Participantes · 16. Check-in · 17. Certificados (organizador) · 18. Marketplace admin (painel geral) · 19. Gestão de produtos · 20. Pedidos · 21. Estoque · 22. Promoções · 23. Relatórios marketplace · 24. Novo serviço · 25. Novo produto · 26. Nova promoção · 27. Detalhe do pedido

> Recomendação: como é público interno com necessidades diferentes (densidade de dados, tabelas, permissões), considere tratar esta seção como uma segunda frente de trabalho depois do app do usuário final — mas os arquivos já estão aqui, organizados junto.

## Interações e comportamento (padrões recorrentes)
- **Chips de filtro**: seleção única, estado ativo = fundo escuro (`#2B2924`) + texto dourado; inativo = fundo cinza claro + texto escuro. Scroll horizontal com fade na borda.
- **Toggles**: pílula 34–38px, bolinha branca deslizante, cor ativa = oliva (`#6B7353`).
- **Cards de lista**: fundo branco, sombra leve, ícone circular colorido à esquerda, conteúdo à direita, CTA de texto em `leather` quando aplicável.
- **Confirmação destrutiva** (ex: excluir memória): painel inline com texto de aviso + botão "Confirmar exclusão" (vermelho terracota `#B85C4C`) + "Cancelar".
- **Estados vazios**: ícone circular + título + subtítulo curto, sempre que uma lista filtrada não retorna itens.
- **IA**: cards com fundo escuro (`#2B2924`) e texto claro sempre que é conteúdo gerado pela IA (carta, insight, retrospectiva) — reforça que é "outra voz" dentro do app.
- **Paginação simples**: botão de texto "Carregar mais…" no fim de listas longas, sem infinite scroll automático.

## Estado / dados (o que o Claude Code precisa modelar)
Os protótipos usam estado mockado local (React state dentro do próprio arquivo). Para produção, os seguintes domínios de dado precisam de modelagem real e (presumivelmente) API:
- Usuário, cavalo(s) e relação usuário-cavalo (Onboarding, Perfis)
- Memórias/registros (tipo, mídia, emoção, nota, localização, privacidade) — `Home e Diario` + `Criar Memoria`
- Notificações (tipo, categoria, lida/não lida, snooze, deep link de destino) — `Notificacoes`
- Saúde (vacinas, vermifugação, medicamentos, ferrageamento, exames, peso, documentos) — `Saude e Bem-estar`
- Agenda/compromissos e metas — `Agenda e Analytics`
- Eventos, inscrições, check-ins, certificados — `Eventos`
- Conteúdo social (posts, stories, reels, comentários, grupos, mensagens) — `Comunidade`
- Catálogo de marketplace (produtos, serviços, profissionais, reservas, pedidos, carteira) — `Marketplace`
- Assinatura Premium (planos, benefícios, cobrança) — `Premium`
- Gamificação (XP, conquistas, selos, streaks, ranking) — `Gamificacao`
- Preferências e conta — `Configuracoes`
- Geração de conteúdo por IA (cartas, insights, retrospectivas, chat assistente) — requer integração com serviço de IA real; no protótipo é todo mockado/estático.

## Assets
Todas as imagens/fotos no protótipo são **placeholders** (padrão de listras diagonais + legenda monospace, ex: "foto grande · Bela em primeiro plano") — precisam ser substituídas por fotos reais de cavalos/usuários (upload do usuário ou câmera) na implementação. Ícones são SVG line-icons desenhados à mão no próprio HTML — podem ser recriados com qualquer biblioteca de ícones do projeto seguindo o mesmo traço fino (stroke ~1.8–2px, sem preenchimento), ou mantidos como SVG custom.

## Arquivos deste pacote
```
design_handoff_equisoul/
├── README.md              (este arquivo)
├── tokens.md               (cores, tipografia, espaçamento, componentes)
├── screenshots/            (uma captura da tela inicial de cada arquivo, para visualização rápida)
└── screens/
    ├── 00_identidade_visual/
    ├── 01_onboarding/
    ├── 02_diario_e_memorias/
    ├── 03_social/
    ├── 04_saude_e_bem_estar/
    ├── 05_agenda_e_eventos/
    ├── 06_inteligencia_artificial/
    ├── 07_marketplace_e_premium/
    ├── 08_gamificacao/
    ├── 09_configuracoes_e_notificacoes/
    └── 10_admin_e_portal_profissional/
```
Cada pasta contém os arquivos `.dc.html` daquele domínio + uma cópia de `support.js` (runtime necessário para abrir os `.dc.html` direto no navegador — não é código de produção, serve só para visualizar o protótipo).
