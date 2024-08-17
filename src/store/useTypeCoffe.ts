import { Coffe } from "@prisma/client";
import { create } from "zustand";

interface UseTypeCoffe {
  type: Coffe["type"];
  setType: (type: Coffe["type"]) => void;
}

export const useTypeCoffe = create<UseTypeCoffe>((set) => ({
  type: "Expresso",
  setType: (type: Coffe["type"]) => set({ type }),
}));
