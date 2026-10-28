"use client";

import { useState, useTransition, useMemo } from "react";
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
  addTicketCommentAction,
  createTicketForClientAction,
  uploadExpenseReceiptAction,
  getAttachmentSignedUrlAction,
} from "@/app/actions/admin";
import { resetClientPasswordAction } from "@/app/actions/adminClients";
import { setTicketAwaitingClientAction } from "@/app/actions/tickets";
import { signOut } from "@/app/actions/auth";

export interface AdminDataProps {
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
    projection12Months?: Array<{
      monthKey: string;
      monthLabel: string;
      mrr: number;
      milestones: number;
      total: number;
    }>;
    total12MonthsProjected?: number;
    expensesComparison?: Array<{
      monthKey: string;
      monthLabel: string;
      projected: number;
      actual: number;
    }>;
    clientBalances: Array<{
      userId: string;
      name: string;
      email: string;
      phone?: string;
      companyName: string;
      document?: string;
      projectName: string;
      projects?: Array<{
        id: string;
        name: string;
        domain?: string | null;
        isActive: boolean;
        contracts: Array<{
          id: string;
          title: string;
          contractType: string;
          status: string;
          totalAmount: number;
          paidAmount: number;
        }>;
      }>;
      sustainabilityPlan: string;
      sustainabilityDetails?: {
        contractId: string;
        planName: string;
        monthlyAmount: number;
      } | null;
      pendingInstallments?: Array<{
        id: string;
        installmentNumber: number;
        description: string;
        amount: number;
        scheduledDate: string;
        projectName: string;
      }>;
      setupTotal: number;
      setupPaid: number;
      setupDue: number;
      status: "EM_DIA" | "ATRASO" | "QUITADO";
      activeContractsCount: number;
      ticketsCount?: number;
      invoicesCount?: number;
    }>;
    monthlyExpenses: {
      estimated: number;
      paid: number;
    };
  };
  operationalMetrics?: {
    overdueInvoices: {
      count: number;
      totalAmount: number;
    };
    planDistribution: {
      essential: number;
      development: number;
      advanced: number;
      custom: number;
      total: number;
    };
    ticketSummary: {
      open: number;
      inProgress: number;
      waitingClient: number;
      resolved: number;
      overdue: number;
      total: number;
    };
  };
  clientOptions?: Array<{
    id: string;
    name: string;
    companyName: string;
    email: string;
    document: string;
    projects: Array<{
      id: string;
      name: string;
      domain?: string | null;
    }>;
  }>;
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
    comments?: Array<{
      id: string;
      message: string;
      authorName: string;
      isAdmin: boolean;
      attachments?: string[];
      createdAt: string;
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
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "FINANCE" | "TICKETS" | "EXPENSES" | "CLIENTS">("OVERVIEW");
  const [isPending, startTransition] = useTransition();

  // Estados locais com suporte a atualização otimista (Zero delay)
  const [tickets, setTickets] = useState(data.tickets);
  const [expenses, setExpenses] = useState(data.expenses);

  // Filtros de Despesas
  const [expensePeriodFilter, setExpensePeriodFilter] = useState<string>("ALL");
  const [expenseStatusFilter, setExpenseStatusFilter] = useState<"ALL" | "PENDING" | "PAID">("ALL");

  // Filtros de Carteira de Clientes
  const [clientSearchTerm, setClientSearchTerm] = useState("");

  // Modais de Despesas
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>("INFRASTRUCTURE");
  const expenseFrequency: ExpenseFrequency = "RECURRENT_MONTHLY";
  const [expenseCurrency, setExpenseCurrency] = useState<Currency>("BRL");
  const [expenseEstimated, setExpenseEstimated] = useState("");
  const [expenseActual, setExpenseActual] = useState("");
  const [expenseExchangeRate, setExpenseExchangeRate] = useState("5.85");
  const [expenseDueDate, setExpenseDueDate] = useState(new Date().toISOString().split("T")[0]);
  const expenseIsPaid = false;
  const [expenseNotes, setExpenseNotes] = useState("");

  // Modal: Baixar Despesa
  const [settlingExpenseId, setSettlingExpenseId] = useState<string | null>(null);
  const [settleActualAmount, setSettleActualAmount] = useState("");
  const [settlePaymentDate, setSettlePaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [settleReceiptFile, setSettleReceiptFile] = useState<File | null>(null);
  const [isUploadingReceipt, setIsUploadingReceipt] = useState(false);

  // Modal: Abertura Administrativa de Chamado
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [ticketClientId, setTicketClientId] = useState("");
  const [ticketClientQuery, setTicketClientQuery] = useState("");
  const [ticketProjectId, setTicketProjectId] = useState("");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketCategory, setTicketCategory] = useState<TicketCategory>("BASIC");
  const [ticketDescription, setTicketDescription] = useState("");

  // Modal Emissão Fatura Contextual por Cliente
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedClientForInvoice, setSelectedClientForInvoice] = useState<AdminDataProps["finance"]["clientBalances"][0] | null>(null);
  const [includeSustainability, setIncludeSustainability] = useState(true);
  const [selectedInstallmentIds, setSelectedInstallmentIds] = useState<string[]>([]);
  const [extraDescription, setExtraDescription] = useState("");
  const [extraAmount, setExtraAmount] = useState("");
  const [invDueDateOption, setInvDueDateOption] = useState<"TODAY" | "24H" | "3D" | "5D">("3D");

  // Thread de Comentários nos Chamados
  const [ticketCommentInputs, setTicketCommentInputs] = useState<{ [ticketId: string]: string }>({});
  const [openingAttachmentId, setOpeningAttachmentId] = useState<string | null>(null);

  // Modal: Redefinir Senha do Cliente
  const [resetClient, setResetClient] = useState<{ id: string; name: string; email: string } | null>(null);
  const [newPassword, setNewPassword] = useState("");

  // Modal: Concluir Atendimento e Solicitar Homologação (Aguardando Aceite)
  const [resolveTicket, setResolveTicket] = useState<{ id: string; ticketNumber: number; title: string } | null>(null);
  const [resolveMessage, setResolveMessage] = useState("");
  const [resolveFiles, setResolveFiles] = useState<File[]>([]);
  const [isResolving, setIsResolving] = useState(false);

  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  // ----------------------------------------------------
  // COMPUTED: Métricas Operacionais & Filtros
  // ----------------------------------------------------
  // Despesas em atraso de meses anteriores
  const overdueExpensesPastMonths = useMemo(() => {
    const now = new Date();
    return expenses.filter((e) => {
      if (e.isPaid) return false;
      const due = new Date(e.dueDate);
      return due < now && (due.getMonth() < now.getMonth() || due.getFullYear() < now.getFullYear());
    });
  }, [expenses]);

  const totalOverdueExpensesAmount = useMemo(() => {
    return overdueExpensesPastMonths.reduce((acc, curr) => acc + curr.estimatedAmount, 0);
  }, [overdueExpensesPastMonths]);

  // Lista de meses disponíveis nas despesas para filtro rápido
  const availableExpensePeriods = useMemo(() => {
    const set = new Set<string>();
    expenses.forEach((e) => {
      const d = new Date(e.dueDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      set.add(key);
    });
    return Array.from(set).sort();
  }, [expenses]);

  // Despesas filtradas por período e status
  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (expensePeriodFilter !== "ALL") {
        const d = new Date(e.dueDate);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (key !== expensePeriodFilter) return false;
      }
      if (expenseStatusFilter === "PENDING" && e.isPaid) return false;
      if (expenseStatusFilter === "PAID" && !e.isPaid) return false;
      return true;
    });
  }, [expenses, expensePeriodFilter, expenseStatusFilter]);

  // Clientes filtrados na aba "Carteira de Clientes"
  const filteredClients = useMemo(() => {
    if (!clientSearchTerm.trim()) return data.finance.clientBalances;
    const term = clientSearchTerm.toLowerCase();
    return data.finance.clientBalances.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.companyName.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        (c.document && c.document.toLowerCase().includes(term)) ||
        c.projectName.toLowerCase().includes(term) ||
        c.sustainabilityPlan.toLowerCase().includes(term)
    );
  }, [data.finance.clientBalances, clientSearchTerm]);

  // Cliente selecionado no combobox de abertura de chamado
  const selectedClientForTicket = useMemo(() => {
    if (!ticketClientId || !data.clientOptions) return null;
    return data.clientOptions.find((c) => c.id === ticketClientId) || null;
  }, [ticketClientId, data.clientOptions]);

  // Lista de opções de clientes filtrados para combobox
  const comboboxClientResults = useMemo(() => {
    if (!data.clientOptions) return [];
    if (!ticketClientQuery.trim()) return data.clientOptions.slice(0, 10);
    const q = ticketClientQuery.toLowerCase().trim();
    return data.clientOptions.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.companyName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.document.toLowerCase().includes(q)
    );
  }, [data.clientOptions, ticketClientQuery]);

  // ----------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------
  const handleOpenAttachment = async (attachmentIdOrUrl: string, _fileName?: string) => {
    try {
      setOpeningAttachmentId(attachmentIdOrUrl);
      const res = await getAttachmentSignedUrlAction(attachmentIdOrUrl);
      if (!res.success || !res.signedUrl) {
        showNotification(res.error || "Não foi possível gerar link seguro para o anexo.", "error");
        return;
      }
      window.open(res.signedUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Erro ao abrir anexo:", err);
      showNotification("Falha ao abrir o anexo.", "error");
    } finally {
      setOpeningAttachmentId(null);
    }
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
    const estVal = parseFloat(expenseEstimated) || 0;
    const exName = expenseName.trim();

    startTransition(async () => {
      const res = await createExpenseAction({
        name: exName,
        category: expenseCategory,
        frequency: expenseFrequency,
        currency: expenseCurrency,
        estimatedAmount: estVal,
        actualAmountPaid: expenseActual ? parseFloat(expenseActual) : undefined,
        exchangeRateUsed: expenseCurrency === "USD" ? parseFloat(expenseExchangeRate) : undefined,
        dueDate: expenseDueDate,
        isPaid: expenseIsPaid,
        notes: expenseNotes,
      });

      if (res.success) {
        // Atualização otimista imediata
        setExpenses((prev) => [
          {
            id: res.expenseId || `temp-${Date.now()}`,
            name: exName,
            category: expenseCategory,
            frequency: expenseFrequency,
            currency: expenseCurrency,
            estimatedAmount: estVal,
            actualAmountPaid: null,
            exchangeRateUsed: null,
            dueDate: new Date(expenseDueDate).toISOString(),
            paymentDate: null,
            isPaid: false,
            receiptUrl: null,
            notes: expenseNotes,
          },
          ...prev,
        ]);

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

  const handleSettleExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settlingExpenseId) return;

    const actualVal = parseFloat(settleActualAmount) || 0;
    let receiptUrl: string | undefined = undefined;

    setIsUploadingReceipt(true);

    try {
      if (settleReceiptFile) {
        const formData = new FormData();
        formData.append("file", settleReceiptFile);
        const upRes = await uploadExpenseReceiptAction(formData);
        if (upRes.success && upRes.publicUrl) {
          receiptUrl = upRes.publicUrl;
        } else {
          showNotification(upRes.error || "Falha no envio do comprovante. Continuando...", "error");
        }
      }

      // Atualização otimista imediata na tabela
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === settlingExpenseId
            ? {
                ...exp,
                isPaid: true,
                actualAmountPaid: actualVal,
                paymentDate: new Date(settlePaymentDate).toISOString(),
                receiptUrl: receiptUrl || exp.receiptUrl,
              }
            : exp
        )
      );

      const res = await settleExpenseAction(
        settlingExpenseId,
        actualVal,
        settlePaymentDate,
        receiptUrl
      );

      if (res.success) {
        showNotification("Despesa baixada com sucesso!");
        setSettlingExpenseId(null);
        setSettleActualAmount("");
        setSettleReceiptFile(null);
        router.refresh();
      } else {
        showNotification(res.error || "Erro ao liquidar despesa.", "error");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro na operação";
      showNotification(msg, "error");
    } finally {
      setIsUploadingReceipt(false);
    }
  };

  const handleCreateTicketForClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketClientId || !ticketProjectId || !ticketTitle.trim() || !ticketDescription.trim()) {
      showNotification("Preencha todos os campos obrigatórios.", "error");
      return;
    }

    startTransition(async () => {
      const res = await createTicketForClientAction({
        clientId: ticketClientId,
        projectId: ticketProjectId,
        title: ticketTitle,
        category: ticketCategory,
        description: ticketDescription,
      });

      if (res.success) {
        showNotification("Chamado aberto com sucesso e cliente notificado por e-mail!");
        setIsNewTicketModalOpen(false);
        setTicketClientId("");
        setTicketClientQuery("");
        setTicketProjectId("");
        setTicketTitle("");
        setTicketDescription("");
        router.refresh();
      } else {
        showNotification(res.error || "Erro ao criar chamado.", "error");
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

  const handleConfirmResolveTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolveTicket) return;
    if (!resolveMessage.trim()) {
      showNotification("Descreva a solução aplicada e evidências para que o cliente valide.", "error");
      return;
    }

    setIsResolving(true);
    try {
      const formData = new FormData();
      formData.append("ticketId", resolveTicket.id);
      formData.append("message", resolveMessage.trim());
      for (const file of resolveFiles) {
        formData.append("files", file);
      }

      const res = await setTicketAwaitingClientAction(formData);
      if (res.success) {
        showNotification(`Chamado #${resolveTicket.ticketNumber} concluído e enviado para homologação com sucesso!`);
        setTickets((prev) =>
          prev.map((t) => (t.id === resolveTicket.id ? { ...t, status: "WAITING_CLIENT" } : t))
        );
        setResolveTicket(null);
        setResolveMessage("");
        setResolveFiles([]);
        router.refresh();
      } else {
        showNotification(res.error || "Erro ao solicitar homologação.", "error");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Falha na solicitação de homologação.";
      showNotification(msg, "error");
    } finally {
      setIsResolving(false);
    }
  };

  const openInvoiceModalForClient = (client: AdminDataProps["finance"]["clientBalances"][0]) => {
    setSelectedClientForInvoice(client);
    setIncludeSustainability(Boolean(client.sustainabilityDetails));
    setSelectedInstallmentIds(client.pendingInstallments?.map((inst) => inst.id) || []);
    setExtraDescription("");
    setExtraAmount("");
    setInvDueDateOption("3D");
    setIsInvoiceModalOpen(true);
  };

  const handleIssueClientInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientForInvoice) return;

    const items: Array<{ description: string; amount: number; installmentId?: string }> = [];

    if (includeSustainability && selectedClientForInvoice.sustainabilityDetails) {
      items.push({
        description: `Sustentação Mensal (${selectedClientForInvoice.sustainabilityDetails.planName})`,
        amount: selectedClientForInvoice.sustainabilityDetails.monthlyAmount,
      });
    }

    if (selectedClientForInvoice.pendingInstallments) {
      for (const inst of selectedClientForInvoice.pendingInstallments) {
        if (selectedInstallmentIds.includes(inst.id)) {
          items.push({
            description: `${inst.projectName} — ${inst.description}`,
            amount: inst.amount,
            installmentId: inst.id,
          });
        }
      }
    }

    const exVal = parseFloat(extraAmount) || 0;
    if (exVal > 0 && extraDescription.trim()) {
      items.push({
        description: extraDescription.trim(),
        amount: exVal,
      });
    }

    if (items.length === 0) {
      showNotification("Selecione ao menos um item ou parcela para emitir a fatura.", "error");
      return;
    }

    startTransition(async () => {
      const res = await issueImmediateInvoiceAction({
        userId: selectedClientForInvoice.userId,
        items,
        dueDateOption: invDueDateOption,
      });

      if (res.success) {
        setIsInvoiceModalOpen(false);
        showNotification(`Fatura #${res.invoiceNumber} emitida e enviada por e-mail!`);
        router.refresh();
      } else {
        showNotification(res.error || "Erro ao emitir fatura.", "error");
      }
    });
  };

  const handleAdminComment = (ticketId: string) => {
    const text = ticketCommentInputs[ticketId]?.trim();
    if (!text) return;

    startTransition(async () => {
      const res = await addTicketCommentAction(ticketId, text);
      if (res.success && res.comment) {
        setTickets((prev) =>
          prev.map((t) =>
            t.id === ticketId
              ? {
                  ...t,
                  comments: [
                    ...(t.comments || []),
                    {
                      id: res.comment.id,
                      message: res.comment.message,
                      authorName: res.comment.authorName,
                      isAdmin: res.comment.isAdmin,
                      createdAt: new Date().toISOString(),
                    },
                  ],
                }
              : t
          )
        );
        setTicketCommentInputs((prev) => ({ ...prev, [ticketId]: "" }));
        showNotification("Resposta enviada ao chamado!");
      } else {
        showNotification(res.error || "Erro ao responder chamado.", "error");
      }
    });
  };

  // Cálculos do Gráfico de Projeção (12 meses)
  const projection12 = data.finance.projection12Months || [];
  const maxProjectedMonth = Math.max(...projection12.map((p) => p.total), 1);
  const totalReceivables12Months = data.finance.total12MonthsProjected || projection12.reduce((acc, p) => acc + p.total, 0);

  // Cálculos do Gráfico de Despesas (Comparativo)
  const expensesComp = data.finance.expensesComparison || [];
  const maxExpenseMonth = Math.max(
    ...expensesComp.map((e) => Math.max(e.projected, e.actual)),
    1
  );

  return (
    <main
      className="mxd-page-content inner-page-content"
      style={{ minHeight: "100vh", backgroundColor: "var(--base)", paddingBottom: "10rem" }}
    >
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
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
          >
            {feedbackMsg.text}
          </div>
        )}

        {/* Header do Painel com Breadcrumb Clicável e Botão Sair */}
        <div
          className="mxd-block"
          style={{
            paddingTop: "4rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid var(--st-medium)",
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "2rem",
              width: "100%",
            }}
          >
            <div>
              <Link
                href="/admin/dashboard"
                className="tag tag-s tag-medium"
                style={{
                  color: "var(--accent)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  textDecoration: "none",
                  fontWeight: 700,
                  letterSpacing: "0.08rem",
                }}
              >
                ← DASHBOARD // Painel Executivo
              </Link>
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 3.5vw, 4.2rem)",
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--t-bright)",
                }}
              >
                Gestão MindSite
              </h1>
              <p style={{ color: "var(--t-medium)", fontSize: "1.4rem", margin: "0.5rem 0 0 0" }}>
                Visão consolidada financeira, operacional e de sustentação
              </p>
            </div>

            {/* Ações Rápidas no Topo */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginLeft: "auto" }}>
              <button
                type="button"
                onClick={() => setIsExpenseModalOpen(true)}
                className="btn btn-default-icon btn-default-outline slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption">Lançar Despesa</span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>+</i>
              </button>

              <Link
                href="/admin/clients/new"
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption">+ Novo Cliente</span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>+</i>
              </Link>

              <form action={signOut}>
                <button
                  type="submit"
                  className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left"
                  style={{ height: "4.4rem", padding: "0 1.6rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">Sair [→</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 4 Cards de Métricas Principais */}
        <div className="mxd-block" style={{ marginBottom: "4rem" }}>
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

            {/* Card Projetado 12 Meses */}
            <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.4rem" }}>
              <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.8rem" }}>
                Receita Projetada (12 Meses)
              </span>
              <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.8rem", fontWeight: 700, color: "var(--accent)" }}>
                R$ {totalReceivables12Months.toFixed(2).replace(".", ",")}
              </div>
              <span style={{ display: "block", fontSize: "1.2rem", color: "var(--t-muted)", marginTop: "0.6rem" }}>
                MRR acumulado + Milestones acordados
              </span>
            </div>

            {/* Card Faturas em Atraso */}
            <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.4rem" }}>
              <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.8rem" }}>
                Faturas em Atraso
              </span>
              <div style={{ fontFamily: "var(--_font-accent)", fontSize: "2.8rem", fontWeight: 700, color: (data.operationalMetrics?.overdueInvoices.count || 0) > 0 ? "#ef4444" : "var(--t-bright)" }}>
                R$ {(data.operationalMetrics?.overdueInvoices.totalAmount || 0).toFixed(2).replace(".", ",")}
              </div>
              <span style={{ display: "block", fontSize: "1.2rem", color: (data.operationalMetrics?.overdueInvoices.count || 0) > 0 ? "#ef4444" : "var(--t-muted)", marginTop: "0.6rem", fontWeight: 600 }}>
                {data.operationalMetrics?.overdueInvoices.count || 0} faturas vencidas
              </span>
            </div>

            {/* Card Fila de Chamados */}
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

        {/* Barra de Abas de Navegação */}
        <div className="mxd-block" style={{ borderBottom: "1px solid var(--st-medium)", marginBottom: "4rem" }}>
          <div style={{ display: "flex", gap: "2.5rem", overflowX: "auto" }}>
            {[
              { key: "OVERVIEW" as const, label: "Visão Geral" },
              { key: "FINANCE" as const, label: "Fluxo de Caixa & Projeção" },
              { key: "TICKETS" as const, label: `Triagem de Chamados (${tickets.length})` },
              { key: "EXPENSES" as const, label: `Despesas Operacionais (${expenses.length})` },
              { key: "CLIENTS" as const, label: `Carteira de Clientes (${data.finance.clientBalances.length})` },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
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
                    transition: "color 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================== */}
        {/* ABA 1: VISÃO GERAL (NOVA SEÇÃO COM GRÁFICOS EXECUTIVOS) */}
        {/* ==================================================== */}
        {activeTab === "OVERVIEW" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

            {/* Displays de Métricas Operacionais Detalhadas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {/* Distribuição de Assinantes por Plano */}
              <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3rem", borderRadius: "0.4rem" }}>
                <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, marginBottom: "0.8rem" }}>
                  Assinaturas Ativas
                </span>
                <h3 style={{ fontSize: "1.8rem", color: "var(--t-bright)", margin: "0 0 2rem 0" }}>
                  Distribuição por Plano de Sustentação
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", fontFamily: "var(--_font-accent)", fontSize: "1.3rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1.2rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ color: "#3b82f6", fontWeight: 600 }}>● Essential (R$ 100/mês)</span>
                    <strong style={{ color: "var(--t-bright)" }}>{data.operationalMetrics?.planDistribution.essential || 0} assinante(s)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1.2rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>● Development (R$ 300/mês)</span>
                    <strong style={{ color: "var(--t-bright)" }}>{data.operationalMetrics?.planDistribution.development || 0} assinante(s)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1.2rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ color: "#a855f7", fontWeight: 600 }}>● Advanced (R$ 700/mês)</span>
                    <strong style={{ color: "var(--t-bright)" }}>{data.operationalMetrics?.planDistribution.advanced || 0} assinante(s)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1.2rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ color: "var(--t-medium)", fontWeight: 600 }}>● Custom / Personalizado</span>
                    <strong style={{ color: "var(--t-bright)" }}>{data.operationalMetrics?.planDistribution.custom || 0} assinante(s)</strong>
                  </div>
                </div>
              </div>

              {/* Resumo da Operação de Chamados */}
              <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3rem", borderRadius: "0.4rem" }}>
                <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, marginBottom: "0.8rem" }}>
                  SLA & Demanda
                </span>
                <h3 style={{ fontSize: "1.8rem", color: "var(--t-bright)", margin: "0 0 2rem 0" }}>
                  Resumo de Chamados no Ciclo
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", fontFamily: "var(--_font-accent)" }}>
                  <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ display: "block", fontSize: "1.1rem", textTransform: "uppercase", color: "#3b82f6", marginBottom: "0.4rem" }}>
                      Abertos
                    </span>
                    <strong style={{ fontSize: "2.4rem", color: "var(--t-bright)" }}>
                      {data.operationalMetrics?.ticketSummary.open || 0}
                    </strong>
                  </div>
                  <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ display: "block", fontSize: "1.1rem", textTransform: "uppercase", color: "#f59e0b", marginBottom: "0.4rem" }}>
                      Em Atendimento
                    </span>
                    <strong style={{ fontSize: "2.4rem", color: "var(--t-bright)" }}>
                      {data.operationalMetrics?.ticketSummary.inProgress || 0}
                    </strong>
                  </div>
                  <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ display: "block", fontSize: "1.1rem", textTransform: "uppercase", color: "#a855f7", marginBottom: "0.4rem" }}>
                      Aguardando Cliente
                    </span>
                    <strong style={{ fontSize: "2.4rem", color: "var(--t-bright)" }}>
                      {data.operationalMetrics?.ticketSummary.waitingClient || 0}
                    </strong>
                  </div>
                  <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                    <span style={{ display: "block", fontSize: "1.1rem", textTransform: "uppercase", color: "#10b981", marginBottom: "0.4rem" }}>
                      Finalizados
                    </span>
                    <strong style={{ fontSize: "2.4rem", color: "var(--t-bright)" }}>
                      {data.operationalMetrics?.ticketSummary.resolved || 0}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* GRÁFICO 1: PROJEÇÃO DE RECEBIMENTOS (PRÓXIMOS 12 MESES) */}
            <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
                <div>
                  <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, marginBottom: "0.5rem" }}>
                    Fluxo de Receita Futuro
                  </span>
                  <h3 style={{ fontSize: "2.2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: 0 }}>
                    Projeção de Recebimentos (Próximos 12 Meses)
                  </h3>
                  <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0.5rem 0 0 0" }}>
                    Valores projetados por mês com soma de MRR fixo e parcelas de implantação acordadas.
                  </p>
                </div>

                <div style={{ textAlign: "right", fontFamily: "var(--_font-accent)" }}>
                  <span style={{ fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", display: "block" }}>
                    Total Consolidado a Receber (12 Meses)
                  </span>
                  <strong style={{ fontSize: "2.6rem", color: "var(--accent)" }}>
                    R$ {totalReceivables12Months.toFixed(2).replace(".", ",")}
                  </strong>
                  <span style={{ fontSize: "1.2rem", color: "var(--t-medium)", display: "block", marginTop: "0.3rem" }}>
                    Média mensal: R$ {(totalReceivables12Months / 12).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {/* Renderização do Gráfico de Barras Responsivo */}
              <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
                <div style={{ minWidth: "750px", display: "flex", alignItems: "flex-end", gap: "1.5rem", height: "260px", borderBottom: "1px solid var(--st-medium)", paddingTop: "4rem" }}>
                  {projection12.map((item, idx) => {
                    const heightPercent = Math.max((item.total / maxProjectedMonth) * 100, 8);
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        {/* Valor Projetado no Topo da Barra */}
                        <div
                          style={{
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--t-bright)",
                            marginBottom: "0.8rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          R$ {item.total >= 1000 ? `${(item.total / 1000).toFixed(1)}k` : item.total.toFixed(0)}
                        </div>

                        {/* Barra */}
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "46px",
                            height: `${heightPercent}%`,
                            background: "linear-gradient(180deg, var(--accent) 0%, rgba(0, 43, 186, 0.4) 100%)",
                            border: "1px solid var(--accent)",
                            borderRadius: "0.3rem 0.3rem 0 0",
                            transition: "all 0.3s ease",
                            position: "relative",
                          }}
                          title={`${item.monthLabel}: R$ ${item.total.toFixed(2).replace(".", ",")} (MRR: R$ ${item.mrr.toFixed(2)} + Milestones: R$ ${item.milestones.toFixed(2)})`}
                        />

                        {/* Mês na base */}
                        <span
                          style={{
                            marginTop: "1rem",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.1rem",
                            textTransform: "uppercase",
                            color: "var(--t-medium)",
                            fontWeight: 600,
                          }}
                        >
                          {item.monthKey}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legenda do Gráfico */}
              <div style={{ display: "flex", gap: "2.5rem", marginTop: "2rem", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", color: "var(--t-medium)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ width: "1.4rem", height: "1.4rem", backgroundColor: "var(--accent)", borderRadius: "0.2rem" }} />
                  <span>Projeção de Entrada Mensal (MRR + Milestones)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ width: "1.4rem", height: "1.4rem", backgroundColor: "rgba(0, 43, 186, 0.2)", border: "1px dashed var(--accent)", borderRadius: "0.2rem" }} />
                  <span>Base Recorrente Garantida (MRR: R$ {data.finance.mrrTotal.toFixed(2).replace(".", ",")}/mês)</span>
                </div>
              </div>
            </div>

            {/* GRÁFICO 2: DESPESAS PROJETADAS VS. REALIZADAS */}
            <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
                <div>
                  <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "#f59e0b", fontWeight: 700, marginBottom: "0.5rem" }}>
                    Controle de Custos
                  </span>
                  <h3 style={{ fontSize: "2.2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: 0 }}>
                    Despesas Projetadas vs. Realizadas
                  </h3>
                  <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0.5rem 0 0 0" }}>
                    Acompanhamento mensal de custos operacionais (Previsto / Orçado vs. Efetivamente Pago).
                  </p>
                </div>

                <div style={{ display: "flex", gap: "2rem", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ width: "1.4rem", height: "1.4rem", backgroundColor: "rgba(245, 158, 11, 0.4)", border: "1px solid #f59e0b", borderRadius: "0.2rem" }} />
                    <span style={{ color: "var(--t-bright)" }}>Previsto / Orçado</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span style={{ width: "1.4rem", height: "1.4rem", backgroundColor: "#10b981", borderRadius: "0.2rem" }} />
                    <span style={{ color: "var(--t-bright)" }}>Realizado / Pago</span>
                  </div>
                </div>
              </div>

              {/* Renderização do Gráfico Comparativo */}
              <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
                <div style={{ minWidth: "750px", display: "flex", alignItems: "flex-end", gap: "1.5rem", height: "240px", borderBottom: "1px solid var(--st-medium)", paddingTop: "4rem" }}>
                  {expensesComp.map((item, idx) => {
                    const projPercent = Math.max((item.projected / maxExpenseMonth) * 100, 4);
                    const actPercent = Math.max((item.actual / maxExpenseMonth) * 100, item.actual > 0 ? 4 : 0);
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "0.4rem", width: "100%", justifyContent: "center", height: "100%" }}>
                          {/* Barra Projetado */}
                          <div
                            style={{
                              width: "18px",
                              height: `${projPercent}%`,
                              backgroundColor: "rgba(245, 158, 11, 0.35)",
                              border: "1px solid #f59e0b",
                              borderRadius: "0.2rem 0.2rem 0 0",
                            }}
                            title={`Previsto ${item.monthLabel}: R$ ${item.projected.toFixed(2)}`}
                          />

                          {/* Barra Realizado */}
                          <div
                            style={{
                              width: "18px",
                              height: `${actPercent}%`,
                              backgroundColor: "#10b981",
                              border: "1px solid #10b981",
                              borderRadius: "0.2rem 0.2rem 0 0",
                            }}
                            title={`Pago ${item.monthLabel}: R$ ${item.actual.toFixed(2)}`}
                          />
                        </div>

                        <span
                          style={{
                            marginTop: "1rem",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.1rem",
                            textTransform: "uppercase",
                            color: "var(--t-medium)",
                            fontWeight: 600,
                          }}
                        >
                          {item.monthKey}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* ABA 2: FLUXO DE CAIXA & PROJEÇÃO (MILESTONES & FATURAS) */}
        {/* ==================================================== */}
        {activeTab === "FINANCE" && (
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
                    Controle de Setup em Aberto e status de faturamento.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("CLIENTS")}
                  style={{ color: "var(--accent)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", fontFamily: "var(--_font-accent)" }}
                >
                  Ver Carteira Completa de Clientes ➔
                </button>
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
                              color: client.sustainabilityPlan.includes("Essential") ? "#3b82f6" : client.sustainabilityPlan.includes("Development") ? "var(--accent)" : client.sustainabilityPlan.includes("Advanced") ? "#a855f7" : "var(--t-muted)",
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
                              backgroundColor: client.status === "EM_DIA" ? "rgba(16, 185, 129, 0.1)" : client.status === "ATRASO" ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)",
                              color: client.status === "EM_DIA" ? "#10b981" : client.status === "ATRASO" ? "#ef4444" : "#3b82f6",
                              border: `1px solid ${client.status === "EM_DIA" ? "rgba(16, 185, 129, 0.3)" : client.status === "ATRASO" ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"}`,
                            }}>
                              {client.status}
                            </span>
                          </td>
                          <td style={{ padding: "1.5rem", textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "1rem", alignItems: "center" }}>
                              <button
                                type="button"
                                onClick={() => openInvoiceModalForClient(client)}
                                className="btn btn-default-icon btn-default-accent"
                                style={{ height: "3.4rem", padding: "0 1.2rem", fontSize: "1.1rem" }}
                              >
                                Emitir Fatura
                              </button>
                              <Link
                                href={`/admin/clients/${client.userId}/edit`}
                                style={{
                                  padding: "0.6rem 1.2rem",
                                  fontSize: "1.1rem",
                                  color: "var(--t-bright)",
                                  border: "1px solid var(--st-medium)",
                                  borderRadius: "0.2rem",
                                  textDecoration: "none",
                                }}
                              >
                                Editar
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* ABA 3: TRIAGEM DE CHAMADOS (COM ABERTURA PELO ADMIN) */}
        {/* ==================================================== */}
        {activeTab === "TICKETS" && (
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
              <div>
                <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
                  Triagem e Gestão Analítica de Chamados
                </h3>
                <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
                  Acompanhamento de volumetria, cumprimento de SLA e abertura direta em nome do cliente (Triagem WhatsApp).
                </p>
              </div>

              {/* Botão de Abertura pelo Administrador */}
              <button
                type="button"
                onClick={() => setIsNewTicketModalOpen(true)}
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption">+ Abrir Chamado para Cliente</span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>+</i>
              </button>
            </div>

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

            {/* Fila de Chamados */}
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

                      {/* Anexos */}
                      {ticket.attachments && ticket.attachments.length > 0 && (
                        <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                          {ticket.attachments.map((att: { id: string; fileUrl: string; fileName?: string }) => (
                            <button
                              key={att.id}
                              type="button"
                              onClick={() => handleOpenAttachment(att.id, att.fileName)}
                              disabled={openingAttachmentId === att.id}
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
                                cursor: "pointer",
                                opacity: openingAttachmentId === att.id ? 0.6 : 1,
                              }}
                            >
                              📎 {att.fileName || "Anexo"} {openingAttachmentId === att.id ? "(Abrindo...)" : "↗"}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Ações de SLA e Status */}
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
                              onClick={() => {
                                if (st === "WAITING_CLIENT") {
                                  setResolveTicket({ id: ticket.id, ticketNumber: ticket.ticketNumber, title: ticket.title });
                                  setResolveMessage("");
                                  setResolveFiles([]);
                                } else {
                                  handleStatusChange(ticket.id, st);
                                }
                              }}
                              disabled={ticket.status === st || isPending || isResolving}
                              style={{
                                padding: "0.5rem 1rem",
                                fontSize: "1.1rem",
                                fontFamily: "var(--_font-accent)",
                                border: "1px solid var(--st-medium)",
                                backgroundColor: ticket.status === st ? "var(--accent)" : "var(--base-tint)",
                                color: ticket.status === st ? "#ffffff" : "var(--t-bright)",
                                cursor: ticket.status === st ? "default" : "pointer",
                                opacity: isPending || isResolving ? 0.6 : 1,
                              }}
                            >
                              {st === "OPEN" && "Aberto"}
                              {st === "IN_PROGRESS" && "Em Andamento"}
                              {st === "WAITING_CLIENT" && "Aguardando Aceite"}
                              {st === "RESOLVED" && "Resolvido"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Thread de Comentários */}
                      <div style={{ marginTop: "2rem", borderTop: "1px solid var(--st-medium)", paddingTop: "1.5rem" }}>
                        {ticket.comments && ticket.comments.length > 0 && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                            {ticket.comments.map((c) => (
                              <div
                                key={c.id}
                                style={{
                                  padding: "1.2rem 1.5rem",
                                  backgroundColor: c.isAdmin ? "rgba(0, 43, 186, 0.08)" : "var(--base-tint)",
                                  border: `1px solid ${c.isAdmin ? "var(--accent)" : "var(--st-medium)"}`,
                                  borderRadius: "0.2rem",
                                }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                                  <strong style={{ fontSize: "1.2rem", color: c.isAdmin ? "var(--accent)" : "var(--t-bright)", fontFamily: "var(--_font-accent)" }}>
                                    {c.authorName} {c.isAdmin && "🛡️ (Suporte MindSite)"}
                                  </strong>
                                  <span style={{ fontSize: "1.1rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                                    {new Date(c.createdAt).toLocaleString("pt-BR")}
                                  </span>
                                </div>
                                <p style={{ fontSize: "1.2rem", color: "var(--t-medium)", margin: 0, lineHeight: 1.4, whiteSpace: "pre-line" }}>
                                  {c.message}
                                </p>
                                {c.attachments && c.attachments.length > 0 && (
                                  <div style={{ marginTop: "0.8rem", display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                                    {c.attachments.map((attPath: string, attIdx: number) => {
                                      const cleanFileName =
                                        attPath.split("/").pop()?.split("_").slice(2).join("_") ||
                                        attPath.split("/").pop() ||
                                        `Anexo_${attIdx + 1}`;
                                      const isOpeningThis = openingAttachmentId === attPath;
                                      return (
                                        <button
                                          key={attIdx}
                                          type="button"
                                          onClick={() => handleOpenAttachment(attPath, cleanFileName)}
                                          disabled={isOpeningThis}
                                          style={{
                                            fontSize: "1.1rem",
                                            fontFamily: "var(--_font-accent)",
                                            padding: "0.3rem 0.8rem",
                                            backgroundColor: "var(--base)",
                                            border: "1px solid var(--st-medium)",
                                            borderRadius: "0.2rem",
                                            color: "var(--t-bright)",
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            opacity: isOpeningThis ? 0.6 : 1,
                                          }}
                                        >
                                          📎 {isOpeningThis ? "Abrindo..." : cleanFileName} ↗
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        <div style={{ display: "flex", gap: "1rem" }}>
                          <input
                            type="text"
                            placeholder="Escrever resposta técnica ao cliente..."
                            value={ticketCommentInputs[ticket.id] || ""}
                            onChange={(e) => setTicketCommentInputs((prev) => ({ ...prev, [ticket.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleAdminComment(ticket.id);
                              }
                            }}
                            style={{
                              flex: 1,
                              height: "4rem",
                              padding: "0 1.2rem",
                              backgroundColor: "var(--base-tint)",
                              border: "1px solid var(--st-medium)",
                              color: "var(--t-bright)",
                              fontFamily: "var(--_font-accent)",
                              fontSize: "1.2rem",
                              outline: "none",
                            }}
                          />
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleAdminComment(ticket.id)}
                            className="btn btn-default-icon btn-default-accent"
                            style={{ height: "4rem", padding: "0 1.6rem", fontSize: "1.2rem", whiteSpace: "nowrap" }}
                          >
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* ABA 4: DESPESAS OPERACIONAIS (AJUSTES, UPLOAD & FILTROS) */}
        {/* ==================================================== */}
        {activeTab === "EXPENSES" && (
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", marginBottom: "2.5rem" }}>
              <div>
                <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
                  Despesas Operacionais
                </h3>
                <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
                  Acompanhe custos de infraestrutura, SaaS e notas fiscais com comprovantes anexados.
                </p>
              </div>

              <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => setIsExpenseModalOpen(true)}
                  className="btn btn-default-icon btn-default-accent slide-right"
                  style={{ height: "4rem", padding: "0.4rem 0.4rem 0.4rem 1.4rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">+ Nova Despesa</span>
                  <i className="btn-icon" style={{ width: "3.2rem", height: "3.2rem" }}>+</i>
                </button>
              </div>
            </div>

            {/* Alerta Visual de Despesas Pendentes de Meses Anteriores */}
            {overdueExpensesPastMonths.length > 0 && (
              <div
                style={{
                  padding: "1.6rem 2rem",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  borderRadius: "0.4rem",
                  marginBottom: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span style={{ fontSize: "2rem" }}>⚠️</span>
                  <div>
                    <strong style={{ color: "#ef4444", fontSize: "1.4rem", display: "block", fontFamily: "var(--_font-accent)" }}>
                      Atenção: Existem {overdueExpensesPastMonths.length} despesa(s) pendente(s) de meses anteriores!
                    </strong>
                    <span style={{ fontSize: "1.2rem", color: "var(--t-medium)" }}>
                      Valor total pendente acumulado: <strong style={{ color: "var(--t-bright)" }}>R$ {totalOverdueExpensesAmount.toFixed(2).replace(".", ",")}</strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setExpenseStatusFilter("PENDING")}
                  style={{
                    padding: "0.6rem 1.2rem",
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.2rem",
                    fontSize: "1.1rem",
                    fontFamily: "var(--_font-accent)",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Filtrar Pendentes
                </button>
              </div>
            )}

            {/* Barra de Filtros por Período e Status */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem", padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", fontWeight: 700 }}>
                  Filtrar por Mês:
                </span>
                <select
                  value={expensePeriodFilter}
                  onChange={(e) => setExpensePeriodFilter(e.target.value)}
                  style={{
                    height: "3.6rem",
                    padding: "0 1.2rem",
                    backgroundColor: "var(--base-tint)",
                    border: "1px solid var(--st-medium)",
                    color: "var(--t-bright)",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.2rem",
                    outline: "none",
                  }}
                >
                  <option value="ALL">Todas as Datas</option>
                  {availableExpensePeriods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                {(["ALL", "PENDING", "PAID"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setExpenseStatusFilter(st)}
                    style={{
                      padding: "0.6rem 1.2rem",
                      fontSize: "1.1rem",
                      fontFamily: "var(--_font-accent)",
                      textTransform: "uppercase",
                      border: `1px solid ${expenseStatusFilter === st ? "var(--accent)" : "var(--st-medium)"}`,
                      backgroundColor: expenseStatusFilter === st ? "var(--accent)" : "var(--base-tint)",
                      color: expenseStatusFilter === st ? "#ffffff" : "var(--t-bright)",
                      borderRadius: "0.2rem",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {st === "ALL" && "Todas"}
                    {st === "PENDING" && "Pendentes"}
                    {st === "PAID" && "Liquidadas"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabela de Despesas com Colunas Ajustadas (Despesa, Data do Pagamento, Comprovante) */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontFamily: "var(--_font-accent)", fontSize: "1.3rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--st-medium)", color: "var(--t-muted)", textTransform: "uppercase", fontSize: "1.1rem" }}>
                    <th style={{ padding: "1.2rem 1.5rem" }}>Despesa</th>
                    <th style={{ padding: "1.2rem 1.5rem" }}>Categoria</th>
                    <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Previsto</th>
                    <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Efetivo Pago</th>
                    <th style={{ padding: "1.2rem 1.5rem" }}>Vencimento</th>
                    <th style={{ padding: "1.2rem 1.5rem" }}>Data Pagamento</th>
                    <th style={{ padding: "1.2rem 1.5rem", textAlign: "center" }}>Comprovante</th>
                    <th style={{ padding: "1.2rem 1.5rem", textAlign: "center" }}>Status</th>
                    <th style={{ padding: "1.2rem 1.5rem", textAlign: "right" }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ padding: "3rem", textAlign: "center", color: "var(--t-muted)" }}>
                        Nenhuma despesa localizada para o filtro selecionado.
                      </td>
                    </tr>
                  ) : (
                    filteredExpenses.map((exp) => (
                      <tr key={exp.id} style={{ borderBottom: "1px solid var(--st-medium)" }}>
                        <td style={{ padding: "1.5rem", color: "var(--t-bright)", fontWeight: 700 }}>
                          {exp.name}
                        </td>
                        <td style={{ padding: "1.5rem", color: "var(--t-medium)", fontSize: "1.1rem" }}>
                          {exp.category}
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
                        <td style={{ padding: "1.5rem", color: "var(--t-medium)" }}>
                          {exp.paymentDate ? new Date(exp.paymentDate).toLocaleDateString("pt-BR") : "-"}
                        </td>
                        <td style={{ padding: "1.5rem", textAlign: "center" }}>
                          {exp.receiptUrl ? (
                            <a
                              href={exp.receiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.3rem 0.8rem",
                                backgroundColor: "rgba(0, 43, 186, 0.15)",
                                border: "1px solid var(--accent)",
                                color: "#819ffe",
                                borderRadius: "0.2rem",
                                fontSize: "1.1rem",
                                textDecoration: "none",
                              }}
                            >
                              📄 Ver
                            </a>
                          ) : (
                            <span style={{ color: "var(--t-muted)" }}>-</span>
                          )}
                        </td>
                        <td style={{ padding: "1.5rem", textAlign: "center" }}>
                          <span style={{
                            padding: "0.4rem 1rem",
                            fontSize: "1rem",
                            borderRadius: "0.2rem",
                            backgroundColor: exp.isPaid ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                            color: exp.isPaid ? "#10b981" : "#f59e0b",
                            border: `1px solid ${exp.isPaid ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
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
                                setSettlePaymentDate(new Date().toISOString().split("T")[0]);
                                setSettleReceiptFile(null);
                              }}
                              style={{
                                padding: "0.5rem 1.2rem",
                                fontSize: "1.1rem",
                                fontFamily: "var(--_font-accent)",
                                textTransform: "uppercase",
                                backgroundColor: "var(--accent)",
                                color: "#ffffff",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "0.2rem",
                                fontWeight: 700,
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
        )}

        {/* ==================================================== */}
        {/* ABA 5: CARTEIRA DE CLIENTES (SUBSTITUI SALDOS POR CLIENTE) */}
        {/* ==================================================== */}
        {activeTab === "CLIENTS" && (
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", marginBottom: "3rem" }}>
              <div>
                <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
                  Carteira Completa de Clientes
                </h3>
                <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
                  Listagem integral de contas ativas, contratos, faturamento e acesso rápido a ações cadastrais.
                </p>
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Link
                  href="/admin/clients/new"
                  className="btn btn-default-icon btn-default-accent slide-right"
                  style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">+ Cadastrar Novo Cliente</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>+</i>
                </Link>
              </div>
            </div>

            {/* Barra de Busca de Clientes */}
            <div style={{ marginBottom: "2.5rem" }}>
              <input
                type="text"
                placeholder="Buscar por Nome, Empresa, E-mail, CNPJ/CPF ou Projeto..."
                value={clientSearchTerm}
                onChange={(e) => setClientSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  height: "4.8rem",
                  padding: "0 1.6rem",
                  backgroundColor: "var(--base)",
                  border: "1px solid var(--st-medium)",
                  color: "var(--t-bright)",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.3rem",
                  outline: "none",
                  borderRadius: "0.2rem",
                }}
              />
            </div>

            {/* Grid de Cards de Clientes */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
              {filteredClients.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem", color: "var(--t-muted)" }}>
                  Nenhum cliente localizado para esta busca.
                </div>
              ) : (
                filteredClients.map((client) => (
                  <div
                    key={client.userId}
                    style={{
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      padding: "2.5rem",
                      borderRadius: "0.4rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                        <div>
                          <h4 style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.4rem 0" }}>
                            {client.companyName}
                          </h4>
                          <span style={{ fontSize: "1.2rem", color: "var(--t-muted)" }}>
                            {client.name} • {client.email}
                          </span>
                        </div>
                        <span style={{
                          padding: "0.3rem 0.8rem",
                          fontSize: "1rem",
                          fontFamily: "var(--_font-accent)",
                          borderRadius: "0.2rem",
                          backgroundColor: client.status === "EM_DIA" ? "rgba(16, 185, 129, 0.15)" : client.status === "ATRASO" ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.15)",
                          color: client.status === "EM_DIA" ? "#10b981" : client.status === "ATRASO" ? "#ef4444" : "#3b82f6",
                          border: `1px solid ${client.status === "EM_DIA" ? "rgba(16, 185, 129, 0.3)" : client.status === "ATRASO" ? "rgba(239, 68, 68, 0.3)" : "rgba(59, 130, 246, 0.3)"}`,
                        }}>
                          {client.status}
                        </span>
                      </div>

                      {client.document && (
                        <span style={{ display: "block", fontSize: "1.1rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)", marginBottom: "1rem" }}>
                          CNPJ/CPF: {client.document}
                        </span>
                      )}

                      <div style={{ borderTop: "1px solid var(--st-medium)", paddingTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.8rem", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--t-medium)" }}>Projeto Principal:</span>
                          <strong style={{ color: "var(--t-bright)" }}>{client.projectName}</strong>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--t-medium)" }}>Plano Sustentação:</span>
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
                      </div>
                    </div>

                    {/* Ações do Cliente */}
                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", borderTop: "1px solid var(--st-medium)", paddingTop: "1.5rem" }}>
                      <Link
                        href={`/admin/clients/${client.userId}/edit`}
                        style={{
                          flex: 1,
                          padding: "0.8rem",
                          backgroundColor: "var(--base-tint)",
                          border: "1px solid var(--st-medium)",
                          color: "var(--t-bright)",
                          fontFamily: "var(--_font-accent)",
                          fontSize: "1.1rem",
                          textTransform: "uppercase",
                          borderRadius: "0.2rem",
                          textAlign: "center",
                          textDecoration: "none",
                          fontWeight: 700,
                        }}
                      >
                        Editar
                      </Link>

                      <button
                        type="button"
                        onClick={() => openInvoiceModalForClient(client)}
                        style={{
                          flex: 1,
                          padding: "0.8rem",
                          backgroundColor: "var(--accent)",
                          border: "none",
                          color: "#ffffff",
                          fontFamily: "var(--_font-accent)",
                          fontSize: "1.1rem",
                          textTransform: "uppercase",
                          borderRadius: "0.2rem",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        Fatura
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setResetClient({ id: client.userId, name: client.name, email: client.email });
                          setNewPassword("");
                        }}
                        style={{
                          padding: "0.8rem 1rem",
                          backgroundColor: "var(--base-tint)",
                          border: "1px solid var(--st-medium)",
                          color: "var(--t-bright)",
                          fontFamily: "var(--_font-accent)",
                          fontSize: "1.1rem",
                          cursor: "pointer",
                          borderRadius: "0.2rem",
                        }}
                        title="Redefinir Senha"
                      >
                        🔑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* MODAL: ABERTURA DE CHAMADO PELO ADMINISTRADOR */}
      {/* ==================================================== */}
      {isNewTicketModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "600px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: "2.2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.6rem 0" }}>
              + Abrir Chamado para Cliente
            </h3>
            <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
              Triagem de demandas recebidas via WhatsApp ou canais externos. O chamado computará na cota mensal de sustentação e o cliente será notificado por e-mail institucional.
            </p>

            <form onSubmit={handleCreateTicketForClient} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              {/* Seleção do Cliente via Combobox */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                  1. Localizar Cliente (Nome, Razão Social, E-mail ou CNPJ) *
                </label>
                <input
                  type="text"
                  placeholder="Digite para pesquisar o cliente..."
                  value={ticketClientQuery}
                  onChange={(e) => {
                    setTicketClientQuery(e.target.value);
                    if (ticketClientId) setTicketClientId("");
                  }}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />

                {/* Dropdown de Resultados da Pesquisa */}
                {!ticketClientId && ticketClientQuery.trim() && (
                  <div style={{ maxHeight: "180px", overflowY: "auto", backgroundColor: "var(--base)", border: "1px solid var(--accent)", marginTop: "0.4rem", borderRadius: "0.2rem" }}>
                    {comboboxClientResults.length === 0 ? (
                      <div style={{ padding: "1rem", color: "var(--t-muted)", fontSize: "1.2rem", fontFamily: "var(--_font-accent)" }}>
                        Nenhum cliente encontrado.
                      </div>
                    ) : (
                      comboboxClientResults.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            setTicketClientId(c.id);
                            setTicketClientQuery(`${c.companyName} (${c.name})`);
                            if (c.projects.length > 0) {
                              setTicketProjectId(c.projects[0].id);
                            }
                          }}
                          style={{
                            padding: "1rem 1.5rem",
                            cursor: "pointer",
                            borderBottom: "1px solid var(--st-medium)",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.2rem",
                          }}
                        >
                          <strong style={{ color: "var(--t-bright)", display: "block" }}>{c.companyName}</strong>
                          <span style={{ fontSize: "1.1rem", color: "var(--t-muted)" }}>{c.name} • {c.email} {c.document && `• ${c.document}`}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {selectedClientForTicket && (
                  <div style={{ marginTop: "0.8rem", padding: "0.8rem 1.2rem", backgroundColor: "rgba(0, 43, 186, 0.15)", border: "1px solid var(--accent)", borderRadius: "0.2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "1.2rem", color: "#819ffe", fontFamily: "var(--_font-accent)" }}>
                      ✓ Cliente Selecionado: <strong>{selectedClientForTicket.companyName}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setTicketClientId("");
                        setTicketClientQuery("");
                        setTicketProjectId("");
                      }}
                      style={{ background: "none", border: "none", color: "var(--t-muted)", cursor: "pointer", fontSize: "1.2rem" }}
                    >
                      ✕ Trocar
                    </button>
                  </div>
                )}
              </div>

              {/* Projeto Associado */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                  2. Projeto Associado *
                </label>
                <select
                  required
                  value={ticketProjectId}
                  onChange={(e) => setTicketProjectId(e.target.value)}
                  disabled={!selectedClientForTicket}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.2rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                >
                  <option value="">Selecione o Projeto...</option>
                  {selectedClientForTicket?.projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.domain ? `(${p.domain})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Título e Nível de Complexidade */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                    Título da Demanda *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ajuste em banner da home, correção de bug..."
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                    Complexidade / SLA *
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as TicketCategory)}
                    style={{ width: "100%", height: "4.5rem", padding: "0 1rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", outline: "none" }}
                  >
                    <option value="BASIC">Básico (24h)</option>
                    <option value="INTERMEDIATE">Intermediário (72h)</option>
                    <option value="ADVANCED">Avançado (7 dias)</option>
                  </select>
                </div>
              </div>

              {/* Descrição Detalhada */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                  Descrição Detalhada do Chamado *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Relate detalhadamente a demanda informada pelo cliente..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  style={{ width: "100%", padding: "1.2rem 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none", resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  style={{ padding: "1rem 2rem", background: "none", border: "none", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", color: "var(--t-medium)", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending || !ticketClientId || !ticketProjectId}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.6rem", padding: "0.4rem 0.4rem 0.4rem 1.8rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">{isPending ? "Criando & Notificando..." : "Abrir Chamado"}</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>✓</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: LANÇAR NOVA DESPESA */}
      {/* ==================================================== */}
      {isExpenseModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "550px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 2rem 0" }}>
              Lançar Despesa Operacional
            </h3>

            <form onSubmit={handleCreateExpense} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Nome / Descrição da Despesa *
                </label>
                <input
                  type="text"
                  required
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  placeholder="Ex: Vercel Pro, Supabase Pro, Registro.br, Honorários"
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
                    onChange={(e) => setExpenseCategory(e.target.value as ExpenseCategory)}
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
                    onChange={(e) => setExpenseCurrency(e.target.value as Currency)}
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
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>+</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: LIQUIDAR / DAR BAIXA EM DESPESA (COM COMPROVANTE) */}
      {/* ==================================================== */}
      {settlingExpenseId && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "480px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.8rem 0" }}>
              Liquidar Despesa
            </h3>
            <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
              Informe o valor efetivo pago, a data da liquidação e anexe o comprovante de pagamento correspondente.
            </p>

            <form onSubmit={handleSettleExpense} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                  Valor Efetivo Pago (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={settleActualAmount}
                  onChange={(e) => setSettleActualAmount(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                  Data do Pagamento *
                </label>
                <input
                  type="date"
                  required
                  value={settlePaymentDate}
                  onChange={(e) => setSettlePaymentDate(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem", fontWeight: 700 }}>
                  Anexar Comprovante de Pagamento (PDF ou Imagem)
                </label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => setSettleReceiptFile(e.target.files?.[0] || null)}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "var(--base)",
                    border: "1px solid var(--st-medium)",
                    color: "var(--t-bright)",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.2rem",
                  }}
                />
                <span style={{ fontSize: "1.1rem", color: "var(--t-muted)", marginTop: "0.4rem", display: "block" }}>
                  O comprovante será salvo no bucket seguro `expense-receipts`.
                </span>
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
                  type="submit"
                  disabled={isPending || isUploadingReceipt}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.6rem", padding: "0.4rem 0.4rem 0.4rem 1.8rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">{isUploadingReceipt ? "Enviando Comprovante..." : isPending ? "Processando..." : "Confirmar Baixa"}</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>✓</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: REDEFINIR SENHA DO CLIENTE */}
      {/* ==================================================== */}
      {resetClient && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
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
                  <span className="btn-caption">{isPending ? "Atualizando..." : "Atualizar Senha"}</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>🔑</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: EMISSÃO DE FATURA CONTEXTUAL */}
      {/* ==================================================== */}
      {isInvoiceModalOpen && selectedClientForInvoice && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "640px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: "2.2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.8rem 0" }}>
              Emitir Fatura Imediata
            </h3>
            <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
              Selecione as obrigações a cobrar de <strong style={{ color: "var(--t-bright)" }}>{selectedClientForInvoice.companyName}</strong>.
            </p>

            <form onSubmit={handleIssueClientInvoice} className="form" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Item 1: Sustentação */}
              {selectedClientForInvoice.sustainabilityDetails ? (
                <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "1.2rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={includeSustainability}
                      onChange={(e) => setIncludeSustainability(e.target.checked)}
                      style={{ width: "1.8rem", height: "1.8rem", accentColor: "var(--accent)" }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: "block", color: "var(--t-bright)", fontSize: "1.3rem", fontFamily: "var(--_font-accent)" }}>
                        Sustentação Mensal ({selectedClientForInvoice.sustainabilityDetails.planName})
                      </strong>
                      <span style={{ fontSize: "1.1rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                        Cobrança mensal fixa recorrente
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.4rem", fontWeight: 700, color: "var(--accent)" }}>
                      R$ {selectedClientForInvoice.sustainabilityDetails.monthlyAmount.toFixed(2).replace(".", ",")}
                    </span>
                  </label>
                </div>
              ) : (
                <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px dashed var(--st-medium)", borderRadius: "0.2rem", color: "var(--t-muted)", fontSize: "1.2rem" }}>
                  Cliente não possui plano de sustentação ativo.
                </div>
              )}

              {/* Item 2: Parcelas de Implantação */}
              <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: "1rem", fontWeight: 700 }}>
                  2. Parcelas de Implantação / Setup
                </span>

                {selectedClientForInvoice.pendingInstallments && selectedClientForInvoice.pendingInstallments.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {selectedClientForInvoice.pendingInstallments.map((inst) => {
                      const isChecked = selectedInstallmentIds.includes(inst.id);
                      return (
                        <label key={inst.id} style={{ display: "flex", alignItems: "center", gap: "1.2rem", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedInstallmentIds((prev) => [...prev, inst.id]);
                              } else {
                                setSelectedInstallmentIds((prev) => prev.filter((id) => id !== inst.id));
                              }
                            }}
                            style={{ width: "1.8rem", height: "1.8rem", accentColor: "var(--accent)" }}
                          />
                          <div style={{ flex: 1 }}>
                            <strong style={{ color: "var(--t-bright)", fontSize: "1.3rem", display: "block" }}>
                              {inst.description}
                            </strong>
                            <span style={{ fontSize: "1.1rem", color: "var(--t-muted)" }}>
                              Previsto para: {new Date(inst.scheduledDate).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.4rem", fontWeight: 700, color: "var(--t-bright)" }}>
                            R$ {inst.amount.toFixed(2).replace(".", ",")}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <span style={{ fontSize: "1.2rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                    Nenhuma parcela de implantação em aberto para este cliente.
                  </span>
                )}
              </div>

              {/* Item 3: Serviço Extra */}
              <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.2rem" }}>
                <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: "1rem", fontWeight: 700 }}>
                  3. Adicionar Serviço ou Taxa Extra (Opcional)
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.2rem" }}>
                  <input
                    type="text"
                    placeholder="Ex: Landing Page Extra, Integração..."
                    value={extraDescription}
                    onChange={(e) => setExtraDescription(e.target.value)}
                    style={{ height: "4.2rem", padding: "0 1.2rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", outline: "none" }}
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="R$ 0,00"
                    value={extraAmount}
                    onChange={(e) => setExtraAmount(e.target.value)}
                    style={{ height: "4.2rem", padding: "0 1.2rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                  />
                </div>
              </div>

              {/* Vencimento com Opções Rápidas */}
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.8rem", fontWeight: 700 }}>
                  Opções Rápidas de Vencimento
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                  {[
                    { id: "TODAY" as const, label: "Hoje" },
                    { id: "24H" as const, label: "Em 24h" },
                    { id: "3D" as const, label: "Em 3 dias" },
                    { id: "5D" as const, label: "Em 5 dias" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInvDueDateOption(opt.id)}
                      style={{
                        height: "4rem",
                        padding: "0 0.5rem",
                        fontFamily: "var(--_font-accent)",
                        fontSize: "1.2rem",
                        border: `1px solid ${invDueDateOption === opt.id ? "var(--accent)" : "var(--st-medium)"}`,
                        backgroundColor: invDueDateOption === opt.id ? "var(--accent)" : "var(--base)",
                        color: invDueDateOption === opt.id ? "#ffffff" : "var(--t-bright)",
                        borderRadius: "0.2rem",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Consolidado */}
              {(() => {
                let calculatedTotal = 0;
                if (includeSustainability && selectedClientForInvoice.sustainabilityDetails) {
                  calculatedTotal += selectedClientForInvoice.sustainabilityDetails.monthlyAmount;
                }
                if (selectedClientForInvoice.pendingInstallments) {
                  for (const inst of selectedClientForInvoice.pendingInstallments) {
                    if (selectedInstallmentIds.includes(inst.id)) {
                      calculatedTotal += inst.amount;
                    }
                  }
                }
                const exVal = parseFloat(extraAmount) || 0;
                if (exVal > 0) calculatedTotal += exVal;

                return (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 2rem", backgroundColor: "var(--base)", border: "1px dashed var(--accent)", borderRadius: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.3rem", color: "var(--t-bright)", textTransform: "uppercase", fontWeight: 700 }}>
                      Total Consolidado da Fatura:
                    </span>
                    <strong style={{ fontFamily: "var(--_font-accent)", fontSize: "2.4rem", color: "var(--accent)" }}>
                      R$ {calculatedTotal.toFixed(2).replace(".", ",")}
                    </strong>
                  </div>
                );
              })()}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsInvoiceModalOpen(false);
                    setSelectedClientForInvoice(null);
                  }}
                  style={{ padding: "1rem 2rem", background: "none", border: "none", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", color: "var(--t-medium)", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.8rem", padding: "0.4rem 0.4rem 0.4rem 2rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">{isPending ? "Processando..." : "Gerar Link & Enviar E-mail"}</span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>✓</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: CONCLUIR ATENDIMENTO E SOLICITAR HOMOLOGAÇÃO */}
      {/* ==================================================== */}
      {resolveTicket && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "580px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ marginBottom: "2rem" }}>
              <span className="tag tag-s tag-medium" style={{ color: "#a855f7", fontFamily: "var(--_font-accent)", marginBottom: "0.8rem", display: "inline-block" }}>
                Homologação de Chamado #{resolveTicket.ticketNumber}
              </span>
              <h3 style={{ fontSize: "2.2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.8rem 0" }}>
                Concluir Atendimento e Solicitar Homologação
              </h3>
              <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0, lineHeight: 1.5 }}>
                Descreva a solução aplicada e adicione evidências/prints para que o cliente valide.
              </p>
            </div>

            <form onSubmit={handleConfirmResolveTicket} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Solução Técnica Aplicada *
                </label>
                <textarea
                  required
                  rows={4}
                  value={resolveMessage}
                  onChange={(e) => setResolveMessage(e.target.value)}
                  placeholder="Descreva detalhadamente a entrega técnica, commits, links homologados ou instruções de validação..."
                  style={{
                    width: "100%",
                    padding: "1.2rem",
                    backgroundColor: "var(--base)",
                    border: "1px solid var(--st-medium)",
                    color: "var(--t-bright)",
                    fontFamily: "var(--_font-default)",
                    fontSize: "1.3rem",
                    borderRadius: "0.2rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Upload de Anexos (Opcional, Evidências/Prints)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (!e.target.files) return;
                    const incoming = Array.from(e.target.files);
                    setResolveFiles((prev) => [...prev, ...incoming]);
                  }}
                  disabled={isResolving}
                  style={{
                    width: "100%",
                    fontSize: "1.2rem",
                    fontFamily: "var(--_font-accent)",
                    color: "var(--t-medium)",
                  }}
                />

                {resolveFiles.length > 0 && (
                  <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                    {resolveFiles.map((f, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "1.1rem",
                          fontFamily: "var(--_font-accent)",
                          backgroundColor: "var(--base)",
                          border: "1px solid var(--st-medium)",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "0.2rem",
                          color: "var(--t-bright)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.6rem",
                        }}
                      >
                        📎 {f.name} ({(f.size / 1024).toFixed(0)} KB)
                        <button
                          type="button"
                          onClick={() => setResolveFiles((prev) => prev.filter((_, idx) => idx !== i))}
                          disabled={isResolving}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--t-muted)",
                            cursor: "pointer",
                            padding: "0 0.2rem",
                            fontSize: "1.2rem",
                            lineHeight: 1,
                          }}
                          title="Remover anexo"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setResolveTicket(null);
                    setResolveMessage("");
                    setResolveFiles([]);
                  }}
                  disabled={isResolving}
                  style={{
                    padding: "1rem 2rem",
                    background: "none",
                    border: "none",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.3rem",
                    color: "var(--t-medium)",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isResolving || !resolveMessage.trim()}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.6rem", padding: "0.4rem 1.8rem", fontSize: "1.3rem" }}
                >
                  <span className="btn-caption">
                    {isResolving ? "Enviando..." : "Enviar para Aceite do Cliente"}
                  </span>
                  <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>✓</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}