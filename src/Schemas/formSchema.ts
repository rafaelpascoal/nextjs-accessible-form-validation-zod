// src/lib/formSchema.ts
import { z } from "zod"

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome não pode ter mais que 50 caracteres"),

  document: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Documento deve estar no formato 000.000.000-00"),

  email: z
    .string()
    .email("E-mail inválido"),

  cep: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 00000-000"),

  phone: z
    .string()
    .regex(/^\+\d{1,3}\s\d{9,12}$/, "Telefone deve incluir código do país, ex: +55 11987654321"),

  country: z
    .string()
    .min(1, "Selecione um país"),

  birthDate: z
    .string()
    .refine(
      (val) => !Number.isNaN(Date.parse(val)),
      { message: "Data inválida" }
    ),

  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/\d/, "A senha deve conter pelo menos um número")
    .regex(/[@$!%*?&]/, "A senha deve conter pelo menos um caractere especial"),
})

export type FormSchema = z.infer<typeof formSchema>
