import { Coffe } from "@prisma/client";
import { create } from "zustand";

interface UseDataCoffe {
  coffeData: Coffe[] | null;
  setCoffeData: (data: Coffe[] | null) => void;
}

export const useDataCoffe = create<UseDataCoffe>((set) => ({
  coffeData: null,
  setCoffeData: (coffeData) => set({ coffeData }),
}));
