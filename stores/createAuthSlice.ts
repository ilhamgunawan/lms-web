import { StateCreator } from 'zustand';

export interface AuthSlice {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => {
  return {
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => {
      set({ isLoggedIn });
    },
  };
}
