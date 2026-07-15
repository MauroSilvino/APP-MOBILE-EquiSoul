import { create } from 'zustand';
import { useEventsStore } from './useEventsStore';
import { useHorseStore } from './useHorseStore';
import { useMemoriesStore } from './useMemoriesStore';

// ---------------------------------------------------------------------------
// Níveis (XP)
// ---------------------------------------------------------------------------

export interface NivelDef {
  nivel: number;
  nome: string;
  xpNecessario: number;
}

export const NIVEIS: NivelDef[] = [
  { nivel: 1, nome: 'Iniciante', xpNecessario: 0 },
  { nivel: 2, nome: 'Aprendiz', xpNecessario: 150 },
  { nivel: 3, nome: 'Cavaleiro', xpNecessario: 400 },
  { nivel: 4, nome: 'Guardião', xpNecessario: 800 },
  { nivel: 5, nome: 'Mestre', xpNecessario: 1400 },
  { nivel: 6, nome: 'Lenda', xpNecessario: 2200 },
];

export interface NivelInfo {
  nivel: number;
  nome: string;
  proximoNome: string;
  xpAtual: number;
  xpProximo: number;
  percent: number;
  maxNivel: boolean;
}

export function getNivelInfo(xp: number): NivelInfo {
  let atual = NIVEIS[0];
  let proximo: NivelDef | null = null;
  for (const def of NIVEIS) {
    if (xp >= def.xpNecessario) atual = def;
    else {
      proximo = def;
      break;
    }
  }
  if (!proximo) {
    return {
      nivel: atual.nivel,
      nome: atual.nome,
      proximoNome: atual.nome,
      xpAtual: xp,
      xpProximo: xp,
      percent: 100,
      maxNivel: true,
    };
  }
  const percent = Math.round(
    ((xp - atual.xpNecessario) / (proximo.xpNecessario - atual.xpNecessario)) * 100,
  );
  return {
    nivel: atual.nivel,
    nome: atual.nome,
    proximoNome: proximo.nome,
    xpAtual: xp,
    xpProximo: proximo.xpNecessario,
    percent: Math.min(100, Math.max(0, percent)),
    maxNivel: false,
  };
}

// ---------------------------------------------------------------------------
// Conquistas — catálogo de referência; desbloqueio derivado do uso real do app
// ---------------------------------------------------------------------------

export interface ConquistaContext {
  memoriasCount: number;
  horsesCount: number;
  eventosInscritosCount: number;
  cartasCount: number;
  streakDias: number;
  missoesFeitasCount: number;
}

export type ConquistaIcon = 'livro' | 'montanha' | 'taca' | 'coracao' | 'camera' | 'calendario' | 'escudo';

export interface ConquistaDef {
  id: string;
  nome: string;
  categoria: string;
  tipo: 'Bronze' | 'Prata' | 'Ouro' | 'Diamante' | 'Especial' | 'Limitada' | 'Histórica';
  icon: ConquistaIcon;
  requisito: string;
  isUnlocked: (ctx: ConquistaContext) => boolean;
}

export const CONQUISTA_CATEGORIAS = [
  'Todas',
  'Memórias',
  'Comunidade',
  'Eventos',
  'Fotografia',
  'Trilhas',
  'Competições',
  'Aprendizado',
  'IA',
] as const;

