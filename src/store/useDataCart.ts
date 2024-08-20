import { Cart } from "@prisma/client";
import { create } from "zustand";

export interface DataCartBe {
  idCoffe: string;
  balance: number;
}

interface UseDataCart {
  data: Cart[] | null;
  empty: boolean;
  dataToBe: DataCartBe[] | [];
  success: boolean;
  setData: (data: Cart[] | null) => void;
  setDataToBe: (data: DataCartBe[]) => void;
  setEmpty: (e: boolean) => void;
  setSuccess: (e: boolean) => void;
}

export const useDataCart = create<UseDataCart>((set) => ({
  data: null,
  setData(data) {
    set({ data });
  },
  empty: true,
  setEmpty(e) {
    set({ empty: e });
  },
  dataToBe: [],
  setDataToBe(data) {
    set({ dataToBe: data });
  },
  success: false,
  setSuccess(e) {
      set({success: e})
  },
}));
