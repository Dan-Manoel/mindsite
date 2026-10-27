import { z } from "zod";

/**
 * Schema Zod para validação estrita dos dados de entrada do formulário de contato.
 * Arquivo neutro (sem "use server") para evitar erros de compilação no Next.js App Router.
 */
export const contactLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Por favor, informe seu nome completo (mínimo de 2 caracteres).")
    .max(120, "O nome informado é muito longo."),
  company: z
    .string()
    .trim()
    .max(120, "O nome da empresa é muito longo.")
    .optional()
    .nullable()
    .transform((val) => val || ""),
  email: z
    .string()
    .trim()
    .email("Por favor, informe um endereço de e-mail válido.")
    .max(255, "O e-mail informado é muito longo.")
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .max(30, "O número de telefone é muito longo.")
    .optional()
    .nullable()
    .transform((val) => val || ""),
  message: z
    .string()
    .trim()
    .min(5, "Por favor, escreva algumas palavras sobre o seu projeto (mínimo de 5 caracteres).")
    .max(3000, "A mensagem ultrapassou o limite permitido de 3000 caracteres."),
  _gotcha: z
    .string()
    .optional()
    .nullable(),
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;

export interface ContactActionResult {
  error: boolean;
  message: string;
}
