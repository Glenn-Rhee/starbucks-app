import { Transaction } from "@prisma/client";
import { create } from "zustand";

export interface UseTransaction {
  transaction: Transaction[] | [];
  message: string;
  typeTransaction: Transaction["status"];
  day: "Last 7 Days" | "Last 30 Days" | "Last 90 Days";
  typeTime: "Newest" | "Oldest";
  setTypeTransaction: (e: Transaction["status"]) => void;
  setTransaction: (e: Transaction[] | []) => void;
  setMessage: (e: string) => void;
  setDay: (e: "Last 7 Days" | "Last 30 Days" | "Last 90 Days") => void;
  setTypeTime: (e: UseTransaction["typeTime"]) => void;
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
  typeTransaction: "COMPLETED",
  setTypeTransaction(e) {
    set({ typeTransaction: e });
  },
  day: "Last 7 Days",
  setDay(e) {
    set({ day: e });
  },
  typeTime: "Newest",
  setTypeTime(e) {
    set({ typeTime: e });
  },
}));
