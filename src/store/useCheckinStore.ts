import { create } from 'zustand';

export interface Checkin {
  humorCavalo: string | null;
  humorUsuario: string | null;
  atividades: string[];
  fotoUri: string | null;
  nota: string;
}

interface CheckinState {
  primeiroCheckin: Checkin | null;
  setPrimeiroCheckin: (checkin: Checkin) => void;
}

export const useCheckinStore = create<CheckinState>((set) => ({
  primeiroCheckin: null,
  setPrimeiroCheckin: (checkin) => set({ primeiroCheckin: checkin }),
}));
