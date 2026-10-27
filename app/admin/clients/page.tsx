"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { getClientsListAction } from "@/app/actions/adminClients";

type ClientListItem = Awaited<ReturnType<typeof getClientsListAction>>[number];

export default function ClientsListPage() {
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const loadClients = () => {
    startTransition(async () => {
      const data = await getClientsListAction("");
      setClients(data);
    });
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Filtro simultâneo por Nome do Cliente, Empresa, Nome do Projeto ou Plano de Sustentação
  const filteredClients = clients.filter((c) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase().trim();

    const nameMatch = (c.fullName || "").toLowerCase().includes(query);
    const companyMatch = (c.companyName || "").toLowerCase().includes(query);
    const emailMatch = (c.email || "").toLowerCase().includes(query);
    const docMatch = (c.document || "").toLowerCase().includes(query);

    const projectMatch = (c.projects || []).some((p) =>
      (p.name || "").toLowerCase().includes(query) ||
      (p.domain || "").toLowerCase().includes(query) ||
      (p.contracts || []).some(
        (cont) =>
          (cont.title || "").toLowerCase().includes(query) ||
          (cont.contractType || "").toLowerCase().includes(query)
      )
    );

    return nameMatch || companyMatch || emailMatch || docMatch || projectMatch;
  });

  return (
    <main
      className="mxd-page-content inner-page-content"
      style={{ minHeight: "100vh", backgroundColor: "var(--base)", paddingBottom: "10rem" }}
    >
      <div className="mxd-container grid-l-container">
        {/* Header */}
        <div
          className="mxd-block"
          style={{
            paddingTop: "4rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid var(--st-medium)",
            marginBottom: "4rem",
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
                style={{ color: "var(--accent)", display: "inline-block", marginBottom: "0.5rem" }}
              >
                MindSite Admin
              </span>
              <h1
                style={{
                  fontSize: "clamp(2.4rem, 3.5vw, 4rem)",
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--t-bright)",
                }}
              >
                Carteira de Clientes
              </h1>
            </div>

            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link
                href="/admin/clients/new"
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{
                  height: "4.4rem",
                  padding: "0.4rem 0.4rem 0.4rem 1.6rem",
                  fontSize: "1.3rem",
                }}
              >
                <span className="btn-caption">+ Novo Cliente</span>
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
              </Link>
              <Link
                href="/admin/dashboard"
                className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left"
              >
                <span className="btn-caption" style={{ fontSize: "1.3rem" }}>
                  Dashboard
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Campo de Filtro Rápido Simultâneo */}
        <div style={{ marginBottom: "3rem", maxWidth: "680px" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar por Nome, Empresa, Projeto ou Plano de Sustentação..."
              style={{
                width: "100%",
                height: "4.8rem",
                padding: "0 4rem 0 1.6rem",
                backgroundColor: "var(--base-tint)",
                border: "1px solid var(--st-medium)",
                color: "var(--t-bright)",
                fontFamily: "var(--_font-accent)",
                fontSize: "1.3rem",
                borderRadius: "0.4rem",
                outline: "none",
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                style={{
                  position: "absolute",
                  right: "1.2rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--t-muted)",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            )}
          </div>
          <span
            style={{
              display: "block",
              fontFamily: "var(--_font-accent)",
              fontSize: "1.1rem",
              color: "var(--t-muted)",
              marginTop: "0.8rem",
            }}
          >
            Exibindo {filteredClients.length} de {clients.length} cliente(s)
          </span>
        </div>

        {/* Tabela de Clientes */}
        <div
          style={{
            backgroundColor: "var(--base-tint)",
            border: "1px solid var(--st-medium)",
            borderRadius: "0.4rem",
            overflowX: "auto",
          }}
        >
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
                <th style={{ padding: "1.5rem" }}>Cliente / Empresa</th>
                <th style={{ padding: "1.5rem" }}>E-mails (Login / Backup)</th>
                <th style={{ padding: "1.5rem" }}>Documento</th>
                <th style={{ padding: "1.5rem" }}>Projetos & Contratos</th>
                <th style={{ padding: "1.5rem", textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ padding: "4rem", textAlign: "center", color: "var(--t-muted)" }}
                  >
                    {isPending ? "Carregando clientes..." : "Nenhum cliente localizado."}
                  </td>
                </tr>
              ) : (
                filteredClients.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid var(--st-medium)" }}>
                    <td style={{ padding: "1.5rem" }}>
                      <strong style={{ color: "var(--t-bright)", display: "block" }}>
                        {c.companyName || c.fullName}
                      </strong>
                      <span style={{ fontSize: "1.1rem", color: "var(--t-muted)" }}>
                        {c.fullName}
                      </span>
                    </td>
                    <td style={{ padding: "1.5rem" }}>
                      <span style={{ color: "var(--t-bright)", display: "block" }}>{c.email}</span>
                      {c.secondaryEmail && (
                        <span style={{ fontSize: "1.1rem", color: "var(--t-muted)" }}>
                          {c.secondaryEmail}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "1.5rem", color: "var(--t-medium)" }}>
                      {c.document || "-"}
                    </td>
                    <td style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {(c.projects || []).map((p) => (
                          <span
                            key={p.id}
                            style={{
                              padding: "0.2rem 0.6rem",
                              fontSize: "1rem",
                              border: "1px solid var(--st-medium)",
                              borderRadius: "0.2rem",
                              backgroundColor: "var(--base)",
                              color: "var(--t-bright)",
                            }}
                          >
                            {p.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "1.5rem", textAlign: "right" }}>
                      <Link
                        href={`/admin/clients/${c.id}/edit`}
                        style={{
                          padding: "0.6rem 1.4rem",
                          fontSize: "1.1rem",
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
    </main>
  );
}