export const CONQUISTAS_CATALOG: ConquistaDef[] = [
  {
    id: 'primeira-memoria',
    nome: 'Primeira Memória',
    categoria: 'Memórias',
    tipo: 'Bronze',
    icon: 'livro',
    requisito: 'Registre sua primeira memória com o seu cavalo.',
    isUnlocked: (c) => c.memoriasCount >= 1,
  },
  {
    id: '50-memorias',
    nome: '50 Memórias',
    categoria: 'Memórias',
    tipo: 'Prata',
    icon: 'livro',
    requisito: 'Registre 50 memórias com o seu cavalo.',
    isUnlocked: (c) => c.memoriasCount >= 50,
  },
  {
    id: '100-memorias',
    nome: '100 Memórias',
    categoria: 'Memórias',
    tipo: 'Ouro',
    icon: 'livro',
    requisito: 'Registre 100 memórias com o seu cavalo.',
    isUnlocked: (c) => c.memoriasCount >= 100,
  },
  {
    id: 'primeiro-passo',
    nome: 'Primeiro Passo',
    categoria: 'Trilhas',
    tipo: 'Bronze',
    icon: 'montanha',
    requisito: 'Adicione o perfil do seu cavalo no EquiSoul.',
    isUnlocked: (c) => c.horsesCount >= 1,
  },
  {
    id: 'primeiro-evento',
    nome: 'Primeiro Evento',
    categoria: 'Eventos',
    tipo: 'Bronze',
    icon: 'calendario',
    requisito: 'Inscreva-se no seu primeiro evento.',
    isUnlocked: (c) => c.eventosInscritosCount >= 1,
  },
  {
    id: 'explorador-eventos',
    nome: 'Explorador de Eventos',
    categoria: 'Eventos',
    tipo: 'Prata',
    icon: 'calendario',
    requisito: 'Participe de 3 eventos.',
    isUnlocked: (c) => c.eventosInscritosCount >= 3,
  },
  {
    id: 'primeira-carta',
    nome: 'Primeira Carta',
    categoria: 'IA',
    tipo: 'Bronze',
    icon: 'coracao',
    requisito: 'Receba a primeira carta escrita pela IA do seu cavalo.',
    isUnlocked: (c) => c.cartasCount >= 1,
  },
  {
    id: 'sequencia-7',
    nome: 'Sete Dias Seguidos',
    categoria: 'Aprendizado',
    tipo: 'Prata',
    icon: 'montanha',
    requisito: 'Mantenha uma sequência de 7 dias registrando momentos.',
    isUnlocked: (c) => c.streakDias >= 7,
  },
  {
    id: 'um-ano-jornada',
    nome: 'Um Ano de Jornada',
    categoria: 'Trilhas',
    tipo: 'Diamante',
    icon: 'montanha',
    requisito: 'Continue registrando memórias por 365 dias com o seu cavalo para desbloquear.',
    isUnlocked: () => false,
  },
  {
    id: 'mentor-comunidade',
    nome: 'Mentor da Comunidade',
    categoria: 'Comunidade',
    tipo: 'Especial',
    icon: 'coracao',
    requisito: 'Ajude 20 pessoas na comunidade respondendo perguntas.',
    isUnlocked: () => false,
  },
  {
    id: 'primeira-competicao',
    nome: 'Primeira Competição',
    categoria: 'Competições',
    tipo: 'Ouro',
    icon: 'taca',
    requisito: 'Registre a sua primeira competição.',
    isUnlocked: () => false,
  },
  {
    id: 'retrospectiva-completa',
    nome: 'Retrospectiva Completa',
    categoria: 'Fotografia',
    tipo: 'Limitada',
    icon: 'camera',
    requisito: 'Complete sua retrospectiva anual para desbloquear este selo limitado.',
    isUnlocked: () => false,
  },
  {
    id: 'cumpridor-missoes',
    nome: 'Cumpridor de Missões',
    categoria: 'Aprendizado',
    tipo: 'Prata',
    icon: 'escudo',
    requisito: 'Complete 10 missões.',
    isUnlocked: (c) => c.missoesFeitasCount >= 10,
  },
];

// ---------------------------------------------------------------------------
// Selos — reconhecimentos menores, também derivados do uso real do app
// ---------------------------------------------------------------------------

export interface SeloDef {
  id: string;
  nome: string;
  isUnlocked: (ctx: ConquistaContext) => boolean;
}

export const SELOS_CATALOG: SeloDef[] = [
  { id: 'primeira-memoria', nome: 'Primeira Memória', isUnlocked: (c) => c.memoriasCount >= 1 },
  { id: '10-memorias', nome: '10 Memórias', isUnlocked: (c) => c.memoriasCount >= 10 },
  { id: '100-memorias', nome: '100 Memórias', isUnlocked: (c) => c.memoriasCount >= 100 },
  { id: 'primeira-competicao', nome: 'Primeira Competição', isUnlocked: () => false },
  { id: 'primeira-trilha', nome: 'Primeira Trilha', isUnlocked: (c) => c.horsesCount >= 1 },
  { id: 'primeiro-evento', nome: 'Primeiro Evento', isUnlocked: (c) => c.eventosInscritosCount >= 1 },
  { id: 'primeira-carta', nome: 'Primeira Carta', isUnlocked: (c) => c.cartasCount >= 1 },
  { id: 'um-ano', nome: 'Um Ano de Jornada', isUnlocked: () => false },
  { id: 'aniversario-cavalo', nome: 'Aniversário do Cavalo', isUnlocked: () => false },
  { id: 'mentor-comunidade', nome: 'Mentor da Comunidade', isUnlocked: () => false },
];

// ---------------------------------------------------------------------------
// Desafios
// ---------------------------------------------------------------------------

