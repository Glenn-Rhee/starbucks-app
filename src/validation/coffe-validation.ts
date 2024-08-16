import { z, ZodType } from "zod";

export class CoffeValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string({ message: "Name is required" }),
    description: z.string({ message: "Description is required" }),
    price: z.number({ message: "Price must be a number" }),
    linkPicture: z.string({ message: "Picture is required" }),
    type: z.enum(
      [
        "Expresso",
        "Americano",
        "LongBlack",
        "Cappucino",
        "CoffeLatte",
        "MoccaLatte",
        "Afogato",
        "ColdBrew",
        "Macchiato",
      ],
      { message: "Please choose type coffe properly" }
    ),
  });
}
