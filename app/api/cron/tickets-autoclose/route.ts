import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  const now = new Date();
  const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000);

  try {
    // Busca chamados em WAITING_CLIENT sem manifestação há pelo menos 72 horas
    const ticketsToClose = await prisma.ticket.findMany({
      where: {
        status: "WAITING_CLIENT",
        OR: [
          { slaPausedAt: { lte: seventyTwoHoursAgo } },
          {
            slaPausedAt: null,
            updatedAt: { lte: seventyTwoHoursAgo },
          },
        ],
      },
      select: {
        id: true,
        ticketNumber: true,
        title: true,
        userId: true,
      },
    });

    const closedIds: string[] = [];

    for (const ticket of ticketsToClose) {
      await prisma.$transaction([
        prisma.ticket.update({
          where: { id: ticket.id },
          data: {
            status: "RESOLVED",
            resolvedAt: now,
            slaPausedAt: null,
          },
        }),
        prisma.ticketComment.create({
          data: {
            message:
              "Chamado encerrado automaticamente por inatividade após 72 horas em conformidade com as regras de SLA.",
            authorName: "Sistema MindSite (SLA Bot)",
            isAdmin: true,
            ticketId: ticket.id,
          },
        }),
      ]);

      closedIds.push(ticket.id);
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      closedCount: closedIds.length,
      closedTicketIds: closedIds,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("[CRON AutoClose Tickets] Erro:", msg);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
