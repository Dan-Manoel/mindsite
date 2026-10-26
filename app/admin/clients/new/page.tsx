"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientWithProjectsAction, ProjectInputDTO } from "@/app/actions/adminClients";
import { isValidDocument, maskDocument } from "@/lib/validators";

export default function NewClientPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [address, setAddress] = useState("");

  const [projects, setProjects] = useState<ProjectInputDTO[]>([
    {
      name: "",
      domain: "",
      setupAmount: 0,
      installments: [],
      sustainabilityPlan: "DEVELOPMENT",
      sustainabilityStartDate: new Date().toISOString().split("T")[0],
    },
  ]);

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        name: "",
        domain: "",
        setupAmount: 0,
        installments: [],
        sustainabilityPlan: "NONE",
        sustainabilityStartDate: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (projects.length === 1) return;
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof ProjectInputDTO, value: any) => {
    setProjects((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addInstallment = (projectIndex: number) => {
    setProjects((prev) => {
      const copy = [...prev];
      const currentInst = copy[projectIndex].installments;
      const totalSetup = copy[projectIndex].setupAmount;
      const currentAllocated = currentInst.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      const remaining = Math.max(0, totalSetup - currentAllocated);
      const nextNum = currentInst.length + 1;

      copy[projectIndex].installments = [
        ...currentInst,
        {
          amount: remaining,
          scheduledDate: new Date().toISOString().split("T")[0],
          description: nextNum === 1 ? "Entrada" : `Parcela ${nextNum}`,
        },
      ];
      return copy;
    });
  };

  const removeInstallment = (projectIndex: number, installmentIndex: number) => {
    setProjects((prev) => {
      const copy = [...prev];
      copy[projectIndex].installments = copy[projectIndex].installments.filter((_, i) => i !== installmentIndex);
      return copy;
    });
  };

  const updateInstallment = (
    projectIndex: number,
    installmentIndex: number,
    field: "amount" | "scheduledDate" | "description",
    value: any
  ) => {
    setProjects((prev) => {
      const copy = [...prev];
      const instCopy = [...copy[projectIndex].installments];
      instCopy[installmentIndex] = {
        ...instCopy[installmentIndex],
        [field]: field === "amount" ? (value === "" ? 0 : parseFloat(value) || 0) : value,
      };
      copy[projectIndex].installments = instCopy;
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!primaryEmail || !password || !fullName) {
      setErrorMsg("Preencha Nome Completo, E-mail Principal e Senha.");
      return;
    }

    if (document && !isValidDocument(document)) {
      setErrorMsg("O CPF ou CNPJ informado é inválido. Verifique os dígitos verificadores.");
      return;
    }

    for (const proj of projects) {
      if (proj.setupAmount > 0) {
        const sum = proj.installments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
        const diff = Math.round((proj.setupAmount - sum) * 100) / 100;
        if (diff !== 0) {
          setErrorMsg(
            `Ajuste as parcelas de "${proj.name || "Projeto"}": faltam R$ ${diff.toFixed(2)} para atingir o valor total de R$ ${proj.setupAmount.toFixed(2)}.`
          );
          return;
        }
      }
    }

    startTransition(async () => {
      const res = await createClientWithProjectsAction({
        fullName,
        companyName,
        primaryEmail,
        secondaryEmail,
        password,
        phone,
        document,
        address,
        projects,
      });

      if (res.success) {
        alert("Cliente cadastrado com sucesso!");
        router.push("/admin/clients");
      } else {
        setErrorMsg(res.error || "Falha ao cadastrar cliente.");
      }
    });
  };

  return (
    <main className="mxd-page-content inner-page-content" style={{ minHeight: "100vh", backgroundColor: "var(--base)", paddingBottom: "10rem" }}>
      <div className="mxd-container grid-l-container" style={{ maxWidth: "1000px" }}>
        <div className="mxd-block" style={{ paddingTop: "4rem", paddingBottom: "2.5rem", borderBottom: "1px solid var(--st-medium)", marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span className="tag tag-s tag-medium" style={{ color: "var(--accent)", display: "inline-block", marginBottom: "0.5rem" }}>
                Gestão de Clientes MindSite
              </span>
              <h1 style={{ fontSize: "clamp(2.4rem, 3vw, 3.8rem)", fontWeight: 700, margin: 0, color: "var(--t-bright)" }}>
                Novo Cadastro de Cliente
              </h1>
            </div>
            <Link className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left" href="/admin/clients">
              <span className="btn-caption" style={{ fontSize: "1.3rem" }}>Ver Lista de Clientes</span>
            </Link>
          </div>
        </div>

        {errorMsg && (
          <div style={{ padding: "1.5rem", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", borderRadius: "0.2rem", marginBottom: "3rem" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form" style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem" }}>
            <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 2rem 0" }}>
              1. Identificação & Credenciais
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Camila Dias"
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
                  placeholder="Ex: Home Care Cuidando com Amor"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  E-mail Principal (Login) *
                </label>
                <input
                  type="email"
                  required
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  placeholder="contato@empresa.com.br"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  E-mail Secundário (Backup/Contingência)
                </label>
                <input
                  type="email"
                  value={secondaryEmail}
                  onChange={(e) => setSecondaryEmail(e.target.value)}
                  placeholder="pessoal@gmail.com"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Senha de Acesso do Cliente *
                </label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Defina a senha provisória"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  CPF ou CNPJ (com validação)
                </label>
                <input
                  type="text"
                  value={document}
                  onChange={(e) => setDocument(maskDocument(e.target.value))}
                  placeholder="000.000.000-00 ou 00.000.000/0001-00"
                  style={{
                    width: "100%",
                    height: "4.5rem",
                    padding: "0 1.5rem",
                    backgroundColor: "var(--base)",
                    border: `1px solid ${document && !isValidDocument(document) ? "#ef4444" : "var(--st-medium)"}`,
                    color: "var(--t-bright)",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.3rem",
                    outline: "none",
                  }}
                />
                {document && !isValidDocument(document) && (
                  <span style={{ color: "#ef4444", fontSize: "1rem", display: "block", marginTop: "0.4rem" }}>
                    Documento inválido
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                  Endereço
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua, número, bairro, cidade - UF"
                  style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "2rem", fontFamily: "var(--_font-default)", fontWeight: 700, color: "var(--t-bright)", margin: 0 }}>
                2. Projetos & Condições Comerciais
              </h3>
              <button
                type="button"
                onClick={addProject}
                className="btn btn-default-icon btn-default-accent"
                style={{ height: "4rem", padding: "0.4rem 0.4rem 0.4rem 1.4rem", fontSize: "1.2rem" }}
              >
                <span className="btn-caption">+ Adicionar Projeto</span>
              </button>
            </div>

            {projects.map((proj, pIdx) => {
              const allocated = proj.installments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
              const remaining = Math.round((proj.setupAmount - allocated) * 100) / 100;
              const isMatch = Math.abs(remaining) === 0;

              return (
                <div key={pIdx} style={{ backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", padding: "3.5rem", borderRadius: "0.4rem", position: "relative" }}>
                  {projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProject(pIdx)}
                      style={{ position: "absolute", top: "2rem", right: "2rem", background: "none", border: "none", color: "#ef4444", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", cursor: "pointer" }}
                    >
                      ✕ Remover Projeto
                    </button>
                  )}

                  <h4 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--accent)", margin: "0 0 2rem 0", fontFamily: "var(--_font-accent)" }}>
                    Projeto #{pIdx + 1}
                  </h4>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Nome do Projeto *
                      </label>
                      <input
                        type="text"
                        required
                        value={proj.name}
                        onChange={(e) => updateProject(pIdx, "name", e.target.value)}
                        placeholder="Ex: Landing Page Institucional"
                        style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Domínio
                      </label>
                      <input
                        type="text"
                        value={proj.domain}
                        onChange={(e) => updateProject(pIdx, "domain", e.target.value)}
                        placeholder="Ex: clinicacamila.com.br"
                        style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem", outline: "none" }}
                      />
                    </div>
                  </div>

                  {/* Bloco de Setup com correção do zero e contagem regressiva */}
                  <div style={{ backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", padding: "2.5rem", borderRadius: "0.2rem", marginBottom: "2.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                      <div>
                        <strong style={{ fontSize: "1.4rem", color: "var(--t-bright)", display: "block" }}>
                          Custo de Implantação / Setup
                        </strong>
                        <span style={{ fontSize: "1.2rem", color: "var(--t-muted)" }}>
                          Defina o total e registre as parcelas correspondentes.
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.2rem", color: "var(--t-medium)" }}>
                          Valor Total R$:
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          value={proj.setupAmount === 0 ? "" : proj.setupAmount}
                          onChange={(e) => updateProject(pIdx, "setupAmount", e.target.value === "" ? 0 : parseFloat(e.target.value) || 0)}
                          placeholder="0,00"
                          style={{ width: "160px", height: "4rem", padding: "0 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.4rem", fontWeight: 700 }}
                        />
                      </div>
                    </div>

                    <div style={{ borderTop: "1px dashed var(--st-medium)", paddingTop: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                          <span style={{ fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-muted)" }}>
                            Parcelas ({proj.installments.length})
                          </span>
                          {/* Badge de Balanço Matemático */}
                          {proj.setupAmount > 0 && (
                            <span
                              style={{
                                fontFamily: "var(--_font-accent)",
                                fontSize: "1.1rem",
                                padding: "0.3rem 0.8rem",
                                borderRadius: "0.2rem",
                                backgroundColor: isMatch ? "rgba(16, 185, 129, 0.1)" : remaining > 0 ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                color: isMatch ? "#10b981" : remaining > 0 ? "#f59e0b" : "#ef4444",
                                border: `1px solid ${isMatch ? "rgba(16, 185, 129, 0.3)" : remaining > 0 ? "rgba(245, 158, 11, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                              }}
                            >
                              {isMatch
                                ? "✓ Total Totalmente Definido"
                                : remaining > 0
                                ? `Parcelas a definir: R$ ${remaining.toFixed(2).replace(".", ",")}`
                                : `Excedido em R$ ${Math.abs(remaining).toFixed(2).replace(".", ",")}`}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => addInstallment(pIdx)}
                          style={{ padding: "0.5rem 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", cursor: "pointer" }}
                        >
                          + Adicionar Parcela
                        </button>
                      </div>

                      {proj.installments.map((inst, iIdx) => (
                        <div key={iIdx} style={{ display: "grid", gridTemplateColumns: "1fr 140px 160px 40px", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                          <input
                            type="text"
                            value={inst.description}
                            onChange={(e) => updateInstallment(pIdx, iIdx, "description", e.target.value)}
                            placeholder="Descrição"
                            style={{ height: "4rem", padding: "0 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}
                          />
                          <input
                            type="number"
                            step="0.01"
                            value={inst.amount === 0 ? "" : inst.amount}
                            onChange={(e) => updateInstallment(pIdx, iIdx, "amount", e.target.value)}
                            placeholder="0,00"
                            style={{ height: "4rem", padding: "0 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}
                          />
                          <input
                            type="date"
                            value={inst.scheduledDate}
                            onChange={(e) => updateInstallment(pIdx, iIdx, "scheduledDate", e.target.value)}
                            style={{ height: "4rem", padding: "0 1rem", backgroundColor: "var(--base-tint)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem" }}
                          />
                          <button
                            type="button"
                            onClick={() => removeInstallment(pIdx, iIdx)}
                            style={{ height: "4rem", backgroundColor: "transparent", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#ef4444", cursor: "pointer" }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Plano de Sustentação Mensal
                      </label>
                      <select
                        value={proj.sustainabilityPlan}
                        onChange={(e) => updateProject(pIdx, "sustainabilityPlan", e.target.value)}
                        style={{ width: "100%", height: "4.5rem", padding: "0 1rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", outline: "none" }}
                      >
                        <option value="NONE">Sem Sustentação (R$ 0,00/mês)</option>
                        <option value="ESSENTIAL">Essential (R$ 100,00/mês — 5 e-mails / SLA 24h)</option>
                        <option value="DEVELOPMENT">Development (R$ 300,00/mês — 15 e-mails / SLA 72h)</option>
                        <option value="ADVANCED">Advanced (R$ 700,00/mês — 30+ e-mails / SLA 7d)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "var(--_font-accent)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--t-medium)", marginBottom: "0.6rem" }}>
                        Início da Vigência da Sustentação
                      </label>
                      <input
                        type="date"
                        value={proj.sustainabilityStartDate}
                        onChange={(e) => updateProject(pIdx, "sustainabilityStartDate", e.target.value)}
                        style={{ width: "100%", height: "4.5rem", padding: "0 1.5rem", backgroundColor: "var(--base)", border: "1px solid var(--st-medium)", color: "var(--t-bright)", fontFamily: "var(--_font-accent)", fontSize: "1.2rem", outline: "none" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "2rem", borderTop: "1px solid var(--st-medium)", paddingTop: "3rem" }}>
            <Link href="/admin/clients" style={{ padding: "1.2rem 2.4rem", textDecoration: "none", color: "var(--t-medium)", fontFamily: "var(--_font-accent)", fontSize: "1.3rem" }}>
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-default-icon btn-default-accent"
              style={{ height: "5.2rem", padding: "0.4rem 0.4rem 0.4rem 2rem", fontSize: "1.5rem", cursor: isPending ? "not-allowed" : "pointer" }}
            >
              <span className="btn-caption">{isPending ? "Processando..." : "Finalizar Cadastro do Cliente"}</span>
              <i className="btn-icon" style={{ width: "4rem", height: "4rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="16" height="16" fill="currentColor">
                  <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                </svg>
              </i>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}