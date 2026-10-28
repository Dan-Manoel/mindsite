"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TicketCategory, TicketStatus } from "@prisma/client";
import {
  LifeBuoy,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  UploadCloud,
  LogOut,
  Globe,
  ShieldCheck,
  Layers,
  FileText,
  Paperclip,
  X,
  File,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  createTicketAction,
  getAttachmentSignedUrlAction,
  uploadTicketAttachmentAction,
} from "@/app/actions/portal";
import { signOut } from "@/app/actions/auth";

interface PortalDataProps {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    companyName: string | null;
  };
  project: {
    id: string;
    name: string;
    domain: string | null;
    stagingUrl: string | null;
    isActive: boolean;
    planName: string;
    planPrice: number;
  } | null;
  metrics: {
    openCount: number;
    inProgressCount: number;
    resolvedCount: number;
    overdueCount: number;
    totalTickets: number;
  };
  tickets: Array<{
    id: string;
    ticketNumber: number;
    title: string;
    description: string;
    category: TicketCategory;
    status: TicketStatus;
    slaHours: number;
    slaDueAt: string;
    isOverdue: boolean;
    createdAt: string;
    resolvedAt: string | null;
    attachments: Array<{
      id: string;
      fileName: string;
      fileUrl: string;
      fileSize: number | null;
      mimeType: string | null;
    }>;
  }>;
  pendingInvoice: {
    id: string;
    invoiceNumber: string;
    dueDate: string;
    totalAmount: number;
    status: string;
    pixCopyPaste: string | null;
    pixQrCode: string | null;
    gatewayInvoiceUrl: string | null;
    items: Array<{
      id: string;
      description: string;
      amount: number;
    }>;
  } | null;
  recentInvoices: Array<{
    id: string;
    invoiceNumber: string;
    dueDate: string;
    totalAmount: number;
    status: string;
    itemsCount: number;
  }>;
}

