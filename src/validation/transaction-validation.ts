import { z, ZodType } from "zod";

export class TransactionValidation {
  static readonly CREATETRANSACTION: ZodType = z.object({
    idCart: z.string({ message: "Please fill id cart properly" }),
    idCoffe: z.string({ message: "Please fill id coffe properly" }),
    quantity: z.number({ message: "Please fill quantity as a number" }),
  });

  static readonly GETFILTERTRANSACTION: ZodType = z.object({
    day: z.enum(["Last 7 Days", "Last 30 Days", "Last 90 Days"]).optional(),
    typeTime: z.enum(["Newest", "Oldest"]).optional(),
    typeTransaction: z
      .enum(["All", "Completed", "In Progress", "Cancelled"])
      .optional(),
  });

  static readonly CREATETRANSACTIONS: ZodType = z.array(this.CREATETRANSACTION);
}
