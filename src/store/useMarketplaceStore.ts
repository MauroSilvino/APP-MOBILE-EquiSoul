import { create } from 'zustand';

export type FavoritoCategoria = 'Produtos' | 'Serviços' | 'Profissionais' | 'Haras' | 'Eventos';

export interface CatalogProduto {
  id: string;
  nome: string;
  precoLabel: string;
  avaliacao: string;
  avaliacoesCount: number;
  descricao: string;
  iaResumo: string;
}

export interface CatalogServico {
  id: string;
  nome: string;
  especialidade: string;
  avaliacao: string;
  avaliacoesCount: number;
  tags: string[];
  precoConsultaLabel: string;
  horarios: string[];
}

export interface CatalogProfissional {
  id: string;
  nome: string;
  titulo: string;
  bio: string;
  avaliacao: string;
  atendimentos: number;
  anos: number;
  precoConsultaLabel: string;
}

export interface CatalogHaras {
  id: string;
  nome: string;
  localizacao: string;
  avaliacao: string;
  descricaoLonga: string;
}

export interface Reserva {
  id: string;
  origem: string;
  nome: string;
  data: string;
  horario: string;
  precoLabel: string;
  status: 'Confirmado';
}

export interface Cupom {
  id: string;
  titulo: string;
  validade: string;
  aplicado: boolean;
}

export interface TransacaoCarteira {
  id: string;
  descricao: string;
  data: string;
  valorLabel: string;
  tipo: 'entrada' | 'saida';
}

export interface Avaliacao {
  id: string;
  autor: string;
  nota: string;
  texto: string;
}

export interface EventoPreview {
  id: string;
  titulo: string;
  quando: string;
  preco: string;
}

export interface Curso {
  id: string;
  titulo: string;
  instrutor: string;
  preco: string;
}

export interface ChatMensagem {
  id: string;
  texto: string;
  autor: 'usuario' | 'contato';
}

interface MarketplaceState {
  produtos: CatalogProduto[];
  servicos: CatalogServico[];
  profissionais: CatalogProfissional[];
  harasList: CatalogHaras[];

  favoritos: Record<FavoritoCategoria, string[]>;
  toggleFavorito: (categoria: FavoritoCategoria, id: string) => void;
  isFavorito: (categoria: FavoritoCategoria, id: string) => boolean;

  reservas: Reserva[];
  addReserva: (reserva: Omit<Reserva, 'id' | 'status'>) => Reserva;
  removeReserva: (id: string) => void;

  cupons: Cupom[];
  toggleCupomAplicado: (id: string) => void;

  saldoCashback: string;
  metodosPagamento: { id: string; label: string }[];
  transacoesCarteira: TransacaoCarteira[];

  avaliacoes: Avaliacao[];

  eventosPreview: EventoPreview[];

  cursos: Curso[];

  chatMensagens: Record<string, ChatMensagem[]>;
  sendChatMensagem: (contato: string, texto: string) => void;

  carrinho: { produtoId: string; quantidade: number };
  incrementarQuantidade: () => void;
  decrementarQuantidade: () => void;
}

export const PRODUTOS_SEED: CatalogProduto[] = [
  {
    id: 'protetor-canela',
    nome: 'Protetor de canela premium',
    precoLabel: 'R$ 189,00',
    avaliacao: '4.8',
    avaliacoesCount: 214,
    descricao:
      'Proteção resistente para treinos de salto e trilha, com fechamento em velcro reforçado e forro respirável.',
    iaResumo:
      'Pontos fortes: durabilidade e ajuste. Ponto de atenção: numeração costuma vir um tamanho menor.',
  },
  {
    id: 'manta-termica',
    nome: 'Manta térmica',
    precoLabel: 'R$ 249,00',
    avaliacao: '4.6',
    avaliacoesCount: 98,
    descricao: 'Manta térmica para recuperação muscular pós-treino, com tecido de secagem rápida.',
    iaResumo: 'Pontos fortes: aquece rápido e é leve. Ponto de atenção: lavar à mão para durar mais.',
  },
  {
    id: 'escova-premium',
    nome: 'Escova premium',
    precoLabel: 'R$ 65,00',
    avaliacao: '4.9',
    avaliacoesCount: 152,
    descricao: 'Escova de cerdas macias para o acabamento do pelo antes de eventos e competições.',
    iaResumo: 'Pontos fortes: cabo ergonômico e cerdas macias. Sem pontos de atenção relevantes.',
  },
];

