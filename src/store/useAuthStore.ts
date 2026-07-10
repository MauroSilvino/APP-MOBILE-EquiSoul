import { create } from 'zustand';

export type AuthProvider = 'google' | 'apple' | 'email' | 'guest';

interface AuthState {
  isAuthenticated: boolean;
  provider: AuthProvider | null;
  login: (provider: AuthProvider) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  provider: null,
  login: (provider) => set({ isAuthenticated: true, provider }),
  logout: () => set({ isAuthenticated: false, provider: null }),
}));
