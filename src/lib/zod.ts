import { z } from "zod";

export const formSignupSchema = z.object({
  fullname: z.string({ message: "Fullname is required" }),
  username: z
    .string({ message: "Username is required" })
    .min(5, { message: "Username must be at least 5 characters" }),
  email: z.string({ message: "Email is required" }).email({
    message: "Email is invalid",
  }),
  mobilePhone: z
    .string({ message: "Mobile Phone is required" })
    .regex(/^\d*$/, "Mobile Phone must only contain numbers")
    .min(11, {
      message: "Mobile Phone must be at least 11 characters",
    }),
  password: z.string({ message: "Password is required" }).min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z
    .string({ message: "Confirmation Password is required" })
    .min(8, {
      message: "Confirmation Password must be at least 8 characters",
    }),
});

export const formLoginSchema = z.object({
  email: z.string({ message: "Email is required" }).email({
    message: "Email is invalid",
  }),
  password: z.string({ message: "Password is required" }).min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z
    .string({ message: "Confirmation Password is required" })
    .min(8, {
      message: "Confirmation Password must be at least 8 characters",
    }),
});
