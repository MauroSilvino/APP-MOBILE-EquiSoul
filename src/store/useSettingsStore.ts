import { create } from 'zustand';

export interface ContaContato {
  email: string;
  telefone: string;
}

export interface PrivacidadeConfig {
  perfilPublico: boolean;
  mostrarCidade: boolean;
  mostrarEstatisticas: boolean;
  mostrarTimeline: boolean;
  permitirSeguidores: boolean;
  permitirMensagens: boolean;
  permitirDownload: boolean;
  iaConteudoPrivado: boolean;
}

export interface SegurancaConfig {
  biometria: boolean;
  doisFatores: boolean;
}

export interface IAConfig {
  cartas: boolean;
  retrospectivas: boolean;
  insights: boolean;
  sugestoes: boolean;
  reconhecimentoImagens: boolean;
  reconhecimentoVideos: boolean;
  reconhecimentoVoz: boolean;
  ocr: boolean;
}

export interface SessaoAtiva {
  id: string;
  dispositivo: string;
  local: string;
  acesso: string;
  tipo: 'mobile' | 'laptop';
}

export interface LinkCompartilhado {
  id: string;
  nome: string;
  permissao: string;
}

export interface NotificacaoCategoriaConfig {
  categoria: string;
  push: boolean;
  email: boolean;
}

export type Tema = 'Claro' | 'Escuro' | 'Automático';

const NOTIFICACAO_CATEGORIAS = [
  'Memórias',
  'Eventos',
  'Comunidade',
  'Marketplace',
  'Mensagens',
  'Conquistas',
  'Lembretes',
  'IA',
  'Premium',
  'Atualizações',
];

interface SettingsState {
  contaContato: ContaContato;
  privacidade: PrivacidadeConfig;
  seguranca: SegurancaConfig;
  ia: IAConfig;
  tema: Tema;
  temaPremiumSel: string | null;
  idiomaSelecionado: string;
  reduzirMovimento: boolean;
  fontSizePct: number;
  ultimoBackupData: string | null;
  sessoes: SessaoAtiva[];
  linksAtivos: LinkCompartilhado[];
  notificacoesCategorias: NotificacaoCategoriaConfig[];
  horarioSilencioAtivo: boolean;

  setContaContato: (contato: Partial<ContaContato>) => void;
  togglePrivacidade: (key: keyof PrivacidadeConfig) => void;
  toggleBiometria: () => void;
  setDoisFatores: (ativo: boolean) => void;
  toggleIA: (key: keyof IAConfig) => void;
  setTema: (tema: Tema) => void;
  setTemaPremiumSel: (nome: string | null) => void;
  setIdioma: (idioma: string) => void;
  setReduzirMovimento: (v: boolean) => void;
  setFontSizePct: (pct: number) => void;
  fazerBackup: () => void;
  encerrarSessao: (id: string) => void;
  revogarLink: (id: string) => void;
  toggleNotificacaoCanal: (categoria: string, canal: 'push' | 'email') => void;
  setHorarioSilencioAtivo: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  contaContato: { email: '', telefone: '' },
  privacidade: {
    perfilPublico: true,
    mostrarCidade: true,
    mostrarEstatisticas: true,
    mostrarTimeline: false,
    permitirSeguidores: true,
    permitirMensagens: true,
    permitirDownload: false,
    iaConteudoPrivado: false,
  },
  seguranca: { biometria: true, doisFatores: false },
  ia: {
    cartas: true,
    retrospectivas: true,
    insights: true,
    sugestoes: true,
    reconhecimentoImagens: true,
    reconhecimentoVideos: false,
    reconhecimentoVoz: true,
    ocr: false,
  },
  tema: 'Automático',
  temaPremiumSel: null,
  idiomaSelecionado: 'Português (Brasil)',
  reduzirMovimento: false,
  fontSizePct: 55,
  ultimoBackupData: null,
  sessoes: [],
  linksAtivos: [],
  notificacoesCategorias: NOTIFICACAO_CATEGORIAS.map((categoria) => ({ categoria, push: true, email: true })),
  horarioSilencioAtivo: true,

  setContaContato: (contato) => set((state) => ({ contaContato: { ...state.contaContato, ...contato } })),
  togglePrivacidade: (key) =>
    set((state) => ({ privacidade: { ...state.privacidade, [key]: !state.privacidade[key] } })),
  toggleBiometria: () => set((state) => ({ seguranca: { ...state.seguranca, biometria: !state.seguranca.biometria } })),
  setDoisFatores: (ativo) => set((state) => ({ seguranca: { ...state.seguranca, doisFatores: ativo } })),
  toggleIA: (key) => set((state) => ({ ia: { ...state.ia, [key]: !state.ia[key] } })),
  setTema: (tema) => set({ tema }),
  setTemaPremiumSel: (nome) => set({ temaPremiumSel: nome }),
  setIdioma: (idioma) => set({ idiomaSelecionado: idioma }),
  setReduzirMovimento: (v) => set({ reduzirMovimento: v }),
  setFontSizePct: (pct) => set({ fontSizePct: pct }),
  fazerBackup: () =>
    set({
      ultimoBackupData: new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }),
  encerrarSessao: (id) => set((state) => ({ sessoes: state.sessoes.filter((s) => s.id !== id) })),
  revogarLink: (id) => set((state) => ({ linksAtivos: state.linksAtivos.filter((l) => l.id !== id) })),
  toggleNotificacaoCanal: (categoria, canal) =>
    set((state) => ({
      notificacoesCategorias: state.notificacoesCategorias.map((c) =>
        c.categoria === categoria ? { ...c, [canal]: !c[canal] } : c
      ),
    })),
  setHorarioSilencioAtivo: (v) => set({ horarioSilencioAtivo: v }),
}));
