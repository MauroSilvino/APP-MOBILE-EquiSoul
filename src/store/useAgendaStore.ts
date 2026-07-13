import { create } from 'zustand';

export type TipoCompromisso = 'Treino' | 'Passeio' | 'Consulta' | 'Evento' | 'Ferrageamento' | 'Competição' | 'Outro';

export interface Compromisso {
  id: string;
  titulo: string;
  tipo: TipoCompromisso;
  /** ISO date string (YYYY-MM-DD). */
  data: string;
  /** HH:mm. */
  hora: string;
  local: string;
  cavaloId: string | null;
  observacoes: string;
  lembrete: boolean;
  status: 'pendente' | 'concluido' | 'cancelado';
}

export interface Meta {
  id: string;
  titulo: string;
  prazo: string;
  progresso: number;
}

interface AgendaState {
  compromissos: Compromisso[];
  metas: Meta[];
  addCompromisso: (compromisso: Omit<Compromisso, 'id' | 'status'>) => Compromisso;
  addMeta: (meta: Omit<Meta, 'id' | 'progresso'>) => void;
}

export const useAgendaStore = create<AgendaState>((set) => ({
  compromissos: [],
  metas: [],
  addCompromisso: (compromisso) => {
    const novo: Compromisso = { id: `compromisso-${Date.now()}`, status: 'pendente', ...compromisso };
    set((state) => ({ compromissos: [...state.compromissos, novo] }));
    return novo;
  },
  addMeta: (meta) =>
    set((state) => ({
      metas: [...state.metas, { id: `meta-${Date.now()}`, progresso: 0, ...meta }],
    })),
}));

export const TIPO_COMPROMISSO_COR: Record<TipoCompromisso, string> = {
  Treino: '#a39c8a',
  Passeio: '#6B7353',
  Consulta: '#8A6E4B',
  Evento: '#8A6E4B',
  Ferrageamento: '#6B7353',
  Competição: '#4F5D45',
  Outro: '#a39c8a',
};

export function formatDataISOParaLabel(iso: string): string {
  const [ano, mes, dia] = iso.split('-').map(Number);
  const data = new Date(ano, (mes ?? 1) - 1, dia ?? 1);
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];
  return `${diasSemana[data.getDay()]}, ${data.getDate()} de ${meses[data.getMonth()]}`;
}

export function hojeISO(): string {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${hoje.getFullYear()}-${mes}-${dia}`;
}
