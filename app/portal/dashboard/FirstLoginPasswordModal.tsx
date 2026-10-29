"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { completeFirstLoginAction } from "@/app/actions/portal";

interface FirstLoginPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

/**
 * Detecta sequências contínuas de 3 ou mais caracteres numéricos ou alfabéticos
 * (ex: "123", "234", "789", "321", "abc", "bcd", "xyz", "cba").
 */
export function hasContinuousSequence(value: string): boolean {
  if (value.length < 3) return false;

  for (let i = 0; i <= value.length - 3; i++) {
    const c0 = value[i];
    const c1 = value[i + 1];
    const c2 = value[i + 2];

    const isDigitSeq = /[0-9]/.test(c0) && /[0-9]/.test(c1) && /[0-9]/.test(c2);
    const isAlphaSeq = /[a-zA-Z]/.test(c0) && /[a-zA-Z]/.test(c1) && /[a-zA-Z]/.test(c2);

    if (isDigitSeq) {
      const n0 = c0.charCodeAt(0);
      const n1 = c1.charCodeAt(0);
      const n2 = c2.charCodeAt(0);
      if ((n1 - n0 === 1 && n2 - n1 === 1) || (n0 - n1 === 1 && n1 - n2 === 1)) {
        return true;
      }
    }

    if (isAlphaSeq) {
      const a0 = c0.toLowerCase().charCodeAt(0);
      const a1 = c1.toLowerCase().charCodeAt(0);
      const a2 = c2.toLowerCase().charCodeAt(0);
      if ((a1 - a0 === 1 && a2 - a1 === 1) || (a0 - a1 === 1 && a1 - a2 === 1)) {
        return true;
      }
    }
  }

  return false;
}