export const SERVICOS_SEED: CatalogServico[] = [
  {
    id: 'marina-kist',
    nome: 'Dra. Marina Kist',
    especialidade: 'Veterinária equina',
    avaliacao: '4.9',
    avaliacoesCount: 86,
    tags: ['Ortopedia equina', 'Nutrição', 'Emergências'],
    precoConsultaLabel: 'R$ 220,00',
    horarios: ['09:00', '10:30', '14:00', '16:00', '17:30', '18:30'],
  },
  {
    id: 'ana-fisio',
    nome: 'Ana Fisioterapeuta',
    especialidade: 'Fisioterapia equina',
    avaliacao: '4.7',
    avaliacoesCount: 54,
    tags: ['Reabilitação', 'Alongamento', 'Prevenção de lesões'],
    precoConsultaLabel: 'R$ 180,00',
    horarios: ['08:00', '11:00', '13:30', '15:00', '16:30'],
  },
];

export const PROFISSIONAIS_SEED: CatalogProfissional[] = [
  {
    id: 'joao-ferrador',
    nome: 'João Ferrador',
    titulo: 'Ferrador · 12 anos de experiência',
    bio:
      'Especialista em ferrageamento corretivo para cavalos de salto e adestramento. Atendimento em domicílio na região de Campinas.',
    avaliacao: '4.8',
    atendimentos: 340,
    anos: 12,
    precoConsultaLabel: 'R$ 180,00',
  },
];

export const HARAS_SEED: CatalogHaras[] = [
  {
    id: 'vale-verde',
    nome: 'Haras Vale Verde',
    localizacao: 'Campinas, SP',
    avaliacao: '4.7',
    descricaoLonga:
      'Fundado em 1998, o Haras Vale Verde reúne 40 hectares de pastagens, pista coberta e uma equipe dedicada ao bem-estar equino.',
  },
];

const CUPONS_SEED: Cupom[] = [
  { id: 'cupom-1', titulo: '10% OFF em produtos de bem-estar', validade: '20/07', aplicado: false },
  { id: 'cupom-2', titulo: 'Frete grátis na primeira compra', validade: '31/07', aplicado: false },
  { id: 'cupom-3', titulo: 'R$ 30 OFF em serviços veterinários', validade: '15/08', aplicado: false },
];

const TRANSACOES_SEED: TransacaoCarteira[] = [
  { id: 'tx-1', descricao: 'Cashback · Ferrageamento · João Ferrador', data: '2 de junho', valorLabel: 'R$ 3,00', tipo: 'entrada' },
  { id: 'tx-2', descricao: 'Cashback · Clínica de adestramento', data: '15 de junho', valorLabel: 'R$ 6,60', tipo: 'entrada' },
  { id: 'tx-3', descricao: 'Cashback · Protetor de canela premium', data: '20 de junho', valorLabel: 'R$ 9,45', tipo: 'entrada' },
  { id: 'tx-4', descricao: 'Cashback · Consulta · Dra. Marina Kist', data: '28 de junho', valorLabel: 'R$ 11,00', tipo: 'entrada' },
  { id: 'tx-5', descricao: 'Resgate em nova compra', data: '30 de junho', valorLabel: 'R$ 30,00', tipo: 'saida' },
];

const AVALIACOES_SEED: Avaliacao[] = [
  { id: 'av-1', autor: 'Camila R.', nota: '5.0', texto: 'Atendimento excelente, super atenciosa com meu cavalo.' },
  { id: 'av-2', autor: 'Rafael T.', nota: '4.5', texto: 'Pontual e explicou tudo com calma. Recomendo.' },
  { id: 'av-3', autor: 'Beatriz L.', nota: '5.0', texto: 'Resolveu o problema na primeira consulta.' },
  { id: 'av-4', autor: 'Diego M.', nota: '4.0', texto: 'Bom atendimento, só demorou um pouco para responder.' },
];

