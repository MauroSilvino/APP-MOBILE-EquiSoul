import { create } from 'zustand';

export interface Comentario {
  id: string;
  nome: string;
  texto: string;
  tempo: string;
}

export interface Post {
  id: string;
  autor: string;
  comCavalo?: string;
  local: string;
  fotoLabel: string;
  texto: string;
  iaComentario?: string;
  likesBase: number;
  liked: boolean;
  saved: boolean;
  comentarios: Comentario[];
}

export interface StoryItem {
  id: string;
  nome: string;
  user: string;
  caption: string;
}

export interface Reel {
  id: string;
  user: string;
  caption: string;
  categoria: string;
  likesBase: number;
  liked: boolean;
}

export interface ExplorarItem {
  id: string;
  titulo: string;
  categoria: string;
  altura: number;
}

export interface EventoSocial {
  id: string;
  tipo: string;
  titulo: string;
  data: string;
  cidade: string;
  participantes: number;
  participando: boolean;
  percurso: string;
  descricao: string;
}

export interface GrupoPost {
  autor: string;
  texto: string;
}

export interface Grupo {
  id: string;
  nome: string;
  membros: string;
  publico: boolean;
  entrou: boolean;
  posts: GrupoPost[];
}

export interface ChatMensagem {
  id: string;
  role: 'me' | 'them';
  texto: string;
  midiaUri?: string;
}

export interface Conversa {
  id: string;
  nome: string;
  hora: string;
  unread: boolean;
  mensagens: ChatMensagem[];
}

interface CommunityState {
  posts: Post[];
  stories: StoryItem[];
  reels: Reel[];
  explorarItems: ExplorarItem[];
  eventos: EventoSocial[];
  grupos: Grupo[];
  conversas: Conversa[];
  seguindoSugestao: boolean;
  sugestaoDispensada: boolean;

  toggleLikePost: (id: string) => void;
  toggleSavePost: (id: string) => void;
  addComentario: (postId: string, texto: string) => void;
  toggleLikeReel: (id: string) => void;
  toggleParticipar: (eventoId: string) => void;
  criarGrupo: (nome: string) => void;
  toggleEntrarGrupo: (id: string) => void;
  abrirConversa: (id: string) => void;
  enviarMensagem: (conversaId: string, texto: string, midiaUri?: string) => void;
  toggleSeguirSugestao: () => void;
  dispensarSugestao: () => void;
}

const initialPosts: Post[] = [
  {
    id: 'post-1',
    autor: 'Ana Ferraz',
    comCavalo: 'Luna',
    local: 'Haras Boa Vista',
    fotoLabel: 'foto · primeiro salto da Luna',
    texto: 'Depois de meses de treino, finalmente aconteceu. 🐴',
    likesBase: 128,
    liked: false,
    saved: false,
    comentarios: [
      { id: 'c1', nome: 'Helena Ribeiro', texto: 'Que orgulho, parabéns aos dois! 🐴', tempo: '2h' },
      { id: 'c2', nome: 'Rafael Dias', texto: 'A Luna estava linda nesse salto', tempo: '1h' },
    ],
  },
  {
    id: 'post-2',
    autor: 'Carlos Melo',
    comCavalo: 'Trovão',
    local: 'Prova de tambor · Ribeirão Preto',
    fotoLabel: 'foto · competição de tambor',
    texto: '1º lugar hoje — a persistência valeu a pena.',
    iaComentario: 'Um momento inspirador de superação para toda a comunidade.',
    likesBase: 96,
    liked: false,
    saved: false,
    comentarios: [],
  },
];

const initialStories: StoryItem[] = [
  { id: 's-ana', nome: 'Ana', user: 'ana.ferraz', caption: 'Manhã de trilha com a Bela 🌤️' },
  { id: 's-carlos', nome: 'Carlos', user: 'carlos.melo', caption: 'Treino de adestramento hoje' },
  { id: 's-helena', nome: 'Helena', user: 'helena.ribeiro', caption: 'Preparando a Luna para amanhã' },
  { id: 's-julia', nome: 'Julia', user: 'julia.santos', caption: 'Um dia de descanso merecido' },
];

const initialReels: Reel[] = [
  { id: 'reel-1', user: 'carlos.melo', caption: 'Salto de 1,10m na pista principal 🏇', categoria: 'Saltos', likesBase: 340, liked: false },
  { id: 'reel-2', user: 'carlos.melo', caption: 'Trilha ao amanhecer com o grupo', categoria: 'Trilhas', likesBase: 812, liked: false },
  { id: 'reel-3', user: 'carlos.melo', caption: 'Bastidores do treino de hoje', categoria: 'Bastidores', likesBase: 156, liked: false },
];

const initialExplorarItems: ExplorarItem[] = [
  { id: 'ex-1', titulo: 'salto grande', categoria: 'Saltos', altura: 140 },
  { id: 'ex-2', titulo: 'trilha matinal', categoria: 'Trilhas', altura: 100 },
  { id: 'ex-3', titulo: 'raça mangalarga', categoria: 'Raças', altura: 100 },
  { id: 'ex-4', titulo: 'equipamento novo', categoria: 'Equipamentos', altura: 140 },
  { id: 'ex-5', titulo: 'fotografia equestre', categoria: 'Fotografia', altura: 120 },
  { id: 'ex-6', titulo: 'haras aberto', categoria: 'Haras', altura: 120 },
  { id: 'ex-7', titulo: 'salto competição', categoria: 'Saltos', altura: 140 },
  { id: 'ex-8', titulo: 'trilha em grupo', categoria: 'Trilhas', altura: 100 },
];

