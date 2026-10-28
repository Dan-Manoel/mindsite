"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { updateClientProfileAction, logPasswordChangeAuditAction } from "@/app/actions/portal";
import { signOut } from "@/app/actions/auth";

interface ProfileProps {
  initialData: {
    id: string;
    fullName: string;
    email: string;
    secondaryEmail: string;
    phone: string;
    address: string;
    document: string;
    avatarUrl: string;
    companyName: string;
  };
}

export default function PortalProfileView({ initialData }: ProfileProps) {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados dos Dados Cadastrais
  const [fullName, setFullName] = useState(initialData.fullName);
  const [secondaryEmail, setSecondaryEmail] = useState(initialData.secondaryEmail);
  const [phone, setPhone] = useState(initialData.phone);
  const [address, setAddress] = useState(initialData.address);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Estados de Troca de Senha
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Feedback Toasts
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setFeedback({ text, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Upload de Foto de Perfil para o bucket 'avatars'
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification("A foto deve ter no máximo 5MB.", "error");
      return;
    }

    setUploadingAvatar(true);
    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${initialData.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl;

      setAvatarUrl(publicUrl);

      // Salva imediatamente a foto no perfil
      const res = await updateClientProfileAction({ avatarUrl: publicUrl });
      if (res.success) {
        showNotification("Foto de perfil atualizada com sucesso!");
      } else {
        showNotification(res.error || "Erro ao salvar foto.", "error");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao enviar imagem. Verifique o bucket avatars.";
      console.error("Erro no upload do avatar:", message);
      showNotification(message, "error");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Salvar Dados Cadastrais
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateClientProfileAction({
        fullName,
        secondaryEmail,
        phone,
        address,
        avatarUrl,
      });

      if (res.success) {
        showNotification("Dados cadastrais atualizados com sucesso!");
      } else {
        showNotification(res.error || "Erro ao atualizar dados.", "error");
      }
    });
  };

  // Salvar Nova Senha
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showNotification("A senha deve ter no mínimo 6 caracteres.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification("As senhas digitadas não coincidem.", "error");
      return;
    }

    setPasswordLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        showNotification(error.message, "error");
        return;
      }

      await logPasswordChangeAuditAction();
      setNewPassword("");
      setConfirmPassword("");
      showNotification("Sua senha foi redefinida com sucesso!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao redefinir senha.";
      showNotification(message, "error");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <main
      className="mxd-page-content inner-page-content"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--base)",
        paddingBottom: "10rem",
      }}
    >
      <div className="mxd-container grid-l-container" style={{ maxWidth: "900px" }}>
        {/* Notificação Toast */}
        {feedback && (
          <div
            style={{
              position: "fixed",
              top: "3rem",
              right: "3rem",
              zIndex: 9999,
              padding: "1.4rem 2rem",
              backgroundColor: feedback.type === "success" ? "#064e3b" : "#7f1d1d",
              border: `1px solid ${feedback.type === "success" ? "#10b981" : "#ef4444"}`,
              color: "#ffffff",
              fontFamily: "var(--_font-accent)",
              fontSize: "1.3rem",
              borderRadius: "0.2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            {feedback.text}
          </div>
        )}

        {/* Cabeçalho */}
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
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div>
              <Link
                href="/portal/dashboard"
                className="tag tag-s tag-medium"
                style={{
                  color: "var(--accent)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                ← DASHBOARD // Meu Perfil
              </Link>
              <h1
                style={{
                  fontSize: "clamp(2.4rem, 3.2vw, 3.8rem)",
                  fontWeight: 700,
                  margin: 0,
                  color: "var(--t-bright)",
                  fontFamily: "var(--_font-default)",
                }}
              >
                Meu Perfil & Segurança
              </h1>
              <p
                style={{
                  color: "var(--t-medium)",
                  fontSize: "1.4rem",
                  marginTop: "0.6rem",
                  fontFamily: "var(--_font-default)",
                  margin: "0.6rem 0 0 0",
                }}
              >
                Atualize seus dados de contato, foto de identificação e credenciais de acesso.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <Link
                href="/portal/dashboard"
                className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left"
                style={{ height: "4.4rem", padding: "0 1.6rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption">Dashboard</span>
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

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {/* Seção 1: Foto & Dados Cadastrais */}
          <div
            style={{
              backgroundColor: "var(--base-tint)",
              border: "1px solid var(--st-medium)",
              padding: "3.5rem",
              borderRadius: "0.4rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "var(--t-bright)",
                margin: "0 0 2.5rem 0",
                fontFamily: "var(--_font-accent)",
              }}
            >
              Foto de Perfil & Identificação
            </h3>

            {/* Avatar Uploader */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2.5rem",
                paddingBottom: "3rem",
                borderBottom: "1px solid var(--st-medium)",
                marginBottom: "3rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "9rem",
                  height: "9rem",
                  borderRadius: "50%",
                  backgroundColor: "var(--base)",
                  border: "2px solid var(--accent)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Foto do cliente"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--_font-accent)",
                      fontSize: "2.8rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {initialData.fullName ? initialData.fullName[0].toUpperCase() : "C"}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />

                <button
                  type="button"
                  disabled={uploadingAvatar}
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-default-icon btn-default-accent slide-right"
                  style={{
                    height: "4rem",
                    padding: "0.2rem 0.2rem 0.2rem 1.4rem",
                    fontSize: "1.2rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)", fontWeight: 700 }}>
                    {uploadingAvatar ? "Enviando Imagem..." : "Alterar Foto de Perfil"}
                  </span>
                  <i className="btn-icon" style={{ width: "3rem", height: "3rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12" fill="currentColor">
                      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.08a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l48-48,44,44,20-20L216,200H40ZM96,96a16,16,0,1,1,16,16A16,16,0,0,1,96,96Z" />
                    </svg>
                  </i>
                </button>
                <p style={{ margin: 0, fontSize: "1.2rem", color: "var(--t-muted)", fontFamily: "var(--_font-accent)" }}>
                  Formatos suportados: PNG, JPG ou WebP até 5MB. Upload direto para o bucket Supabase.
                </p>
              </div>
            </div>

            {/* Formulário de Dados */}
            <form onSubmit={handleSaveProfile}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
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
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      height: "4.5rem",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
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
                      color: "var(--t-muted)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    E-mail Principal (Login Supabase)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={initialData.email}
                    style={{
                      width: "100%",
                      height: "4.5rem",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-muted)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
                      opacity: 0.6,
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
                    E-mail Secundário (Cópia / Notificações)
                  </label>
                  <input
                    type="email"
                    value={secondaryEmail}
                    onChange={(e) => setSecondaryEmail(e.target.value)}
                    placeholder="financeiro@empresa.com.br"
                    style={{
                      width: "100%",
                      height: "4.5rem",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
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
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    style={{
                      width: "100%",
                      height: "4.5rem",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
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
                    Endereço Comercial / Faturamento
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Av. Paulista, 1000, Cj. 42 - Bela Vista, São Paulo - SP"
                    style={{
                      width: "100%",
                      height: "4.5rem",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)", fontWeight: 700 }}>
                  {isPending ? "Salvando Alterações..." : "Salvar Dados Cadastrais"}
                </span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="12" height="12" fill="currentColor">
                    <path d="M15.7,4.3l-2-2C13.5,2.1,13.3,2,13,2H3C2.4,2,2,2.4,2,3v12c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1V5C16,4.7,15.9,4.5,15.7,4.3z M9,4h2v3H9V4z M13,14H5v-4h8V14z" />
                  </svg>
                </i>
              </button>
            </form>
          </div>

          {/* Seção 2: Segurança & Senha */}
          <div
            style={{
              backgroundColor: "var(--base-tint)",
              border: "1px solid var(--st-medium)",
              padding: "3.5rem",
              borderRadius: "0.4rem",
            }}
          >
            <div style={{ marginBottom: "2.5rem" }}>
              <span className="tag tag-s tag-medium" style={{ color: "var(--accent)", fontFamily: "var(--_font-accent)", marginBottom: "0.8rem", display: "inline-block" }}>
                Autenticação Supabase
              </span>
              <h3
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "var(--t-bright)",
                  margin: "0 0 0.5rem 0",
                  fontFamily: "var(--_font-accent)",
                }}
              >
                Redefinir Senha de Acesso
              </h3>
              <p style={{ fontSize: "1.3rem", color: "var(--t-medium)", margin: 0 }}>
                A nova senha deve possuir no mínimo 6 caracteres e passa a valer imediatamente para os próximos logins.
              </p>
            </div>

            <form onSubmit={handleUpdatePassword}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
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
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    style={{
                      width: "100%",
                      height: "4.5rem",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
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
                    Confirmar Nova Senha *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    style={{
                      width: "100%",
                      height: "4.5rem",
                      padding: "0 1.5rem",
                      backgroundColor: "var(--base)",
                      border: "1px solid var(--st-medium)",
                      color: "var(--t-bright)",
                      fontFamily: "var(--_font-accent)",
                      fontSize: "1.3rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="btn btn-default-icon btn-default-accent slide-right"
                style={{ height: "4.4rem", padding: "0.4rem 0.4rem 0.4rem 1.6rem", fontSize: "1.3rem" }}
              >
                <span className="btn-caption" style={{ fontFamily: "var(--_font-accent)", fontWeight: 700 }}>
                  {passwordLoading ? "Atualizando..." : "Atualizar Senha de Acesso"}
                </span>
                <i className="btn-icon" style={{ width: "3.4rem", height: "3.4rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12" fill="currentColor">
                    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-64a16,16,0,1,1-16-16A16,16,0,0,1,128,144Z" />
                  </svg>
                </i>
              </button>
            </form>
          </div>

          {/* Seção 3: LGPD & Auditoria */}
          <div
            style={{
              padding: "2.5rem 3rem",
              backgroundColor: "rgba(0, 43, 186, 0.05)",
              border: "1px dashed var(--accent)",
              borderRadius: "0.4rem",
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div style={{ fontSize: "2.8rem" }}>🛡️</div>
            <div>
              <h4 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--t-bright)", margin: "0 0 0.4rem 0", fontFamily: "var(--_font-accent)" }}>
                Privacidade & Auditoria LGPD
              </h4>
              <p style={{ fontSize: "1.2rem", color: "var(--t-medium)", margin: 0, lineHeight: 1.5 }}>
                Em conformidade com a LGPD (Lei Geral de Proteção de Dados), todas as alterações de perfil e redefinições de senha são criptografadas e gravadas em logs de auditoria imutáveis com endereço IP e carimbo temporal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
