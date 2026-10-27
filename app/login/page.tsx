"use client";

import { useActionState } from "react";
import { signInWithEmail } from "@/app/actions/auth";
import Link from "next/link";
import CommonLoadAnimation, { CommonLoadFade } from "@/components/animations/CommonLoadAnimation";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error?: string } | null, formData: FormData) => {
      const res = await signInWithEmail(formData);
      return res || null;
    },
    null
  );

  return (
    <CommonLoadAnimation>
      <main
        className="mxd-page-content inner-page-content"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--base)",
          paddingTop: "clamp(12rem, 16vw, 18rem)",
          paddingBottom: "8rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="mxd-container grid-l-container" style={{ width: "100%" }}>
          <div className="container-fluid p-0">
            <div className="row g-0 justify-content-center">
              <div className="col-12 col-md-10 col-lg-7 col-xl-6 mxd-grid-item">

                {/* Voltar para Início */}
                <CommonLoadFade index={0}>
                  <div style={{ marginBottom: "2.5rem" }} className="loading-fade">
                    <Link
                      className="btn-line-icon btn-line-icon-small btn-line-default slide-left"
                      href="/"
                      title="Voltar ao início do site"
                    >
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          width="14"
                          height="14"
                          fill="currentColor"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
                        </svg>
                      </i>
                      <span className="btn-caption">Voltar ao Início</span>
                    </Link>
                  </div>
                </CommonLoadFade>

                {/* Card de Acesso MindSite */}
                <CommonLoadFade index={1}>
                  <div
                    className="mxd-block loading-fade"
                    style={{
                      backgroundColor: "var(--base-tint)",
                      border: "1px solid var(--st-medium)",
                      padding: "clamp(3rem, 5vw, 5rem)",
                      position: "relative",
                      borderRadius: "0.2rem",
                      boxShadow: "0 24px 48px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    {/* Header do Card */}
                    <div style={{ marginBottom: "3.2rem" }}>
                      <span
                        style={{
                          display: "inline-block",
                          color: "var(--accent)",
                          fontFamily: "var(--_font-accent)",
                          letterSpacing: "0.15rem",
                          textTransform: "uppercase",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          marginBottom: "1.2rem",
                        }}
                      >
                        Portal MindSite • Área Exclusiva
                      </span>
                      <h1
                        style={{
                          fontFamily: "var(--_font-default)",
                          fontSize: "clamp(2.6rem, 4vw, 3.8rem)",
                          fontWeight: 700,
                          color: "var(--t-bright)",
                          lineHeight: 1.15,
                          letterSpacing: "-0.04em",
                          margin: 0,
                        }}
                      >
                        Acesso ao Sistema
                      </h1>
                      <p
                        style={{
                          fontFamily: "var(--_font-default)",
                          fontSize: "1.5rem",
                          color: "var(--t-medium)",
                          marginTop: "1.2rem",
                          lineHeight: 1.6,
                          marginBottom: 0,
                        }}
                      >
                        Painel integrado de sustentação, chamados técnicos com SLA e faturas unificadas.
                      </p>
                    </div>

                    {/* Mensagem de Erro de Autenticação */}
                    {state?.error && (
                      <div
                        role="alert"
                        style={{
                          marginBottom: "2.8rem",
                          padding: "1.4rem 1.8rem",
                          backgroundColor: "rgba(239, 68, 68, 0.08)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#ef4444",
                          fontFamily: "var(--_font-accent)",
                          fontSize: "1.3rem",
                          borderRadius: "0.2rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          width="18"
                          height="18"
                          fill="currentColor"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z" />
                        </svg>
                        <span>{state.error}</span>
                      </div>
                    )}

                    {/* Formulário com Estilos Nativos MindSite */}
                    <form
                      action={formAction}
                      className="form"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2.6rem",
                      }}
                    >
                      <div>
                        <label
                          htmlFor="login-email"
                          style={{
                            display: "block",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.2rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1rem",
                            color: "var(--t-medium)",
                            marginBottom: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          E-mail Corporativo
                        </label>
                        <input
                          id="login-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder="cliente@empresa.com.br"
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            borderBottom: "1px solid var(--st-medium)",
                            padding: "1.2rem 0.4rem",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.6rem",
                            color: "var(--t-bright)",
                            outline: "none",
                            transition: "border-color var(--_animspeed-medium) ease",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--st-bright)")}
                          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--st-medium)")}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="login-password"
                          style={{
                            display: "block",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.2rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.1rem",
                            color: "var(--t-medium)",
                            marginBottom: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          Senha de Acesso
                        </label>
                        <input
                          id="login-password"
                          type="password"
                          name="password"
                          required
                          autoComplete="current-password"
                          placeholder="••••••••••••"
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            border: "none",
                            borderBottom: "1px solid var(--st-medium)",
                            padding: "1.2rem 0.4rem",
                            fontFamily: "var(--_font-accent)",
                            fontSize: "1.6rem",
                            color: "var(--t-bright)",
                            outline: "none",
                            transition: "border-color var(--_animspeed-medium) ease",
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--st-bright)")}
                          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--st-medium)")}
                        />
                      </div>

                      {/* Botão de Envio com Classes Nativas */}
                      <div style={{ paddingTop: "0.8rem" }}>
                        <button
                          type="submit"
                          disabled={isPending}
                          className="btn btn-default-icon btn-default-accent btn-default-fullwidth slide-right"
                          style={{
                            cursor: isPending ? "not-allowed" : "pointer",
                            opacity: isPending ? 0.6 : 1,
                          }}
                        >
                          <span
                            className="btn-caption"
                            style={{
                              fontFamily: "var(--_font-accent)",
                              fontSize: "1.6rem",
                              fontWeight: 700,
                            }}
                          >
                            {isPending ? "Validando Acesso..." : "Entrar no Sistema"}
                          </span>
                          <i className="btn-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                              aria-hidden="true"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </button>
                      </div>
                    </form>

                    {/* Rodapé / Suporte Técnico */}
                    <div
                      style={{
                        marginTop: "3.5rem",
                        paddingTop: "2.4rem",
                        borderTop: "1px solid var(--st-medium)",
                        textAlign: "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--_font-default)",
                          fontSize: "1.3rem",
                          color: "var(--t-muted)",
                          margin: 0,
                          lineHeight: 1.6,
                        }}
                      >
                        Dúvidas ou solicitação de acesso? Entre em contato via{" "}
                        <a
                          href="mailto:contato@mindsite.com.br"
                          style={{
                            color: "var(--t-bright)",
                            textDecoration: "underline",
                            fontFamily: "var(--_font-accent)",
                            fontWeight: 600,
                          }}
                        >
                          contato@mindsite.com.br
                        </a>
                      </p>
                    </div>
                  </div>
                </CommonLoadFade>

              </div>
            </div>
          </div>
        </div>
      </main>
    </CommonLoadAnimation>
  );
}