"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TicketCategory } from "@prisma/client";
import { createTicketAction, generateConsolidatedPaymentAction, addTicketCommentAction } from "@/app/actions/portal";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/actions/auth";

function SLACountdownBadge({
  slaDueAt,
  status,
  isOverdue,
}: {
  slaDueAt: string;
  status: string;
  isOverdue: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    isPast: boolean;
  } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(slaDueAt).getTime();
      const diff = target - now;

      const isPast = diff <= 0;
      const absoluteDiff = Math.abs(diff);
      const hours = Math.floor(absoluteDiff / (1000 * 60 * 60));
      const minutes = Math.floor((absoluteDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ hours, minutes, isPast });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [slaDueAt]);

  if (status === "RESOLVED") {
    return (
      <span
        style={{
          padding: "0.4rem 1rem",
          fontSize: "1.1rem",
          fontFamily: "var(--_font-accent)",
          fontWeight: 600,
          borderRadius: "0.2rem",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          color: "#10b981",
          border: "1px solid rgba(16, 185, 129, 0.3)",
        }}
      >
        ✓ SLA Cumprido
      </span>
    );
  }

  if (!timeLeft) return null;

  if (timeLeft.isPast || isOverdue) {
    return (
      <span
        style={{
          padding: "0.4rem 1.2rem",
          fontSize: "1.1rem",
          fontFamily: "var(--_font-accent)",
          fontWeight: 700,
          borderRadius: "0.2rem",
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          color: "#ef4444",
          border: "1px solid #ef4444",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "0.8rem",
            height: "0.8rem",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
          }}
        ></span>
        SLA Estourado (+{timeLeft.hours}h {timeLeft.minutes}m)
      </span>
    );
  }

  const isWarning = timeLeft.hours < 6;

  return (
    <span
      style={{
        padding: "0.4rem 1.2rem",
        fontSize: "1.1rem",
        fontFamily: "var(--_font-accent)",
        fontWeight: 600,
        borderRadius: "0.2rem",
        backgroundColor: isWarning ? "rgba(245, 158, 11, 0.15)" : "rgba(59, 130, 246, 0.1)",
        color: isWarning ? "#f59e0b" : "var(--accent)",
        border: `1px solid ${isWarning ? "#f59e0b" : "var(--accent)"}`,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      <span>⏱</span>
      SLA Regressivo: {timeLeft.hours}h {timeLeft.minutes}m restantes
    </span>
  );
}

interface PortalProps {
  data: {
    client: {
      id: string;
      fullName: string | null;
      email: string;
      companyName: string | null;
      activeProject: {
        id: string;
        name: string;
        domain: string | null;
        description?: string | null;
      } | null;
    };
    sustainability?: {
      planName: string;
      monthlyPrice: number;
      monthlyQuota: number;
      emailBoxes: string;
      features: string;
      slaHoursLabel: string;
      ticketsConsumedThisMonth: number;
    };
    totalPendingSetupBalance?: number;
    stats: {
      openTickets: number;
      waitingTickets: number;
      resolvedTickets: number;
      overdueTickets: number;
    };
    tickets: Array<{
      id: string;
      ticketNumber: number;
      title: string;
      description: string;
      category: TicketCategory;
      status: string;
      slaHours: number;
      slaDueAt: string;
      createdAt: string;
      isOverdue: boolean;
      projectName: string;
      attachments: Array<{ id: string; fileName: string; fileUrl: string }>;
    }>;
    activeInvoice: {
      id: string;
      invoiceNumber: string;
      dueDate: string;
      totalAmount: number;
      pixCopyPaste: string | null;
      pixQrCode: string | null;
      gatewayInvoiceUrl: string | null;
      items: Array<{ id: string; description: string; amount: number }>;
    } | null;
    upcomingInstallments?: Array<{
      id: string;
      installmentNumber: number;
      amount: number;
      scheduledDate: string;
      description: string;
      projectName: string;
      status: string;
    }>;
    invoicesHistory: Array<{
      id: string;
      invoiceNumber: string;
      dueDate: string;
      totalAmount: number;
      status: string;
      paidAt: string | null;
      receiptUrl?: string | null;
      gatewayInvoiceUrl?: string | null;
    }>;
  };
}

export default function PortalDashboardView({ data }: PortalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"TICKETS" | "BILLING">("TICKETS");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Estados de Chamados & Comentários
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("BASIC");
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ fileName: string; fileUrl: string; fileSize?: number; mimeType?: string }>
  >([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Estados de Thread de Comentários por Ticket
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [ticketId: string]: string }>({});

  // Estados de Pagamento e Adiantamento
  const [selectedInstallments, setSelectedInstallments] = useState<string[]>([]);
  const [isConsolidating, setIsConsolidating] = useState(false);

  const toggleInstallment = (id: string) => {
    setSelectedInstallments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAdvancePayment = async () => {
    if (selectedInstallments.length === 0) {
      alert("Selecione ao menos uma parcela futura para adiantamento.");
      return;
    }
    setIsConsolidating(true);
    try {
      const res = await generateConsolidatedPaymentAction({
        includeCurrentInvoice: false,
        selectedInstallmentIds: selectedInstallments,
        paymentMethod: "PIX",
      });
      if (res.success && res.checkoutUrl) {
        window.open(res.checkoutUrl, "_blank", "noopener,noreferrer");
      } else {
        alert(res.error || "Erro ao gerar link de pagamento.");
      }
    } catch (err: any) {
      alert(err.message || "Erro de conexão ao gerar adiantamento.");
    } finally {
      setIsConsolidating(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const supabase = createClient();
    const files = Array.from(e.target.files);

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${data.client.id}/${fileName}`;

      const { data: uploadData, error } = await supabase.storage
        .from("ticket-attachments")
        .upload(filePath, file);

      if (!error && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from("ticket-attachments")
          .getPublicUrl(filePath);

        setUploadedFiles((prev) => [
          ...prev,
          {
            fileName: file.name,
            fileUrl: publicUrlData.publicUrl,
            fileSize: file.size,
            mimeType: file.type,
          },
        ]);
      } else {
        setUploadedFiles((prev) => [
          ...prev,
          {
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            fileSize: file.size,
            mimeType: file.type,
          },
        ]);
      }
    }
    setUploading(false);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.client.activeProject) {
      alert("Nenhum projeto ativo associado à sua conta.");
      return;
    }

    startTransition(async () => {
      const res = await createTicketAction({
        title,
        description,
        category,
        projectId: data.client.activeProject!.id,
        attachments: uploadedFiles,
      });

      if (res.success) {
        setIsModalOpen(false);
        setTitle("");
        setDescription("");
        setUploadedFiles([]);
        setFeedback("Chamado aberto com sucesso!");
        setTimeout(() => setFeedback(null), 4000);
        router.refresh();
      } else {
        alert(res.error || "Falha ao abrir chamado.");
      }
    });
  };

  const handleAddComment = (ticketId: string) => {
    const text = commentInputs[ticketId]?.trim();
    if (!text) return;

    startTransition(async () => {
      const res = await addTicketCommentAction(ticketId, text);
      if (res.success) {
        setCommentInputs((prev) => ({ ...prev, [ticketId]: "" }));
        setFeedback("Comentário adicionado com sucesso!");
        setTimeout(() => setFeedback(null), 4000);
        router.refresh();
      } else {
        alert(res.error || "Erro ao adicionar comentário.");
      }
    });
  };

  const handleRequestAddon = (addonName: string, basePrice: string) => {
    setTitle(`Solicitação de Serviço: ${addonName}`);
    setDescription(
      `Gostaria de contratar o serviço adicional "${addonName}" (${basePrice}).\nPor favor, entrar em contato para validação de escopo e início da execução técnica.`
    );
    setCategory("ADVANCED");
    setIsModalOpen(true);
  };

  const handleRequestUpgradePlan = (targetPlan: string) => {
    setTitle(`Solicitação de Upgrade para Plano ${targetPlan}`);
    setDescription(
      `Solicito o upgrade do meu plano de sustentação atual (${
        data.sustainability?.planName || "Atual"
      }) para o plano ${targetPlan}.\nFavor aplicar as novas cotas e atualizar a recorrência.`
    );
    setCategory("ADVANCED");
    setIsUpgradeModalOpen(false);
    setIsModalOpen(true);
  };

  const plan = data.sustainability;

  return (
    <main
      className="mxd-page-content inner-page-content"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--base)",
        paddingTop: "clamp(12rem, 16vw, 18rem)",
        paddingBottom: "10rem",
      }}
    >
      <div className="mxd-container grid-l-container">
        {/* Notificação Flutuante */}
        {feedback && (
          <div
            style={{
              position: "fixed",
              top: "3rem",
              right: "3rem",
              zIndex: 9999,
              padding: "1.4rem 2rem",
              backgroundColor: "#064e3b",
              border: "1px solid #10b981",
              color: "#fff",
              fontFamily: "var(--_font-accent)",
              fontSize: "1.3rem",
              borderRadius: "0.2rem",
            }}
          >
            {feedback}
          </div>
        )}

        {/* Top Header Bar do Cliente */}
        <div
          className="mxd-block"
          style={{
            paddingTop: "2rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid var(--st-medium)",
            marginBottom: "3.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "2rem",
            }}
          >
            <div>
              <span
                className="tag tag-s tag-medium"
                style={{
                  color: "var(--accent)",
                  letterSpacing: "0.1rem",
                  display: "inline-block",
                  marginBottom: "0.8rem",
                  fontFamily: "var(--_font-accent)",
                }}
              >
                Área do Cliente — {data.client.companyName || data.client.fullName || data.client.email}
              </span>
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 3.5vw, 4.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "var(--t-bright)",
                  fontFamily: "var(--_font-default)",
                  margin: 0,
                }}
              >
                Painel do Projeto & Chamados
              </h1>
              <p
                style={{
                  color: "var(--t-medium)",
                  fontSize: "1.4rem",
                  marginTop: "0.8rem",
                  fontFamily: "var(--_font-default)",
                  margin: 0,
                }}
              >
                Projeto:{" "}
                <strong style={{ color: "var(--t-bright)" }}>
                  {data.client.activeProject ? data.client.activeProject.name : "Nenhum projeto ativo"}
                </strong>
                {data.client.activeProject?.domain && ` (${data.client.activeProject.domain})`}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setCategory("BASIC");
                  setIsModalOpen(true);
                }}
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{
                  height: "4.4rem",
                  padding: "0.4rem 0.4rem 0.4rem 1.6rem",
                  fontSize: "1.4rem",
                }}
              >
                <span
                  className="btn-caption"
                  style={{ fontFamily: "var(--_font-accent)", fontWeight: 700 }}
                >
                  Abrir Chamado
                </span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 18"
                    width="14"
                    height="14"
                    fill="currentColor"
                  >
                    <path d="M8,1h2v16H8V1z M1,8h16v2H1V8z" />
                  </svg>
                </i>
              </button>

              <form action={signOut}>
                <button
                  type="submit"
                  className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left"
                  title="Sair da Conta"
                >
                  <span className="btn-caption" style={{ fontSize: "1.3rem" }}>
                    Sair
                  </span>
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      width="14"
                      height="14"
                      fill="currentColor"
                    >
                      <path d="M120,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h64a8,8,0,0,1,0,16H48V208h64A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z" />
                    </svg>
                  </i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Card de Informações do Projeto & Sustentação Contratada */}
        <div
          className="mxd-block"
          style={{
            backgroundColor: "var(--base-tint)",
            border: "1px solid var(--st-medium)",
            padding: "3rem",
            borderRadius: "0.4rem",
            marginBottom: "4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.6rem" }}>
                <span className="tag tag-s tag-medium" style={{ color: "var(--accent)", fontFamily: "var(--_font-accent)" }}>
                  Ambiente Ativo
                </span>
                <span style={{ fontSize: "1.2rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                  {data.client.activeProject?.domain || "Domínio em ativação"}
                </span>
              </div>
              <h3 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.6rem 0", fontFamily: "var(--_font-default)" }}>
                {data.client.activeProject?.name || "Projeto MindSite"}
              </h3>
              <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0, lineHeight: 1.5 }}>
                {data.client.activeProject?.description || "Desenvolvimento web, arquitetura serverless e suporte contínuo."}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "var(--base)",
                border: "1px solid var(--st-medium)",
                padding: "2rem 2.5rem",
                borderRadius: "0.4rem",
                minWidth: "320px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)" }}>
                  Plano de Sustentação
                </span>
                <span
                  style={{
                    padding: "0.3rem 0.8rem",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    borderRadius: "0.2rem",
                    backgroundColor: "rgba(0, 43, 186, 0.1)",
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    fontFamily: "var(--_font-accent)",
                  }}
                >
                  {plan?.planName || "Sem Plano"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "1.2rem", fontFamily: "var(--_font-accent)", color: "var(--t-medium)" }}>
                <div>📧 {plan?.emailBoxes || "Caixas de e-mail sob demanda"}</div>
                <div>🛠 {plan?.features || "Suporte técnico sob demanda"}</div>
                <div style={{ color: "var(--t-bright)", fontWeight: 600, marginTop: "0.5rem" }}>
                  📊 Você consumiu <strong style={{ color: "var(--accent)" }}>{plan?.ticketsConsumedThisMonth || 0}</strong> chamados de sua cota neste ciclo
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsUpgradeModalOpen(true)}
                style={{
                  marginTop: "1.5rem",
                  width: "100%",
                  height: "3.8rem",
                  backgroundColor: "var(--base-tint)",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  borderRadius: "0.2rem",
                  cursor: "pointer",
                }}
              >
                ⚡ Fazer Upgrade de Plano
              </button>
            </div>
          </div>
        </div>

        {/* 4 Cards Métricos de Suporte com botão "Ver Faturas" integrado */}
        <div className="mxd-block" style={{ marginBottom: "5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                padding: "2.5rem",
                borderRadius: "0.2rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  color: "var(--t-medium)",
                  marginBottom: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Chamados em Andamento
              </span>
              <div
                style={{
                  fontFamily: "var(--_font-accent)",
                  fontSize: "2.8rem",
                  fontWeight: 700,
                  color: "var(--t-bright)",
                }}
              >
                {data.stats.openTickets}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                padding: "2.5rem",
                borderRadius: "0.2rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  color: "var(--t-medium)",
                  marginBottom: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Aguardando Validação
              </span>
              <div
                style={{
                  fontFamily: "var(--_font-accent)",
                  fontSize: "2.8rem",
                  fontWeight: 700,
                  color: "var(--t-bright)",
                }}
              >
                {data.stats.waitingTickets}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                padding: "2.5rem",
                borderRadius: "0.2rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  color: "var(--t-medium)",
                  marginBottom: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Chamados Concluídos
              </span>
              <div
                style={{
                  fontFamily: "var(--_font-accent)",
                  fontSize: "2.8rem",
                  fontWeight: 700,
                  color: "#10b981",
                }}
              >
                {data.stats.resolvedTickets}
              </div>
            </div>

            {/* Card Fatura do Mês com Botão Estilizado "Ver Faturas" */}
            <div
              style={{
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                padding: "2.5rem",
                borderRadius: "0.2rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  color: "var(--t-medium)",
                  marginBottom: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Fatura do Mês
              </span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div
                  style={{
                    fontFamily: "var(--_font-accent)",
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    color: data.activeInvoice ? "var(--accent)" : "#10b981",
                  }}
                >
                  {data.activeInvoice
                    ? `R$ ${data.activeInvoice.totalAmount.toFixed(2).replace(".", ",")}`
                    : "Quitada"}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("BILLING")}
                  style={{
                    padding: "0.6rem 1.2rem",
                    fontSize: "1.1rem",
                    fontFamily: "var(--_font-accent)",
                    backgroundColor: "var(--base)",
                    border: "1px solid var(--st-medium)",
                    borderRadius: "0.2rem",
                    color: "var(--t-bright)",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Ver Faturas ➔
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div
          className="mxd-block"
          style={{ borderBottom: "1px solid var(--st-medium)", marginBottom: "4rem" }}
        >
          <div style={{ display: "flex", gap: "3rem" }}>
            <button
              type="button"
              onClick={() => setActiveTab("TICKETS")}
              style={{
                backgroundColor: "transparent",
                border: "none",
                borderBottom: activeTab === "TICKETS" ? "2px solid var(--accent)" : "2px solid transparent",
                padding: "1.2rem 0",
                fontFamily: "var(--_font-accent)",
                fontSize: "1.3rem",
                textTransform: "uppercase",
                letterSpacing: "0.08rem",
                fontWeight: 700,
                color: activeTab === "TICKETS" ? "var(--accent)" : "var(--t-medium)",
                cursor: "pointer",
              }}
            >
              Histórico de Chamados ({data.tickets.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("BILLING")}
              style={{
                backgroundColor: "transparent",
                border: "none",
                borderBottom: activeTab === "BILLING" ? "2px solid var(--accent)" : "2px solid transparent",
                padding: "1.2rem 0",
                fontFamily: "var(--_font-accent)",
                fontSize: "1.3rem",
                textTransform: "uppercase",
                letterSpacing: "0.08rem",
                fontWeight: 700,
                color: activeTab === "BILLING" ? "var(--accent)" : "var(--t-medium)",
                cursor: "pointer",
              }}
            >
              Faturas
            </button>
          </div>
        </div>

        {/* ABA 1: LISTAGEM DE CHAMADOS DO CLIENTE & CATÁLOGO DE ADD-ONS */}
        {activeTab === "TICKETS" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
            {/* Lista de Chamados com Timeline Interativa */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--t-bright)", margin: 0, fontFamily: "var(--_font-default)" }}>
                  Fila de Chamados do Projeto
                </h3>
                <span style={{ fontSize: "1.2rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                  Clique no chamado para expandir a timeline e enviar comentários
                </span>
              </div>

              {data.tickets.length === 0 ? (
                <div
                  style={{
                    backgroundColor: "var(--base-tint)",
                    border: "1px solid var(--st-medium)",
                    padding: "4rem",
                    textAlign: "center",
                    color: "var(--t-muted)",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.3rem",
                  }}
                >
                  Você não possui chamados abertos no momento. Clique em &quot;Abrir Chamado&quot; para solicitar suporte técnico.
                </div>
              ) : (
                data.tickets.map((t) => {
                  const slaDate = new Date(t.slaDueAt);
                  const isExpanded = expandedTicketId === t.id;

                  return (
                    <div
                      key={t.id}
                      style={{
                        backgroundColor: "var(--base-tint)",
                        border: `1px solid ${isExpanded ? "var(--accent)" : "var(--st-medium)"}`,
                        padding: "2.5rem",
                        borderRadius: "0.4rem",
                        transition: "border-color 0.2s ease",
                      }}
                    >
                      {/* Header do Card com clique para expandir */}
                      <div
                        onClick={() => setExpandedTicketId(isExpanded ? null : t.id)}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "1.5rem",
                          marginBottom: "1.2rem",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
                          <span
                            style={{
                              fontFamily: "var(--_font-accent)",
                              fontSize: "1.4rem",
                              fontWeight: 700,
                              color: "var(--accent)",
                            }}
                          >
                            #{t.ticketNumber}
                          </span>
                          <strong
                            style={{
                              fontSize: "1.6rem",
                              color: "var(--t-bright)",
                              fontFamily: "var(--_font-default)",
                            }}
                          >
                            {t.title}
                          </strong>

                          {/* Status do Chamado */}
                          <span
                            style={{
                              padding: "0.2rem 0.8rem",
                              fontSize: "1rem",
                              fontFamily: "var(--_font-accent)",
                              textTransform: "uppercase",
                              borderRadius: "0.2rem",
                              backgroundColor:
                                t.status === "RESOLVED"
                                  ? "rgba(16, 185, 129, 0.1)"
                                  : t.status === "IN_PROGRESS"
                                  ? "rgba(245, 158, 11, 0.1)"
                                  : t.status === "WAITING_CLIENT"
                                  ? "rgba(168, 85, 247, 0.1)"
                                  : "rgba(59, 130, 246, 0.1)",
                              color:
                                t.status === "RESOLVED"
                                  ? "#10b981"
                                  : t.status === "IN_PROGRESS"
                                  ? "#f59e0b"
                                  : t.status === "WAITING_CLIENT"
                                  ? "#a855f7"
                                  : "#3b82f6",
                              border: "1px solid currentColor",
                            }}
                          >
                            {t.status === "OPEN" && "Aberto"}
                            {t.status === "IN_PROGRESS" && "Em Andamento"}
                            {t.status === "WAITING_CLIENT" && "Aguardando Validação"}
                            {t.status === "RESOLVED" && "Concluído"}
                            {t.status === "CANCELLED" && "Cancelado"}
                          </span>

                          {/* Categoria do SLA */}
                          <span
                            style={{
                              padding: "0.2rem 0.8rem",
                              fontSize: "1rem",
                              fontFamily: "var(--_font-accent)",
                              textTransform: "uppercase",
                              borderRadius: "0.2rem",
                              backgroundColor: "var(--base)",
                              color: "var(--t-medium)",
                              border: "1px solid var(--st-medium)",
                            }}
                          >
                            {t.category === "BASIC" && "Básico (24h)"}
                            {t.category === "INTERMEDIATE" && "Intermediário (72h)"}
                            {t.category === "ADVANCED" && "Avançado (7 dias)"}
                          </span>
                        </div>

                        {/* SLA Regressivo e Prazo Final */}
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.2rem" }}>
                          <SLACountdownBadge slaDueAt={t.slaDueAt} status={t.status} isOverdue={t.isOverdue} />
                          <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.2rem", color: "var(--t-muted)" }}>
                            Prazo:{" "}
                            <strong
                              style={{
                                color: t.isOverdue && t.status !== "RESOLVED" ? "#ef4444" : "var(--t-bright)",
                              }}
                            >
                              {slaDate.toLocaleDateString("pt-BR")}{" "}
                              {slaDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                            </strong>
                          </span>
                          <span style={{ fontSize: "1.4rem", color: "var(--t-muted)" }}>
                            {isExpanded ? "▲" : "▼"}
                          </span>
                        </div>
                      </div>

                      {/* Descrição e Timeline de Comentários */}
                      <p
                        style={{
                          color: "var(--t-medium)",
                          fontSize: "1.3rem",
                          lineHeight: 1.6,
                          whiteSpace: "pre-line",
                          margin: 0,
                          fontFamily: "var(--_font-default)",
                        }}
                      >
                        {t.description}
                      </p>

                      {/* Anexos */}
                      {t.attachments.length > 0 && (
                        <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                          {t.attachments.map((att) => (
                            <a
                              key={att.id}
                              href={att.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: "1.1rem",
                                fontFamily: "var(--_font-accent)",
                                padding: "0.4rem 1rem",
                                backgroundColor: "var(--base)",
                                border: "1px solid var(--st-medium)",
                                color: "var(--t-bright)",
                                textDecoration: "none",
                                borderRadius: "0.2rem",
                              }}
                            >
                              📎 {att.fileName} ↗
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Thread Expandida: Envio de Novo Comentário */}
                      {isExpanded && (
                        <div
                          style={{
                            marginTop: "2.5rem",
                            paddingTop: "2rem",
                            borderTop: "1px solid var(--st-medium)",
                          }}
                        >
                          <label
                            style={{
                              display: "block",
                              fontFamily: "var(--_font-accent)",
                              fontSize: "1.1rem",
                              textTransform: "uppercase",
                              color: "var(--t-muted)",
                              marginBottom: "0.8rem",
                            }}
                          >
                            Adicionar Resposta / Dúvida ao Chamado #{t.ticketNumber}:
                          </label>
                          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <textarea
                              rows={3}
                              value={commentInputs[t.id] || ""}
                              onChange={(e) =>
                                setCommentInputs({ ...commentInputs, [t.id]: e.target.value })
                              }
                              placeholder="Digite sua mensagem para a equipe técnica da MindSite..."
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
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <button
                                type="button"
                                disabled={isPending || !commentInputs[t.id]?.trim()}
                                onClick={() => handleAddComment(t.id)}
                                className="btn btn-default-icon btn-default-accent"
                                style={{
                                  height: "4rem",
                                  padding: "0 1.8rem",
                                  fontSize: "1.2rem",
                                  fontFamily: "var(--_font-accent)",
                                }}
                              >
                                Enviar Mensagem ➔
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Catálogo de Novos Serviços & Add-ons */}
            <div
              style={{
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                padding: "3.5rem",
                borderRadius: "0.4rem",
              }}
            >
              <div style={{ marginBottom: "2.5rem" }}>
                <span
                  className="tag tag-s tag-medium"
                  style={{ color: "var(--accent)", marginBottom: "0.6rem", display: "inline-block", fontFamily: "var(--_font-accent)" }}
                >
                  Expansão Digital
                </span>
                <h3 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0", fontFamily: "var(--_font-default)" }}>
                  Catálogo de Novos Serviços & Add-ons
                </h3>
                <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
                  Contrate novas funcionalidades para seu ambiente com abertura imediata de chamado prioritário.
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "2rem",
                }}
              >
                {[
                  {
                    title: "Landing Page de Alta Conversão",
                    price: "A partir de R$ 1.500,00",
                    desc: "Página moderna otimizada para captação de leads, integrações analíticas e WhatsApp.",
                  },
                  {
                    title: "Refatoração Completa de Página / Home",
                    price: "A partir de R$ 800,00",
                    desc: "Novo design, tipografia atualizada, responsividade mobile e melhorias em performance.",
                  },
                  {
                    title: "Módulo de Blog / Artigos SEO",
                    price: "A partir de R$ 2.000,00",
                    desc: "Sistema de postagens otimizado para rankeamento orgânico no Google com tags e rich snippets.",
                  },
                  {
                    title: "Integração de Agente IA / Chatbot",
                    price: "A partir de R$ 2.500,00",
                    desc: "Assistente virtual conectado ao seu catálogo para atendimento 24/7 de visitantes.",
                  },
                  {
                    title: "Nova Rota / Seção Institucional",
                    price: "A partir de R$ 500,00",
                    desc: "Criação de nova página ou bloco adicional com layout alinhado ao seu design system.",
                  },
                ].map((addon, index) => (
                  <div
                    key={index}
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
                      <h4 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.8rem 0" }}>
                        {addon.title}
                      </h4>
                      <div style={{ fontFamily: "var(--_font-accent)", fontSize: "1.4rem", color: "var(--accent)", fontWeight: 700, marginBottom: "1rem" }}>
                        {addon.price}
                      </div>
                      <p style={{ fontSize: "1.2rem", color: "var(--t-medium)", lineHeight: 1.5, margin: 0 }}>
                        {addon.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRequestAddon(addon.title, addon.price)}
                      style={{
                        marginTop: "2rem",
                        height: "4rem",
                        backgroundColor: "var(--base-tint)",
                        border: "1px solid var(--st-medium)",
                        color: "var(--t-bright)",
                        fontFamily: "var(--_font-accent)",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        borderRadius: "0.2rem",
                        cursor: "pointer",
                      }}
                    >
                      Solicitar Add-on ➔
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: FATURAS & PAGAMENTOS */}
        {activeTab === "BILLING" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {/* Fatura Vigente em Aberto */}
            {data.activeInvoice ? (
              <div
                style={{
                  backgroundColor: "var(--base-tint)",
                  border: "1px solid var(--accent)",
                  padding: "3.5rem",
                  borderRadius: "0.4rem",
                }}
              >
                <span
                  className="tag tag-s tag-medium"
                  style={{
                    color: "var(--accent)",
                    marginBottom: "1rem",
                    display: "inline-block",
                    fontFamily: "var(--_font-accent)",
                  }}
                >
                  Fatura em Aberto
                </span>
                <h3
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: 700,
                    color: "var(--t-bright)",
                    margin: "0 0 1rem 0",
                    fontFamily: "var(--_font-default)",
                  }}
                >
                  {data.activeInvoice.invoiceNumber} — Vencimento:{" "}
                  {new Date(data.activeInvoice.dueDate).toLocaleDateString("pt-BR")}
                </h3>

                <div
                  style={{
                    borderTop: "1px solid var(--st-medium)",
                    borderBottom: "1px solid var(--st-medium)",
                    padding: "1.5rem 0",
                    margin: "2rem 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  {data.activeInvoice.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "var(--_font-accent)",
                        fontSize: "1.3rem",
                      }}
                    >
                      <span style={{ color: "var(--t-medium)" }}>{item.description}</span>
                      <strong style={{ color: "var(--t-bright)" }}>
                        R$ {item.amount.toFixed(2).replace(".", ",")}
                      </strong>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.6rem",
                      marginTop: "1rem",
                      paddingTop: "1rem",
                      borderTop: "1px dashed var(--st-medium)",
                    }}
                  >
                    <span style={{ color: "var(--t-bright)", fontWeight: 700 }}>Total a Pagar:</span>
                    <strong style={{ color: "var(--accent)" }}>
                      R$ {data.activeInvoice.totalAmount.toFixed(2).replace(".", ",")}
                    </strong>
                  </div>
                </div>

                {data.activeInvoice.pixCopyPaste && (
                  <div
                    style={{
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      padding: "2rem",
                      borderRadius: "0.2rem",
                      marginTop: "2rem",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--_font-accent)",
                        fontSize: "1.1rem",
                        textTransform: "uppercase",
                        color: "var(--t-muted)",
                        marginBottom: "0.6rem",
                      }}
                    >
                      Código Pix Copia e Cola
                    </span>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <input
                        readOnly
                        value={data.activeInvoice.pixCopyPaste}
                        style={{
                          width: "100%",
                          height: "4.2rem",
                          padding: "0 1.2rem",
                          backgroundColor: "var(--base-tint)",
                          border: "1px solid var(--st-medium)",
                          color: "var(--t-bright)",
                          fontFamily: "var(--_font-accent)",
                          fontSize: "1.2rem",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(data.activeInvoice!.pixCopyPaste!);
                          alert("Código Pix copiado!");
                        }}
                        className="btn btn-default-icon btn-default-accent"
                        style={{ height: "4.2rem", padding: "0 1.6rem", fontSize: "1.2rem", whiteSpace: "nowrap" }}
                      >
                        Copiar Pix
                      </button>
                    </div>
                  </div>
                )}

                {data.activeInvoice.gatewayInvoiceUrl && (
                  <div style={{ marginTop: "2.5rem" }}>
                    <a
                      href={data.activeInvoice.gatewayInvoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-default-icon btn-default-accent"
                      style={{
                        height: "4.8rem",
                        padding: "0 2.4rem",
                        fontSize: "1.3rem",
                        fontFamily: "var(--_font-accent)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      💳 Pagar no Checkout InfinitePay (Pix ou Cartão) ➔
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "var(--base-tint)",
                  border: "1px solid var(--st-medium)",
                  padding: "3rem",
                  color: "#10b981",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.4rem",
                  borderRadius: "0.4rem",
                }}
              >
                ✓ Nenhuma fatura pendente. Seus pagamentos estão em dia!
              </div>
            )}

            {/* Seção "Próximos Pagamentos Acordados" (Parcelas de Setup com Visão Transparente) */}
            <div
              style={{
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                padding: "3.5rem",
                borderRadius: "0.4rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--t-bright)",
                      margin: "0 0 0.5rem 0",
                      fontFamily: "var(--_font-default)",
                    }}
                  >
                    Próximos Pagamentos Acordados
                  </h4>
                  <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
                    Cronograma de parcelas futuras de implantação/setup contratadas com a agência.
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--base)",
                    border: "1px solid var(--st-medium)",
                    padding: "1rem 2rem",
                    borderRadius: "0.2rem",
                    fontFamily: "var(--_font-accent)",
                    textAlign: "right",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", display: "block" }}>
                    Saldo Total em Aberto:
                  </span>
                  <strong style={{ fontSize: "1.8rem", color: "var(--accent)" }}>
                    R$ {(data.totalPendingSetupBalance || 0).toFixed(2).replace(".", ",")}
                  </strong>
                </div>
              </div>

              {!data.upcomingInstallments || data.upcomingInstallments.length === 0 ? (
                <div
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "var(--t-muted)",
                    fontFamily: "var(--_font-accent)",
                  }}
                >
                  Nenhuma parcela de implantação pendente. Seu projeto está 100% quitado!
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      textAlign: "left",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          borderBottom: "1px solid var(--st-medium)",
                          color: "var(--t-muted)",
                          textTransform: "uppercase",
                          fontSize: "1.1rem",
                        }}
                      >
                        <th style={{ padding: "1.2rem 1rem", width: "4rem" }}>Sel.</th>
                        <th style={{ padding: "1.2rem 1rem" }}>Parcela / Descrição</th>
                        <th style={{ padding: "1.2rem 1rem" }}>Projeto</th>
                        <th style={{ padding: "1.2rem 1rem" }}>Data de Vencimento</th>
                        <th style={{ padding: "1.2rem 1rem", textAlign: "right" }}>Valor</th>
                        <th style={{ padding: "1.2rem 1rem", textAlign: "center" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.upcomingInstallments.map((inst) => {
                        const isSelected = selectedInstallments.includes(inst.id);
                        return (
                          <tr
                            key={inst.id}
                            onClick={() => toggleInstallment(inst.id)}
                            style={{
                              borderBottom: "1px solid var(--st-medium)",
                              cursor: "pointer",
                              backgroundColor: isSelected ? "rgba(0, 43, 186, 0.08)" : "transparent",
                            }}
                          >
                            <td style={{ padding: "1.2rem 1rem", textAlign: "center" }}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                style={{ width: "1.6rem", height: "1.6rem", cursor: "pointer" }}
                              />
                            </td>
                            <td style={{ padding: "1.2rem 1rem", color: "var(--t-bright)" }}>
                              <strong>#{inst.installmentNumber}</strong> — {inst.description}
                            </td>
                            <td style={{ padding: "1.2rem 1rem", color: "var(--t-medium)" }}>
                              {inst.projectName}
                            </td>
                            <td style={{ padding: "1.2rem 1rem", color: "var(--t-medium)" }}>
                              {new Date(inst.scheduledDate).toLocaleDateString("pt-BR")}
                            </td>
                            <td
                              style={{
                                padding: "1.2rem 1rem",
                                textAlign: "right",
                                color: "var(--t-bright)",
                                fontWeight: 700,
                              }}
                            >
                              R$ {inst.amount.toFixed(2).replace(".", ",")}
                            </td>
                            <td style={{ padding: "1.2rem 1rem", textAlign: "center" }}>
                              <span
                                style={{
                                  padding: "0.2rem 0.6rem",
                                  fontSize: "1rem",
                                  borderRadius: "0.2rem",
                                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                                  color: "#3b82f6",
                                  border: "1px solid rgba(59, 130, 246, 0.3)",
                                }}
                              >
                                {inst.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {selectedInstallments.length > 0 && (
                    <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        disabled={isConsolidating}
                        onClick={handleAdvancePayment}
                        className="btn btn-default-icon btn-default-accent"
                        style={{ height: "4.5rem", padding: "0 2.2rem", fontSize: "1.3rem" }}
                      >
                        {isConsolidating
                          ? "Gerando Checkout..."
                          : `Adiantar ${selectedInstallments.length} Parcela(s) na InfinitePay ➔`}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Histórico Anterior de Faturas */}
            <div
              style={{
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                padding: "3rem",
                borderRadius: "0.4rem",
              }}
            >
              <h4
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "var(--t-bright)",
                  margin: "0 0 2rem 0",
                  fontFamily: "var(--_font-default)",
                }}
              >
                Histórico de Faturas Anteriores
              </h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.3rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid var(--st-medium)",
                      color: "var(--t-muted)",
                      textTransform: "uppercase",
                      fontSize: "1.1rem",
                    }}
                  >
                    <th style={{ padding: "1rem" }}>Identificador</th>
                    <th style={{ padding: "1rem" }}>Vencimento</th>
                    <th style={{ padding: "1rem", textAlign: "right" }}>Valor</th>
                    <th style={{ padding: "1rem", textAlign: "center" }}>Status</th>
                    <th style={{ padding: "1rem", textAlign: "right" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {data.invoicesHistory.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        style={{ padding: "2rem", textAlign: "center", color: "var(--t-muted)" }}
                      >
                        Nenhum registro de fatura arquivado.
                      </td>
                    </tr>
                  ) : (
                    data.invoicesHistory.map((inv) => (
                      <tr key={inv.id} style={{ borderBottom: "1px solid var(--st-medium)" }}>
                        <td style={{ padding: "1.2rem 1rem", color: "var(--t-bright)" }}>
                          {inv.invoiceNumber}
                        </td>
                        <td style={{ padding: "1.2rem 1rem", color: "var(--t-medium)" }}>
                          {new Date(inv.dueDate).toLocaleDateString("pt-BR")}
                        </td>
                        <td
                          style={{
                            padding: "1.2rem 1rem",
                            textAlign: "right",
                            color: "var(--t-bright)",
                          }}
                        >
                          R$ {inv.totalAmount.toFixed(2).replace(".", ",")}
                        </td>
                        <td style={{ padding: "1.2rem 1rem", textAlign: "center" }}>
                          <span
                            style={{
                              fontSize: "1rem",
                              color: inv.status === "PAID" ? "#10b981" : "#f59e0b",
                            }}
                          >
                            {inv.status === "PAID" ? "PAGO" : "PENDENTE"}
                          </span>
                        </td>
                        <td style={{ padding: "1.2rem 1rem", textAlign: "right" }}>
                          {inv.receiptUrl ? (
                            <a
                              href={inv.receiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--accent)",
                                textDecoration: "underline",
                                fontSize: "1.1rem",
                              }}
                            >
                              Comprovante ↗
                            </a>
                          ) : inv.status !== "PAID" && inv.gatewayInvoiceUrl ? (
                            <a
                              href={inv.gatewayInvoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--accent)",
                                textDecoration: "underline",
                                fontSize: "1.1rem",
                              }}
                            >
                              Pagar ↗
                            </a>
                          ) : (
                            <span style={{ color: "var(--t-muted)", fontSize: "1.1rem" }}>-</span>
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
      </div>

      {/* MODAL: NOVO CHAMADO TÉCNICO */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--base-tint)",
              border: "1px solid var(--st-medium)",
              maxWidth: "600px",
              width: "100%",
              padding: "3.5rem",
              borderRadius: "0.4rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h3
              style={{
                fontSize: "2rem",
                fontFamily: "var(--_font-default)",
                fontWeight: 700,
                color: "var(--t-bright)",
                margin: "0 0 1.5rem 0",
              }}
            >
              Abrir Novo Chamado Técnico
            </h3>

            <form
              onSubmit={handleCreateTicket}
              className="form"
              style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    color: "var(--t-medium)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Título da Demanda
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Ajuste no botão de agendamento ou erro no formulário"
                  style={{
                    width: "100%",
                    height: "4.5rem",
                    padding: "0 1.5rem",
                    backgroundColor: "var(--base)",
                    border: "1px solid var(--st-medium)",
                    color: "var(--t-bright)",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.3rem",
                    borderRadius: "0.2rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    color: "var(--t-medium)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Nível de Complexidade & SLA
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TicketCategory)}
                  style={{
                    width: "100%",
                    height: "4.5rem",
                    padding: "0 1.5rem",
                    backgroundColor: "var(--base)",
                    border: "1px solid var(--st-medium)",
                    color: "var(--t-bright)",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.3rem",
                    borderRadius: "0.2rem",
                    outline: "none",
                  }}
                >
                  <option value="BASIC">Básico — SLA 24h (Dúvidas, correções pontuais de texto)</option>
                  <option value="INTERMEDIATE">
                    Intermediário — SLA 72h (Ajustes de layout, novas seções, formulários)
                  </option>
                  <option value="ADVANCED">
                    Avançado / Add-on — SLA 7 dias (Regras de negócio, integrações, novas rotas)
                  </option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    color: "var(--t-medium)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Detalhamento da Necessidade
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva com detalhes o que deve ser feito, páginas afetadas ou comportamento esperado..."
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
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    color: "var(--t-medium)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Anexar Mídias / Prints / Documentos
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  disabled={uploading}
                  style={{
                    width: "100%",
                    fontSize: "1.2rem",
                    fontFamily: "var(--_font-accent)",
                    color: "var(--t-medium)",
                  }}
                />
                {uploading && (
                  <span
                    style={{
                      display: "block",
                      color: "var(--accent)",
                      fontSize: "1.1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Fazendo upload no bucket seguro...
                  </span>
                )}
                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                    {uploadedFiles.map((f, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "1.1rem",
                          fontFamily: "var(--_font-accent)",
                          backgroundColor: "var(--base)",
                          border: "1px solid var(--st-medium)",
                          padding: "0.2rem 0.8rem",
                          borderRadius: "0.2rem",
                          color: "var(--t-bright)",
                        }}
                      >
                        ✓ {f.fileName}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "0.8rem 1.6rem",
                    background: "none",
                    border: "none",
                    color: "var(--t-medium)",
                    cursor: "pointer",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.2rem",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending || uploading}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4.4rem", padding: "0 2rem", fontSize: "1.3rem" }}
                >
                  {isPending ? "Criando Chamado..." : "Confirmar e Registrar SLA"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: COMPARATIVO E UPGRADE DE PLANO DE SUSTENTAÇÃO */}
      {isUpgradeModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--base-tint)",
              border: "1px solid var(--st-medium)",
              maxWidth: "850px",
              width: "100%",
              padding: "3.5rem",
              borderRadius: "0.4rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div>
                <span className="tag tag-s tag-medium" style={{ color: "var(--accent)", fontFamily: "var(--_font-accent)" }}>
                  Planos de Sustentação
                </span>
                <h3 style={{ fontSize: "2.4rem", fontWeight: 700, color: "var(--t-bright)", margin: "0.5rem 0 0 0", fontFamily: "var(--_font-default)" }}>
                  Comparativo de Planos MindSite
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUpgradeModalOpen(false)}
                style={{ background: "none", border: "none", color: "var(--t-muted)", fontSize: "2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "2.5rem" }}>
              {[
                {
                  name: "Essential",
                  price: "R$ 100/mês",
                  emails: "5 caixas de e-mail corporativas",
                  tickets: "5 chamados básicos mensais",
                  sla: "SLA padrão de 24h",
                  current: plan?.planName === "Essential",
                },
                {
                  name: "Development",
                  price: "R$ 300/mês",
                  emails: "15 caixas de e-mail corporativas",
                  tickets: "Chamados básicos e intermediários (layout e código)",
                  sla: "SLA ágil de 24h a 72h",
                  current: plan?.planName === "Development",
                },
                {
                  name: "Advanced",
                  price: "R$ 700/mês",
                  emails: "30+ caixas de e-mail corporativas",
                  tickets: "Regras de negócio, integrações de APIs e novas rotas",
                  sla: "SLA prioritário de até 7 dias",
                  current: plan?.planName === "Advanced",
                },
              ].map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--base)",
                    border: `1px solid ${p.current ? "var(--accent)" : "var(--st-medium)"}`,
                    padding: "2.5rem",
                    borderRadius: "0.4rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {p.current && (
                      <span style={{ fontSize: "1rem", color: "var(--accent)", fontFamily: "var(--_font-accent)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>
                        ★ Seu Plano Atual
                      </span>
                    )}
                    <h4 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.5rem 0" }}>
                      {p.name}
                    </h4>
                    <div style={{ fontFamily: "var(--_font-accent)", fontSize: "1.6rem", color: "var(--accent)", fontWeight: 700, marginBottom: "1.5rem" }}>
                      {p.price}
                    </div>

                    <ul style={{ paddingLeft: "1.6rem", fontSize: "1.2rem", color: "var(--t-medium)", lineHeight: 1.6, margin: 0, fontFamily: "var(--_font-accent)" }}>
                      <li>{p.emails}</li>
                      <li>{p.tickets}</li>
                      <li>{p.sla}</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    disabled={p.current}
                    onClick={() => handleRequestUpgradePlan(p.name)}
                    style={{
                      marginTop: "2rem",
                      height: "4rem",
                      backgroundColor: p.current ? "var(--base-tint)" : "var(--accent)",
                      color: p.current ? "var(--t-muted)" : "#fff",
                      border: "none",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      borderRadius: "0.2rem",
                      cursor: p.current ? "default" : "pointer",
                    }}
                  >
                    {p.current ? "Plano em Uso" : `Migrar para ${p.name} ➔`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}