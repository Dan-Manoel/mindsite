"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { MonthlyRealizedRevenue, RevenueAnalyticsResult } from "./finance.types";

/**
 * Validação de acesso restrito a administradores.
 */
async function assertAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Não autenticado.");
  }

  const role = user.app_metadata?.role || user.user_metadata?.role;
  const isDanilo = user.email === "contato@mindsite.com.br";

  if (!isDanilo && role !== "ADMIN") {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });
    if (!dbUser || dbUser.role !== "ADMIN") {
      throw new Error("Acesso não autorizado.");
    }
  }

  return user;
}

/**
 * Utilitário para extrair ano, mês (0..11) e dia segundo o fuso America/Sao_Paulo
 */
function getSaoPauloDate(d: Date): { year: number; month: number; day: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const parts = formatter.formatToParts(d);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }
  return {
    year: parseInt(partMap.year, 10),
    month: parseInt(partMap.month, 10) - 1,
    day: parseInt(partMap.day, 10),
  };
}

/**
 * Função interna de agregação da receita realizada e projetada nos últimos 12 meses.
 * Aceita dados pré-carregados (zero queries extras) ou executa apenas 2 queries cirúrgicas (1 por tabela).
 */
export async function calculateRevenueAnalytics(prefetched?: {
  invoices: Array<{
    id: string;
    totalAmount: number | { toNumber?: () => number } | string;
    status: string;
    paidAt: Date | null;
    dueDate: Date;
  }>;
  unbilledInstallments: Array<{
    id: string;
    amount: number | { toNumber?: () => number } | string;
    status: string;
    scheduledDate: Date;
    updatedAt?: Date;
  }>;
}): Promise<{
  monthlyStats: MonthlyRealizedRevenue[];
  totalRealized: number;
  averageMonthlyRealized: number;
  totalCount: number;
}> {
  const shortMonths = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
    "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
  ];
  const nowSP = getSaoPauloDate(new Date());

  // Constrói os 12 meses (de -11 até 0 = mês atual)
  const monthsList: Array<{
    year: number;
    month: number;
    key: string;
    monthLabel: string;
  }> = [];

  for (let offset = -11; offset <= 0; offset++) {
    let targetYear = nowSP.year;
    let targetMonth = nowSP.month + offset;
    while (targetMonth < 0) {
      targetMonth += 12;
      targetYear -= 1;
    }
    while (targetMonth > 11) {
      targetMonth -= 12;
      targetYear += 1;
    }
    const key = `${targetYear}-${String(targetMonth + 1).padStart(2, "0")}`;
    const monthLabel = `${shortMonths[targetMonth]}/${targetYear.toString().slice(-2)}`;
    monthsList.push({ year: targetYear, month: targetMonth, key, monthLabel });
  }

  // Data de corte inicial para a consulta no banco
  const startWindowDate = new Date(Date.UTC(monthsList[0].year, monthsList[0].month - 1, 1));

  // Se os dados já foram carregados pelo caller (ex: getAdminDashboardData), reutiliza sem abrir novas conexões;
  // caso contrário, executa 1 query em invoice e 1 em contractInstallment com fallback granular
  const [windowInvoices, windowInstallments] = prefetched
    ? [prefetched.invoices, prefetched.unbilledInstallments]
    : await Promise.all([
        prisma.invoice
          .findMany({
            where: {
              OR: [
                { status: "PAID", paidAt: { not: null, gte: startWindowDate } },
                { status: { notIn: ["CANCELLED", "DRAFT"] }, dueDate: { gte: startWindowDate } },
              ],
            },
            select: {
              id: true,
              totalAmount: true,
              status: true,
              paidAt: true,
              dueDate: true,
            },
          })
          .catch((err) => {
            console.error("Erro ao consultar faturas em calculateRevenueAnalytics:", err);
            return [];
          }),
        prisma.contractInstallment
          .findMany({
            where: {
              status: { not: "CANCELLED" },
              invoiceItemId: null,
              OR: [
                { updatedAt: { gte: startWindowDate } },
                { scheduledDate: { gte: startWindowDate } },
              ],
            },
            select: {
              id: true,
              amount: true,
              status: true,
              scheduledDate: true,
              updatedAt: true,
            },
          })
          .catch((err) => {
            console.error("Erro ao consultar parcelas em calculateRevenueAnalytics:", err);
            return [];
          }),
      ]);

  const paidInvoices = windowInvoices.filter(
    (inv) => inv.status === "PAID" && inv.paidAt && inv.paidAt >= startWindowDate
  );
  const projectedInvoices = windowInvoices.filter(
    (inv) => inv.status !== "CANCELLED" && inv.status !== "DRAFT" && inv.dueDate >= startWindowDate
  );
  const paidInstallments = windowInstallments.filter((inst) => inst.status === "PAID");
  const projectedInstallments = windowInstallments.filter(
    (inst) => inst.status !== "CANCELLED" && inst.scheduledDate >= startWindowDate
  );

  // Agrupamento temporal pelos 12 meses
  const monthlyStats: MonthlyRealizedRevenue[] = monthsList.map((slot) => {
    let realizedAmount = 0;
    let count = 0;
    let projectedAmount = 0;

    for (const inv of paidInvoices) {
      if (inv.paidAt) {
        const sp = getSaoPauloDate(inv.paidAt);
        if (sp.year === slot.year && sp.month === slot.month) {
          realizedAmount += Number(inv.totalAmount);
          count += 1;
        }
      }
    }

    for (const inst of paidInstallments) {
      const pDate = inst.updatedAt || inst.scheduledDate;
      const sp = getSaoPauloDate(pDate);
      if (sp.year === slot.year && sp.month === slot.month) {
        realizedAmount += Number(inst.amount);
        count += 1;
      }
    }

    for (const inv of projectedInvoices) {
      const sp = getSaoPauloDate(inv.dueDate);
      if (sp.year === slot.year && sp.month === slot.month) {
        projectedAmount += Number(inv.totalAmount);
      }
    }

    for (const inst of projectedInstallments) {
      const sp = getSaoPauloDate(inst.scheduledDate);
      if (sp.year === slot.year && sp.month === slot.month) {
        projectedAmount += Number(inst.amount);
      }
    }

    return {
      monthLabel: slot.monthLabel,
      realizedAmount: Number(realizedAmount.toFixed(2)),
      projectedAmount: Number(projectedAmount.toFixed(2)),
      count,
    };
  });

  const totalRealized = Number(
    monthlyStats.reduce((acc, m) => acc + m.realizedAmount, 0).toFixed(2)
  );
  const averageMonthlyRealized = Number(
    (totalRealized / (monthlyStats.length || 1)).toFixed(2)
  );
  const totalCount = monthlyStats.reduce((acc, m) => acc + m.count, 0);

  return {
    monthlyStats,
    totalRealized,
    averageMonthlyRealized,
    totalCount,
  };
}

/**
 * Server Action pública para buscar os dados de receita realizada
 */
export async function getRevenueAnalyticsAction(): Promise<RevenueAnalyticsResult> {
  try {
    await assertAdminUser();
    const result = await calculateRevenueAnalytics();

    return {
      success: true,
      data: result.monthlyStats,
      totalRealized: result.totalRealized,
      averageMonthlyRealized: result.averageMonthlyRealized,
      totalCount: result.totalCount,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    return {
      success: false,
      data: [],
      totalRealized: 0,
      averageMonthlyRealized: 0,
      totalCount: 0,
      error: message,
    };
  }
}
