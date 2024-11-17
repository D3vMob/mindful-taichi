import { z } from "zod";
import { type UserRole } from "~/types/auth";

// Base schemas
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  );

const emailSchema = z
  .string()
  .email("Invalid email format")
  .min(1, "Email is required");

// Auth validation schemas
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z.object({
  email: emailSchema,
});

// Admin user creation schema
export const createUserSchema = z.object({
  email: emailSchema,
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  surname: z
    .string()
    .min(2, "Surname must be at least 2 characters")
    .optional(),
  role: z.enum(["admin", "user", "guest"] as const).default("user"),
  section: z.string().optional(),
});

// Type inference
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
