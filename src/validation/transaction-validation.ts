import { z, ZodType } from "zod";

export class TransactionValidation {
  static readonly CREATETRANSACTION: ZodType = z.object({
    idCart: z.string({ message: "Please fill id cart properly" }),
    idCoffe: z.string({ message: "Please fill id coffe properly" }),
    quantity: z.number({ message: "Please fill quantity as a number" }),
  });

  static readonly CREATETRANSACTIONS: ZodType = z.array(this.CREATETRANSACTION);
}
