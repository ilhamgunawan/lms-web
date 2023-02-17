import { StateCreator } from 'zustand';
import { PostLoginResponse } from '../models/api/auth';

export type MyAccount = PostLoginResponse["data"] | undefined

export interface MyAccountSlice {
  myAccount: MyAccount
  setMyAccount: (myAccount: MyAccount) => void
}

export const createMyAccountSlice: StateCreator<MyAccountSlice> = (set) => {
  return {
    myAccount: undefined,
    setMyAccount: (myAccount) => {
      set({ myAccount });
    },
  };
}
