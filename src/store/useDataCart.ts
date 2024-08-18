import { Cart } from "@prisma/client";
import { create } from "zustand";

interface UseDataCart {
  data: Cart[] | null;
  setData: (data: Cart[] | null) => void;
}

export const useDataCart = create<UseDataCart>((set) => ({
  data: null,
  setData(data) {
    set({ data });
  },
}));