const EVENTOS_PREVIEW_SEED: EventoPreview[] = [
  { id: 'evt-1', titulo: 'Clínica de adestramento', quando: 'Sáb 12 · 09:00', preco: 'R$ 120,00' },
  { id: 'evt-2', titulo: 'Encontro de hipismo regional', quando: 'Dom 20 · 08:00', preco: 'Gratuito' },
  { id: 'evt-3', titulo: 'Feira de produtos equinos', quando: '27 de julho', preco: 'Entrada franca' },
];

const CURSOS_SEED: Curso[] = [
  { id: 'curso-1', titulo: 'Fundamentos do manejo equino', instrutor: 'Dra. Marina Kist', preco: 'R$ 149,00' },
  { id: 'curso-2', titulo: 'Nutrição para cavalos atletas', instrutor: 'Ana Fisioterapeuta', preco: 'R$ 99,00' },
  { id: 'curso-3', titulo: 'Primeiros socorros equinos', instrutor: 'João Ferrador', preco: 'R$ 79,00' },
];

const EMPTY_FAVORITOS: Record<FavoritoCategoria, string[]> = {
  Produtos: [],
  Serviços: [],
  Profissionais: [],
  Haras: [],
  Eventos: [],
};

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  produtos: PRODUTOS_SEED,
  servicos: SERVICOS_SEED,
  profissionais: PROFISSIONAIS_SEED,
  harasList: HARAS_SEED,

  favoritos: EMPTY_FAVORITOS,
  toggleFavorito: (categoria, id) =>
    set((state) => {
      const atual = state.favoritos[categoria];
      const contido = atual.includes(id);
      return {
        favoritos: {
          ...state.favoritos,
          [categoria]: contido ? atual.filter((item) => item !== id) : [...atual, id],
        },
      };
    }),
  isFavorito: (categoria, id) => get().favoritos[categoria].includes(id),

  reservas: [],
  addReserva: (reserva) => {
    const nova: Reserva = { id: `reserva-${Date.now()}`, status: 'Confirmado', ...reserva };
    set((state) => ({ reservas: [nova, ...state.reservas] }));
    return nova;
  },
  removeReserva: (id) => set((state) => ({ reservas: state.reservas.filter((r) => r.id !== id) })),

  cupons: CUPONS_SEED,
  toggleCupomAplicado: (id) =>
    set((state) => ({
      cupons: state.cupons.map((c) => (c.id === id ? { ...c, aplicado: !c.aplicado } : c)),
    })),

  saldoCashback: 'R$ 34,50',
  metodosPagamento: [
    { id: 'cartao', label: 'Cartão •••• 4021' },
    { id: 'pix', label: 'PIX' },
  ],
  transacoesCarteira: TRANSACOES_SEED,

  avaliacoes: AVALIACOES_SEED,

  eventosPreview: EVENTOS_PREVIEW_SEED,

  cursos: CURSOS_SEED,

  chatMensagens: {},
  sendChatMensagem: (contato, texto) => {
    const minha: ChatMensagem = { id: `msg-${Date.now()}`, texto, autor: 'usuario' };
    set((state) => ({
      chatMensagens: {
        ...state.chatMensagens,
        [contato]: [...(state.chatMensagens[contato] ?? []), minha],
      },
    }));
    setTimeout(() => {
      const resposta: ChatMensagem = {
        id: `msg-${Date.now()}-r`,
        texto: 'Obrigado pela mensagem! Te respondo em breve.',
        autor: 'contato',
      };
      set((state) => ({
        chatMensagens: {
          ...state.chatMensagens,
          [contato]: [...(state.chatMensagens[contato] ?? []), resposta],
        },
      }));
    }, 900);
  },

  carrinho: { produtoId: 'protetor-canela', quantidade: 1 },
  incrementarQuantidade: () =>
    set((state) => ({ carrinho: { ...state.carrinho, quantidade: state.carrinho.quantidade + 1 } })),
  decrementarQuantidade: () =>
    set((state) => ({
      carrinho: { ...state.carrinho, quantidade: Math.max(1, state.carrinho.quantidade - 1) },
    })),
}));
