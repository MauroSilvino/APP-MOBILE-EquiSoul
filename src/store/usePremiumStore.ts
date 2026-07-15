import { create } from 'zustand';

export interface PremiumHomeCard {
  id: string;
  label: string;
  destino: PremiumDestino;
}

export type PremiumDestino =
  | 'PremiumBeneficios'
  | 'PremiumIA'
  | 'PremiumTemas'
  | 'PremiumLivros'
  | 'PremiumVideos'
  | 'PremiumBiblioteca'
  | 'PremiumClube'
  | 'PremiumEventos'
  | 'PremiumPersonalizacao'
  | 'PremiumBackup';

export interface TemaPremium {
  id: string;
  nome: string;
  bg: string;
  border: string;
}

export interface LivroDigital {
  id: string;
  titulo: string;
  capitulos: number;
}

export interface VideoEstilo {
  id: string;
  nome: string;
}

export interface ConteudoBiblioteca {
  id: string;
  titulo: string;
  categoria: string;
  statusLabel: string;
}

export interface EventoPremium {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
}

const HOME_CARDS: PremiumHomeCard[] = [
  { id: 'beneficios', label: 'Benefícios', destino: 'PremiumBeneficios' },
  { id: 'ia', label: 'IA Premium', destino: 'PremiumIA' },
  { id: 'temas', label: 'Temas', destino: 'PremiumTemas' },
  { id: 'livros', label: 'Livros digitais', destino: 'PremiumLivros' },
  { id: 'videos', label: 'Vídeos Premium', destino: 'PremiumVideos' },
  { id: 'biblioteca', label: 'Biblioteca Premium', destino: 'PremiumBiblioteca' },
  { id: 'clube', label: 'Clube Premium', destino: 'PremiumClube' },
  { id: 'eventos', label: 'Eventos Premium', destino: 'PremiumEventos' },
  { id: 'personalizacao', label: 'Personalização', destino: 'PremiumPersonalizacao' },
  { id: 'backup', label: 'Backup Premium', destino: 'PremiumBackup' },
];

const BENEFICIOS_LIST = [
  'Storytelling avançado com IA',
  'Vídeos cinematográficos da sua jornada',
  'Livros digitais gerados automaticamente',
  'Temas exclusivos para o app',
  'Biblioteca Premium consolidada',
  'Clube Premium com comunidade exclusiva',
  'Eventos e encontros exclusivos',
  'Backup ampliado de mídias',
  'Retrospectivas anuais personalizadas',
  'Prioridade no suporte',
  'Selo de assinante no perfil',
  'Acesso antecipado a novos recursos',
];

const IA_PREMIUM_RECURSOS = [
  'Cartas emocionais em qualquer momento',
  'Retrospectivas ilimitadas',
  'Linha do tempo emocional avançada',
  'Álbuns narrados por IA',
  'Sugestões de memórias personalizadas',
  'Roteiros para vídeos cinematográficos',
  'Resumos automáticos de saúde do cavalo',
  'Recomendações de cuidados baseadas em histórico',
];

const IA_PREMIUM_CRIACOES = [
  'Carta emocional',
  'Vídeo retrospectiva',
  'Livro digital',
  'Retrato pintado',
  'Poema',
  'Álbum narrado',
  'Linha do tempo',
];

const TEMAS_LIST: TemaPremium[] = [
  { id: 'campo-dourado', nome: 'Campo Dourado', bg: '#C9A15A', border: 'transparent' },
  { id: 'noite-estrelada', nome: 'Noite Estrelada', bg: '#2B2924', border: 'transparent' },
  { id: 'aurora-rosa', nome: 'Aurora Rosa', bg: '#D9A8A0', border: 'transparent' },
  { id: 'floresta', nome: 'Floresta', bg: '#4F5D45', border: 'transparent' },
  { id: 'ceu-claro', nome: 'Céu Claro', bg: '#A9C1D9', border: 'transparent' },
  { id: 'terracota', nome: 'Terracota', bg: '#B85C4C', border: 'transparent' },
  { id: 'areia', nome: 'Areia', bg: '#EAE4D6', border: 'rgba(43,41,36,0.14)' },
  { id: 'vinho', nome: 'Vinho', bg: '#6B3A3A', border: 'transparent' },
  { id: 'lavanda', nome: 'Lavanda', bg: '#A69AC7', border: 'transparent' },
];