export default function FirstLoginPasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: FirstLoginPasswordModalProps) {
  const [step, setStep] = useState<"CHOICE" | "SET_PASSWORD">("CHOICE");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Política de Senha (5 requisitos)
  const reqMinLength = password.length >= 8;
  const reqSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const reqDigit = /[0-9]/.test(password);
  const reqUppercase = /[A-Z]/.test(password);
  const reqNoSequence = password.length > 0 && !hasContinuousSequence(password);

  const requirements = [
    { label: "Mínimo de 8 caracteres", met: reqMinLength },
    { label: "Pelo menos 1 caractere especial (!@#$%...)", met: reqSpecialChar },
    { label: "Pelo menos 1 dígito numérico (0-9)", met: reqDigit },
    { label: "Pelo menos 1 letra maiúscula (A-Z)", met: reqUppercase },
    { label: "Sem sequências contínuas (ex: 123, abc)", met: reqNoSequence },
  ];

  const allRequirementsMet = requirements.every((r) => r.met);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const isSubmitEnabled = allRequirementsMet && passwordsMatch && !loading;

  const handleToggleShowPassword = () => {
    const nextShow = !showPassword;
    setShowPassword(nextShow);
    // Regra de UX: Ao clicar no olho para exibir a senha digitada,
    // sincroniza automaticamente o campo "Confirmar Nova Senha"
    if (nextShow && password) {
      setConfirmPassword(password);
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (showPassword) {
      setConfirmPassword(val);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    await completeFirstLoginAction({ passwordChanged: false });
    setLoading(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!allRequirementsMet) {
      setError("A senha deve atender a todos os 5 requisitos de segurança.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas informadas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateErr } = await supabase.auth.updateUser({
        password,
      });

      if (updateErr) {
        setError(updateErr.message);
        setLoading(false);
        return;
      }

      await completeFirstLoginAction({ passwordChanged: true });
      setLoading(false);
      onSuccess?.("Senha definitiva configurada com sucesso!");
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao atualizar senha.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--base-tint)",
          border: "1px solid var(--accent)",
          maxWidth: "560px",
          width: "100%",
          padding: "4rem",
          borderRadius: "0.4rem",
          boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "0.4rem 1.2rem",
            backgroundColor: "rgba(0, 43, 186, 0.15)",
            border: "1px solid var(--accent)",
            color: "#819ffe",
            fontFamily: "var(--_font-accent)",
            fontSize: "1.1rem",
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: "1.8rem",
            borderRadius: "0.2rem",
          }}
        >
          Primeiro Acesso Detectado
        </span>

        <h3
          style={{
            fontSize: "2.4rem",
            fontFamily: "var(--_font-default)",
            fontWeight: 700,
            color: "var(--t-bright)",
            margin: "0 0 1.2rem 0",
          }}
        >
          Bem-vindo ao Portal MindSite!
        </h3>

        {step === "CHOICE" ? (
          <>
            <p
              style={{
                fontSize: "1.4rem",
                color: "var(--t-medium)",
                lineHeight: 1.6,
                marginBottom: "3rem",
              }}
            >
              Você acessou sua conta utilizando a <strong>senha temporária</strong> enviada por
              e-mail. Por segurança, recomendamos definir uma senha pessoal agora. Deseja trocar sua
              senha temporária ou mantê-la por enquanto?
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <button
                type="button"
                onClick={() => setStep("SET_PASSWORD")}
                className="btn btn-default-icon btn-default-accent"
                style={{
                  width: "100%",
                  height: "4.8rem",
                  justifyContent: "space-between",
                  padding: "0.4rem 0.4rem 0.4rem 2rem",
                  fontSize: "1.4rem",
                }}
              >
                <span className="btn-caption">Trocar para uma Nova Senha Agora (Recomendado)</span>
                <i className="btn-icon" style={{ width: "3.8rem", height: "3.8rem" }}>
                  →
                </i>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleSkip}
                style={{
                  width: "100%",
                  height: "4.6rem",
                  backgroundColor: "transparent",
                  border: "1px solid var(--st-medium)",
                  color: "var(--t-medium)",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  borderRadius: "0.2rem",
                }}
              >
                {loading ? "Processando..." : "Manter a Senha Atual e Ir para o Painel"}
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
          >
            <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
              Escolha uma nova senha segura que atenda aos 5 critérios abaixo:
            </p>

            {error && (
              <div
                style={{
                  padding: "1.2rem",
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid #ef4444",
                  color: "#ef4444",
                  fontSize: "1.2rem",
                  fontFamily: "var(--_font-accent)",
                  borderRadius: "0.2rem",
                }}
              >
                {error}
              </div>
            )}

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
                Nova Senha *
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Digite sua nova senha..."
                  style={{
                    width: "100%",
                    height: "4.6rem",
                    padding: "0 4.6rem 0 1.5rem",
                    backgroundColor: "var(--base)",
                    border: `1px solid ${allRequirementsMet ? "#10b981" : "var(--st-medium)"}`,
                    color: "var(--t-bright)",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.4rem",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={handleToggleShowPassword}
                  title={
                    showPassword
                      ? "Ocultar senha"
                      : "Mostrar senha e sincronizar confirmação"
                  }
                  style={{
                    position: "absolute",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    color: showPassword ? "#10b981" : "var(--t-muted)",
                    cursor: "pointer",
                    fontSize: "1.6rem",
                    padding: "0.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>

              {/* Lista dos 5 requisitos em tempo real */}
              <div
                style={{
                  marginTop: "1.2rem",
                  padding: "1.2rem 1.4rem",
                  backgroundColor: "var(--base)",
                  border: "1px solid var(--st-medium)",
                  borderRadius: "0.2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {requirements.map((req, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.15rem",
                      color: req.met ? "#10b981" : "var(--t-muted)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "1.6rem",
                        height: "1.6rem",
                        borderRadius: "50%",
                        backgroundColor: req.met
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${req.met ? "#10b981" : "var(--st-medium)"}`,
                        color: req.met ? "#10b981" : "var(--t-muted)",
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {req.met ? "✓" : "•"}
                    </span>
                    <span style={{ fontWeight: req.met ? 600 : 400 }}>{req.label}</span>
                  </div>
                ))}
              </div>
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
                Confirmar Nova Senha *
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a nova senha"
                style={{
                  width: "100%",
                  height: "4.6rem",
                  padding: "0 1.5rem",
                  backgroundColor: "var(--base)",
                  border: `1px solid ${
                    confirmPassword.length > 0
                      ? passwordsMatch
                        ? "#10b981"
                        : "#ef4444"
                      : "var(--st-medium)"
                  }`,
                  color: "var(--t-bright)",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.4rem",
                  outline: "none",
                }}
              />
              {confirmPassword.length > 0 && !passwordsMatch && (
                <span
                  style={{
                    display: "block",
                    marginTop: "0.5rem",
                    fontSize: "1.1rem",
                    fontFamily: "var(--_font-accent)",
                    color: "#ef4444",
                  }}
                >
                  ✕ As senhas ainda não coincidem.
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "1.2rem", marginTop: "0.8rem" }}>
              <button
                type="button"
                onClick={() => setStep("CHOICE")}
                style={{
                  padding: "0 2rem",
                  height: "4.6rem",
                  background: "none",
                  border: "1px solid var(--st-medium)",
                  color: "var(--t-medium)",
                  fontFamily: "var(--_font-accent)",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                }}
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={!isSubmitEnabled}
                className="btn btn-default-icon btn-default-accent"
                style={{
                  flex: 1,
                  height: "4.6rem",
                  padding: "0.4rem 0.4rem 0.4rem 1.8rem",
                  fontSize: "1.4rem",
                  opacity: isSubmitEnabled ? 1 : 0.45,
                  cursor: isSubmitEnabled ? "pointer" : "not-allowed",
                }}
              >
                <span className="btn-caption">
                  {loading ? "Salvando..." : "Salvar Nova Senha"}
                </span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                  ✓
                </i>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

