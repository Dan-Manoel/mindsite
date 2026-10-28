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
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
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
 * Função interna de agregação da receita realizada e projetada nos últimos 12 meses
 */
export async function calculateRevenueAnalytics(): Promise<{
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

  // 1. Faturas com status PAID e paidAt preenchido
  const paidInvoices = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      paidAt: {
        not: null,
        gte: startWindowDate,
      },
    },
    select: {
      id: true,
      invoiceNumber: true,
      totalAmount: true,
      paidAt: true,
      dueDate: true,
    },
  });

  // 2. Parcelas avulsas de contrato com status PAID sem invoice vinculada
  const paidInstallments = await prisma.contractInstallment.findMany({
    where: {
      status: "PAID",
      invoiceItemId: null,
      OR: [
        { updatedAt: { gte: startWindowDate } },
        { scheduledDate: { gte: startWindowDate } },
      ],
    },
    select: {
      id: true,
      amount: true,
      scheduledDate: true,
      updatedAt: true,
    },
  });

  // 3. Faturas projetadas (vencimento na janela temporal)
  const projectedInvoices = await prisma.invoice.findMany({
    where: {
      status: { notIn: ["CANCELLED", "DRAFT"] },
      dueDate: { gte: startWindowDate },
    },
    select: {
      id: true,
      totalAmount: true,
      dueDate: true,
    },
  });

  // 4. Parcelas projetadas (sem invoice vinculada)
  const projectedInstallments = await prisma.contractInstallment.findMany({
    where: {
      status: { not: "CANCELLED" },
      invoiceItemId: null,
      scheduledDate: { gte: startWindowDate },
    },
    select: {
      id: true,
      amount: true,
      scheduledDate: true,
    },
  });

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
