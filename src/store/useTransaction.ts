import { Transaction } from "@prisma/client";
import { create } from "zustand";

interface UseTransaction {
  transaction: Transaction[] | [];
  message: string;
  setTransaction: (e: Transaction[] | []) => void;
  setMessage: (e: string) => void;
}

export const useTransaction = create<UseTransaction>((set) => ({
  transaction: [],
  setTransaction(e) {
    set({ transaction: e });
  },
  message: "",
  setMessage(e) {
    set({ message: e });
  },
}));
