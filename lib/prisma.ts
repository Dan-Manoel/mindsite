import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Garante recriação automática da instância caso a anterior esteja em cache sem os novos modelos/relações
const shouldRecreate =
  !globalForPrisma.prisma ||
  !("ticketComment" in globalForPrisma.prisma);

export const prisma = shouldRecreate
  ? new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    })
  : globalForPrisma.prisma!;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
