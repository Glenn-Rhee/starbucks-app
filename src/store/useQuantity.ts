import { create } from "zustand";

interface UseQuantity {
  qty: number;
  setQty: (qty: number) => void;
}

export const useQuantity = create<UseQuantity>((set) => ({
  qty: 1,
  setQty: (qty) => set({ qty }),
}));
