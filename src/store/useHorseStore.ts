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

export interface Horse {
  id: string;
  nome: string;
  raca: string;
  pelagem: string;
  /** ISO date string (YYYY-MM-DD), aproximada. */
  nascimento: string;
  sexo: HorseSex | null;
  personalidade: string[];
  modalidades: string[];
  curiosidade: string;
  fotoUri: string | null;
  relationship: HorseRelationship | null;
}

interface HorseState {
  /** Cavalo principal cadastrado no onboarding; relação 1:1 usuário-cavalo por ora. */
  horse: Horse | null;
  setHorse: (horse: Partial<Horse>) => void;
  setRelationship: (relationship: Partial<HorseRelationship>) => void;
}

const initialRelationship: HorseRelationship = {
  tempoJuntos: '',
  quemMonta: '',
  competem: null,
  sonho: '',
  tempoSemana: '',
  palavra: '',
};

const initialHorse: Horse = {
  id: 'horse-1',
  nome: '',
  raca: '',
  pelagem: '',
  nascimento: '',
  sexo: null,
  personalidade: [],
  modalidades: [],
  curiosidade: '',
  fotoUri: null,
  relationship: null,
};

export const useHorseStore = create<HorseState>((set) => ({
  horse: null,
  setHorse: (horse) =>
    set((state) => ({ horse: { ...(state.horse ?? initialHorse), ...horse } })),
  setRelationship: (relationship) =>
    set((state) => {
      const horse = state.horse ?? initialHorse;
      return {
        horse: {
          ...horse,
          relationship: { ...(horse.relationship ?? initialRelationship), ...relationship },
        },
      };
    }),
}));

export function getHorseAgeYears(nascimento: string): number | null {
  if (!nascimento) return null;
  const birth = new Date(nascimento);
  if (Number.isNaN(birth.getTime())) return null;
  const diffMs = Date.now() - birth.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25)));
}
