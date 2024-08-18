import { create } from "zustand";

interface UseTotal {
  totalPrice: number;
  setTotalPrice: (total: number) => void;
}

export const useTotal = create<UseTotal>((set) => ({
  totalPrice: 0,
  setTotalPrice: (total) => set({ totalPrice: total }),
}));