const LIVROS_LIST: LivroDigital[] = [
  { id: 'livro-1', titulo: 'A jornada de Thor', capitulos: 8 },
  { id: 'livro-2', titulo: 'Um ano de conquistas', capitulos: 12 },
  { id: 'livro-3', titulo: 'Retrospectiva 2025', capitulos: 6 },
  { id: 'livro-4', titulo: 'Primeiros passos', capitulos: 5 },
];

const VIDEO_ESTILOS: VideoEstilo[] = [
  { id: 'documentario', nome: 'Documentário' },
  { id: 'cinematico', nome: 'Cinemático' },
  { id: 'nostalgico', nome: 'Nostálgico' },
  { id: 'minimalista', nome: 'Minimalista' },
  { id: 'aventura', nome: 'Aventura' },
  { id: 'emocional', nome: 'Emocional' },
];

const BIBLIOTECA_CATEGORIAS = ['Bem-estar', 'Treinamento', 'Nutrição', 'Emocional', 'História', 'Saúde'];

const BIBLIOTECA_LIST: ConteudoBiblioteca[] = [
  { id: 'bib-1', titulo: 'A jornada de Thor', categoria: 'História', statusLabel: '3 de 8 capítulos' },
  { id: 'bib-2', titulo: 'Vídeo cinemático · Verão 2025', categoria: 'História', statusLabel: 'Concluído' },
  { id: 'bib-3', titulo: 'Guia de bem-estar equino', categoria: 'Bem-estar', statusLabel: 'Não iniciado' },
  { id: 'bib-4', titulo: 'Fundamentos de nutrição', categoria: 'Nutrição', statusLabel: '2 de 6 capítulos' },
  { id: 'bib-5', titulo: 'Linha do tempo emocional', categoria: 'Emocional', statusLabel: 'Não iniciado' },
];

const CLUBE_ITENS = [
  'Fórum exclusivo de assinantes',
  'Mentoria mensal com especialistas',
  'Grupo de WhatsApp da comunidade',
  'Desafios mensais com premiação',
  'Encontros presenciais exclusivos',
  'Convidados especiais em lives',
  'Selo de membro fundador',
];

const EVENTOS_PREMIUM_LIST: EventoPremium[] = [
  { id: 'evt-p1', titulo: 'Encontro anual do Clube EquiSoul', data: '14 set', tipo: 'Presencial' },
  { id: 'evt-p2', titulo: 'Live com veterinária especialista', data: '22 ago', tipo: 'Online' },
  { id: 'evt-p3', titulo: 'Workshop de storytelling equino', data: '05 out', tipo: 'Online' },
  { id: 'evt-p4', titulo: 'Retiro de bem-estar com cavalos', data: '18 nov', tipo: 'Presencial' },
  { id: 'evt-p5', titulo: 'Bate-papo com fundadores', data: '30 ago', tipo: 'Online' },
];

const PERSONALIZACAO_ITENS = [
  'Notificações',
  'Tema do app',
  'Idioma',
  'Privacidade dos dados',
  'Backup automático',
  'Assinatura e pagamento',
  'Preferências de IA',
  'Exportar dados',
];

const BACKUP_PREMIUM_ITENS = [
  'Fotos em alta resolução',
  'Vídeos completos',
  'Documentos e exames',
  'Livros digitais gerados',
  'Retrospectivas cinematográficas',
  'Cartas da IA',
  'Histórico completo de memórias',
];

export interface PlanoPremium {
  id: string;
  nome: string;
  badge: string | null;
  precoMensal: string;
  precoAnual: string;
  precoNotaMensal: string;
  precoNotaAnual: string;
  cancelNote: string | null;
  socialProof: string | null;
  tags?: string[];
  features: string[];
  botao: string;
  highlight: boolean;
  recorrente: boolean;
}

