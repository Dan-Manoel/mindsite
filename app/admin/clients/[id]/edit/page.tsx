"use client";

import { useState, useEffect, useCallback, useTransition, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getClientByIdAction,
  updateClientAction,
  settleInstallmentManuallyAction,
  addProjectToClientAction,
  addInstallmentToContractAction,
  resetClientPasswordAction,
} from "@/app/actions/adminClients";
import { issueImmediateInvoiceAction } from "@/app/actions/admin";
import { isValidDocument, maskDocument } from "@/lib/validators";

export default function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
interface ContractInstallmentItem {
  id: string;
  installmentNumber: number;
  description?: string | null;
  scheduledDate: string | Date;
  amount: number | string;
  status: string;
}

interface ContractItem {
  id: string;
  contractType: string;
  status?: string;
  notes?: string | null;
  totalAmount?: number | string | null;
  paidAmount?: number | string | null;
  installments?: ContractInstallmentItem[];
}

interface ProjectItem {
  id: string;
  name: string;
  domain?: string | null;
  description?: string | null;
  contracts?: ContractItem[];
}

  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [address, setAddress] = useState("");
  const [autentiqueDocId, setAutentiqueDocId] = useState("");
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  // Modais
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const [newProjDomain, setNewProjDomain] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjSetup, setNewProjSetup] = useState<number>(0);
  const [newProjInstallments, setNewProjInstallments] = useState<Array<{ amount: number; scheduledDate: string; description: string }>>([]);
  const [newProjSustPlan, setNewProjSustPlan] = useState<"NONE" | "ESSENTIAL" | "DEVELOPMENT" | "ADVANCED">("NONE");
  const [newProjSustStartDate, setNewProjSustStartDate] = useState(new Date().toISOString().split("T")[0]);

  const [newInstallmentContractId, setNewInstallmentContractId] = useState<string | null>(null);
  const [instAmount, setInstAmount] = useState("");
  const [instDate, setInstDate] = useState(new Date().toISOString().split("T")[0]);
  const [instDesc, setInstDesc] = useState("");

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invDesc, setInvDesc] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [invDays, setInvDays] = useState("3");

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const reloadClient = useCallback(async () => {
    const client = await getClientByIdAction(resolvedParams.id);
    if (client) {
      setFullName(client.fullName || "");
      setCompanyName(client.companyName || "");
      setPrimaryEmail(client.email);
      setSecondaryEmail(client.secondaryEmail || "");
      setPhone(client.phone || "");
      setDocument(client.document || "");
      setAddress(client.address || "");
      setAutentiqueDocId(client.autentiqueDocId || "");
      setProjects((client.projects as unknown as ProjectItem[]) || []);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    startTransition(async () => {
      await reloadClient();
    });
  }, [reloadClient]);

  const handleSettleInstallment = async (installmentId: string) => {
    if (!confirm("Confirmar baixa manual desta parcela? O valor será contabilizado como pago no contrato correspondente.")) {
      return;
    }

    startTransition(async () => {
      const res = await settleInstallmentManuallyAction(installmentId);
      if (res.success) {
        showNotification(res.message || "Parcela baixada com sucesso!");
        await reloadClient();
      } else {
        showNotification(res.error || "Erro ao baixar parcela.", "error");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (document && !isValidDocument(document)) {
      showNotification("Documento CPF/CNPJ inválido.", "error");
      return;
    }

    startTransition(async () => {
      const res = await updateClientAction(resolvedParams.id, {
        fullName,
        companyName,
        secondaryEmail,
        phone,
        document,
        address,
        autentiqueDocId,
      });

      if (res.success) {
        showNotification("Cliente atualizado com sucesso!");
        router.push("/admin/clients");
      } else {
        showNotification(res.error || "Erro ao atualizar.", "error");
      }
    });
  };

  const handleAddDynamicInstallment = () => {
    const currentSum = newProjInstallments.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const remaining = Math.max(0, (Number(newProjSetup) || 0) - currentSum);
    const nextIndex = newProjInstallments.length + 1;
    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + nextIndex);

    setNewProjInstallments([
      ...newProjInstallments,
      {
        amount: remaining,
        scheduledDate: nextDate.toISOString().split("T")[0],
        description: `Parcela 0${nextIndex} - Setup`,
      },
    ]);
  };

  const handleRemoveDynamicInstallment = (index: number) => {
    setNewProjInstallments(newProjInstallments.filter((_, i) => i !== index));
  };

  const handleUpdateDynamicInstallment = (index: number, field: string, val: string | number) => {
    const updated = [...newProjInstallments];
    updated[index] = { ...updated[index], [field]: val };
    setNewProjInstallments(updated);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) {
      showNotification("Nome do projeto é obrigatório.", "error");
      return;
    }

    const setupVal = Number(newProjSetup) || 0;
    if (setupVal > 0 && newProjInstallments.length > 0) {
      const sum = newProjInstallments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      if (Math.abs(sum - setupVal) > 0.01) {
        showNotification(
          `A soma das parcelas (R$ ${sum.toFixed(2)}) não confere com o setup (R$ ${setupVal.toFixed(2)}).`,
          "error"
        );
        return;
      }
    }

    startTransition(async () => {
      const res = await addProjectToClientAction(resolvedParams.id, {
        name: newProjName,
        domain: newProjDomain,
        description: newProjDesc,
        setupAmount: setupVal,
        installments: newProjInstallments.map((inst) => ({
          amount: Number(inst.amount) || 0,
          scheduledDate: inst.scheduledDate,
          description: inst.description,
        })),
        sustainabilityPlan: newProjSustPlan,
        sustainabilityStartDate: newProjSustStartDate,
      });

      if (res.success) {
        showNotification("Projeto criado com sucesso!");
        setIsNewProjectModalOpen(false);
        setNewProjName("");
        setNewProjDomain("");
        setNewProjDesc("");
        setNewProjSetup(0);
        setNewProjInstallments([]);
        setNewProjSustPlan("NONE");
        await reloadClient();
      } else {
        showNotification(res.error || "Erro ao criar projeto.", "error");
      }
    });
  };

  const handleAddInstallment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstallmentContractId || !instAmount || !instDate) {
      showNotification("Preencha todos os campos da parcela.", "error");
      return;
    }

    startTransition(async () => {
      const res = await addInstallmentToContractAction(newInstallmentContractId, {
        amount: parseFloat(instAmount) || 0,
        scheduledDate: instDate,
        description: instDesc,
      });

      if (res.success) {
        showNotification("Parcela adicionada com sucesso!");
        setNewInstallmentContractId(null);
        setInstAmount("");
        setInstDesc("");
        await reloadClient();
      } else {
        showNotification(res.error || "Erro ao adicionar parcela.", "error");
      }
    });
  };

  const handleIssueImmediateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invAmount || !invDesc) {
      showNotification("Preencha a descrição e o valor da fatura.", "error");
      return;
    }

    startTransition(async () => {
      const res = await issueImmediateInvoiceAction({
        userId: resolvedParams.id,
        description: invDesc,
        amount: parseFloat(invAmount) || 0,
        dueDateDays: parseInt(invDays) || 3,
      });

      if (res.success) {
        showNotification(res.message || "Fatura emitida e enviada com sucesso!");
        setIsInvoiceModalOpen(false);
        setInvDesc("");
        setInvAmount("");
      } else {
        showNotification(res.error || "Falha ao emitir fatura.", "error");
      }
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showNotification("A senha deve ter no mínimo 6 caracteres.", "error");
      return;
    }

    startTransition(async () => {
      const res = await resetClientPasswordAction(resolvedParams.id, newPassword);
      if (res.success) {
        showNotification("Senha de acesso redefinida com sucesso!");
        setIsPasswordModalOpen(false);
        setNewPassword("");
      } else {
        showNotification(res.error || "Erro ao redefinir senha.", "error");
      }
    });
  };

  return (
    <main className="mxd-page-content inner-page-content" style={{ minHeight: "100vh", backgroundColor: "var(--base)", paddingBottom: "10rem" }}>
      <div className="mxd-container grid-l-container" style={{ maxWidth: "1000px" }}>

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

        {/* Cabeçalho */}
        <div className="mxd-block" style={{ paddingTop: "4rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--st-medium)", marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <span className="tag tag-s tag-medium" style={{ color: "var(--accent)", display: "inline-block", marginBottom: "0.5rem" }}>
                Gestão do Cliente
              </span>
              <h1 style={{ fontSize: "clamp(2.4rem, 3vw, 3.8rem)", fontWeight: 700, margin: 0, color: "var(--t-bright)", fontFamily: "var(--_font-default)" }}>
                Editar: {fullName || primaryEmail}
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setIsInvoiceModalOpen(true)}
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{ height: "4.2rem", padding: "0.4rem 0.4rem 0.4rem 1.4rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)", fontWeight: 700 }}>⚡ Emitir Fatura</span>
                <i className="btn-icon" style={{ width: "3.2rem", height: "3.2rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12" fill="currentColor">
                    <path d="M8,1h2v16H8V1z M1,8h16v2H1V8z" />
                  </svg>
                </i>
              </button>

              <button
                type="button"
                onClick={() => setIsNewProjectModalOpen(true)}
                className="btn btn-default-icon btn-default-outline slide-right"
                style={{ height: "4.2rem", padding: "0.4rem 0.4rem 0.4rem 1.4rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)" }}>+ Novo Projeto</span>
                <i className="btn-icon" style={{ width: "3.2rem", height: "3.2rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12" fill="currentColor">
                    <path d="M8,1h2v16H8V1z M1,8h16v2H1V8z" />
                  </svg>
                </i>
              </button>

              <Link className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left" href="/admin/clients">
                <span className="btn-caption" style={{ fontSize: "1.3rem" }}>Voltar à Lista</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Formulário de Edição */}
        <form onSubmit={handleSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          
          {/* Dados Pessoais / Corporativos */}
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <h4 style={{ fontSize: "1.6rem", color: "var(--t-bright)", margin: "0 0 2rem 0", fontFamily: "var(--_font-accent)" }}>
              Dados Cadastrais
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Empresa / Razão Social
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", marginBottom: "0.6rem" }}>
                  E-mail Principal (Login Supabase)
                </label>
                <input
                  type="email"
                  disabled
                  value={primaryEmail}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-muted)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", opacity: 0.7 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  E-mail Secundário (Financeiro / Cópia)
                </label>
                <input
                  type="email"
                  value={secondaryEmail}
                  onChange={(e) => setSecondaryEmail(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  CPF / CNPJ
                </label>
                <input
                  type="text"
                  value={document}
                  onChange={(e) => setDocument(maskDocument(e.target.value))}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Endereço Comercial / Faturamento
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <label style={{ fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)" }}>
                    ID do Documento Autentique (Contrato Digital)
                  </label>
                  <span style={{ fontSize: "1.1rem", color: "var(--accent)", fontFamily: "var(--_font-accent)" }}>
                    * Ao salvar com novo ID, o cliente recebe e-mail automático com link de assinatura
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Ex: c7a9e34b-1234-5678-9abc-def012345678"
                  value={autentiqueDocId}
                  onChange={(e) => setAutentiqueDocId(e.target.value)}
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>
            </div>
          </div>

          {/* Projetos & Contratos */}
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <div>
                <h4 style={{ fontSize: "1.8rem", color: "var(--t-bright)", margin: 0, fontFamily: "var(--_font-accent)" }}>
                  Projetos, Contratos & Parcelas
                </h4>
                <p style={{ color: "var(--t-medium)", fontSize: "1.3rem", margin: "0.4rem 0 0 0" }}>
                  Gerencie contratos, adicione parcelas de setup/extras e conceda baixa manual.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewProjectModalOpen(true)}
                className="btn btn-line-icon btn-line-icon-small btn-line-default slide-right"
              >
                <span className="btn-caption" style={{ fontSize: "1.2rem", fontFamily: "var(--_font-accent)" }}>+ Novo Projeto</span>
              </button>
            </div>

            {projects.length === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", border: "1px dashed var(--st-medium)", borderRadius: "0.4rem" }}>
                <p style={{ color: "var(--t-muted)", fontSize: "1.3rem", margin: "0 0 1.5rem 0" }}>Nenhum projeto vinculado a este cliente.</p>
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="btn btn-default-icon btn-default-accent"
                  style={{ height: "4rem", padding: "0 2rem", fontSize: "1.3rem" }}
                >
                  Cadastrar Primeiro Projeto
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {projects.map((p) => (
                  <div key={p.id} style={{ padding: "2.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.4rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.5rem" }}>
                      <div>
                        <strong style={{ fontSize: "1.7rem", color: "var(--t-bright)", display: "block", fontFamily: "var(--_font-default)" }}>
                          {p.name}
                        </strong>
                        <span style={{ fontSize: "1.2rem", color: "var(--accent)", fontFamily: "var(--_font-accent)" }}>
                          {p.domain ? `🌐 ${p.domain}` : "Sem domínio vinculado"}
                        </span>
                        {p.description && (
                          <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0.6rem 0 0 0" }}>
                            {p.description}
                          </p>
                        )}
                      </div>
                      <span className="tag tag-s tag-medium" style={{ color: "var(--accent)", fontFamily: "var(--_font-accent)" }}>
                        {p.contracts?.length || 0} Contrato(s)
                      </span>
                    </div>

                    {/* Exibição em Tempo Real do Setup */}
                    {(() => {
                      const devContract = p.contracts?.find((c) => c.contractType === "PROJECT_DEV");
                      const setupTotal = devContract ? Number(devContract.totalAmount || 0) : 0;
                      const setupPaid = devContract ? Number(devContract.paidAmount || 0) : 0;
                      const setupRemaining = Math.max(0, setupTotal - setupPaid);

                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1.5rem",
                            flexWrap: "wrap",
                            padding: "1.2rem 1.6rem",
                            backgroundColor: "var(--base-tint)",
                            border: "1px solid var(--st-medium)",
                            borderRadius: "0.4rem",
                            marginBottom: "1.5rem",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.2rem",
                          }}
                        >
                          <div>
                            <span style={{ color: "var(--t-muted)", textTransform: "uppercase", fontSize: "1rem", display: "block" }}>Custo de Setup</span>
                            <strong style={{ color: "var(--t-bright)", fontSize: "1.4rem" }}>R$ {setupTotal.toFixed(2).replace(".", ",")}</strong>
                          </div>
                          <span style={{ color: "var(--st-medium)" }}>|</span>
                          <div>
                            <span style={{ color: "var(--t-muted)", textTransform: "uppercase", fontSize: "1rem", display: "block" }}>Total Liquidado</span>
                            <strong style={{ color: "#10b981", fontSize: "1.4rem" }}>R$ {setupPaid.toFixed(2).replace(".", ",")}</strong>
                          </div>
                          <span style={{ color: "var(--st-medium)" }}>|</span>
                          <div>
                            <span style={{ color: "var(--t-muted)", textTransform: "uppercase", fontSize: "1rem", display: "block" }}>Saldo Restante do Setup</span>
                            <strong style={{ color: "var(--accent)", fontSize: "1.5rem", fontWeight: 700 }}>R$ {setupRemaining.toFixed(2).replace(".", ",")}</strong>
                          </div>
                        </div>
                      );
                    })()}

                    {p.contracts?.map((c) => (
                      <div key={c.id} style={{ marginTop: "1.5rem", padding: "2rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", borderRadius: "0.4rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                              Tipo: <strong style={{ color: "var(--t-bright)" }}>{c.contractType}</strong>
                            </span>
                            <span style={{ color: "var(--st-medium)" }}>|</span>
                            <span style={{ fontSize: "1.1rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                              Valor Total Contratado: <strong style={{ color: "var(--t-bright)" }}>R$ {Number(c.totalAmount || 0).toFixed(2).replace(".", ",")}</strong>
                            </span>
                            <span style={{ color: "var(--st-medium)" }}>|</span>
                            <span style={{ fontSize: "1.1rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                              Total Liquidado: <strong style={{ color: "#10b981" }}>R$ {Number(c.paidAmount || 0).toFixed(2).replace(".", ",")}</strong>
                            </span>
                            {c.contractType === "PROJECT_DEV" && (
                              <>
                                <span style={{ color: "var(--st-medium)" }}>|</span>
                                <span style={{ fontSize: "1.2rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                                  Saldo em Aberto: <strong style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.3rem" }}>R$ {Math.max(0, Number(c.totalAmount || 0) - Number(c.paidAmount || 0)).toFixed(2).replace(".", ",")}</strong>
                                </span>
                              </>
                            )}
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{
                              padding: "0.3rem 0.8rem",
                              fontSize: "1rem",
                              borderRadius: "0.2rem",
                              backgroundColor: c.status === "ACTIVE" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                              color: c.status === "ACTIVE" ? "#10b981" : "#ef4444",
                              border: `1px solid ${c.status === "ACTIVE" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`
                            }}>
                              {c.status}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                setNewInstallmentContractId(c.id);
                                setInstAmount("");
                                setInstDesc("");
                              }}
                              style={{
                                padding: "0.4rem 1rem",
                                fontSize: "1.1rem",
                                backgroundColor: "transparent",
                                color: "var(--accent)",
                                border: "1px solid var(--accent)",
                                borderRadius: "0.2rem",
                                cursor: "pointer",
                                fontFamily: "var(--_font-accent)",
                                fontWeight: 600,
                              }}
                            >
                              + Nova Parcela
                            </button>
                          </div>
                        </div>

                        {c.installments && c.installments.length > 0 ? (
                          <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "1.2rem", fontFamily: "var(--_font-accent)" }}>
                              <thead>
                                <tr style={{ borderBottom: "1px solid var(--st-medium)", color: "var(--t-muted)", fontSize: "1rem", textTransform: "uppercase" }}>
                                  <th style={{ padding: "0.8rem", textAlign: "left" }}>Parcela</th>
                                  <th style={{ padding: "0.8rem", textAlign: "left" }}>Vencimento</th>
                                  <th style={{ padding: "0.8rem", textAlign: "right" }}>Valor</th>
                                  <th style={{ padding: "0.8rem", textAlign: "center" }}>Status</th>
                                  <th style={{ padding: "0.8rem", textAlign: "right" }}>Ação Dono</th>
                                </tr>
                              </thead>
                              <tbody>
                                {c.installments?.map((inst) => {
                                  const isPaid = inst.status === "PAID";
                                  const dateStr = new Date(inst.scheduledDate).toLocaleDateString("pt-BR");
                                  return (
                                    <tr key={inst.id} style={{ borderBottom: "1px solid var(--st-medium)" }}>
                                      <td style={{ padding: "1rem 0.8rem", color: "var(--t-bright)" }}>
                                        #{inst.installmentNumber} - {inst.description || "Parcela"}
                                      </td>
                                      <td style={{ padding: "1rem 0.8rem", color: "var(--t-medium)" }}>
                                        {dateStr}
                                      </td>
                                      <td style={{ padding: "1rem 0.8rem", textAlign: "right", color: "var(--t-bright)", fontWeight: 700 }}>
                                        R$ {Number(inst.amount).toFixed(2).replace(".", ",")}
                                      </td>
                                      <td style={{ padding: "1rem 0.8rem", textAlign: "center" }}>
                                        <span style={{
                                          padding: "0.2rem 0.6rem",
                                          fontSize: "0.95rem",
                                          borderRadius: "0.2rem",
                                          backgroundColor: isPaid ? "rgba(16, 185, 129, 0.1)" : inst.status === "BILLED" ? "rgba(245, 158, 11, 0.1)" : "rgba(59, 130, 246, 0.1)",
                                          color: isPaid ? "#10b981" : inst.status === "BILLED" ? "#f59e0b" : "#3b82f6",
                                          border: `1px solid ${isPaid ? "rgba(16, 185, 129, 0.3)" : inst.status === "BILLED" ? "rgba(245, 158, 11, 0.3)" : "rgba(59, 130, 246, 0.3)"}`
                                        }}>
                                          {isPaid ? "PAGO" : inst.status === "BILLED" ? "FATURADO" : "AGENDADO"}
                                        </span>
                                      </td>
                                      <td style={{ padding: "1rem 0.8rem", textAlign: "right" }}>
                                        {!isPaid ? (
                                          <button
                                            type="button"
                                            disabled={isPending}
                                            onClick={() => handleSettleInstallment(inst.id)}
                                            style={{
                                              padding: "0.4rem 1rem",
                                              fontSize: "1.1rem",
                                              backgroundColor: "var(--accent)",
                                              color: "#ffffff",
                                              border: "none",
                                              borderRadius: "0.2rem",
                                              cursor: "pointer",
                                              fontFamily: "var(--_font-accent)",
                                              fontWeight: 600,
                                            }}
                                          >
                                            Dar Baixa Manual
                                          </button>
                                        ) : (
                                          <span style={{ color: "var(--t-muted)", fontSize: "1.1rem" }}>Liquidada</span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p style={{ color: "var(--t-muted)", fontSize: "1.2rem", margin: 0, fontStyle: "italic" }}>
                            Nenhuma parcela cadastrada para este contrato.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rodapé com Ações */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingTop: "1rem" }}>
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              style={{
                padding: "1.2rem 2rem",
                backgroundColor: "transparent",
                color: "#f59e0b",
                border: "1px solid #f59e0b",
                borderRadius: "0.4rem",
                fontFamily: "var(--_font-accent)",
                fontSize: "1.3rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem"
              }}
            >
              🔑 Redefinir Senha do Cliente
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <Link
                href="/admin/clients"
                style={{
                  padding: "1.2rem 2rem",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.3rem",
                  color: "var(--t-medium)",
                  textDecoration: "none"
                }}
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-default-icon btn-default-accent"
                style={{ height: "4.8rem", padding: "0 2.5rem", fontSize: "1.4rem" }}
              >
                {isPending ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </form>

        {/* MODAL: ADICIONAR NOVO PROJETO */}
        {isNewProjectModalOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "680px", width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "3rem", borderRadius: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: 0 }}>
                  + Adicionar Novo Projeto ao Cliente
                </h3>
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  style={{ background: "none", border: "none", color: "var(--t-muted)", fontSize: "2rem", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
              <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
                Cadastre o escopo, cronograma de setup e plano de sustentação deste projeto.
              </p>

              <form onSubmit={handleCreateProject} className="form" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* 1. Dados do Projeto */}
                <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.4rem" }}>
                  <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, marginBottom: "1.2rem" }}>
                    1. Identificação do Projeto
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Nome do Projeto *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProjName}
                        onChange={(e) => setNewProjName(e.target.value)}
                        placeholder="Ex: Plataforma E-commerce, Landing Page Institucional"
                        style={{ width: "100%", height: "4.2rem", padding: "0 1.4rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Domínio Oficial (URL)
                      </label>
                      <input
                        type="text"
                        value={newProjDomain}
                        onChange={(e) => setNewProjDomain(e.target.value)}
                        placeholder="Ex: www.cliente.com.br"
                        style={{ width: "100%", height: "4.2rem", padding: "0 1.4rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Descrição Detalhada do Escopo
                      </label>
                      <textarea
                        rows={3}
                        value={newProjDesc}
                        onChange={(e) => setNewProjDesc(e.target.value)}
                        placeholder="Ex: Desenvolvimento completo de front-end e back-end, integração com gateways de pagamento e entrega de CMS."
                        style={{ width: "100%", padding: "1rem 1.4rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Custo de Setup & Parcelamento Dinâmico */}
                <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.4rem" }}>
                  <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, marginBottom: "1.2rem" }}>
                    2. Custo de Setup & Parcelamento
                  </span>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                      Valor Total Contratado (Setup / Implantação) - R$
                    </label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={newProjSetup === 0 ? "" : newProjSetup}
                      onChange={(e) => setNewProjSetup(parseFloat(e.target.value) || 0)}
                      placeholder="0,00"
                      style={{ width: "100%", height: "4.2rem", padding: "0 1.4rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", fontWeight: 700, outline: "none" }}
                    />
                  </div>

                  {newProjSetup > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", padding: "1rem 1.2rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", borderRadius: "0.3rem" }}>
                        <div style={{ fontSize: "1.2rem", fontFamily: "var(--_font-accent)" }}>
                          <span style={{ color: "var(--t-muted)" }}>Total Setup: </span>
                          <strong style={{ color: "var(--t-bright)" }}>R$ {newProjSetup.toFixed(2).replace(".", ",")}</strong>
                          <span style={{ margin: "0 0.8rem", color: "var(--st-medium)" }}>|</span>
                          <span style={{ color: "var(--t-muted)" }}>Parcelado: </span>
                          <strong style={{ color: "#10b981" }}>
                            R$ {newProjInstallments.reduce((sum, i) => sum + (Number(i.amount) || 0), 0).toFixed(2).replace(".", ",")}
                          </strong>
                          <span style={{ margin: "0 0.8rem", color: "var(--st-medium)" }}>|</span>
                          <span style={{ color: "var(--t-muted)" }}>Saldo Restante: </span>
                          <strong style={{
                            color: Math.abs(newProjSetup - newProjInstallments.reduce((sum, i) => sum + (Number(i.amount) || 0), 0)) < 0.01
                              ? "#10b981"
                              : "var(--accent)"
                          }}>
                            R$ {(newProjSetup - newProjInstallments.reduce((sum, i) => sum + (Number(i.amount) || 0), 0)).toFixed(2).replace(".", ",")}
                          </strong>
                        </div>

                        <button
                          type="button"
                          onClick={handleAddDynamicInstallment}
                          style={{
                            padding: "0.5rem 1.2rem",
                            fontSize: "1.1rem",
                            backgroundColor: "transparent",
                            color: "var(--accent)",
                            border: "1px solid var(--accent)",
                            borderRadius: "0.3rem",
                            cursor: "pointer",
                            fontFamily: "var(--_font-accent)",
                            fontWeight: 700,
                          }}
                        >
                          + Adicionar Parcela
                        </button>
                      </div>

                      {newProjInstallments.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                          {newProjInstallments.map((inst, idx) => (
                            <div key={idx} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr auto", gap: "0.8rem", alignItems: "center" }}>
                              <input
                                type="text"
                                value={inst.description}
                                onChange={(e) => handleUpdateDynamicInstallment(idx, "description", e.target.value)}
                                placeholder="Descrição da parcela"
                                style={{ height: "3.8rem", padding: "0 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}
                              />
                              <input
                                type="date"
                                value={inst.scheduledDate}
                                onChange={(e) => handleUpdateDynamicInstallment(idx, "scheduledDate", e.target.value)}
                                style={{ height: "3.8rem", padding: "0 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}
                              />
                              <input
                                type="number"
                                step="any"
                                min="0"
                                value={inst.amount === 0 ? "" : inst.amount}
                                onChange={(e) => handleUpdateDynamicInstallment(idx, "amount", parseFloat(e.target.value) || 0)}
                                placeholder="Valor (R$)"
                                style={{ height: "3.8rem", padding: "0 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", textAlign: "right" }}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveDynamicInstallment(idx)}
                                style={{ background: "none", border: "none", color: "#ef4444", fontSize: "1.6rem", cursor: "pointer", padding: "0 0.5rem" }}
                                title="Remover Parcela"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Plano de Sustentação Mensal */}
                <div style={{ padding: "1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", borderRadius: "0.4rem" }}>
                  <span style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, marginBottom: "1.2rem" }}>
                    3. Plano de Sustentação Mensal
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: newProjSustPlan !== "NONE" ? "1fr 1fr" : "1fr", gap: "1.4rem" }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Plano Selecionado
                      </label>
                      <select
                        value={newProjSustPlan}
                        onChange={(e) => setNewProjSustPlan(e.target.value as "NONE" | "ESSENTIAL" | "DEVELOPMENT" | "ADVANCED")}
                        style={{ width: "100%", height: "4.2rem", padding: "0 1.2rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                      >
                        <option value="NONE">Nenhum (Somente Setup)</option>
                        <option value="ESSENTIAL">Essential — R$ 100,00 / mês</option>
                        <option value="DEVELOPMENT">Development — R$ 300,00 / mês</option>
                        <option value="ADVANCED">Advanced — R$ 700,00 / mês</option>
                      </select>
                    </div>

                    {newProjSustPlan !== "NONE" && (
                      <div>
                        <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                          Início da Vigência Mensal
                        </label>
                        <input
                          type="date"
                          value={newProjSustStartDate}
                          onChange={(e) => setNewProjSustStartDate(e.target.value)}
                          style={{ width: "100%", height: "4.2rem", padding: "0 1.2rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setIsNewProjectModalOpen(false)}
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
                    <span className="btn-caption">{isPending ? "Criando..." : "Criar Projeto Completo"}</span>
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

        {/* MODAL: ADICIONAR NOVA PARCELA */}
        {newInstallmentContractId && (
          <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "480px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: 0 }}>
                  + Adicionar Nova Parcela
                </h3>
                <button
                  type="button"
                  onClick={() => setNewInstallmentContractId(null)}
                  style={{ background: "none", border: "none", color: "var(--t-muted)", fontSize: "2rem", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
              <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
                Adicione uma nova parcela de setup ou taxa de serviço extra a este contrato.
              </p>

              <form onSubmit={handleAddInstallment} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Descrição da Parcela / Etapa
                  </label>
                  <input
                    type="text"
                    value={instDesc}
                    onChange={(e) => setInstDesc(e.target.value)}
                    placeholder="Ex: Parcela 03 - Entrega Módulo Blog"
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
                      value={instAmount}
                      onChange={(e) => setInstAmount(e.target.value)}
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
                      value={instDate}
                      onChange={(e) => setInstDate(e.target.value)}
                      style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "1.5rem", marginTop: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setNewInstallmentContractId(null)}
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
                    <span className="btn-caption">{isPending ? "Adicionando..." : "Salvar Parcela"}</span>
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
                Gera checkout na InfinitePay com Pix/Cartão e dispara o e-mail de cobrança instantaneamente para <strong>{fullName || primaryEmail}</strong>.
              </p>

              <form onSubmit={handleIssueImmediateInvoice} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                    Descrição da Cobrança / Parcela *
                  </label>
                  <input
                    type="text"
                    required
                    value={invDesc}
                    onChange={(e) => setInvDesc(e.target.value)}
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
                      value={invDays}
                      onChange={(e) => setInvDays(e.target.value)}
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

        {/* MODAL: REDEFINIR SENHA DO CLIENTE */}
        {isPasswordModalOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", maxWidth: "480px", width: "100%", padding: "3.5rem", borderRadius: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: 0 }}>
                  Redefinir Senha do Cliente
                </h3>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  style={{ background: "none", border: "none", color: "var(--t-muted)", fontSize: "2rem", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
              <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: "0 0 2rem 0" }}>
                Atualize a senha de acesso de <strong style={{ color: "var(--t-bright)" }}>{fullName || primaryEmail}</strong> no Supabase Auth.
              </p>

              <form onSubmit={handleResetPassword} className="form" style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
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
                    onClick={() => setIsPasswordModalOpen(false)}
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

      </div>
    </main>
  );
}