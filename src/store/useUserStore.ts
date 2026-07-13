import { create } from 'zustand';

export interface UserProfile {
  nome: string;
  avatarUri: string | null;
  cidade: string;
  estado: string;
  pais: string;
  modalidadePrincipal: string | null;
  nivel: string | null;
  bio: string;
}

export interface UserPermissions {
  camera: boolean;
  fotos: boolean;
  localizacao: boolean;
  notificacoes: boolean;
  calendario: boolean;
  microfone: boolean;
}

export interface UserPrivacidade {
  publica: boolean;
  ocultarCidade: boolean;
  ocultarStats: boolean;
  permitirMsg: boolean;
  permitirMarcacoes: boolean;
}

interface UserState {
  profile: UserProfile;
  preferencias: string[];
  permissoes: UserPermissions;
  privacidade: UserPrivacidade;
  tourConcluido: boolean;
  onboardingConcluido: boolean;
  setProfile: (profile: Partial<UserProfile>) => void;
  setPreferencias: (preferencias: string[]) => void;
  setPermissao: (chave: keyof UserPermissions, valor: boolean) => void;
  setPrivacidade: (chave: keyof UserPrivacidade, valor: boolean) => void;
  setTourConcluido: (concluido: boolean) => void;
  setOnboardingConcluido: (concluido: boolean) => void;
}

const initialProfile: UserProfile = {
  nome: '',
  avatarUri: null,
  cidade: '',
  estado: '',
  pais: '',
  modalidadePrincipal: null,
  nivel: null,
  bio: '',
};

const initialPermissoes: UserPermissions = {
  camera: false,
  fotos: false,
  localizacao: false,
  notificacoes: false,
  calendario: false,
  microfone: false,
};

const initialPrivacidade: UserPrivacidade = {
  publica: true,
  ocultarCidade: false,
  ocultarStats: false,
  permitirMsg: true,
  permitirMarcacoes: true,
};

export const useUserStore = create<UserState>((set) => ({
  profile: initialProfile,
  preferencias: [],
  permissoes: initialPermissoes,
  privacidade: initialPrivacidade,
  tourConcluido: false,
  onboardingConcluido: false,
  setProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  setPreferencias: (preferencias) => set({ preferencias }),
  setPermissao: (chave, valor) =>
    set((state) => ({ permissoes: { ...state.permissoes, [chave]: valor } })),
  setPrivacidade: (chave, valor) =>
    set((state) => ({ privacidade: { ...state.privacidade, [chave]: valor } })),
  setTourConcluido: (tourConcluido) => set({ tourConcluido }),
  setOnboardingConcluido: (onboardingConcluido) => set({ onboardingConcluido }),
}));
