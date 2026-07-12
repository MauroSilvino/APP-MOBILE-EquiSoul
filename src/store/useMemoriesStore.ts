import { create } from 'zustand';

export type FavoritoCategoria = 'Fotos' | 'Cartas' | 'Vídeos' | 'Posts';

export interface Memoria {
  id: string;
  tipo: string;
  titulo: string;
  subtitulo: string;
  nota: string;
  emocao: string | null;
  local: string;
  midiaCount: number;
  favorito: boolean;
  favoritoCategoria: FavoritoCategoria;
  relativeLabel: string;
  diaDoMes: number | null;
  tags: string[];
}

export interface MidiaItem {
  id: string;
  uri: string;
  tipo: 'image' | 'video';
}

export interface MarcacaoSelecionada {
  categoria: string;
  nome: string;
}

export interface PrivacidadeToggles {
  comentarios: boolean;
  compartilhar: boolean;
  download: boolean;
  ocultarLocalizacao: boolean;
}

export interface CriarMemoriaDraft {
  tipo: string | null;
  midiaItems: MidiaItem[];
  dia: string | null;
  cavaloHumor: string | null;
  usuarioHumor: string | null;
  intensidade: string | null;
  duracao: number;
  local: string;
  descricao: string;
  marcacoes: MarcacaoSelecionada[];
  quemVe: string;
  privToggles: PrivacidadeToggles;
}

export interface RascunhoMemoria {
  id: string;
  titulo: string;
  info: string;
  snapshot: CriarMemoriaDraft;
}

interface MemoriesState {
  memorias: Memoria[];
  ultimaMemoriaId: string | null;
  criarMemoriaDraft: CriarMemoriaDraft;
  rascunhos: RascunhoMemoria[];
  customAlbuns: string[];
  setCriarMemoriaDraft: (patch: Partial<CriarMemoriaDraft>) => void;
  resetCriarMemoriaDraft: () => void;
  finalizarCriarMemoria: () => string;
  salvarRascunho: () => void;
  carregarRascunho: (id: string) => void;
  removerRascunho: (id: string) => void;
  criarAlbum: (nome: string) => void;
  atualizarMemoria: (id: string, patch: { tipo: string; emocao: string | null; nota: string }) => void;
  toggleFavorito: (id: string) => void;
  removerMemoria: (id: string) => void;
}

const initialDraft: CriarMemoriaDraft = {
  tipo: null,
  midiaItems: [],
  dia: null,
  cavaloHumor: null,
  usuarioHumor: null,
  intensidade: null,
  duracao: 45,
  local: '',
  descricao: '',
  marcacoes: [],
  quemVe: 'Seguidores',
  privToggles: { comentarios: true, compartilhar: true, download: false, ocultarLocalizacao: false },
};

const initialMemorias: Memoria[] = [
  {
    id: 'seed-1',
    tipo: 'Treino',
    titulo: 'Primeiro treino da semana',
    subtitulo: 'Trote leve na área externa',
    nota: 'Trote leve na área externa. Bela pareceu muito mais confiante nas transições hoje.',
    emocao: '😊',
    local: 'Haras Vale Verde',
    midiaCount: 1,
    favorito: true,
    favoritoCategoria: 'Fotos',
    relativeLabel: 'Hoje',
    diaDoMes: 7,
    tags: ['Bela', 'Haras Vale Verde', 'Treino'],
  },
  {
    id: 'seed-2',
    tipo: 'Passeio',
    titulo: 'Passeio na trilha da fazenda',
    subtitulo: '45 min · tarde ensolarada',
    nota: '',
    emocao: '😌',
    local: 'Sítio da Serra',
    midiaCount: 1,
    favorito: false,
    favoritoCategoria: 'Fotos',
    relativeLabel: 'Ontem',
    diaDoMes: 3,
    tags: ['Bela', 'Sítio da Serra', 'Passeio'],
  },
  {
    id: 'seed-3',
    tipo: 'Competição',
    titulo: 'Competição · 1º lugar',
    subtitulo: 'Haras Vale Verde',
    nota: '',
    emocao: '🏆',
    local: 'Haras Vale Verde',
    midiaCount: 1,
    favorito: true,
    favoritoCategoria: 'Vídeos',
    relativeLabel: '22 jul',
    diaDoMes: 22,
    tags: ['Bela', '#primeiralugar', 'Competição', 'Haras Vale Verde'],
  },
  {
    id: 'seed-4',
    tipo: 'Check-in',
    titulo: 'Sessão de fisioterapia',
    subtitulo: 'Rotina de manutenção',
    nota: '',
    emocao: null,
    local: '',
    midiaCount: 0,
    favorito: false,
    favoritoCategoria: 'Posts',
    relativeLabel: '14 jul',
    diaDoMes: 14,
    tags: ['Bela', 'Check-in'],
  },
  {
    id: 'seed-5',
    tipo: 'Competição',
    titulo: 'Hoje vocês competiram juntos pela primeira vez.',
    subtitulo: '',
    nota: '',
    emocao: '🏆',
    local: '',
    midiaCount: 0,
    favorito: false,
    favoritoCategoria: 'Cartas',
    relativeLabel: 'Há exatamente 1 ano',
    diaDoMes: null,
    tags: ['Ana'],
  },
];