export default function ClientPortalView({ initialData }: { initialData: PortalDataProps }) {
  const router = useRouter();
  const data = initialData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketFilter, setTicketFilter] = useState<string>("ALL");
  const [copiedPix, setCopiedPix] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("BASIC");
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [openingAttachmentId, setOpeningAttachmentId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCopyPix = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleRemoveSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCloseTicketModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setCategory("BASIC");
    setSelectedFiles([]);
    setFormError(null);
  };

  const handleOpenAttachment = async (attachmentIdOrUrl: string) => {
    try {
      setOpeningAttachmentId(attachmentIdOrUrl);
      const res = await getAttachmentSignedUrlAction(attachmentIdOrUrl);
      if (!res.success || !res.signedUrl) {
        alert(res.error || "Não foi possível gerar link seguro para o anexo.");
        return;
      }
      window.open(res.signedUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Erro ao abrir anexo:", err);
      alert("Falha ao abrir anexo.");
    } finally {
      setOpeningAttachmentId(null);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim() || !description.trim()) {
      setFormError("Preencha o título e a descrição do chamado.");
      return;
    }

    startTransition(async () => {
      const uploadedList: Array<{ fileName: string; fileUrl: string; fileSize?: number; mimeType?: string }> = [];

      if (selectedFiles.length > 0) {
        setUploadingFiles(true);
        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          const uploadRes = await uploadTicketAttachmentAction(formData);
          if (uploadRes.success && uploadRes.fileUrl) {
            uploadedList.push({
              fileName: uploadRes.fileName,
              fileUrl: uploadRes.fileUrl,
              fileSize: uploadRes.fileSize,
              mimeType: uploadRes.mimeType,
            });
          } else {
            console.warn("Falha no upload do arquivo:", file.name, uploadRes.error);
          }
        }
        setUploadingFiles(false);
      }

      const res = await createTicketAction({
        title,
        description,
        category,
        projectId: data.project?.id,
        attachments: uploadedList,
      });

      if (!res.success) {
        setFormError(res.error || "Ocorreu um erro ao abrir o chamado.");
      } else {
        handleCloseTicketModal();
        router.refresh();
      }
    });
  };

  // Filtro de chamados
  const filteredTickets = data.tickets.filter((t) => {
    if (ticketFilter === "OPEN") return t.status === "OPEN";
    if (ticketFilter === "IN_PROGRESS") return t.status === "IN_PROGRESS";
    if (ticketFilter === "RESOLVED") return t.status === "RESOLVED";
    if (ticketFilter === "OVERDUE") return t.isOverdue;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--base)] text-[var(--t-bright)] selection:bg-[var(--base-opp)] selection:text-[var(--t-opp-bright)] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="border-b border-[var(--st-medium)] pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--accent)] font-semibold">
                Área do Cliente MindSite
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[var(--base-tint)] border border-[var(--st-medium)] text-[var(--t-medium)] rounded">
                Portal de Sustentação
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--t-bright)] mt-1 font-mono">
              {data.user.companyName || data.user.fullName || "Cliente"}
            </h1>
            <p className="text-xs text-[var(--t-medium)] mt-1">
              Conectado como <span className="text-[var(--t-bright)] font-mono">{data.user.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[var(--accent)] hover:opacity-90 text-white px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Abrir Novo Chamado
            </button>

            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[var(--base-tint)] border border-[var(--st-medium)] hover:border-[var(--st-bright)] text-[var(--t-medium)] hover:text-[var(--t-bright)] px-3.5 py-2.5 text-xs font-mono uppercase transition-colors cursor-pointer"
                title="Encerrar Sessão"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </form>
          </div>
        </div>

        {/* Informações do Projeto Ativo & Banner */}
        <div className="bg-[var(--base-tint)] border border-[var(--st-medium)] p-6 mb-8 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--t-medium)]">
                  Ambiente de Produção Ativo
                </span>
              </div>
              <h2 className="text-xl font-bold font-mono text-[var(--t-bright)]">
                {data.project?.name || "Projeto Principal"}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                {data.project?.domain && (
                  <a
                    href={`https://${data.project.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                  >
                    <span>https://{data.project.domain}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <span className="text-[var(--t-muted)]">•</span>
                <span className="text-[var(--t-medium)]">
                  Status:{" "}
                  <span className="text-emerald-500 font-semibold uppercase">
                    {data.project?.isActive ? "Operacional (99.9%)" : "Em Implantação"}
                  </span>
                </span>
              </div>
            </div>

            {/* Tag do Plano de Sustentação */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[var(--base)] border border-[var(--st-medium)] p-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--t-muted)] block">
                  Plano de Infraestrutura & Suporte
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-mono font-bold text-sm text-[var(--t-bright)]">
                    Plano {data.project?.planName || "Development"}
                  </span>
                </div>
              </div>
              <div className="sm:border-l sm:border-[var(--st-medium)] sm:pl-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--t-muted)] block">
                  Mensalidade Fixa
                </span>
                <span className="font-mono font-bold text-sm text-[var(--accent)]">
                  R$ {data.project?.planPrice || 300},00/mês
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Cards Métricos */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card Abertos */}
          <div
            onClick={() => setTicketFilter("OPEN")}
            className={`cursor-pointer p-5 border transition-all ${
              ticketFilter === "OPEN"
                ? "border-[var(--accent)] bg-[var(--base-tint)]"
                : "border-[var(--st-medium)] bg-[var(--base-tint)] hover:border-[var(--st-bright)]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--t-medium)]">
                Abertos
              </span>
              <LifeBuoy className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-[var(--t-bright)]">
              {data.metrics.openCount}
            </div>
            <span className="text-[11px] text-[var(--t-muted)] mt-1 block">
              Aguardando atendimento
            </span>
          </div>

          {/* Card Em Andamento */}
          <div
            onClick={() => setTicketFilter("IN_PROGRESS")}
            className={`cursor-pointer p-5 border transition-all ${
              ticketFilter === "IN_PROGRESS"
                ? "border-[var(--accent)] bg-[var(--base-tint)]"
                : "border-[var(--st-medium)] bg-[var(--base-tint)] hover:border-[var(--st-bright)]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--t-medium)]">
                Em Andamento
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-[var(--t-bright)]">
              {data.metrics.inProgressCount}
            </div>
            <span className="text-[11px] text-[var(--t-muted)] mt-1 block">
              Engenharia atuando
            </span>
          </div>

          {/* Card Resolvidos */}
          <div
            onClick={() => setTicketFilter("RESOLVED")}
            className={`cursor-pointer p-5 border transition-all ${
              ticketFilter === "RESOLVED"
                ? "border-[var(--accent)] bg-[var(--base-tint)]"
                : "border-[var(--st-medium)] bg-[var(--base-tint)] hover:border-[var(--st-bright)]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--t-medium)]">
                Resolvidos
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-[var(--t-bright)]">
              {data.metrics.resolvedCount}
            </div>
            <span className="text-[11px] text-[var(--t-muted)] mt-1 block">
              Entregas homologadas
            </span>
          </div>

          {/* Card Em Atraso / SLA Violado */}
          <div
            onClick={() => setTicketFilter("OVERDUE")}
            className={`cursor-pointer p-5 border transition-all ${
              ticketFilter === "OVERDUE"
                ? "border-red-500 bg-red-500/10"
                : data.metrics.overdueCount > 0
                ? "border-red-500/50 bg-red-500/5 hover:border-red-500"
                : "border-[var(--st-medium)] bg-[var(--base-tint)] hover:border-[var(--st-bright)]"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--t-medium)]">
                Em Atraso (SLA)
              </span>
              <AlertTriangle
                className={`w-4 h-4 ${
                  data.metrics.overdueCount > 0 ? "text-red-400" : "text-[var(--t-muted)]"
                }`}
              />
            </div>
            <div
              className={`text-3xl font-mono font-bold ${
                data.metrics.overdueCount > 0 ? "text-red-400" : "text-[var(--t-bright)]"
              }`}
            >
              {data.metrics.overdueCount}
            </div>
            <span className="text-[11px] text-[var(--t-muted)] mt-1 block">
              {data.metrics.overdueCount > 0
                ? "Prioridade Máxima do Time"
                : "Nenhum SLA violado"}
            </span>
          </div>
        </div>

        {/* Layout Dividido: Tabela de Chamados + Card Lateral da Fatura */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna Esquerda: Lista de Chamados (8 colunas) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--st-medium)] pb-4">
              <div>
                <h3 className="text-lg font-bold font-mono text-[var(--t-bright)] flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-[var(--accent)]" />
                  Histórico de Solicitações & Chamados
                </h3>
                <p className="text-xs text-[var(--t-medium)]">
                  Acompanhe em tempo real o status e o cumprimento de prazos do seu SLA.
                </p>
              </div>

              {/* Botões de Filtro */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { key: "ALL", label: "Todos" },
                  { key: "OPEN", label: "Abertos" },
                  { key: "IN_PROGRESS", label: "Em Andamento" },
                  { key: "RESOLVED", label: "Resolvidos" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setTicketFilter(f.key)}
                    className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      ticketFilter === f.key
                        ? "bg-[var(--st-bright)] text-[var(--base)] font-bold"
                        : "bg-[var(--base-tint)] text-[var(--t-medium)] border border-[var(--st-medium)] hover:text-[var(--t-bright)]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista dos Chamados */}
            {filteredTickets.length === 0 ? (
              <div className="border border-[var(--st-medium)] bg-[var(--base-tint)] p-12 text-center space-y-3">
                <LifeBuoy className="w-10 h-10 text-[var(--t-muted)] mx-auto opacity-50" />
                <h4 className="text-sm font-mono uppercase tracking-wider font-semibold text-[var(--t-bright)]">
                  Nenhum chamado encontrado
                </h4>
                <p className="text-xs text-[var(--t-medium)] max-w-sm mx-auto">
                  {ticketFilter !== "ALL"
                    ? "Não há solicitações para o filtro selecionado."
                    : "Você ainda não possui chamados abertos. Quando precisar de ajustes ou suporte, clique no botão acima."}
                </p>
                {ticketFilter === "ALL" && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider hover:opacity-90 transition-opacity mt-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Abrir Primeiro Chamado
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => {
                  const slaDate = new Date(ticket.slaDueAt);
                  const isBasic = ticket.category === "BASIC";
                  const isIntermediate = ticket.category === "INTERMEDIATE";

                  return (
                    <div
                      key={ticket.id}
                      className={`border p-5 bg-[var(--base-tint)] transition-all ${
                        ticket.isOverdue
                          ? "border-red-500/60 bg-red-500/[0.03]"
                          : "border-[var(--st-medium)] hover:border-[var(--st-bright)]"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[var(--accent)]">
                            #{ticket.ticketNumber}
                          </span>
                          <span className="text-xs text-[var(--t-muted)]">•</span>
                          {/* Badge de Categoria */}
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                              isBasic
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : isIntermediate
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                            }`}
                          >
                            {ticket.category === "BASIC" && "Básico (SLA 24h)"}
                            {ticket.category === "INTERMEDIATE" && "Intermediário (SLA 72h)"}
                            {ticket.category === "ADVANCED" && "Avançado (SLA 7 dias)"}
                          </span>

                          {/* Status Badge */}
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                              ticket.status === "OPEN"
                                ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                                : ticket.status === "IN_PROGRESS"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : ticket.status === "RESOLVED"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : ticket.status === "WAITING_CLIENT"
                                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                : "bg-zinc-500/10 text-zinc-400"
                            }`}
                          >
                            {ticket.status === "OPEN" && "Aberto"}
                            {ticket.status === "IN_PROGRESS" && "Em Atendimento"}
                            {ticket.status === "WAITING_CLIENT" && "AGUARDANDO SEU ACEITE"}
                            {ticket.status === "RESOLVED" && "Resolvido"}
                            {ticket.status === "CANCELLED" && "Cancelado"}
                          </span>
                        </div>

                        {/* Indicador de SLA */}
                        <div className="flex items-center gap-1.5 text-xs font-mono">
                          <Clock className="w-3.5 h-3.5 text-[var(--t-muted)]" />
                          {ticket.status === "RESOLVED" ? (
                            <span className="text-emerald-400">
                              Entregue em{" "}
                              {ticket.resolvedAt
                                ? new Date(ticket.resolvedAt).toLocaleDateString("pt-BR")
                                : "Concluído"}
                            </span>
                          ) : ticket.status === "WAITING_CLIENT" ? (
                            <span className="text-amber-400 font-semibold">
                              ⏸️ SLA Pausado
                            </span>
                          ) : ticket.isOverdue ? (
                            <span className="text-red-400 font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              SLA Excedido ({slaDate.toLocaleDateString("pt-BR")} às{" "}
                              {slaDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })})
                            </span>
                          ) : (
                            <span className="text-[var(--t-medium)]">
                              Prazo SLA:{" "}
                              <strong className="text-[var(--t-bright)]">
                                {slaDate.toLocaleDateString("pt-BR")} às{" "}
                                {slaDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                              </strong>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Título & Descrição */}
                      <h4 className="text-base font-bold font-mono text-[var(--t-bright)] mb-1">
                        {ticket.title}
                      </h4>
                      <p className="text-xs text-[var(--t-medium)] leading-relaxed whitespace-pre-line mb-3">
                        {ticket.description}
                      </p>

                      {/* Anexos */}
                      {ticket.attachments && ticket.attachments.length > 0 && (
                        <div className="border-t border-[var(--st-medium)] pt-3 mt-3">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--t-muted)] block mb-1.5">
                            Arquivos Anexados ({ticket.attachments.length}):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {ticket.attachments.map((att) => (
                              <button
                                key={att.id}
                                type="button"
                                onClick={() => handleOpenAttachment(att.id)}
                                disabled={openingAttachmentId === att.id}
                                className="inline-flex items-center gap-1.5 bg-[var(--base)] border border-[var(--st-medium)] hover:border-[var(--accent)] px-2.5 py-1 text-xs font-mono text-[var(--t-bright)] transition-colors rounded-sm cursor-pointer disabled:opacity-50"
                              >
                                <Paperclip className="w-3 h-3 text-[var(--accent)]" />
                                <span className="max-w-[150px] truncate">{att.fileName}</span>
                                <ExternalLink className="w-2.5 h-2.5 text-[var(--t-muted)]" />
                                {openingAttachmentId === att.id && <span className="text-[10px] text-[var(--accent)]">...</span>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-3 pt-2 text-[10px] font-mono text-[var(--t-muted)] flex items-center justify-between">
                        <span>Aberto em {new Date(ticket.createdAt).toLocaleString("pt-BR")}</span>
                        <span>MindSite Tech Support</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Coluna Direita: Fatura do Mês & Faturamento (4 colunas) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Card Fatura em Destaque */}
            <div className="border border-[var(--st-medium)] bg-[var(--base-tint)] p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Fatura do Mês
                </span>
                {data.pendingInvoice ? (
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded">
                    Aguardando Pagamento
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                    Em Dia
                  </span>
                )}
              </div>

              {data.pendingInvoice ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-mono text-[var(--t-muted)] block uppercase">
                      Vencimento:{" "}
                      <strong className="text-[var(--t-bright)]">
                        {new Date(data.pendingInvoice.dueDate).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })}
                      </strong>
                    </span>
                    <div className="text-3xl font-mono font-bold text-[var(--t-bright)] mt-1">
                      R$ {data.pendingInvoice.totalAmount.toFixed(2).replace(".", ",")}
                    </div>
                  </div>

                  {/* Itens Discriminados */}
                  <div className="border-t border-b border-[var(--st-medium)] py-3 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--t-muted)] block">
                      Detalhamento dos Serviços:
                    </span>
                    {data.pendingInvoice.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs font-mono"
                      >
                        <span className="text-[var(--t-medium)] truncate pr-2">
                          {item.description}
                        </span>
                        <span className="text-[var(--t-bright)] font-semibold shrink-0">
                          R$ {item.amount.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Botão Copiar Pix */}
                  {data.pendingInvoice.pixCopyPaste && (
                    <div>
                      <button
                        onClick={() => handleCopyPix(data.pendingInvoice!.pixCopyPaste!)}
                        className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:opacity-90 text-white py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-opacity cursor-pointer"
                      >
                        {copiedPix ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>Chave Pix Copiada!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar Código Pix (Copia e Cola)</span>
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-[var(--t-muted)] font-mono mt-1.5">
                        Liquidação imediata via PIX do Banco Central
                      </p>
                    </div>
                  )}

                  {/* Link Recibo ou Boleto */}
                  {data.pendingInvoice.gatewayInvoiceUrl ? (
                    <a
                      href={data.pendingInvoice.gatewayInvoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[var(--base)] border border-[var(--st-medium)] hover:border-[var(--st-bright)] text-[var(--t-bright)] py-2.5 px-4 text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Visualizar Boleto / Recibo Fiscal
                    </a>
                  ) : (
                    <div className="p-3 bg-[var(--base)] border border-[var(--st-medium)] text-[11px] font-mono text-[var(--t-medium)] flex items-start gap-2">
                      <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>
                        Após o pagamento, a baixa é processada automaticamente em até 10 minutos. O recibo oficial é emitido para seu e-mail cadastrado.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-mono text-[var(--t-bright)] font-semibold">
                    Nenhuma fatura em aberto
                  </p>
                  <p className="text-[11px] text-[var(--t-muted)]">
                    Todos os serviços de sustentação e parcelas estão 100% liquidados.
                  </p>
                </div>
              )}
            </div>

            {/* Histórico Recente de Faturas */}
            <div className="border border-[var(--st-medium)] bg-[var(--base-tint)] p-5">
              <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--t-bright)] mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[var(--t-medium)]" />
                Histórico Recente de Faturamento
              </h4>

              {data.recentInvoices.length === 0 ? (
                <p className="text-xs text-[var(--t-muted)] font-mono">
                  Nenhuma fatura anterior registrada.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {data.recentInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between p-2.5 bg-[var(--base)] border border-[var(--st-medium)] text-xs font-mono"
                    >
                      <div>
                        <span className="font-semibold text-[var(--t-bright)] block">
                          {inv.invoiceNumber}
                        </span>
                        <span className="text-[10px] text-[var(--t-muted)]">
                          {new Date(inv.dueDate).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[var(--t-bright)] block">
                          R$ {inv.totalAmount.toFixed(2).replace(".", ",")}
                        </span>
                        <span
                          className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-semibold ${
                            inv.status === "PAID"
                              ? "text-emerald-400"
                              : inv.status === "PENDING"
                              ? "text-amber-400"
                              : "text-zinc-400"
                          }`}
                        >
                          {inv.status === "PAID"
                            ? "Pago"
                            : inv.status === "PENDING"
                            ? "Pendente"
                            : inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Suporte Direto WhatsApp / Contato */}
            <div className="p-4 bg-[var(--base-tint)] border border-[var(--st-medium)] text-xs space-y-2">
              <span className="font-mono uppercase text-[10px] text-[var(--accent)] font-bold tracking-wider block">
                Atendimento Exclusivo
              </span>
              <p className="text-[var(--t-medium)] text-[11px] leading-relaxed">
                Precisa de suporte em regime de urgência crítica (servidor fora do ar)? Entre em contato direto com nossa equipe via WhatsApp de plantão.
              </p>
              <a
                href="https://wa.me/5511999999999?text=Olá,%20sou%20cliente%20MindSite%20e%20preciso%20de%20suporte%20urgente"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--t-bright)] font-mono text-xs font-bold hover:text-[var(--accent)] transition-colors underline pt-1"
              >
                <span>Falar com Gerente de Contas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* ==================================================== */}
      {/* MODAL DE ABERTURA DE CHAMADO COM SELEÇÃO DE SLA & ANEXOS */}
      {/* ==================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--base-tint)] border border-[var(--st-medium)] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header do Modal */}
            <div className="flex items-start justify-between border-b border-[var(--st-medium)] pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-semibold">
                  Novo Chamado Técnico
                </span>
                <h3 className="text-xl font-bold font-mono text-[var(--t-bright)] mt-1">
                  Abertura de Solicitação de Suporte
                </h3>
                <p className="text-xs text-[var(--t-medium)] mt-0.5">
                  Selecione a categoria para cálculo do prazo estipulado no SLA contratual.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[var(--t-muted)] hover:text-[var(--t-bright)] p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-3.5 border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-mono rounded">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateTicket} className="space-y-6">
              
              {/* Seleção de Categoria com Badges Dinâmicas de SLA */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--t-medium)] mb-2">
                  Categoria da Solicitação & SLA Aplicável *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* BASIC */}
                  <div
                    onClick={() => setCategory("BASIC")}
                    className={`cursor-pointer p-3.5 border transition-all ${
                      category === "BASIC"
                        ? "border-[var(--accent)] bg-[var(--base)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--st-medium)] bg-[var(--base)] hover:border-[var(--st-bright)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-[var(--t-bright)]">
                        Básico
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold rounded">
                        24 Horas
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--t-medium)] leading-snug">
                      Troca de textos, substituição de imagens ou criação de contas de e-mail corporativo.
                    </p>
                  </div>

                  {/* INTERMEDIATE */}
                  <div
                    onClick={() => setCategory("INTERMEDIATE")}
                    className={`cursor-pointer p-3.5 border transition-all ${
                      category === "INTERMEDIATE"
                        ? "border-[var(--accent)] bg-[var(--base)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--st-medium)] bg-[var(--base)] hover:border-[var(--st-bright)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-[var(--t-bright)]">
                        Intermediário
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold rounded">
                        72 Horas
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--t-medium)] leading-snug">
                      Ajustes de cores, seções, carrosséis ou pequenas melhorias visuais sem criação de rotas.
                    </p>
                  </div>

                  {/* ADVANCED */}
                  <div
                    onClick={() => setCategory("ADVANCED")}
                    className={`cursor-pointer p-3.5 border transition-all ${
                      category === "ADVANCED"
                        ? "border-[var(--accent)] bg-[var(--base)] ring-1 ring-[var(--accent)]"
                        : "border-[var(--st-medium)] bg-[var(--base)] hover:border-[var(--st-bright)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-[var(--t-bright)]">
                        Avançado
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold rounded">
                        Até 7 Dias
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--t-medium)] leading-snug">
                      Desenvolvimento de novas páginas/rotas, refatoração de regras ou integrações externas.
                    </p>
                  </div>

                </div>
              </div>

              {/* Título */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--t-medium)] mb-2">
                  Título Resumido *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Atualização do texto da seção 'Sobre Nós' e imagem do banner"
                  className="w-full bg-[var(--base)] border border-[var(--st-medium)] focus:border-[var(--st-bright)] px-4 py-3 text-sm text-[var(--t-bright)] outline-none font-mono transition-colors"
                />
              </div>

              {/* Descrição Detalhada */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--t-medium)] mb-2">
                  Descrição Detalhada & Instruções *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva exatamente o que precisa ser alterado, indicando URLs da página, parágrafos a substituir ou regras desejadas..."
                  className="w-full bg-[var(--base)] border border-[var(--st-medium)] focus:border-[var(--st-bright)] px-4 py-3 text-sm text-[var(--t-bright)] outline-none transition-colors"
                />
              </div>

              {/* Upload de Anexos (PNG, JPG, MP4, PDF) para Supabase Storage */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--t-medium)] mb-2">
                  Anexar Arquivos de Referência (PNG, JPG, MP4, PDF)
                </label>
                
                <div className="border border-dashed border-[var(--st-medium)] bg-[var(--base)] p-4 text-center relative hover:border-[var(--st-bright)] transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp,video/mp4,application/pdf"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      const incoming = Array.from(e.target.files);
                      setSelectedFiles((prev) => [...prev, ...incoming]);
                    }}
                    disabled={uploadingFiles || isPending}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <UploadCloud className="w-6 h-6 text-[var(--accent)]" />
                    <span className="text-xs font-mono text-[var(--t-bright)] font-semibold">
                      {uploadingFiles ? "Enviando mídias para o bucket..." : "Clique ou arraste seus arquivos aqui"}
                    </span>
                    <span className="text-[10px] text-[var(--t-muted)] font-mono">
                      Suporte a fotos em alta, vídeos curtos de gravação de tela e PDFs até 20MB.
                    </span>
                  </div>
                </div>

                {/* Lista de anexos selecionados */}
                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[var(--t-muted)] block">
                      Arquivos Selecionados ({selectedFiles.length}):
                    </span>
                    {selectedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-[var(--base)] border border-[var(--st-medium)] text-xs font-mono"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <File className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                          <span className="truncate text-[var(--t-bright)]">{file.name}</span>
                          <span className="text-[10px] text-[var(--t-muted)]">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSelectedFile(idx)}
                          disabled={uploadingFiles || isPending}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--st-medium)]">
                <button
                  type="button"
                  onClick={handleCloseTicketModal}
                  disabled={uploadingFiles || isPending}
                  className="px-4 py-2.5 text-xs font-mono uppercase text-[var(--t-medium)] hover:text-[var(--t-bright)] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending || uploadingFiles}
                  className="bg-[var(--accent)] hover:opacity-90 text-white px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-opacity disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {uploadingFiles ? "Enviando Anexos..." : isPending ? "Salvando..." : "Salvar"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
