import { ZodSchema } from "zod";

export class Validation {
  static validate<T>(schema: ZodSchema, data: T): T {
    return schema.parse(data);
  }
}
