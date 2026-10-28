import { z } from "zod";

export const reopenTicketSchema = z.object({
  ticketId: z.string().min(1, "ID do chamado é obrigatório"),
  reason: z.string().min(10, "A justificativa de reabertura deve conter no mínimo 10 caracteres"),
});

export type ReopenTicketInput = z.infer<typeof reopenTicketSchema>;

export const resolveTicketSchema = z.object({
  ticketId: z.string().min(1, "ID do chamado é obrigatório"),
  message: z.string().min(1, "Descreva detalhadamente a entrega técnica realizada"),
});

export type ResolveTicketInput = z.infer<typeof resolveTicketSchema>;