const PLANOS_PREMIUM: PlanoPremium[] = [
  {
    id: 'gratuito',
    nome: 'Gratuito',
    badge: null,
    precoMensal: 'R$ 0',
    precoAnual: 'R$ 0',
    precoNotaMensal: 'Para sempre',
    precoNotaAnual: 'Para sempre',
    cancelNote: null,
    socialProof: null,
    features: [
      'Diário',
      'Perfil do Cavalo',
      'Comunidade',
      'Agenda',
      'Marketplace',
      'Eventos',
      'Registro de Memórias',
      'Cartas IA limitadas',
      'Backup básico',
    ],
    botao: 'Continuar Gratuito',
    highlight: false,
    recorrente: false,
  },
  {
    id: 'individual',
    nome: 'Premium Individual',
    badge: 'Mais Popular',
    precoMensal: 'R$ 39,90/mês',
    precoAnual: 'R$ 399,90/ano',
    precoNotaMensal: 'Cobrança mensal',
    precoNotaAnual: 'Equivalente a R$ 33,32/mês · economize 17%',
    cancelNote: 'Cancele quando quiser, sem multas.',
    socialProof: null,
    features: [
      'IA ilimitada',
      'Cartas ilimitadas',
      'Storytelling avançado',
      'Livros digitais',
      'Documentários automáticos',
      'Podcast narrado',
      'Linha do tempo premium',
      'Estatísticas avançadas',
      'Temas exclusivos',
      'Widgets Premium',
      'Backup ilimitado',
      'Mais armazenamento',
      'Exportações premium',
      'Clube Premium',
      'Eventos exclusivos',
      'Biblioteca de cursos',
      'Prioridade em novos recursos',
    ],
    botao: 'Assinar Premium',
    highlight: true,
    recorrente: true,
  },
  {
    id: 'familia',
    nome: 'Premium Família',
    badge: null,
    precoMensal: 'R$ 89,90/mês',
    precoAnual: 'R$ 89,90/mês',
    precoNotaMensal: 'Até 5 membros',
    precoNotaAnual: 'Até 5 membros',
    cancelNote: 'Cancele quando quiser, sem multas.',
    socialProof: null,
    features: [
      'Até 5 membros',
      'Até 10 cavalos',
      'Biblioteca compartilhada',
      'Agenda compartilhada',
      'Álbuns compartilhados',
      'IA compartilhada',
      'Espaço de armazenamento ampliado',
      'Todos os benefícios do Individual',
    ],
    botao: 'Assinar Família',
    highlight: false,
    recorrente: true,
  },
  {
    id: 'profissional',
    nome: 'Premium Profissional',
    badge: null,
    precoMensal: 'R$ 99,90/mês',
    precoAnual: 'R$ 99,90/mês',
    precoNotaMensal: '7 dias grátis para testar',
    precoNotaAnual: '7 dias grátis para testar',
    cancelNote: 'Cancele quando quiser, sem multas.',
    socialProof: 'Mais de 2.400 profissionais já usam o EquiSoul',
    tags: ['Veterinários', 'Treinadores', 'Ferradores', 'Dentistas', 'Fotógrafos', 'Instrutores'],
    features: [
      'Agenda profissional',
      'CRM de clientes',
      'Gestão de cavalos atendidos',
      'Reservas online',
      'Analytics',
      'Perfil verificado',
      'Portfólio',
      'Financeiro',
      'Mensagens',
      'Relatórios',
    ],
    botao: 'Assinar Profissional',
    highlight: false,
    recorrente: true,
  },
  {
    id: 'haras',
    nome: 'Premium Haras',
    badge: null,
    precoMensal: 'R$ 399,90/mês',
    precoAnual: 'R$ 399,90/mês',
    precoNotaMensal: 'Gestão completa do haras',
    precoNotaAnual: 'Gestão completa do haras',
    cancelNote: 'Cancele quando quiser, sem multas.',
    socialProof: null,
    features: [
      'Funcionários',
      'Treinadores',
      'Clientes',
      'Agenda',
      'Financeiro',
      'Analytics',
      'Gestão de eventos',
      'Marketplace',
      'Controle de cavalos',
      'Painel administrativo',
    ],
    botao: 'Conhecer Plano Haras',
    highlight: false,
    recorrente: true,
  },
];

export interface AvulsoPremium {
  id: string;
  titulo: string;
  preco: string;
  descricao: string;
  imagemLabel: string;
}