export interface DesafioDef {
  id: string;
  titulo: string;
  tipo: 'Individuais' | 'Coletivos' | 'Sazonais';
  metaPassos: number;
  xpRecompensa: number;
  pontosRecompensa: number;
}

export const DESAFIO_TIPOS = ['Individuais', 'Coletivos', 'Sazonais'] as const;

export const DESAFIOS_CATALOG: DesafioDef[] = [
  {
    id: 'registrar-7-dias',
    titulo: 'Registrar memórias por 7 dias',
    tipo: 'Individuais',
    metaPassos: 7,
    xpRecompensa: 80,
    pontosRecompensa: 60,
  },
  {
    id: 'participar-3-eventos',
    titulo: 'Participar de 3 eventos',
    tipo: 'Coletivos',
    metaPassos: 3,
    xpRecompensa: 120,
    pontosRecompensa: 90,
  },
  {
    id: 'guardar-5-cartas',
    titulo: 'Guardar 5 cartas da IA',
    tipo: 'Individuais',
    metaPassos: 5,
    xpRecompensa: 60,
    pontosRecompensa: 40,
  },
  {
    id: 'completar-album',
    titulo: 'Completar um álbum inteligente',
    tipo: 'Coletivos',
    metaPassos: 5,
    xpRecompensa: 70,
    pontosRecompensa: 50,
  },
  {
    id: 'por-do-sol',
    titulo: 'Fotografar o pôr do sol com o seu cavalo',
    tipo: 'Sazonais',
    metaPassos: 1,
    xpRecompensa: 30,
    pontosRecompensa: 20,
  },
];

// ---------------------------------------------------------------------------
// Jornadas — progresso é totalmente derivado de outras áreas do app
// ---------------------------------------------------------------------------

export interface JornadaEtapaDef {
  id: string;
  titulo: string;
  detalhe: string;
  isConcluida: (ctx: ConquistaContext) => boolean;
}

export interface JornadaDef {
  id: string;
  titulo: string;
  etapas: JornadaEtapaDef[];
}

