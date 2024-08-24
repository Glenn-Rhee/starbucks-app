import { UseTransaction } from "@/store/useTransaction";
import { Transaction } from "@prisma/client";

export interface TransactionRequest {
  idCart: string;
  idCoffe: string;
  quantity: number;
}

export interface TransactionGetRequest {
  day: UseTransaction["day"];
  typeTime: UseTransaction["typeTime"];
  typeTransaction: Transaction["status"];
}