const AVULSOS_LIST: AvulsoPremium[] = [
  {
    id: 'avulso-livro',
    titulo: 'Livro Digital',
    preco: 'R$ 29,90',
    descricao: 'Todo o capítulo da sua jornada, em um livro ilustrado pela IA.',
    imagemLabel: 'capa · livro digital',
  },
  {
    id: 'avulso-documentario',
    titulo: 'Documentário IA',
    preco: 'R$ 49,90',
    descricao: 'Um filme narrado com os melhores momentos vividos com seu cavalo.',
    imagemLabel: 'still · documentário',
  },
  {
    id: 'avulso-podcast',
    titulo: 'Podcast Narrado',
    preco: 'R$ 19,90',
    descricao: 'Sua história narrada em áudio, como um episódio exclusivo.',
    imagemLabel: 'capa · podcast',
  },
  {
    id: 'avulso-retrospectiva',
    titulo: 'Retrospectiva Cinematográfica',
    preco: 'R$ 39,90',
    descricao: 'Um resumo emocionante do ano, em formato de vídeo.',
    imagemLabel: 'still · retrospectiva',
  },
  {
    id: 'avulso-linha-do-tempo',
    titulo: 'Linha do Tempo Ilustrada',
    preco: 'R$ 24,90',
    descricao: 'Sua jornada em uma linha do tempo ilustrada e afetiva.',
    imagemLabel: 'preview · linha do tempo',
  },
];

const FUNDADOR_BENEFICIOS = [
  'Premium Vitalício',
  'Badge exclusiva "Fundador"',
  'Nome na página de agradecimentos',
  'Acesso antecipado a novos recursos',
  'Participação em testes fechados',
  'Votação em funcionalidades futuras',
];

export interface FAQPremium {
  id: string;
  pergunta: string;
  resposta: string;
}

const FAQ_LIST: FAQPremium[] = [
  {
    id: 'faq-cancelar',
    pergunta: 'Posso cancelar quando quiser?',
    resposta: 'Sim. Você pode cancelar em qualquer momento, sem multas ou taxas extras.',
  },
  {
    id: 'faq-dados',
    pergunta: 'O que acontece com meus dados?',
    resposta: 'Seus dados continuam seguros e disponíveis. Nada é excluído automaticamente após o cancelamento.',
  },
  {
    id: 'faq-memorias',
    pergunta: 'Perco minhas memórias ao cancelar?',
    resposta:
      'Não. Suas memórias, fotos e diários continuam com você — apenas os recursos exclusivos do Premium deixam de estar disponíveis.',
  },
  {
    id: 'faq-mudar-plano',
    pergunta: 'Posso mudar de plano?',
    resposta: 'Sim, você pode alternar entre os planos Individual, Família, Profissional ou Haras quando quiser.',
  },
  {
    id: 'faq-anual',
    pergunta: 'Como funciona o plano anual?',
    resposta: 'O valor é cobrado uma vez por ano, com economia de 17% em relação ao plano mensal.',
  },
  {
    id: 'faq-familia',
    pergunta: 'Como funciona o plano Família?',
    resposta: 'Até 5 membros e 10 cavalos compartilham agenda, álbuns e IA em um único espaço.',
  },
];

export interface FaturaPremium {
  id: string;
  plano: string;
  data: string;
  valor: string;
}

export const FATURAS_MENSAL: FaturaPremium[] = [
  { id: 'fat-m1', plano: 'EquiSoul Premium · Mensal', data: '14 jun 2026', valor: 'R$ 39,90' },
  { id: 'fat-m2', plano: 'EquiSoul Premium · Mensal', data: '14 mai 2026', valor: 'R$ 39,90' },
  { id: 'fat-m3', plano: 'EquiSoul Premium · Mensal', data: '14 abr 2026', valor: 'R$ 39,90' },
];

export const FATURAS_ANUAL: FaturaPremium[] = [
  { id: 'fat-a1', plano: 'EquiSoul Premium · Anual', data: '14 jul 2026', valor: 'R$ 399,90' },
  { id: 'fat-a2', plano: 'EquiSoul Premium · Anual', data: '14 jul 2025', valor: 'R$ 399,90' },
  { id: 'fat-a3', plano: 'EquiSoul Premium · Anual', data: '14 jul 2024', valor: 'R$ 359,90' },
];

export type PremiumBilling = 'Mensal' | 'Anual';

export interface AssinaturaAtiva {
  planoId: string | null;
  plano: string;
  preco: string;
  proximaCobranca: string;
  status: 'ativa' | 'cancelada';
  billing: PremiumBilling;
}

