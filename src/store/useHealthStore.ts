import { create } from 'zustand';

export interface Vacina {
  id: string;
  nome: string;
  data: string;
  veterinario: string;
  proxima: string;
}

export interface Vermifugacao {
  id: string;
  produto: string;
  data: string;
  veterinario: string;
  obs: string;
}

export interface Medicamento {
  id: string;
  nome: string;
  motivo: string;
  periodo: string;
  prescritor: string;
  status: 'ativo' | 'concluido' | 'suspenso';
}

export interface Ferrageamento {
  id: string;
  ferrador: string;
  tipo: string;
  data: string;
}

export interface RegistroOdontologico {
  id: string;
  procedimento: string;
  data: string;
  dentista: string;
}

export interface PesoRegistro {
  id: string;
  mes: string;
  valorKg: number;
}

export interface RefeicaoPlano {
  nome: string;
  horario: string;
}

export interface HorseHealthData {
  vacinas: Vacina[];
  vermifugacoes: Vermifugacao[];
  medicamentos: Medicamento[];
  ferrageamentos: Ferrageamento[];
  odontologia: RegistroOdontologico[];
  pesos: PesoRegistro[];
  refeicoes: RefeicaoPlano[];
  suplementos: string[];
}

const EMPTY_HEALTH_DATA: HorseHealthData = {
  vacinas: [],
  vermifugacoes: [],
  medicamentos: [],
  ferrageamentos: [],
  odontologia: [],
  pesos: [],
  refeicoes: [],
  suplementos: [],
};

function emptyHealthData(): HorseHealthData {
  return EMPTY_HEALTH_DATA;
}

interface HealthState {
  recordsByHorse: Record<string, HorseHealthData>;
  getRecords: (horseId: string) => HorseHealthData;
  addVacina: (horseId: string, vacina: Omit<Vacina, 'id'>) => void;
  addVermifugacao: (horseId: string, item: Omit<Vermifugacao, 'id'>) => void;
  addPeso: (horseId: string, mes: string, valorKg: number) => void;
}

export const useHealthStore = create<HealthState>((set, get) => ({
  recordsByHorse: {},
  getRecords: (horseId) => get().recordsByHorse[horseId] ?? emptyHealthData(),
  addVacina: (horseId, vacina) =>
    set((state) => {
      const current = state.recordsByHorse[horseId] ?? emptyHealthData();
      return {
        recordsByHorse: {
          ...state.recordsByHorse,
          [horseId]: { ...current, vacinas: [{ id: `vacina-${Date.now()}`, ...vacina }, ...current.vacinas] },
        },
      };
    }),
  addVermifugacao: (horseId, item) =>
    set((state) => {
      const current = state.recordsByHorse[horseId] ?? emptyHealthData();
      return {
        recordsByHorse: {
          ...state.recordsByHorse,
          [horseId]: {
            ...current,
            vermifugacoes: [{ id: `vermifugacao-${Date.now()}`, ...item }, ...current.vermifugacoes],
          },
        },
      };
    }),
  addPeso: (horseId, mes, valorKg) =>
    set((state) => {
      const current = state.recordsByHorse[horseId] ?? emptyHealthData();
      return {
        recordsByHorse: {
          ...state.recordsByHorse,
          [horseId]: { ...current, pesos: [...current.pesos, { id: `peso-${Date.now()}`, mes, valorKg }] },
        },
      };
    }),
}));
