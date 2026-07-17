import { create } from 'zustand';

export interface AdminUsuario {
  id: number;
  nome: string;
  cidade: string;
  plano: 'Premium' | 'Gratuito';
  status: 'Verificado' | 'Novo' | 'Ativo' | 'Inativo' | 'Banido';
  email: string;
  desde: string;
}

export interface AdminCavalo {
  id: number;
  nome: string;
  raca: string;
  usuario: string;
  pais: string;
  eventos: number;
  idade: string;
}

export interface AdminComunidadeItem {
  autor: string;
  denuncias: number;
  resumo: string;
  acoes: string[];
  resolvido: boolean;
}

export interface AdminDenuncia {
  categoria: string;
  descricao: string;
  tempo: string;
  resolvida: boolean;
}

export interface AdminMarketplaceItem {
  id: number;
  nome: string;
  tipo: string;
  valor: string;
  status: 'Aprovado' | 'Pendente' | 'Verificado' | 'Reembolso' | 'Rejeitado' | 'Reembolsado';
}

export interface AdminEvento {
  titulo: string;
  organizador: string;
  participantes: number;
  ingressos: string;
}

export interface AdminIntegracao {
  nome: string;
  desconectado: boolean;
}

export interface AdminCmsItem {
  id: number;
  label: string;
  count: number;
  titulo: string;
  conteudo: string;
}

export interface AdminChamado {
  id: number;
  assunto: string;
  categoria: string;
  prioridade: 'Alta' | 'Média' | 'Baixa';
  sla: string;
  cliente: string;
  mensagem: string;
  status: 'Aberto' | 'Resolvido';
  resposta: string;
}

export interface AdminAuditEntry {
  acao: string;
  ator: string;
  tempo: string;
}

export interface AdminApiKey {
  key: string;
  nome: string;
  chave: string;
  rateLimit: string;
  revoked: boolean;
  rotated: boolean;
}

export interface AdminFeatureFlag {
  key: string;
  nome: string;
  escopo: string;
  on: boolean;
  hasRollout: boolean;
  rolloutPercent: number;
}

interface AdminState {
  usuarios: AdminUsuario[];
  cavalos: AdminCavalo[];
  comunidadeItens: AdminComunidadeItem[];
  denuncias: AdminDenuncia[];
  marketplaceItens: AdminMarketplaceItem[];
  eventosAdmin: AdminEvento[];
  premiumMetricas: { valor: string; label: string }[];
  premiumPlanos: { nome: string; assinantes: string }[];
  iaIndicadores: { valor: string; label: string }[];
  iaFerramentas: string[];
  analyticsPaineis: string[];
  receitas: { label: string; valor: string }[];
  integracoes: AdminIntegracao[];
  cmsList: AdminCmsItem[];
  segmentacaoOptions: string[];
  campanhas: { titulo: string; tipo: string; data: string }[];
  suporteCategorias: string[];
  chamados: AdminChamado[];
  auditoria: AdminAuditEntry[];
  configGlobais: { label: string; valor: string }[];
  logs: { fonte: string; mensagem: string }[];
  apis: AdminApiKey[];
  flags: AdminFeatureFlag[];

  banirUsuario: (id: number) => void;
  reativarUsuario: (id: number) => void;
  verificarUsuario: (id: number) => void;
  resolverComunidadeItem: (index: number, acao: string) => void;
  resolverDenuncia: (index: number) => void;
  setMarketplaceStatus: (id: number, status: AdminMarketplaceItem['status']) => void;
  addEvento: (evento: AdminEvento) => void;
  toggleIntegracao: (nome: string) => void;
  setCmsContent: (id: number, titulo: string, conteudo: string) => void;
  setChamadoStatus: (id: number, status: AdminChamado['status']) => void;
  setChamadoResposta: (id: number, resposta: string) => void;
  addAuditoria: (acao: string, ator?: string) => void;
  rotacionarApi: (key: string) => void;
  revogarApi: (key: string) => void;
  toggleFlag: (key: string) => void;
  setRolloutPercent: (key: string, percent: number) => void;
}

const ADMIN_ATOR = 'Admin: Renata Souza';

