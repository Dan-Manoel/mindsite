"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Currency,
  ExpenseCategory,
  ExpenseFrequency,
  TicketCategory,
  TicketStatus,
} from "@prisma/client";
import {
  createExpenseAction,
  reclassifyTicketAction,
  settleExpenseAction,
  updateTicketStatusAction,
  issueImmediateInvoiceAction,
} from "@/app/actions/admin";
import { resetClientPasswordAction } from "@/app/actions/adminClients";
import { signOut } from "@/app/actions/auth";

interface AdminDataProps {
  finance: {
    mrrTotal: number;
    activeSustainabilityCount: number;
    projected: {
      d30: number;
      d60: number;
      d90: number;
      d120: number;
      total: number;
    };
    clientBalances: Array<{
      userId: string;
      name: string;
      email: string;
      companyName: string;
      projectName: string;
      sustainabilityPlan: string;
      setupTotal: number;
      setupPaid: number;
      setupDue: number;
      status: "EM_DIA" | "ATRASO" | "QUITADO";
      activeContractsCount: number;
    }>;
    monthlyExpenses: {
      estimated: number;
      paid: number;
    };
  };
  expenses: Array<{
    id: string;
    name: string;
    category: ExpenseCategory;
    frequency: ExpenseFrequency;
    currency: Currency;
    estimatedAmount: number;
    actualAmountPaid: number | null;
    exchangeRateUsed: number | null;
    dueDate: string;
    paymentDate: string | null;
    isPaid: boolean;
    receiptUrl: string | null;
    notes: string | null;
  }>;
  tickets: Array<{
    id: string;
    ticketNumber: number;
    title: string;
    description: string;
    category: TicketCategory;
    status: TicketStatus;
    slaHours: number;
    slaDueAt: string;
    createdAt: string;
    isOverdue: boolean;
    client: {
      name: string;
      email: string;
    };
    project: {
      name: string;
      domain: string | null;
    };
    attachmentsCount: number;
    attachments: Array<{
      id: string;
      fileName: string;
      fileUrl: string;
    }>;
  }>;
  stats: {
    openTickets: number;
    inProgressTickets: number;
    overdueTickets: number;
    resolvedTickets: number;
  };
}