const HUMOR_EMOJI: Record<string, string> = {
  Excelente: '😊',
  'Muito bom': '🙂',
  Normal: '😐',
  Difícil: '😓',
  Cansativo: '😔',
};

const initialCustomAlbuns: string[] = ['Nossa Jornada', 'Melhores Fotos'];

export const useMemoriesStore = create<MemoriesState>((set, get) => ({
  memorias: initialMemorias,
  ultimaMemoriaId: null,
  criarMemoriaDraft: initialDraft,
  rascunhos: [],
  customAlbuns: initialCustomAlbuns,

  setCriarMemoriaDraft: (patch) =>
    set((state) => ({ criarMemoriaDraft: { ...state.criarMemoriaDraft, ...patch } })),

  resetCriarMemoriaDraft: () => set({ criarMemoriaDraft: initialDraft }),

  finalizarCriarMemoria: () => {
    const draft = get().criarMemoriaDraft;
    const tipo = draft.tipo ?? 'Memória';
    const midiaCount = draft.midiaItems.length;
    const id = `memoria-${Date.now()}`;
    const subtituloPartes = [draft.local, draft.intensidade ? `intensidade ${draft.intensidade.toLowerCase()}` : null, `${draft.duracao} min`].filter(
      (parte): parte is string => !!parte
    );
    const tags = [tipo, ...(draft.local ? [draft.local] : []), ...draft.marcacoes.map((marcacao) => marcacao.nome)];
    const memoria: Memoria = {
      id,
      tipo,
      titulo: `${tipo} de hoje`,
      subtitulo: subtituloPartes.join(' · '),
      nota: draft.descricao,
      emocao: draft.dia ? HUMOR_EMOJI[draft.dia] ?? null : null,
      local: draft.local,
      midiaCount,
      favorito: false,
      favoritoCategoria: midiaCount > 0 ? 'Fotos' : 'Posts',
      relativeLabel: 'Hoje',
      diaDoMes: new Date().getDate(),
      tags,
    };
    set((state) => ({
      memorias: [memoria, ...state.memorias],
      ultimaMemoriaId: id,
      criarMemoriaDraft: initialDraft,
    }));
    return id;
  },

  salvarRascunho: () => {
    const draft = get().criarMemoriaDraft;
    const rascunho: RascunhoMemoria = {
      id: `rascunho-${Date.now()}`,
      titulo: draft.tipo ? `${draft.tipo} de hoje` : 'Memória sem título',
      info: 'Salvo agora · sem publicar',
      snapshot: draft,
    };
    set((state) => ({ rascunhos: [rascunho, ...state.rascunhos], criarMemoriaDraft: initialDraft }));
  },

  carregarRascunho: (id) => {
    const rascunho = get().rascunhos.find((item) => item.id === id);
    if (!rascunho) return;
    set({ criarMemoriaDraft: rascunho.snapshot });
  },

  removerRascunho: (id) =>
    set((state) => ({ rascunhos: state.rascunhos.filter((rascunho) => rascunho.id !== id) })),

  criarAlbum: (nome) =>
    set((state) => ({ customAlbuns: [...state.customAlbuns, nome.trim() || 'Álbum sem nome'] })),

  atualizarMemoria: (id, patch) =>
    set((state) => ({
      memorias: state.memorias.map((memoria) =>
        memoria.id === id
          ? { ...memoria, tipo: patch.tipo, emocao: patch.emocao, nota: patch.nota }
          : memoria
      ),
    })),

  toggleFavorito: (id) =>
    set((state) => ({
      memorias: state.memorias.map((memoria) =>
        memoria.id === id ? { ...memoria, favorito: !memoria.favorito } : memoria
      ),
    })),

  removerMemoria: (id) =>
    set((state) => ({
      memorias: state.memorias.filter((memoria) => memoria.id !== id),
      ultimaMemoriaId: state.ultimaMemoriaId === id ? null : state.ultimaMemoriaId,
    })),
}));
