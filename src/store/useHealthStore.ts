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

export interface Exame {
  id: string;
  nome: string;
  laboratorio: string;
  data: string;
  isImaging: boolean;
}

export interface Lesao {
  id: string;
  tipo: string;
  local: string;
  data: string;
  situacao: 'em recuperação' | 'em observação' | 'curada';
}

export interface Documento {
  id: string;
  nome: string;
  pasta: string;
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
  exames: Exame[];
  lesoes: Lesao[];
  documentos: Documento[];
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
  exames: [],
  lesoes: [],
  documentos: [],
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
  addExame: (horseId: string, exame: Omit<Exame, 'id'>) => void;
  addDocumento: (horseId: string, documento: Omit<Documento, 'id'>) => void;
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
  addExame: (horseId, exame) =>
    set((state) => {
      const current = state.recordsByHorse[horseId] ?? emptyHealthData();
      return {
        recordsByHorse: {
          ...state.recordsByHorse,
          [horseId]: { ...current, exames: [{ id: `exame-${Date.now()}`, ...exame }, ...current.exames] },
        },
      };
    }),
  addDocumento: (horseId, documento) =>
    set((state) => {
      const current = state.recordsByHorse[horseId] ?? emptyHealthData();
      return {
        recordsByHorse: {
          ...state.recordsByHorse,
          [horseId]: {
            ...current,
            documentos: [{ id: `documento-${Date.now()}`, ...documento }, ...current.documentos],
          },
        },
      };
    }),
}));
