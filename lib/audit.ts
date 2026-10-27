import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function logAudit(
  userId: string,
  action: string,
  details?: Record<string, unknown> | Prisma.InputJsonValue
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        details: (details as Prisma.InputJsonValue) ?? undefined,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao registrar log de auditoria:", message);
  }
}