export const JORNADAS_CATALOG: JornadaDef[] = [
  {
    id: 'primeiro-ano',
    titulo: 'Primeiro Ano Juntos',
    etapas: [
      {
        id: 'conhecer-cavalo',
        titulo: 'Conhecer o seu cavalo',
        detalhe: 'Complete o perfil do seu cavalo no EquiSoul.',
        isConcluida: (c) => c.horsesCount >= 1,
      },
      {
        id: 'primeiras-memorias',
        titulo: 'Primeiras memórias',
        detalhe: 'Registre as primeiras memórias vividas juntos.',
        isConcluida: (c) => c.memoriasCount >= 1,
      },
      {
        id: 'primeira-competicao',
        titulo: 'Primeira competição',
        detalhe: 'Participe de uma competição ou prova.',
        isConcluida: () => false,
      },
      {
        id: 'primeira-viagem',
        titulo: 'Primeira viagem',
        detalhe: 'Desbloqueia após concluir a primeira competição.',
        isConcluida: () => false,
      },
      {
        id: 'primeira-retrospectiva',
        titulo: 'Primeira retrospectiva',
        detalhe: 'Disponível ao final da temporada atual.',
        isConcluida: () => false,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Missões
// ---------------------------------------------------------------------------

export interface MissaoDef {
  id: string;
  periodo: 'Hoje' | 'Esta semana' | 'Este mês';
  texto: string;
  xpRecompensa: number;
  pontosRecompensa: number;
}

export const MISSOES_CATALOG: MissaoDef[] = [
  { id: 'm-registrar-momento', periodo: 'Hoje', texto: 'Registrar um momento especial', xpRecompensa: 15, pontosRecompensa: 10 },
  { id: 'm-responder-comunidade', periodo: 'Hoje', texto: 'Responder uma pergunta na comunidade', xpRecompensa: 10, pontosRecompensa: 8 },
  { id: 'm-participar-comunidade', periodo: 'Esta semana', texto: 'Participar da comunidade', xpRecompensa: 25, pontosRecompensa: 15 },
  { id: 'm-planejar-semana', periodo: 'Esta semana', texto: 'Planejar a semana na agenda', xpRecompensa: 20, pontosRecompensa: 12 },
  { id: 'm-criar-album', periodo: 'Este mês', texto: 'Criar um álbum inteligente', xpRecompensa: 40, pontosRecompensa: 25 },
  { id: 'm-completar-objetivo', periodo: 'Este mês', texto: 'Avançar em um objetivo pessoal', xpRecompensa: 30, pontosRecompensa: 20 },
];

// ---------------------------------------------------------------------------
// Loja de recompensas — puramente cosmético
// ---------------------------------------------------------------------------

export interface LojaItemDef {
  id: string;
  nome: string;
  categoria: string;
  custo: number;
}

export const LOJA_CATALOG: LojaItemDef[] = [
  { id: 'tema-campo-dourado', nome: 'Tema Campo Dourado', categoria: 'Tema', custo: 300 },
  { id: 'moldura-classica', nome: 'Moldura Clássica', categoria: 'Moldura', custo: 150 },
  { id: 'capa-outono', nome: 'Capa Outono', categoria: 'Capa', custo: 200 },
  { id: 'animacao-brilho', nome: 'Animação Brilho Suave', categoria: 'Animação', custo: 350 },
  { id: 'stickers-equestres', nome: 'Stickers Equestres', categoria: 'Sticker', custo: 120 },
  { id: 'modelo-retrospectiva', nome: 'Modelo Retrospectiva Premium', categoria: 'Modelo', custo: 500 },
];

// ---------------------------------------------------------------------------
// Ranking — outros usuários são conteúdo de referência (mesmo precedente do
// catálogo do Marketplace / ranking de eventos); a posição do usuário usa os
// pontos reais desta store.
// ---------------------------------------------------------------------------

export interface RankingOutroUsuario {
  id: string;
  nome: string;
  pontos: number;
}

export const RANKING_OUTROS: RankingOutroUsuario[] = [
  { id: 'helena', nome: 'Helena Ribeiro', pontos: 860 },
  { id: 'carlos', nome: 'Carlos Melo', pontos: 790 },
  { id: 'ana', nome: 'Ana Ferraz', pontos: 590 },
  { id: 'joao', nome: 'João Prado', pontos: 410 },
  { id: 'marina', nome: 'Marina Kist', pontos: 305 },
];

export const RANKING_CATEGORIAS = [
  'Colaboração',
  'Ajuda',
  'Participação',
  'Eventos',
  'Fotografia',
  'Histórias',
  'Aprendizado',
] as const;

export const RANKING_ESCOPOS = ['Global', 'País', 'Estado', 'Cidade', 'Clube', 'Grupo', 'Amigos'] as const;

// ---------------------------------------------------------------------------
// Temporada — conteúdo de referência do sistema (não é dado pessoal do usuário)
// ---------------------------------------------------------------------------

export interface TemporadaInfo {
  nome: string;
  fimISO: string;
  novidades: string[];
}

export const TEMPORADA_ATUAL: TemporadaInfo = {
  nome: 'Temporada Inverno',
  fimISO: '2026-08-15',
  novidades: ['Novos desafios', 'Novas medalhas', 'Novos eventos', 'Novas recompensas'],
};

// ---------------------------------------------------------------------------
// Objetivos — metas pessoais do usuário; começam vazias (nada fabricado)
// ---------------------------------------------------------------------------

export interface ObjetivoUsuario {
  id: string;
  titulo: string;
  progresso: number;
  recompensado: boolean;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

interface GamificationState {
  xp: number;
  pontos: number;

  streakDias: number;
  streakSemana: boolean[];
  registradoHojeStreak: boolean;

  missoesFeitas: string[];

  desafiosParticipando: string[];
  desafiosProgresso: Record<string, number>;
  desafiosConcluidos: string[];

  lojaAdquiridos: string[];

  objetivos: ObjetivoUsuario[];

  addXP: (amount: number) => void;
  addPontos: (amount: number) => void;
  registrarHojeStreak: () => void;
  toggleMissao: (id: string) => void;
  toggleDesafio: (id: string) => void;
  avancarDesafio: (id: string) => void;
  resgatarItemLoja: (id: string) => void;
  addObjetivo: (titulo: string) => void;
  avancarObjetivo: (id: string, delta?: number) => void;
}

export const useGamificationStore = create<GamificationState>((set) => ({
  xp: 0,
  pontos: 0,

  streakDias: 0,
  streakSemana: [false, false, false, false, false, false, false],
  registradoHojeStreak: false,

  missoesFeitas: [],

  desafiosParticipando: [],
  desafiosProgresso: {},
  desafiosConcluidos: [],

  lojaAdquiridos: [],

  objetivos: [],

  addXP: (amount) => set((state) => ({ xp: Math.max(0, state.xp + amount) })),
  addPontos: (amount) => set((state) => ({ pontos: Math.max(0, state.pontos + amount) })),

  registrarHojeStreak: () =>
    set((state) => {
      if (state.registradoHojeStreak) return state;
      const streakSemana = [...state.streakSemana.slice(1), true];
      return {
        streakDias: state.streakDias + 1,
        streakSemana,
        registradoHojeStreak: true,
        xp: state.xp + 15,
        pontos: state.pontos + 10,
      };
    }),

  toggleMissao: (id) =>
    set((state) => {
      const jaFeita = state.missoesFeitas.includes(id);
      if (jaFeita) {
        return { missoesFeitas: state.missoesFeitas.filter((item) => item !== id) };
      }
      const missao = MISSOES_CATALOG.find((m) => m.id === id);
      return {
        missoesFeitas: [...state.missoesFeitas, id],
        xp: state.xp + (missao?.xpRecompensa ?? 0),
        pontos: state.pontos + (missao?.pontosRecompensa ?? 0),
      };
    }),

  toggleDesafio: (id) =>
    set((state) => {
      if (state.desafiosConcluidos.includes(id)) return state;
      const participando = state.desafiosParticipando.includes(id);
      return {
        desafiosParticipando: participando
          ? state.desafiosParticipando.filter((item) => item !== id)
          : [...state.desafiosParticipando, id],
      };
    }),

  avancarDesafio: (id) =>
    set((state) => {
      if (!state.desafiosParticipando.includes(id) || state.desafiosConcluidos.includes(id)) return state;
      const desafio = DESAFIOS_CATALOG.find((d) => d.id === id);
      if (!desafio) return state;
      const atual = state.desafiosProgresso[id] ?? 0;
      const novo = Math.min(desafio.metaPassos, atual + 1);
      const concluiuAgora = novo >= desafio.metaPassos;
      return {
        desafiosProgresso: { ...state.desafiosProgresso, [id]: novo },
        desafiosConcluidos: concluiuAgora
          ? [...state.desafiosConcluidos, id]
          : state.desafiosConcluidos,
        xp: concluiuAgora ? state.xp + desafio.xpRecompensa : state.xp,
        pontos: concluiuAgora ? state.pontos + desafio.pontosRecompensa : state.pontos,
      };
    }),

  resgatarItemLoja: (id) =>
    set((state) => {
      if (state.lojaAdquiridos.includes(id)) return state;
      const item = LOJA_CATALOG.find((i) => i.id === id);
      if (!item || state.pontos < item.custo) return state;
      return {
        lojaAdquiridos: [...state.lojaAdquiridos, id],
        pontos: state.pontos - item.custo,
      };
    }),

  addObjetivo: (titulo) =>
    set((state) => ({
      objetivos: [
        ...state.objetivos,
        { id: `objetivo-${Date.now()}`, titulo, progresso: 0, recompensado: false },
      ],
    })),

  avancarObjetivo: (id, delta = 20) =>
    set((state) => {
      const objetivo = state.objetivos.find((o) => o.id === id);
      if (!objetivo) return state;
      const novoProgresso = Math.min(100, objetivo.progresso + delta);
      const concluiuAgora = novoProgresso >= 100 && !objetivo.recompensado;
      return {
        objetivos: state.objetivos.map((o) =>
          o.id === id
            ? { ...o, progresso: novoProgresso, recompensado: o.recompensado || concluiuAgora }
            : o,
        ),
        xp: concluiuAgora ? state.xp + 50 : state.xp,
        pontos: concluiuAgora ? state.pontos + 40 : state.pontos,
      };
    }),
}));

/**
 * Combina dados reais de outras stores (memórias, cavalo, eventos) com o
 * progresso de gamificação para alimentar o desbloqueio de conquistas/selos
 * e a progressão das jornadas — nada aqui é fabricado, tudo deriva do uso
 * real do app.
 */
export function useConquistaContext(): ConquistaContext {
  const memoriasCount = useMemoriesStore((state) => state.memorias.length);
  const horses = useHorseStore((state) => state.horses);
  const eventStatus = useEventsStore((state) => state.eventStatus);
  const streakDias = useGamificationStore((state) => state.streakDias);
  const missoesFeitasCount = useGamificationStore((state) => state.missoesFeitas.length);

  const cartasCount = horses[0]?.cartas.length ?? 0;
  const eventosInscritosCount = Object.values(eventStatus).filter((status) => status.inscrito).length;

  return {
    memoriasCount,
    horsesCount: horses.length,
    eventosInscritosCount,
    cartasCount,
    streakDias,
    missoesFeitasCount,
  };
}
