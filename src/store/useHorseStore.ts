import { create } from 'zustand';

export type HorseSex = 'macho' | 'femea';

export interface HorseRelationship {
  tempoJuntos: string;
  quemMonta: string;
  competem: 'sim' | 'nao' | null;
  sonho: string;
  tempoSemana: string;
  palavra: string;
}

export interface CartaIA {
  id: string;
  date: string;
  humor: string;
  texto: string;
}

export interface Horse {
  id: string;
  nome: string;
  apelido: string;
  raca: string;
  pelagem: string;
  /** ISO date string (YYYY-MM-DD), aproximada. */
  nascimento: string;
  sexo: HorseSex | null;
  personalidade: string[];
  modalidades: string[];
  curiosidade: string;
  comidaFavorita: string;
  humor: string;
  fotoUri: string | null;
  relationship: HorseRelationship | null;
  cartas: CartaIA[];
}

interface HorseState {
  horses: Horse[];
  activeHorseId: string | null;
  setActiveHorse: (id: string) => void;
  /** Cria/atualiza o cavalo principal (horses[0]) — usado pelo fluxo de Onboarding. */
  setHorse: (horse: Partial<Horse>) => void;
  setRelationship: (relationship: Partial<HorseRelationship>) => void;
  /** Adiciona um novo cavalo à lista — usado pelo fluxo "Adicionar cavalo" a partir de Perfis. */
  addHorse: (horse: Partial<Horse>) => string;
  addCarta: (horseId: string, texto: string, humor: string) => void;
}

const initialRelationship: HorseRelationship = {
  tempoJuntos: '',
  quemMonta: '',
  competem: null,
  sonho: '',
  tempoSemana: '',
  palavra: '',
};

function makeHorse(overrides: Partial<Horse>, id: string): Horse {
  return {
    id,
    nome: '',
    apelido: '',
    raca: '',
    pelagem: '',
    nascimento: '',
    sexo: null,
    personalidade: [],
    modalidades: [],
    curiosidade: '',
    comidaFavorita: '',
    humor: '',
    fotoUri: null,
    relationship: null,
    cartas: [],
    ...overrides,
  };
}

let nextHorseSeq = 2;

export const useHorseStore = create<HorseState>((set) => ({
  horses: [],
  activeHorseId: null,
  setActiveHorse: (id) => set({ activeHorseId: id }),
  setHorse: (horse) =>
    set((state) => {
      if (state.horses.length === 0) {
        return { horses: [makeHorse(horse, 'horse-1')] };
      }
      const [primary, ...rest] = state.horses;
      return { horses: [{ ...primary, ...horse }, ...rest] };
    }),
  setRelationship: (relationship) =>
    set((state) => {
      if (state.horses.length === 0) {
        return {
          horses: [makeHorse({ relationship: { ...initialRelationship, ...relationship } }, 'horse-1')],
        };
      }
      const [primary, ...rest] = state.horses;
      return {
        horses: [
          { ...primary, relationship: { ...(primary.relationship ?? initialRelationship), ...relationship } },
          ...rest,
        ],
      };
    }),
  addHorse: (horse) => {
    const id = `horse-${nextHorseSeq++}`;
    set((state) => ({ horses: [...state.horses, makeHorse(horse, id)] }));
    return id;
  },
  addCarta: (horseId, texto, humor) =>
    set((state) => ({
      horses: state.horses.map((h) =>
        h.id === horseId
          ? { ...h, cartas: [{ id: `carta-${Date.now()}`, date: 'Hoje', humor, texto }, ...h.cartas] }
          : h
      ),
    })),
}));

export function getHorseAgeYears(nascimento: string): number | null {
  if (!nascimento) return null;
  const birth = new Date(nascimento);
  if (Number.isNaN(birth.getTime())) return null;
  const diffMs = Date.now() - birth.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25)));
}

export function slugifyHorseName(nome: string): string {
  return (
    nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'cavalo'
  );
}
