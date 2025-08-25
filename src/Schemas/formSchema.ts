// src/lib/formSchema.ts
import { z } from "zod"

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "The name must have at least 2 characters")
    .max(50, "The name must have less than 50 characters"),

  document: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Document must be in the format 000.000.000-00"),

  email: z
    .string()
    .email("Invalid email. Please enter a valid email address: example@example.com")
    .refine(
      (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val);
      },
      { message: "Invalid email. Please enter a valid email address: example@example.com" }
    ),

  zipCode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "Zip Code must be in the format 00000-000"),

  phone: z
    .string()
    .regex(/^\+\d{1,3}\s\d{9,12}$/, "Phone must include the country code, ex: +55 11987654321"),

  country: z
    .string()
    .min(1, "Select a country"),

  birthDate: z
    .date({
      message: "Birth date is required. Please select a valid date",
    })
    .refine(
      (date) => {
        const today = new Date();
        const minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
        return date >= minAge && date <= today;
      },
      { message: "Please select a valid birth date (between today and 120 years ago)" }
    ),

  password: z
    .string()
    .min(8, "The password must have at least 8 characters")
    .regex(/[A-Z]/, "The password must have at least one uppercase letter")
    .regex(/[a-z]/, "The password must have at least one lowercase letter")
    .regex(/\d/, "The password must have at least one number")
    .regex(/[@$!%*?&]/, "The password must have at least one special character"),
})

export type FormSchema = z.infer<typeof formSchema>
