import { z, ZodType } from "zod";

export class CartValidation {
  static readonly NEWCART: ZodType = z.object({
    quantity: z.number({ message: "Quantitiy is required" }),
    size: z.enum(["Small", "Medium", "Large"], {
      message: "Please choose size properly!",
    }),
  });
}
