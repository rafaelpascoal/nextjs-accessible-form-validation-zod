// src/lib/formSchema.ts
import { z } from "zod"

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "The name must have at least 2 characters")
    .max(50, "The name must have less than 50 characters"),

  document: z
    .string()
    .min(5, "Document number is required")
    .max(20, "Document number must be less than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Document must contain only letters and numbers"),

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

  address: z
    .string()
    .min(1, "Address is required")
    .max(100, "Address must have less than 100 characters")
    .refine(
      (val) => {
        const addressRegex = /^[a-zA-Z0-9\s]+$/;
        return addressRegex.test(val);
      },
      { message: "Address must contain only letters and numbers" }
    ),

  zipCode: z
    .string()
    .min(4, "Zip code is required")
    .max(10, "Zip code must be less than 10 characters")
    .regex(/^[0-9\-]+$/, "Invalid zip code format"),

  phone: z
    .string()
    .optional()
    .optional()
    .superRefine((val, ctx) => {
      if (!val) return;

      // if the user only left the country code, don't validate
      if (/^\+\d{1,3}$/.test(val)) return;

      if (val.length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is too short",
        });
      }

      if (val.length > 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is too long",
        });
      }

      if (!/^\+[1-9]\d{1,14}$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number format (use E.164, e.g. +15551234567)",
        });
      }
    }),



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
    )
})

export type FormSchema = z.infer<typeof formSchema>
