import { create } from "zustand";

interface UseSearchCoffe {
  value: string;
  setValue: (val: string) => void;
}

export const useSearchCoffe = create<UseSearchCoffe>((set) => ({
  value: "",
  setValue: (val: string) => set({ value: val }),
}));