export interface IniciarAssinaturaInput {
  planoId: string;
  plano: string;
  preco: string;
  proximaCobranca: string;
  billing: PremiumBilling;
}

interface PremiumState {
  homeCards: PremiumHomeCard[];
  beneficiosList: string[];
  iaPremiumRecursos: string[];
  iaPremiumCriacoes: string[];

  temasList: TemaPremium[];
  temaSelecionado: string;
  selecionarTema: (id: string) => void;

  livrosList: LivroDigital[];

  videoEstilos: VideoEstilo[];
  videoEstiloSelecionado: string;
  selecionarVideoEstilo: (id: string) => void;

  bibliotecaCategorias: string[];
  bibliotecaCategoriaSelecionada: string;
  selecionarBibliotecaCategoria: (categoria: string) => void;
  bibliotecaList: ConteudoBiblioteca[];
  bibliotecaIniciados: Record<string, boolean>;
  toggleBibliotecaIniciado: (id: string) => void;

  clubeItens: string[];

  eventosPremiumList: EventoPremium[];

  personalizacaoItens: string[];

  backupPremiumItens: string[];

  planosPremium: PlanoPremium[];

  avulsosList: AvulsoPremium[];

  fundadorBeneficios: string[];
  vagasOcupadas: number;
  waitlisted: boolean;
  entrarListaEspera: () => void;

  faqList: FAQPremium[];

  assinaturaAtiva: AssinaturaAtiva;
  iniciarAssinatura: (input: IniciarAssinaturaInput) => void;
  cancelarAssinatura: () => void;
  reativarAssinatura: () => void;
}

export const usePremiumStore = create<PremiumState>((set) => ({
  homeCards: HOME_CARDS,
  beneficiosList: BENEFICIOS_LIST,
  iaPremiumRecursos: IA_PREMIUM_RECURSOS,
  iaPremiumCriacoes: IA_PREMIUM_CRIACOES,

  temasList: TEMAS_LIST,
  temaSelecionado: 'campo-dourado',
  selecionarTema: (id) => set({ temaSelecionado: id }),

  livrosList: LIVROS_LIST,

  videoEstilos: VIDEO_ESTILOS,
  videoEstiloSelecionado: 'documentario',
  selecionarVideoEstilo: (id) => set({ videoEstiloSelecionado: id }),

  bibliotecaCategorias: BIBLIOTECA_CATEGORIAS,
  bibliotecaCategoriaSelecionada: 'Bem-estar',
  selecionarBibliotecaCategoria: (categoria) => set({ bibliotecaCategoriaSelecionada: categoria }),
  bibliotecaList: BIBLIOTECA_LIST,
  bibliotecaIniciados: { 'bib-2': true },
  toggleBibliotecaIniciado: (id) =>
    set((state) => ({
      bibliotecaIniciados: { ...state.bibliotecaIniciados, [id]: !state.bibliotecaIniciados[id] },
    })),

  clubeItens: CLUBE_ITENS,

  eventosPremiumList: EVENTOS_PREMIUM_LIST,

  personalizacaoItens: PERSONALIZACAO_ITENS,

  backupPremiumItens: BACKUP_PREMIUM_ITENS,

  planosPremium: PLANOS_PREMIUM,

  avulsosList: AVULSOS_LIST,

  fundadorBeneficios: FUNDADOR_BENEFICIOS,
  vagasOcupadas: 312,
  waitlisted: false,
  entrarListaEspera: () => set({ waitlisted: true }),

  faqList: FAQ_LIST,

  assinaturaAtiva: {
    planoId: null,
    plano: 'Gratuito',
    preco: 'R$ 0',
    proximaCobranca: '—',
    status: 'ativa',
    billing: 'Mensal',
  },
  iniciarAssinatura: (input) =>
    set({
      assinaturaAtiva: {
        planoId: input.planoId,
        plano: input.plano,
        preco: input.preco,
        proximaCobranca: input.proximaCobranca,
        status: 'ativa',
        billing: input.billing,
      },
    }),
  cancelarAssinatura: () =>
    set((state) => ({ assinaturaAtiva: { ...state.assinaturaAtiva, status: 'cancelada' } })),
  reativarAssinatura: () =>
    set((state) => ({ assinaturaAtiva: { ...state.assinaturaAtiva, status: 'ativa' } })),
}));