const initialEventos: EventoSocial[] = [
  {
    id: 'evt-1',
    tipo: 'Encontro de trilhas',
    titulo: 'Encontro de Trilhas · Serra Verde',
    data: 'Sáb, 12 de julho · 9h',
    cidade: 'Serra Verde, MG',
    participantes: 48,
    participando: false,
    percurso: '12km',
    descricao:
      'Um passeio tranquilo entre cachoeiras, com parada para fotos e um piquenique ao meio-dia. Aberto a todos os níveis.',
  },
  {
    id: 'evt-2',
    tipo: 'Competição',
    titulo: 'Copa Regional de Salto',
    data: 'Dom, 20 de julho · 8h',
    cidade: 'Ribeirão Preto, SP',
    participantes: 132,
    participando: false,
    percurso: '—',
    descricao: 'Competição regional de salto com categorias para todos os níveis, do iniciante ao avançado.',
  },
  {
    id: 'evt-3',
    tipo: 'Clínica',
    titulo: 'Clínica de Adestramento com Marina Kist',
    data: 'Sáb, 26 de julho · 10h',
    cidade: 'Campinas, SP',
    participantes: 22,
    participando: false,
    percurso: '—',
    descricao: 'Clínica prática de adestramento com a instrutora Marina Kist, vagas limitadas.',
  },
];

const initialGrupos: Grupo[] = [
  {
    id: 'grupo-mangalarga',
    nome: 'Amantes de Mangalarga',
    membros: '2.340',
    publico: true,
    entrou: false,
    posts: [{ autor: 'Beatriz Souza', texto: 'Alguém tem dicas de casqueamento para potros?' }],
  },
  { id: 'grupo-salto', nome: 'Salto 1,20m', membros: '860', publico: true, entrou: false, posts: [] },
  { id: 'grupo-trilhas-rj', nome: 'Trilhas RJ', membros: '1.120', publico: true, entrou: false, posts: [] },
  { id: 'grupo-amazonas', nome: 'Amazonas Iniciantes', membros: '640', publico: true, entrou: false, posts: [] },
];

const initialConversas: Conversa[] = [
  {
    id: 'ana',
    nome: 'Ana Ferraz',
    hora: '14:32',
    unread: false,
    mensagens: [
      { id: 'm1', role: 'them', texto: 'Oi! Vi que a Bela deu o primeiro salto essa semana 🎉' },
      { id: 'm2', role: 'me', texto: 'Sim! Foi um momento incrível, estava nervosa haha' },
      { id: 'm3', role: 'them', texto: 'Com certeza vai render uma carta linda da IA' },
    ],
  },
  {
    id: 'grupo-trilhas',
    nome: 'Grupo Trilhas RJ',
    hora: '12:10',
    unread: true,
    mensagens: [{ id: 'm4', role: 'them', texto: 'Carlos: alguém vai no encontro de sábado?' }],
  },
  {
    id: 'helena',
    nome: 'Helena Ribeiro',
    hora: 'ontem',
    unread: false,
    mensagens: [{ id: 'm5', role: 'them', texto: 'Combinado! Te vejo no haras' }],
  },
  {
    id: 'rafael',
    nome: 'Rafael Dias',
    hora: 'ontem',
    unread: true,
    mensagens: [{ id: 'm6', role: 'them', texto: 'Aquele vídeo do salto ficou incrível 🔥' }],
  },
];

export const useCommunityStore = create<CommunityState>((set) => ({
  posts: initialPosts,
  stories: initialStories,
  reels: initialReels,
  explorarItems: initialExplorarItems,
  eventos: initialEventos,
  grupos: initialGrupos,
  conversas: initialConversas,
  seguindoSugestao: false,
  sugestaoDispensada: false,

  toggleLikePost: (id) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, liked: !post.liked } : post)),
    })),

  toggleSavePost: (id) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, saved: !post.saved } : post)),
    })),

  addComentario: (postId, texto) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comentarios: [...post.comentarios, { id: `c-${Date.now()}`, nome: 'Você', texto, tempo: 'agora' }],
            }
          : post
      ),
    })),

  toggleLikeReel: (id) =>
    set((state) => ({
      reels: state.reels.map((reel) => (reel.id === id ? { ...reel, liked: !reel.liked } : reel)),
    })),

  toggleParticipar: (eventoId) =>
    set((state) => ({
      eventos: state.eventos.map((evento) =>
        evento.id === eventoId ? { ...evento, participando: !evento.participando } : evento
      ),
    })),

  criarGrupo: (nome) =>
    set((state) => ({
      grupos: [
        ...state.grupos,
        { id: `grupo-${Date.now()}`, nome: nome.trim() || 'Grupo sem nome', membros: '1', publico: true, entrou: true, posts: [] },
      ],
    })),

  toggleEntrarGrupo: (id) =>
    set((state) => ({
      grupos: state.grupos.map((grupo) => (grupo.id === id ? { ...grupo, entrou: !grupo.entrou } : grupo)),
    })),

  abrirConversa: (id) =>
    set((state) => ({
      conversas: state.conversas.map((conversa) => (conversa.id === id ? { ...conversa, unread: false } : conversa)),
    })),

  enviarMensagem: (conversaId, texto, midiaUri) =>
    set((state) => ({
      conversas: state.conversas.map((conversa) =>
        conversa.id === conversaId
          ? {
              ...conversa,
              mensagens: [...conversa.mensagens, { id: `m-${Date.now()}`, role: 'me', texto, midiaUri }],
            }
          : conversa
      ),
    })),

  toggleSeguirSugestao: () => set((state) => ({ seguindoSugestao: !state.seguindoSugestao })),
  dispensarSugestao: () => set({ sugestaoDispensada: true }),
}));