export const useAdminStore = create<AdminState>((set) => ({
  usuarios: [
    { id: 0, nome: 'Mauro Andrade', cidade: 'São Paulo, SP', plano: 'Premium', status: 'Verificado', email: 'mauro.andrade@email.com', desde: 'mar 2023' },
    { id: 1, nome: 'Helena Ribeiro', cidade: 'Curitiba, PR', plano: 'Gratuito', status: 'Novo', email: 'helena.ribeiro@email.com', desde: 'jun 2026' },
    { id: 2, nome: 'Carlos Melo', cidade: 'Belo Horizonte, MG', plano: 'Premium', status: 'Ativo', email: 'carlos.melo@email.com', desde: 'set 2022' },
    { id: 3, nome: 'Ana Ferraz', cidade: 'Porto Alegre, RS', plano: 'Gratuito', status: 'Inativo', email: 'ana.ferraz@email.com', desde: 'jan 2024' },
    { id: 4, nome: 'João Ferrador', cidade: 'Ribeirão Preto, SP', plano: 'Gratuito', status: 'Ativo', email: 'joao.ferrador@email.com', desde: 'fev 2025' },
    { id: 5, nome: 'Usuário reportado #4471', cidade: 'Recife, PE', plano: 'Gratuito', status: 'Banido', email: 'user4471@email.com', desde: 'nov 2024' },
    { id: 6, nome: 'Renata Souza', cidade: 'Florianópolis, SC', plano: 'Premium', status: 'Verificado', email: 'renata.souza@email.com', desde: 'ago 2021' },
    { id: 7, nome: 'Diego Alves', cidade: 'Fortaleza, CE', plano: 'Gratuito', status: 'Ativo', email: 'diego.alves@email.com', desde: 'mai 2025' },
  ],
  cavalos: [
    { id: 0, nome: 'Bela', raca: 'Mangalarga', usuario: 'Mauro Andrade', pais: 'Brasil', eventos: 6, idade: '8 anos' },
    { id: 1, nome: 'Trovão', raca: 'Quarto de Milha', usuario: 'Carlos Melo', pais: 'Brasil', eventos: 3, idade: '5 anos' },
    { id: 2, nome: 'Luna', raca: 'Lusitano', usuario: 'Helena Ribeiro', pais: 'Portugal', eventos: 9, idade: '11 anos' },
    { id: 3, nome: 'Fogo', raca: 'Crioulo', usuario: 'Ana Ferraz', pais: 'Brasil', eventos: 1, idade: '3 anos' },
    { id: 4, nome: 'Estrela', raca: 'Andaluz', usuario: 'Renata Souza', pais: 'Brasil', eventos: 14, idade: '9 anos' },
    { id: 5, nome: 'Vento', raca: 'Puro Sangue Inglês', usuario: 'Diego Alves', pais: 'Brasil', eventos: 2, idade: '4 anos' },
  ],
  comunidadeItens: [
    { autor: 'Post de Carlos Melo', denuncias: 2, resumo: '"Dica de treino" — denunciado por conteúdo enganoso.', acoes: ['Ocultar', 'Remover', 'Ignorar'], resolvido: false },
    { autor: 'Comentário em evento', denuncias: 1, resumo: 'Comentário sinalizado como possível assédio.', acoes: ['Remover', 'Avisar autor'], resolvido: false },
  ],
  denuncias: [
    { categoria: 'Maus-tratos', descricao: 'Vídeo denunciado por possível maus-tratos ao animal', tempo: 'há 12 min', resolvida: false },
    { categoria: 'Spam', descricao: 'Conta publicando links repetidos no feed', tempo: 'há 40 min', resolvida: false },
    { categoria: 'Fake', descricao: 'Perfil suspeito de se passar por profissional verificado', tempo: 'há 2h', resolvida: false },
    { categoria: 'Fraude', descricao: 'Anúncio de marketplace com preço suspeito', tempo: 'há 5h', resolvida: false },
    { categoria: 'Direitos autorais', descricao: 'Foto reportada como uso não autorizado', tempo: 'há 1 dia', resolvida: false },
  ],
  marketplaceItens: [
    { id: 0, nome: 'Sela clássica em couro', tipo: 'Produto', valor: 'R$ 1.890', status: 'Aprovado' },
    { id: 1, nome: 'Aula de adestramento', tipo: 'Serviço', valor: 'R$ 220', status: 'Pendente' },
    { id: 2, nome: 'Marina Kist — Veterinária', tipo: 'Profissional', valor: '4.9 ★', status: 'Verificado' },
    { id: 3, nome: 'Reserva de box · Haras Boa Vista', tipo: 'Reserva', valor: 'R$ 450/mês', status: 'Aprovado' },
    { id: 4, nome: 'Pedido #8821', tipo: 'Pedido', valor: 'R$ 340', status: 'Reembolso' },
  ],
  eventosAdmin: [
    { titulo: 'Copa Nacional de Salto', organizador: 'Federação Paulista', participantes: 240, ingressos: '210 vendidos' },
    { titulo: 'Clínica de Adestramento', organizador: 'Marina Kist', participantes: 32, ingressos: '32 vendidos' },
    { titulo: 'Encontro de Trilhas · Serra Verde', organizador: 'Clube de Trilhas', participantes: 58, ingressos: 'gratuito' },
  ],
  premiumMetricas: [
    { valor: 'R$ 214k', label: 'MRR' },
    { valor: 'R$ 2.6M', label: 'ARR' },
    { valor: 'R$ 890', label: 'LTV' },
    { valor: 'R$ 62', label: 'CAC' },
    { valor: '3.1%', label: 'Churn' },
  ],
  premiumPlanos: [
    { nome: 'Mensal', assinantes: '4.120' },
    { nome: 'Anual', assinantes: '8.340' },
    { nome: 'Trial ativo', assinantes: '640' },
  ],
  iaIndicadores: [
    { valor: '48.2k', label: 'Cartas geradas' },
    { valor: '6.900', label: 'Vídeos' },
    { valor: '3.100', label: 'Álbuns' },
    { valor: '91.4k', label: 'Insights' },
    { valor: 'R$ 38k', label: 'Custos/mês' },
    { valor: '1.8s', label: 'Tempo médio' },
    { valor: '0.4%', label: 'Erros' },
    { valor: '87%', label: 'Cache hit' },
    { valor: '12.6M', label: 'Tokens/dia' },
  ],
  iaFerramentas: ['Modelos', 'Prompts', 'Fallbacks', 'Limites', 'A/B Tests'],
  analyticsPaineis: ['Aquisição', 'Retenção', 'Engajamento', 'Marketplace', 'Comunidade', 'Premium', 'Eventos', 'IA'],
  receitas: [
    { label: 'Marketplace', valor: 'R$ 96.400' },
    { label: 'Premium', valor: 'R$ 214.200' },
    { label: 'Eventos', valor: 'R$ 38.900' },
    { label: 'Comissões', valor: 'R$ 12.100' },
    { label: 'Reembolsos', valor: '-R$ 4.300' },
  ],
  integracoes: [
    { nome: 'Stripe', desconectado: false },
    { nome: 'Apple Pay', desconectado: false },
    { nome: 'Google Pay', desconectado: false },
    { nome: 'PIX', desconectado: false },
  ],
  cmsList: [
    { id: 0, label: 'Artigos', count: 84, titulo: 'Artigos', conteudo: '' },
    { id: 1, label: 'Tutoriais', count: 22, titulo: 'Tutoriais', conteudo: '' },
    { id: 2, label: 'Banners', count: 6, titulo: 'Banners', conteudo: '' },
    { id: 3, label: 'Categorias', count: 18, titulo: 'Categorias', conteudo: '' },
    { id: 4, label: 'FAQ', count: 41, titulo: 'FAQ', conteudo: '' },
    { id: 5, label: 'Emails', count: 12, titulo: 'Emails', conteudo: '' },
    { id: 6, label: 'Push', count: 9, titulo: 'Push', conteudo: '' },
    { id: 7, label: 'Landing pages', count: 5, titulo: 'Landing pages', conteudo: '' },
  ],
  segmentacaoOptions: ['País', 'Cidade', 'Plano', 'Idioma', 'Interesses', 'Atividade'],
  campanhas: [
    { titulo: 'Lembrete: Copa Nacional de Salto', tipo: 'Push', data: '18 jul, 09:00' },
    { titulo: 'Novidades do Clube Premium', tipo: 'Email', data: '22 jul, 14:00' },
    { titulo: 'Convite: Masterclass de Fotografia', tipo: 'In-app', data: '25 jul, 10:00' },
  ],
  suporteCategorias: ['Todos', 'Pagamento', 'Bug', 'Marketplace', 'Eventos', 'Premium', 'IA', 'Conta'],
  chamados: [
    { id: 0, assunto: 'Cobrança duplicada no plano anual', categoria: 'Pagamento', prioridade: 'Alta', sla: '2h', cliente: 'Mauro Andrade', mensagem: 'Fui cobrado duas vezes pelo plano anual neste mês. Podem verificar e reembolsar a duplicidade?', status: 'Aberto', resposta: '' },
    { id: 1, assunto: 'Erro ao gerar retrospectiva em vídeo', categoria: 'Bug', prioridade: 'Média', sla: '8h', cliente: 'Carlos Melo', mensagem: 'A retrospectiva em vídeo trava em 80% e não conclui, testei em duas redes diferentes.', status: 'Aberto', resposta: '' },
    { id: 2, assunto: 'Dúvida sobre reembolso de produto', categoria: 'Marketplace', prioridade: 'Baixa', sla: '24h', cliente: 'Ana Ferraz', mensagem: 'Comprei uma sela e preciso trocar o tamanho, como funciona o reembolso?', status: 'Aberto', resposta: '' },
    { id: 3, assunto: 'Não recebeu certificado do evento', categoria: 'Eventos', prioridade: 'Média', sla: '12h', cliente: 'Helena Ribeiro', mensagem: 'Participei da Clínica de Adestramento mas o certificado não chegou por email.', status: 'Aberto', resposta: '' },
    { id: 4, assunto: 'Cancelamento de assinatura Premium', categoria: 'Premium', prioridade: 'Alta', sla: '2h', cliente: 'Renata Souza', mensagem: 'Quero cancelar o Premium mas o botão de cancelar não aparece para mim.', status: 'Aberto', resposta: '' },
  ],
  auditoria: [
    { acao: 'Usuário #4471 banido', ator: 'Admin: Renata Souza', tempo: 'há 8 min' },
    { acao: 'Permissão de moderador concedida', ator: 'Admin: Paulo Lima', tempo: 'há 40 min' },
    { acao: 'Reembolso aprovado — Pedido #8821', ator: 'Financeiro: Júlia Prado', tempo: 'há 1h' },
    { acao: 'Feature flag "videosIa" ativada', ator: 'Produto: Diego Alves', tempo: 'há 3h' },
    { acao: 'Login administrativo', ator: 'Admin: Renata Souza', tempo: 'há 5h' },
    { acao: 'Conteúdo removido — denúncia #221', ator: 'Moderação: Bianca Reis', tempo: 'há 6h' },
  ],
  configGlobais: [
    { label: 'Idioma padrão', valor: 'Português (Brasil)' },
    { label: 'Países ativos', valor: '14' },
    { label: 'Planos', valor: '3' },
    { label: 'Categorias', valor: '22' },
    { label: 'Modelo de IA padrão', valor: 'EquiSoul-Vision-2' },
    { label: 'Comissão marketplace', valor: '8%' },
    { label: 'Prazo de cancelamento de eventos', valor: '48h' },
    { label: 'Feature flags ativas', valor: '5 de 7' },
  ],
  logs: [
    { fonte: 'API', mensagem: 'GET /v2/memories 200 · 82ms' },
    { fonte: 'IA', mensagem: 'gen_letter completed · 1.4s' },
    { fonte: 'Uploads', mensagem: 'photo_8891.jpg stored' },
    { fonte: 'Marketplace', mensagem: 'order_2213 payment confirmed' },
    { fonte: 'Eventos', mensagem: 'checkin event_44 · user_921' },
    { fonte: 'Push', mensagem: 'campaign_12 sent to 8.4k' },
    { fonte: 'Banco', mensagem: 'replica lag 0.3s' },
    { fonte: 'Emails', mensagem: 'digest_weekly delivered' },
    { fonte: 'API', mensagem: 'POST /v2/albums 201 · 140ms' },
    { fonte: 'IA', mensagem: 'insight_engine batch #88' },
  ],
  apis: [
    { key: 'ios', nome: 'App iOS', chave: 'sk_live_••••4f2a', rateLimit: '5k req/min', revoked: false, rotated: false },
    { key: 'android', nome: 'App Android', chave: 'sk_live_••••9b31', rateLimit: '5k req/min', revoked: false, rotated: false },
    { key: 'marketplace', nome: 'Parceiro Marketplace', chave: 'sk_live_••••1c08', rateLimit: '600 req/min', revoked: false, rotated: false },
    { key: 'financeiro', nome: 'Webhook Financeiro', chave: 'whsec_••••77ae', rateLimit: '—', revoked: false, rotated: false },
  ],
  flags: [
    { key: 'novoOnboarding', nome: 'Novo onboarding', escopo: 'Todos os países · v3.4+', on: true, hasRollout: false, rolloutPercent: 0 },
    { key: 'ranking2', nome: 'Ranking 2.0', escopo: 'Brasil · beta', on: false, hasRollout: false, rolloutPercent: 0 },
    { key: 'videosIa', nome: 'Vídeos automáticos por IA', escopo: 'Usuários Premium', on: true, hasRollout: false, rolloutPercent: 0 },
    { key: 'marketplacePro', nome: 'Marketplace Pro', escopo: 'Profissionais verificados', on: false, hasRollout: false, rolloutPercent: 0 },
    { key: 'checkinQr', nome: 'Check-in por QR', escopo: 'Todos os eventos', on: true, hasRollout: false, rolloutPercent: 0 },
    { key: 'temaHaras', nome: 'Tema Haras Clássico', escopo: 'Premium · fidelidade 12m+', on: false, hasRollout: false, rolloutPercent: 0 },
    { key: 'buscaSemantica', nome: 'Busca semântica na timeline', escopo: 'Rollout gradual', on: false, hasRollout: true, rolloutPercent: 10 },
  ],

  banirUsuario: (id) =>
    set((state) => ({
      usuarios: state.usuarios.map((u) => (u.id === id ? { ...u, status: 'Banido' } : u)),
      auditoria: [{ acao: `Usuário #${id} banido`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  reativarUsuario: (id) =>
    set((state) => ({
      usuarios: state.usuarios.map((u) => (u.id === id ? { ...u, status: 'Ativo' } : u)),
      auditoria: [{ acao: `Usuário #${id} reativado`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  verificarUsuario: (id) =>
    set((state) => ({
      usuarios: state.usuarios.map((u) => (u.id === id ? { ...u, status: 'Verificado' } : u)),
      auditoria: [{ acao: `Usuário #${id} verificado`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  resolverComunidadeItem: (index, acao) =>
    set((state) => ({
      comunidadeItens: state.comunidadeItens.map((item, i) => (i === index ? { ...item, resolvido: true } : item)),
      auditoria: [{ acao: `${acao} aplicado em conteúdo da comunidade`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  resolverDenuncia: (index) =>
    set((state) => ({
      denuncias: state.denuncias.map((d, i) => (i === index ? { ...d, resolvida: true } : d)),
      auditoria: [{ acao: `Denúncia "${state.denuncias[index]?.descricao ?? ''}" resolvida`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  setMarketplaceStatus: (id, status) =>
    set((state) => ({
      marketplaceItens: state.marketplaceItens.map((m) => (m.id === id ? { ...m, status } : m)),
      auditoria: [{ acao: `Item de marketplace #${id} marcado como "${status}"`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  addEvento: (evento) => set((state) => ({ eventosAdmin: [...state.eventosAdmin, evento] })),
  toggleIntegracao: (nome) =>
    set((state) => ({
      integracoes: state.integracoes.map((i) => (i.nome === nome ? { ...i, desconectado: !i.desconectado } : i)),
      auditoria: [{ acao: `Integração "${nome}" ${state.integracoes.find((i) => i.nome === nome)?.desconectado ? 'conectada' : 'desconectada'}`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  setCmsContent: (id, titulo, conteudo) =>
    set((state) => ({
      cmsList: state.cmsList.map((c) => (c.id === id ? { ...c, titulo, conteudo } : c)),
      auditoria: [{ acao: `Conteúdo CMS "${titulo}" atualizado`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  setChamadoStatus: (id, status) =>
    set((state) => ({
      chamados: state.chamados.map((c) => (c.id === id ? { ...c, status } : c)),
      auditoria: [{ acao: `Chamado #${id} marcado como "${status}"`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  setChamadoResposta: (id, resposta) =>
    set((state) => ({ chamados: state.chamados.map((c) => (c.id === id ? { ...c, resposta } : c)) })),
  addAuditoria: (acao, ator = ADMIN_ATOR) =>
    set((state) => ({ auditoria: [{ acao, ator, tempo: 'agora' }, ...state.auditoria] })),
  rotacionarApi: (key) =>
    set((state) => ({
      apis: state.apis.map((a) => (a.key === key ? { ...a, rotated: true, chave: a.chave.slice(0, -4) + 'a2f9' } : a)),
      auditoria: [{ acao: `Chave de API "${key}" rotacionada`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  revogarApi: (key) =>
    set((state) => ({
      apis: state.apis.map((a) => (a.key === key ? { ...a, revoked: true } : a)),
      auditoria: [{ acao: `Chave de API "${key}" revogada`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  toggleFlag: (key) =>
    set((state) => ({
      flags: state.flags.map((f) => (f.key === key ? { ...f, on: !f.on } : f)),
      auditoria: [{ acao: `Feature flag "${key}" ${state.flags.find((f) => f.key === key)?.on ? 'desativada' : 'ativada'}`, ator: ADMIN_ATOR, tempo: 'agora' }, ...state.auditoria],
    })),
  setRolloutPercent: (key, percent) =>
    set((state) => ({ flags: state.flags.map((f) => (f.key === key ? { ...f, rolloutPercent: percent } : f)) })),
}));
