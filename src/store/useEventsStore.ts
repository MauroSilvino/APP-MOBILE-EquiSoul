import { create } from 'zustand';

export interface EventoCompleto {
  id: string;
  tipo: string;
  categoria: string;
  titulo: string;
  data: string;
  dataISO: string;
  dia: number;
  cidade: string;
  precoLabel: string;
  preco: string;
  vagas: string;
  clima: string;
  desc: string;
  encerrado: boolean;
  temCertificado: boolean;
}

export interface EventoStatus {
  inscrito: boolean;
  salvo: boolean;
}

const EMPTY_STATUS: EventoStatus = Object.freeze({ inscrito: false, salvo: false });

export const EVENTOS_SEED: EventoCompleto[] = [
  {
    id: 'copa',
    tipo: 'competição',
    categoria: 'Competições',
    titulo: 'Copa Nacional de Salto',
    data: 'Sáb, 20 jul',
    dataISO: '2026-07-20',
    dia: 20,
    cidade: 'Ribeirão Preto, SP',
    precoLabel: 'R$ 150',
    preco: 'R$ 150',
    vagas: '42 vagas',
    clima: '☀ 26°C previsto',
    desc: 'Organizado pela Federação Paulista de Hipismo. Prova aberta para as categorias iniciante, amador e profissional.',
    encerrado: false,
    temCertificado: false,
  },
  {
    id: 'trilha',
    tipo: 'passeio',
    categoria: 'Passeios',
    titulo: 'Encontro de Trilhas · Serra Verde',
    data: 'Sáb, 12 jul',
    dataISO: '2026-07-12',
    dia: 12,
    cidade: 'Serra Verde, MG',
    precoLabel: 'Gratuito',
    preco: 'Gratuito',
    vagas: '80 vagas',
    clima: '⛅ 22°C previsto',
    desc: 'Passeio guiado de um dia pelas trilhas da Serra Verde, com paradas para descanso dos cavalos e piquenique ao meio-dia.',
    encerrado: false,
    temCertificado: false,
  },
  {
    id: 'clinica',
    tipo: 'clínica',
    categoria: 'Clínicas',
    titulo: 'Clínica de Adestramento com Marina Kist',
    data: 'Sáb, 26 jul',
    dataISO: '2026-07-26',
    dia: 26,
    cidade: 'Campinas, SP',
    precoLabel: 'R$ 220',
    preco: 'R$ 220',
    vagas: '15 vagas',
    clima: '☀ 24°C previsto',
    desc: 'Um dia intensivo de adestramento com a treinadora Marina Kist, para cavaleiros amadores e profissionais.',
    encerrado: false,
    temCertificado: true,
  },
  {
    id: 'tambor',
    tipo: 'competição',
    categoria: 'Competições',
    titulo: 'Prova de Tambor Aberta',
    data: 'Sáb, 5 jul',
    dataISO: '2026-07-05',
    dia: 5,
    cidade: 'Ribeirão Preto, SP',
    precoLabel: 'R$ 80',
    preco: 'R$ 80',
    vagas: '0 vagas',
    clima: '',
    desc: 'Prova encerrada. Confira o ranking final e o álbum colaborativo dos participantes.',
    encerrado: true,
    temCertificado: false,
  },
];

interface EventsState {
  eventos: EventoCompleto[];
  eventStatus: Record<string, EventoStatus>;
  clubesMembro: string[];
  comunidadesMembro: string[];
  experienciasReservadas: string[];
  networkingConectados: string[];
  checkinFeitoMap: Record<string, boolean>;
  getEventStatus: (id: string) => EventoStatus;
  inscrever: (id: string) => void;
  toggleSalvo: (id: string) => void;
  toggleClube: (nome: string) => void;
  toggleComunidade: (nome: string) => void;
  toggleExperiencia: (nome: string) => void;
  toggleNetworking: (nome: string) => void;
  fazerCheckin: (id: string) => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  eventos: EVENTOS_SEED,
  eventStatus: {
    copa: { inscrito: false, salvo: true },
    tambor: { inscrito: true, salvo: false },
  },
  clubesMembro: [],
  comunidadesMembro: [],
  experienciasReservadas: [],
  networkingConectados: [],
  checkinFeitoMap: {},

  getEventStatus: (id) => get().eventStatus[id] ?? EMPTY_STATUS,

  inscrever: (id) =>
    set((state) => ({
      eventStatus: {
        ...state.eventStatus,
        [id]: { ...(state.eventStatus[id] ?? EMPTY_STATUS), inscrito: true },
      },
    })),

  toggleSalvo: (id) =>
    set((state) => {
      const current = state.eventStatus[id] ?? EMPTY_STATUS;
      return { eventStatus: { ...state.eventStatus, [id]: { ...current, salvo: !current.salvo } } };
    }),

  toggleClube: (nome) =>
    set((state) => ({
      clubesMembro: state.clubesMembro.includes(nome)
        ? state.clubesMembro.filter((item) => item !== nome)
        : [...state.clubesMembro, nome],
    })),

  toggleComunidade: (nome) =>
    set((state) => ({
      comunidadesMembro: state.comunidadesMembro.includes(nome)
        ? state.comunidadesMembro.filter((item) => item !== nome)
        : [...state.comunidadesMembro, nome],
    })),

  toggleExperiencia: (nome) =>
    set((state) => ({
      experienciasReservadas: state.experienciasReservadas.includes(nome)
        ? state.experienciasReservadas.filter((item) => item !== nome)
        : [...state.experienciasReservadas, nome],
    })),

  toggleNetworking: (nome) =>
    set((state) => ({
      networkingConectados: state.networkingConectados.includes(nome)
        ? state.networkingConectados.filter((item) => item !== nome)
        : [...state.networkingConectados, nome],
    })),

  fazerCheckin: (id) =>
    set((state) => ({ checkinFeitoMap: { ...state.checkinFeitoMap, [id]: true } })),
}));
