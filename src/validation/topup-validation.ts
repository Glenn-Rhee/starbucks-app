import { z, ZodType } from "zod";

export class TopupValidation {
  static readonly TOPUP: ZodType = z.object({
    topup: z.number({ message: "Input must be a number" }),
  });
}