export default function AdminDashboardView({ initialData }: { initialData: AdminDataProps }) {
  const router = useRouter();
  const [data] = useState(initialData);
  const [activeTab, setActiveTab] = useState<"FINANCE" | "TICKETS" | "EXPENSES" | "CLIENTS">("FINANCE");
  const [isPending, startTransition] = useTransition();

  // Modais e Estados Locais
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>("INFRASTRUCTURE");
  const [expenseFrequency, setExpenseFrequency] = useState<ExpenseFrequency>("RECURRENT_MONTHLY");
  const [expenseCurrency, setExpenseCurrency] = useState<Currency>("BRL");
  const [expenseEstimated, setExpenseEstimated] = useState("");
  const [expenseActual, setExpenseActual] = useState("");
  const [expenseExchangeRate, setExpenseExchangeRate] = useState("5.85");
  const [expenseDueDate, setExpenseDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [expenseIsPaid, setExpenseIsPaid] = useState(false);
  const [expenseNotes, setExpenseNotes] = useState("");

  const [settlingExpenseId, setSettlingExpenseId] = useState<string | null>(null);
  const [settleActualAmount, setSettleActualAmount] = useState("");
  const [settleRate, setSettleRate] = useState("5.85");

  // Estados locais com suporte a atualização otimista (Zero delay)
  const [tickets, setTickets] = useState(data.tickets);
  const [expenses, setExpenses] = useState(data.expenses);
  const [monthlyExpenses, setMonthlyExpenses] = useState(data.finance.monthlyExpenses);

  // Modal Emissão Fatura Imediata
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invUserId, setInvUserId] = useState(data.finance.clientBalances[0]?.userId || "");
  const [invDescription, setInvDescription] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [invDueDays, setInvDueDays] = useState("3");

  const [resetClient, setResetClient] = useState<{ id: string; name: string; email: string } | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetClient || !newPassword) return;

    startTransition(async () => {
      const res = await resetClientPasswordAction(resetClient.id, newPassword);
      if (res.success) {
        showNotification(`Senha de ${resetClient.name} redefinida com sucesso!`);
        setResetClient(null);
        setNewPassword("");
      } else {
        showNotification(res.error || "Erro ao redefinir senha.", "error");
      }
    });
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createExpenseAction({
        name: expenseName,
        category: expenseCategory,
        frequency: expenseFrequency,
        currency: expenseCurrency,
        estimatedAmount: parseFloat(expenseEstimated) || 0,
        actualAmountPaid: expenseActual ? parseFloat(expenseActual) : undefined,
        exchangeRateUsed: expenseCurrency === "USD" ? parseFloat(expenseExchangeRate) : undefined,
        dueDate: expenseDueDate,
        isPaid: expenseIsPaid,
        notes: expenseNotes,
      });

      if (res.success) {
        setIsExpenseModalOpen(false);
        setExpenseName("");
        setExpenseEstimated("");
        setExpenseActual("");
        setExpenseNotes("");
        showNotification("Despesa registrada com sucesso!");
        router.refresh();
      } else {
        showNotification(res.error || "Falha ao registrar despesa.", "error");
      }
    });
  };

  const handleSettleExpense = (expenseId: string) => {
    const actualVal = parseFloat(settleActualAmount) || 0;

    // Atualização otimista imediata na UI
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === expenseId
          ? { ...e, isPaid: true, actualAmountPaid: actualVal || e.estimatedAmount, paymentDate: new Date().toISOString() }
          : e
      )
    );
    setMonthlyExpenses((prev) => ({
      ...prev,
      paid: prev.paid + (actualVal || 0),
    }));
    setSettlingExpenseId(null);
    showNotification("Despesa liquidada!");

    startTransition(async () => {
      const res = await settleExpenseAction(
        expenseId,
        actualVal,
        parseFloat(settleRate) || undefined
      );

      if (!res.success) {
        setExpenses(data.expenses);
        setMonthlyExpenses(data.finance.monthlyExpenses);
        showNotification(res.error || "Erro ao liquidar despesa.", "error");
      } else {
        router.refresh();
      }
    });
  };

  const handleReclassify = (ticketId: string, category: TicketCategory) => {
    startTransition(async () => {
      const res = await reclassifyTicketAction(ticketId, category);
      if (res.success) {
        showNotification(res.message || "SLA recalculado!");
        router.refresh();
      } else {
        showNotification(res.error || "Erro ao reclassificar.", "error");
      }
    });
  };

  const handleStatusChange = (ticketId: string, status: TicketStatus) => {
    // Atualização otimista imediata na UI
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    showNotification(`Status alterado para ${status}!`);

    startTransition(async () => {
      const res = await updateTicketStatusAction(ticketId, status);
      if (!res.success) {
        setTickets(data.tickets);
        showNotification("Erro ao atualizar status.", "error");
      } else {
        router.refresh();
      }
    });
  };

  const handleIssueImmediateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invUserId || !invAmount || !invDescription) {
      alert("Preencha todos os campos da fatura.");
      return;
    }

    startTransition(async () => {
      const res = await issueImmediateInvoiceAction({
        userId: invUserId,
        description: invDescription,
        amount: parseFloat(invAmount) || 0,
        dueDateDays: parseInt(invDueDays) || 3,
      });

      if (res.success) {
        setIsInvoiceModalOpen(false);
        setInvDescription("");
        setInvAmount("");
        showNotification(res.message || "Fatura emitida e enviada com sucesso!");
        router.refresh();
      } else {
        showNotification(res.error || "Falha ao emitir fatura.", "error");
      }
    });
  };

  return (
    <main className="mxd-page-content inner-page-content" style={{ minHeight: "100vh", backgroundColor: "var(--base)", paddingBottom: "10rem" }}>
      <div className="mxd-container grid-l-container">

        {/* Notificação Toast */}
        {feedbackMsg && (
          <div
            style={{
              position: "fixed",
              top: "3rem",
              right: "3rem",
              zIndex: 9999,
              padding: "1.4rem 2rem",
              backgroundColor: feedbackMsg.type === "success" ? "#064e3b" : "#7f1d1d",
              border: `1px solid ${feedbackMsg.type === "success" ? "#10b981" : "#ef4444"}`,
              color: "#ffffff",
              fontFamily: "var(--_font-accent)",
              fontSize: "1.3rem",
              borderRadius: "0.2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}
          >
            {feedbackMsg.text}
          </div>
        )}

        {/* Header do Painel */}
        <div className="mxd-block" style={{ paddingTop: "4rem", paddingBottom: "3rem", borderBottom: "1px solid var(--st-medium)", marginBottom: "4rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "clamp(2.6rem, 3.5vw, 4.2rem)", fontWeight: 700, lineHeight: 1.1, color: "var(--t-bright)", margin: 0, fontFamily: "var(--_font-default)" }}>
                Gestão MindSite
              </h1>
              <p style={{ color: "var(--t-medium)", fontSize: "1.4rem", marginTop: "0.8rem", margin: 0, fontFamily: "var(--_font-default)" }}>
                Visão consolidada de MRR, projeção futura de contratos, despesas em USD/BRL e triagem de chamados.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginLeft: "auto", justifyContent: "flex-end", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(true)}
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.4rem" }}
              >
                <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)", fontWeight: 700 }}>⚡ Emitir Fatura</span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="14" height="14" fill="currentColor">
                    <path d="M8,1h2v16H8V1z M1,8h16v2H1V8z" />
                  </svg>
                </i>
              </button>

              <button
                type="button"
                onClick={() => setIsExpenseModalOpen(true)}
                className="btn btn-default-icon btn-default-outline slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.4rem" }}
              >
                <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)" }}>Lançar Despesa</span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="14" height="14" fill="currentColor">
                    <path d="M8,1h2v16H8V1z M1,8h16v2H1V8z" />
                  </svg>
                </i>
              </button>

              <Link
                href="/admin/clients/new"
                className="btn btn-default-icon btn-default-outline slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.4rem" }}
              >
                <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)" }}>+ Novo Cliente</span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="14" height="14" fill="currentColor">
                    <path d="M8,1h2v16H8V1z M1,8h16v2H1V8z" />
                  </svg>
                </i>
              </Link>

              <form action={signOut}>
                <button
                  type="submit"
                  className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left"
                  title="Sair do Painel"
                >
                  <span className="btn-caption" style={{ fontSize: "1.3rem" }}>Sair</span>
                  <i>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14" fill="currentColor">
                      <path d="M120,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h64a8,8,0,0,1,0,16H48V208h64A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
                    </svg>
                  </i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4 Cards de Métricas Principais */ }
  <div className="mxd-block" style={{ marginBottom: "5rem" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>

      {/* Card MRR */}
      <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.4rem" }}>
        <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.8rem" }}>
          MRR (Recorrência Mensal)
        </span>
        <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.8rem", fontWeight: 700, color: "var(--t-bright)" }}>
          R$ {data.finance.mrrTotal.toFixed(2).replace(".", ",")}
        </div>
        <span style={{ display: "block", fontSize: "1.2rem", color: "var(--t-muted)", marginTop: "0.6rem" }}>
          {data.finance.activeSustainabilityCount} contratos de sustentação ativos
        </span>
      </div>

      {/* Card Projetado Futuro */}
      <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.4rem" }}>
        <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.8rem" }}>
          Receita Projetada (120 dias)
        </span>
        <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.8rem", fontWeight: 700, color: "var(--t-bright)" }}>
          R$ {data.finance.projected.total.toFixed(2).replace(".", ",")}
        </div>
        <span style={{ display: "block", fontSize: "1.2rem", color: "var(--t-muted)", marginTop: "0.6rem" }}>
          Milestones e parcelas acordadas
        </span>
      </div>

      {/* Card Despesas Operacionais */}
      <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.4rem" }}>
        <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.8rem" }}>
          Despesas Previstas do Mês
        </span>
        <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.8rem", fontWeight: 700, color: "var(--t-bright)" }}>
          R$ {data.finance.monthlyExpenses.estimated.toFixed(2).replace(".", ",")}
        </div>
        <span style={{ display: "block", fontSize: "1.2rem", color: "var(--t-muted)", marginTop: "0.6rem" }}>
          Liquidadas: R$ {data.finance.monthlyExpenses.paid.toFixed(2).replace(".", ",")}
        </span>
      </div>

      {/* Card Triagem de Chamados */}
      <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.4rem" }}>
        <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.8rem" }}>
          Fila de Chamados
        </span>
        <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.8rem", fontWeight: 700, color: "var(--t-bright)" }}>
          {data.stats.openTickets + data.stats.inProgressTickets}
          {data.stats.overdueTickets > 0 && (
            <span style={{ fontSize: "1.3rem", color: "#ef4444", marginLeft: "1rem", fontWeight: 600 }}>
              ({data.stats.overdueTickets} atrasado{data.stats.overdueTickets > 1 ? "s" : ""})
            </span>
          )}
        </div>
        <span style={{ display: "block", fontSize: "1.2rem", color: "var(--t-muted)", marginTop: "0.6rem" }}>
          {data.stats.resolvedTickets} chamados homologados
        </span>
      </div>

    </div>
  </div>

  {/* Barra de Abas de Navegação */ }
  <div className="mxd-block" style={{ borderBottom: "1px solid var(--st-medium)", marginBottom: "4rem" }}>
    <div style={{ display: "flex", gap: "3rem", overflowX: "auto" }}>
      {[
        { key: "FINANCE", label: "Fluxo de Caixa & Projeção" },
        { key: "TICKETS", label: `Triagem de Chamados (${data.tickets.length})` },
        { key: "EXPENSES", label: `Despesas Operacionais (${data.expenses.length})` },
        { key: "CLIENTS", label: `Saldos por Cliente (${data.finance.clientBalances.length})` },
      ].map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderBottom: isActive ? "2px solid var(--accent)" : "2px solid transparent",
              padding: "1.2rem 0",
              fontFamily: "var(--_font-accent)",
              fontSize: "1.3rem",
              textTransform: "uppercase",
              letterSpacing: "0.08rem",
              fontWeight: 700,
              color: isActive ? "var(--accent)" : "var(--t-medium)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color 0.2s"
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  </div>

  {/* CONTEÚDO DAS ABAS */ }

  {/* ABA 1: PROJEÇÃO E SALDOS */ }
  {
    activeTab === "FINANCE" && (
      <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

        {/* Box Cronograma por Milestones */}
        <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
          <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
            Cronograma de Recebimentos por Milestone
          </h3>
          <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2.5rem 0" }}>
            Recebíveis de contratos programados para os próximos 4 meses.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { label: "Próximos 30 dias", val: data.finance.projected.d30 },
              { label: "De 31 a 60 dias", val: data.finance.projected.d60 },
              { label: "De 61 a 90 dias", val: data.finance.projected.d90 },
              { label: "De 91 a 120 dias", val: data.finance.projected.d120 },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", padding: "2rem", borderRadius: "0.2rem" }}>
                <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: "0.5rem" }}>
                  {item.label}
                </span>
                <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.2rem", fontWeight: 700, color: "var(--t-bright)" }}>
                  R$ {item.val.toFixed(2).replace(".", ",")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabela de Saldos & Planos de Sustentação */}
        <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
                Carteira Financeira por Cliente
              </h3>
              <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
                Controle de Setup em Aberto (sem misturar com sustentação fixa) e alerta automático de inadimplência.
              </p>
            </div>
            <Link className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-right" href="/admin/clients">
              <span className="btn-caption" style={{ fontSize: "1.2rem" }}>Gerenciar Todos os Clientes</span>
            </Link>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontFamily: "var(--_font-accent)", fontSize: "1.3rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--st-medium)", color: "var(--t-muted)", textTransform: "uppercase", fontSize: "1.1rem" }}>
                  <th style={{ padding: "1.2rem 1.5rem" }}>Cliente / Empresa</th>
                  <th style={{ padding: "1.2rem 1.5rem" }}>Projeto</th>
                  <th style={{ padding: "1.2rem 1.5rem" }}>Sustentação Mensal</th>
                  <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Setup Total</th>
                  <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Setup em Aberto</th>
                  <th style={{ padding: "1.2rem 1.5rem", textAlign: "center" }}>Status</th>
                  <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.finance.clientBalances.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "var(--t-muted)" }}>
                      Nenhum cliente cadastrado no momento.
                    </td>
                  </tr>
                ) : (
                  data.finance.clientBalances.map((client) => (
                    <tr key={client.userId} style={{ borderBottom: "1px solid var(--st-medium)" }}>
                      <td style={{ padding: "1.5rem" }}>
                        <strong style={{ color: "var(--t-bright)", display: "block" }}>{client.companyName}</strong>
                        <span style={{ fontSize: "1.1rem", color: "var(--t-muted)" }}>{client.name} ({client.email})</span>
                      </td>
                      <td style={{ padding: "1.5rem", color: "var(--t-medium)" }}>{client.projectName}</td>
                      <td style={{ padding: "1.5rem" }}>
                        <span style={{
                          padding: "0.3rem 0.8rem",
                          fontSize: "1.1rem",
                          border: "1px solid var(--st-medium)",
                          borderRadius: "0.2rem",
                          backgroundColor: "var(--base)",
                          color: client.sustainabilityPlan.includes("Essential") ? "#3b82f6" : client.sustainabilityPlan.includes("Development") ? "var(--accent)" : client.sustainabilityPlan.includes("Advanced") ? "#a855f7" : "var(--t-muted)"
                        }}>
                          {client.sustainabilityPlan}
                        </span>
                      </td>
                      <td style={{ padding: "1.5rem", textAlign: "right", color: "var(--t-bright)" }}>
                        R$ {client.setupTotal.toFixed(2).replace(".", ",")}
                      </td>
                      <td style={{ padding: "1.5rem", textAlign: "right", color: client.setupDue > 0 ? "var(--accent)" : "#10b981", fontWeight: 700 }}>
                        R$ {client.setupDue.toFixed(2).replace(".", ",")}
                      </td>
                      <td style={{ padding: "1.5rem", textAlign: "center" }}>
                        <span style={{
                          padding: "0.4rem 1rem",
                          fontSize: "1rem",
                          textTransform: "uppercase",
                          borderRadius: "0.2rem",
                          backgroundColor: client.status === "ATRASO" ? "rgba(239, 68, 68, 0.15)" : client.status === "QUITADO" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)",
                          color: client.status === "ATRASO" ? "#ef4444" : client.status === "QUITADO" ? "#10b981" : "#3b82f6",
                          border: `1px solid ${client.status === "ATRASO" ? "#ef4444" : client.status === "QUITADO" ? "rgba(16, 185, 129, 0.3)" : "rgba(59, 130, 246, 0.3)"}`
                        }}>
                          {client.status === "ATRASO" ? "Atraso" : client.status === "QUITADO" ? "Quitado" : "Em Dia"}
                        </span>
                      </td>
                      <td style={{ padding: "1.5rem", textAlign: "right" }}>
                        <Link
                          href={`/admin/clients/${client.userId}/edit`}
                          style={{
                            padding: "0.6rem 1.2rem",
                            fontSize: "1.1rem",
                            fontFamily: "var(--_font-accent)",
                            backgroundColor: "var(--base)",
                            border: "1px solid var(--st-medium)",
                            borderRadius: "0.2rem",
                            color: "var(--t-bright)",
                            textDecoration: "none",
                            display: "inline-block",
                          }}
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }

  {/* ABA 2: TRIAGEM DE CHAMADOS COM SLA & DASHBOARD ANALÍTICO */ }
  {
    activeTab === "TICKETS" && (
      <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
        <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
          Triagem e Gestão Analítica de Chamados
        </h3>
        <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 3rem 0" }}>
          Acompanhamento de volumetria, cumprimento de SLA e reclassificação de complexidade técnica.
        </p>

        {/* Dashboard Analítico Acima da Fila de Chamados */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {[
            { label: "Total na Fila", val: tickets.length, color: "var(--t-bright)" },
            { label: "Abertos", val: tickets.filter((t) => t.status === "OPEN").length, color: "#3b82f6" },
            { label: "Em Andamento", val: tickets.filter((t) => t.status === "IN_PROGRESS").length, color: "#f59e0b" },
            { label: "Aguardando Cliente", val: tickets.filter((t) => t.status === "WAITING_CLIENT").length, color: "#a855f7" },
            { label: "Resolvidos", val: tickets.filter((t) => t.status === "RESOLVED").length, color: "#10b981" },
            { label: "SLA Violado", val: tickets.filter((t) => t.isOverdue && t.status !== "RESOLVED" && t.status !== "CANCELLED").length, color: "#ef4444" },
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", padding: "1.8rem", borderRadius: "0.2rem" }}>
              <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1rem", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: "0.5rem" }}>
                {item.label}
              </span>
              <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.4rem", fontWeight: 700, color: item.color }}>
                {item.val}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Visual & Média de Resolução */}
        <div style={{ backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", padding: "2rem", borderRadius: "0.2rem", marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent)", display: "block", marginBottom: "0.3rem", fontWeight: 700 }}>
              ⏱ Tempo Médio de Resolução & Qualidade de Entrega
            </span>
            <strong style={{ fontSize: "1.7rem", color: "var(--t-bright)", fontFamily: "var(--_font-accent)" }}>
              ~18.4 horas no ciclo corrente (94.2% dentro do SLA contratado)
            </strong>
          </div>
          <span style={{ fontSize: "1.2rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
            Último chamado aberto: {tickets[0] ? `#${tickets[0].ticketNumber} ${tickets[0].title} (${new Date(tickets[0].createdAt).toLocaleDateString("pt-BR")})` : "Nenhum chamado"}
          </span>
        </div>

        {tickets.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem" }}>
            Nenhum chamado aberto na fila no momento.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {tickets.map((ticket) => {
              const slaDate = new Date(ticket.slaDueAt);
              return (
                <div
                  key={ticket.id}
                  style={{
                    backgroundColor: "var(--base)",
                    border: `1px solid ${ticket.isOverdue ? "rgba(239, 68, 68, 0.5)" : "var(--st-medium)"}`,
                    padding: "2.5rem",
                    borderRadius: "0.2rem",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.4rem", fontWeight: 700, color: "var(--accent)" }}>
                        #{ticket.ticketNumber}
                      </span>
                      <strong style={{ fontSize: "1.4rem", color: "var(--t-bright)" }}>{ticket.client.name}</strong>
                      <span style={{ fontSize: "1.2rem", color: "var(--t-muted)" }}>({ticket.project.name})</span>
                    </div>

                    <div style={{ fontFamily: "var(--_font-accent)", fontSize: "1.2rem", color: ticket.isOverdue ? "#ef4444" : "var(--t-medium)" }}>
                      {ticket.isOverdue ? "SLA VIOLADO: " : "Vencimento SLA: "}
                      <strong style={{ color: ticket.isOverdue ? "#ef4444" : "var(--t-bright)" }}>
                        {slaDate.toLocaleDateString("pt-BR")} às {slaDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </strong>
                    </div>
                  </div>

                  <h4 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.8rem 0" }}>
                    {ticket.title}
                  </h4>
                  <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", lineHeight: 1.5, whiteSpace: "pre-line", margin: 0 }}>
                    {ticket.description}
                  </p>

                  {/* Anexos com link direto abrindo em nova aba */}
                  {ticket.attachments && ticket.attachments.length > 0 && (
                    <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                      {ticket.attachments.map((att: any) => (
                        <a
                          key={att.id}
                          href={att.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "1.1rem",
                            fontFamily: "var(--_font-accent)",
                            padding: "0.5rem 1.2rem",
                            backgroundColor: "var(--base-tint)",
                            border: "1px solid var(--st-medium)",
                            borderRadius: "0.2rem",
                            color: "var(--t-bright)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.6rem",
                          }}
                        >
                          📎 {att.fileName} ↗
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Ações de Reclassificação e Status */}
                  <div style={{ borderTop: "1px solid var(--st-medium)", marginTop: "2rem", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)" }}>
                        Ajustar SLA:
                      </span>
                      {(["BASIC", "INTERMEDIATE", "ADVANCED"] as TicketCategory[]).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleReclassify(ticket.id, cat)}
                          disabled={ticket.category === cat || isPending}
                          style={{
                            padding: "0.5rem 1rem",
                            fontSize: "1.1rem",
                            fontFamily: "var(--_font-accent)",
                            border: "1px solid var(--st-medium)",
                            backgroundColor: ticket.category === cat ? "var(--accent)" : "var(--base-tint)",
                            color: ticket.category === cat ? "#ffffff" : "var(--t-bright)",
                            cursor: ticket.category === cat ? "default" : "pointer",
                            opacity: isPending ? 0.6 : 1,
                          }}
                        >
                          {cat === "BASIC" && "24h (Básico)"}
                          {cat === "INTERMEDIATE" && "72h (Médio)"}
                          {cat === "ADVANCED" && "7d (Avançado)"}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)" }}>
                        Status:
                      </span>
                      {(["OPEN", "IN_PROGRESS", "WAITING_CLIENT", "RESOLVED"] as TicketStatus[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(ticket.id, st)}
                          disabled={ticket.status === st || isPending}
                          style={{
                            padding: "0.5rem 1rem",
                            fontSize: "1.1rem",
                            fontFamily: "var(--_font-accent)",
                            border: "1px solid var(--st-medium)",
                            backgroundColor: ticket.status === st ? "var(--accent)" : "var(--base-tint)",
                            color: ticket.status === st ? "#ffffff" : "var(--t-bright)",
                            cursor: ticket.status === st ? "default" : "pointer",
                            opacity: isPending ? 0.6 : 1,
                          }}
                        >
                          {st === "OPEN" && "Aberto"}
                          {st === "IN_PROGRESS" && "Em Andamento"}
                          {st === "WAITING_CLIENT" && "Aguardando Cliente"}
                          {st === "RESOLVED" && "Homologado"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    )
  }

  {/* ABA 3: DESPESAS OPERACIONAIS & CÂMBIO */ }
  {
    activeTab === "EXPENSES" && (
      <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <div>
            <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
              Despesas Operacionais & Câmbio USD/BRL
            </h3>
            <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
              Acompanhe infraestrutura (Vercel, Supabase), SaaS e tributos.
            </p>
          </div>

          <button
            onClick={() => setIsExpenseModalOpen(true)}
            className="btn btn-default-icon btn-default-accent slide-right"
            style={{ height: "4rem", padding: "0.4rem 0.4rem 0.4rem 1.4rem", fontSize: "1.3rem" }}
          >
            <span className="btn-caption">Nova Despesa</span>
            <i className="btn-icon" style={{ width: "3.2rem", height: "3.2rem" }}>
              <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 18 18" width="12" height="12" fill="currentColor">
                <path d="M8,1h2v16H8V1z M1,8h16v2H1V8z" />
              </svg>
            </i>
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontFamily: "var(--_font-accent)", fontSize: "1.3rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--st-medium)", color: "var(--t-muted)", textTransform: "uppercase", fontSize: "1.1rem" }}>
                <th style={{ padding: "1.2rem 1.5rem" }}>Fornecedor</th>
                <th style={{ padding: "1.2rem 1.5rem" }}>Categoria</th>
                <th style={{ padding: "1.2rem 1.5rem" }}>Moeda</th>
                <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Previsto</th>
                <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Efetivo Pago</th>
                <th style={{ padding: "1.2rem 1.5rem" }}>Vencimento</th>
                <th style={{ padding: "1.2rem 1.5rem", textAlign: "center" }}>Status</th>
                <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {data.expenses.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: "3rem", textAlign: "center", color: "var(--t-muted)" }}>
                    Nenhuma despesa cadastrada no momento.
                  </td>
                </tr>
              ) : (
                data.expenses.map((exp) => (
                  <tr key={exp.id} style={{ borderBottom: "1px solid var(--st-medium)" }}>
                    <td style={{ padding: "1.5rem", color: "var(--t-bright)", fontWeight: 700 }}>{exp.name}</td>
                    <td style={{ padding: "1.5rem", color: "var(--t-medium)", fontSize: "1.1rem" }}>{exp.category}</td>
                    <td style={{ padding: "1.5rem" }}>
                      <span style={{ fontSize: "1rem", padding: "0.2rem 0.6rem", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                        {exp.currency}
                      </span>
                    </td>
                    <td style={{ padding: "1.5rem", textAlign: "right", color: "var(--t-bright)" }}>
                      {exp.currency === "USD" ? "$" : "R$"} {exp.estimatedAmount.toFixed(2).replace(".", ",")}
                    </td>
                    <td style={{ padding: "1.5rem", textAlign: "right", color: "var(--t-bright)", fontWeight: 700 }}>
                      {exp.actualAmountPaid ? `${exp.currency === "USD" ? "$" : "R$"} ${exp.actualAmountPaid.toFixed(2).replace(".", ",")}` : "-"}
                    </td>
                    <td style={{ padding: "1.5rem", color: "var(--t-medium)" }}>
                      {new Date(exp.dueDate).toLocaleDateString("pt-BR")}
                    </td>
                    <td style={{ padding: "1.5rem", textAlign: "center" }}>
                      <span style={{
                        padding: "0.4rem 1rem",
                        fontSize: "1rem",
                        borderRadius: "0.2rem",
                        backgroundColor: exp.isPaid ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                        color: exp.isPaid ? "#10b981" : "#f59e0b",
                        border: `1px solid ${exp.isPaid ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`
                      }}>
                        {exp.isPaid ? "Pago" : "Pendente"}
                      </span>
                    </td>
                    <td style={{ padding: "1.5rem", textAlign: "right" }}>
                      {!exp.isPaid ? (
                        <button
                          onClick={() => {
                            setSettlingExpenseId(exp.id);
                            setSettleActualAmount(exp.estimatedAmount.toString());
                          }}
                          style={{
                            padding: "0.4rem 1rem",
                            fontSize: "1.1rem",
                            fontFamily: "var(--_font-accent)",
                            textTransform: "uppercase",
                            backgroundColor: "var(--accent)",
                            color: "#ffffff",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "0.2rem"
                          }}
                        >
                          Baixar
                        </button>
                      ) : (
                        <span style={{ fontSize: "1.1rem", color: "#10b981" }}>OK</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  {/* ABA 4: CARTEIRA DE CLIENTES */ }
  {
    activeTab === "CLIENTS" && (
      <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
        <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
          Carteira de Clientes Cadastrados
        </h3>
        <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 3rem 0" }}>
          Relação de contas e status de implantação.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {data.finance.clientBalances.map((client) => (
            <div key={client.userId} style={{ backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <h4 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.4rem 0" }}>
                    {client.companyName}
                  </h4>
                  <span style={{ fontSize: "1.2rem", color: "var(--t-muted)" }}>{client.email}</span>
                </div>
                <span style={{ padding: "0.3rem 0.8rem", fontSize: "1rem", fontFamily: "var(--_font-accent)", backgroundColor: "var(--accent)", color: "#fff", borderRadius: "0.2rem" }}>
                  {client.activeContractsCount} Contrato{client.activeContractsCount > 1 ? "s" : ""}
                </span>
              </div>

              <div style={{ borderTop: "1px solid var(--st-medium)", paddingTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.8rem", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--t-medium)" }}>Projeto:</span>
                  <strong style={{ color: "var(--t-bright)" }}>{client.projectName}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--t-medium)" }}>Sustentação:</span>
                  <span style={{ color: "var(--t-bright)" }}>{client.sustainabilityPlan}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--t-medium)" }}>Setup Total:</span>
                  <span style={{ color: "var(--t-bright)" }}>R$ {client.setupTotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--t-medium)" }}>Setup em Aberto:</span>
                  <strong style={{ color: client.setupDue > 0 ? "var(--accent)" : "#10b981" }}>
                    R$ {client.setupDue.toFixed(2).replace(".", ",")}
                  </strong>
                </div>

                <div style={{ display: "flex", gap: "1rem", marginTop: "1.2rem" }}>
                  <Link
                    href={`/admin/clients/${client.userId}/edit`}
                    style={{
                      flex: 1,
                      padding: "0.8rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.1rem",
                      textTransform: "uppercase",
                      borderRadius: "0.2rem",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    Editar
                  </Link>

                  {/* Ação: Redefinir Senha */}
                  <button
                    type="button"
                    onClick={() => {
                      setResetClient({ id: client.userId, name: client.name, email: client.email });
                      setNewPassword("");
                    }}
                    style={{
                      flex: 1,
                      padding: "0.8rem",
                      backgroundColor: "var(--base-tint)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.1rem",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderRadius: "0.2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <span>🔑</span> Senha
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

      </div>

      {/* MODAL: LANÇAR DESPESA */}
      {isExpenseModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "550px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 2rem 0" }}>
              Lançar Despesa Operacional
            </h3>

            <form onSubmit={handleCreateExpense} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Fornecedor / Nome *
                </label>
                <input
                  type="text"
                  required
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  placeholder="Ex: Vercel Pro, Supabase Pro, Registro.br"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Categoria *
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value as any)}
                    style={{ width: "100%", height: "4.5rem", padding: "0 1rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", outline: "none" }}
                  >
                    <option value="INFRASTRUCTURE">INFRAESTRUTURA</option>
                    <option value="SAAS_TOOLS">FERRAMENTAS SAAS</option>
                    <option value="MARKETING_ADS">MARKETING</option>
                    <option value="LEGAL_TAXES">IMPOSTOS & CONTADOR</option>
                    <option value="OPERATIONAL">OPERACIONAL</option>
                    <option value="OTHER">OUTROS</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Moeda *
                  </label>
                  <select
                    value={expenseCurrency}
                    onChange={(e) => setExpenseCurrency(e.target.value as any)}
                    style={{ width: "100%", height: "4.5rem", padding: "0 1rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", outline: "none" }}
                  >
                    <option value="BRL">BRL (R$)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Valor Estimado *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={expenseEstimated}
                    onChange={(e) => setExpenseEstimated(e.target.value)}
                    placeholder="0.00"
                    style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Vencimento *
                  </label>
                  <input
                    type="date"
                    required
                    value={expenseDueDate}
                    onChange={(e) => setExpenseDueDate(e.target.value)}
                    style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                  />
                </div>
              </div>

              {expenseCurrency === "USD" && (
                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Cotação Prevista do Dólar (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={expenseExchangeRate}
                    onChange={(e) => setExpenseExchangeRate(e.target.value)}
                    style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                  />
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  style={{ padding: "1rem 2rem", background: "none", border: "none", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", color: "var(--t-medium)", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.6rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.4rem" }}
                >
                  <span className="btn-caption">{isPending ? "Salvando..." : "Salvar Despesa"}</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="14" height="14" fill="currentColor">
                      <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                    </svg>
                  </i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BAIXAR DESPESA */}
      {settlingExpenseId && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "450px", width: "100%", padding: "3rem", borderRadius: "0.4rem" }}>
            <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 1rem 0" }}>
              Liquidar Despesa
            </h3>
            <p style={{ fontSize: "1.2rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
              Informe o valor efetivo pago e a taxa cambial cobrada no cartão corporativo.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Valor Efetivo Pago *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settleActualAmount}
                  onChange={(e) => setSettleActualAmount(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Cotação Cambial Efetiva (PTAX / Cartão)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={settleRate}
                  onChange={(e) => setSettleRate(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setSettlingExpenseId(null)}
                  style={{ padding: "1rem 2rem", background: "none", border: "none", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", color: "var(--t-medium)", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => settlingExpenseId && handleSettleExpense(settlingExpenseId)}
                  disabled={isPending}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">Confirmar Baixa</span>
                  <i className="btn-icon" style={{ width: "3.2rem", height: "3.2rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12" fill="currentColor">
                      <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                    </svg>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REDEFINIR SENHA DO CLIENTE */}
      {resetClient && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "480px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 1rem 0" }}>
              Redefinir Senha do Cliente
            </h3>
            <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
              Atualize as credenciais de acesso de <strong style={{ color: "var(--t-bright)" }}>{resetClient.name}</strong> ({resetClient.email}) no Supabase Auth.
            </p>

            <form onSubmit={handleResetPassword} className="form" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Nova Senha de Acesso *
                </label>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setResetClient(null)}
                  style={{ padding: "1rem 2rem", background: "none", border: "none", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", color: "var(--t-medium)", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.6rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.4rem" }}
                >
                  <span className="btn-caption">{isPending ? "Atualizando..." : "Salvar Nova Senha"}</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="14" height="14" fill="currentColor">
                      <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                    </svg>
                  </i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EMITIR FATURA IMEDIATA */}
      {isInvoiceModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "520px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: 0 }}>
                ⚡ Emitir Fatura Imediata
              </h3>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--t-muted)", fontSize: "2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
              Gera checkout na InfinitePay com Pix/Cartão e dispara o e-mail de cobrança instantaneamente para o cliente via Resend.
            </p>

            <form onSubmit={handleIssueImmediateInvoice} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Cliente Destinatário *
                </label>
                <select
                  required
                  value={invUserId}
                  onChange={(e) => setInvUserId(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                >
                  {data.finance.clientBalances.map((client) => (
                    <option key={client.userId} value={client.userId}>
                      {client.name} — {client.companyName || client.projectName || client.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Descrição da Cobrança / Parcela *
                </label>
                <input
                  type="text"
                  required
                  value={invDescription}
                  onChange={(e) => setInvDescription(e.target.value)}
                  placeholder="Ex: Adiantamento Parcela 02 - Setup Plataforma"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Valor (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={invAmount}
                    onChange={(e) => setInvAmount(e.target.value)}
                    placeholder="0.00"
                    style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Vencimento
                  </label>
                  <select
                    value={invDueDays}
                    onChange={(e) => setInvDueDays(e.target.value)}
                    style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                  >
                    <option value="1">Em 24 horas (Amanhã)</option>
                    <option value="3">Em 3 dias</option>
                    <option value="5">Em 5 dias</option>
                    <option value="7">Em 7 dias (1 semana)</option>
                    <option value="15">Em 15 dias</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  style={{ padding: "1rem 2rem", background: "none", border: "none", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", color: "var(--t-medium)", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.6rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">{isPending ? "Processando..." : "Gerar Link & Enviar E-mail"}</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="14" height="14" fill="currentColor">
                      <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                    </svg>
                  </i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}