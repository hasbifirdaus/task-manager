import { object, string, email, type infer as zInfer } from "zod";

export const RegisterSchema = object({
  name: string().min(1, "Name must be more than 1 character"),
  email: string().pipe(email("Invalid Email")),
  password: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less  than 32 characters"),
  ConfirmPassword: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less  than 32 characters"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Password does not match",
  path: ["ConfirmPassword"],
});

export const LoginSchema = object({
  email: string().pipe(email("Invalid Email")),
  password: string()
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less  than 32 characters"),
});

export type RegisterInput = zInfer<typeof RegisterSchema>;
export type LoginInput = zInfer<typeof LoginSchema>;
