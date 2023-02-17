import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice, AuthSlice } from './createAuthSlice';
import { createMyAccountSlice, MyAccountSlice } from './createMyAccountSlice';

export interface Store extends AuthSlice, MyAccountSlice {}

const useStore = create<Store>()(
  persist(
    (set, get, api) => {
      return {
        ...createAuthSlice(set, get, api),
        ...createMyAccountSlice(set, get, api),
      };
    },
    {
      name: 'lms-storage',
    },
  )
);

export default useStore;
