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
  | 'PremiumPersonalizacao';

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
}));
