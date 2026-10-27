"use client";

import { type FormEvent, useRef, useState } from "react";
import { CommonLoadItem } from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import { sendContactLead } from "@/app/actions/contact";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const isSubmitting = status === "sending";
  const isSuccess = status === "success";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setStatus("sending");
    setFeedback("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await sendContactLead(formData);

      if (result.error) {
        setStatus("error");
        setFeedback(
          result.message || "Ocorreu um erro ao enviar. Por favor, tente novamente em alguns instantes."
        );
        return;
      }

      setStatus("success");
      setFeedback(
        result.message || "Obrigado pela sua mensagem! Entraremos em contato o mais breve possível."
      );
      form.reset();
    } catch (err: unknown) {
      console.error("[ContactForm Error]:", err);
      setStatus("error");
      setFeedback(
        "A solicitação falhou devido a uma instabilidade temporária. Por favor, tente novamente."
      );
    }
  }

  function handleReset() {
    setStatus("idle");
    setFeedback("");
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <div className="mxd-block contact">
      <div className="mxd-form-container">
        {/* Bloco de Sucesso / Feedback Visual Oficial */}
        {isSuccess && (
          <div
            className="form__reply centered text-center is-visible"
            role="status"
            aria-live="polite"
          >
            <i className="ph-fill ph-smiley-wink reply__icon" aria-hidden="true" />
            <p className="reply__title">Pronto!</p>
            <span className="reply__text">{feedback}</span>
            <div style={{ marginTop: "1.6rem" }}>
              <button
                type="button"
                className="btn btn-line"
                onClick={handleReset}
              >
                <span className="btn-caption">Enviar outra mensagem</span>
              </button>
            </div>
          </div>
        )}

        {/* Formulário com Interações e Acessibilidade */}
        <form
          ref={formRef}
          className={`form contact-form${isSuccess ? " is-hidden" : ""}`}
          id="contact-form"
          onSubmit={handleSubmit}
          noValidate={false}
        >
          {/* Honeypot field contra bots de spam */}
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="container-fluid p-0">
            <div className="row gx-0">
              <CommonLoadItem index={0}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Seu nome*"
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-label="Seu nome"
                  />
                </div>
              </CommonLoadItem>

              <CommonLoadItem index={1}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Nome da empresa"
                    disabled={isSubmitting}
                    aria-label="Nome da empresa"
                  />
                </div>
              </CommonLoadItem>

              <CommonLoadItem index={2}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email*"
                    required
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-label="Seu endereço de e-mail"
                  />
                </div>
              </CommonLoadItem>

              <CommonLoadItem index={3}>
                <div className="col-12 col-md-6 mxd-grid-item loading-item">
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Telefone"
                    disabled={isSubmitting}
                    aria-label="Seu número de telefone de contato"
                  />
                </div>
              </CommonLoadItem>

              <CommonLoadItem index={4}>
                <div className="col-12 mxd-grid-item loading-item">
                  <textarea
                    name="message"
                    placeholder="Algumas palavras sobre o seu projeto*"
                    required
                    defaultValue=""
                    disabled={isSubmitting}
                    rows={4}
                    aria-required="true"
                    aria-label="Algumas palavras sobre o seu projeto"
                  />
                </div>
              </CommonLoadItem>

              <CommonLoadItem index={5}>
                <div className="col-12 mxd-grid-item loading-item">
                  <button
                    className="btn btn-default-icon btn-default-accent slide-right"
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="btn-caption">Enviando…</span>
                    ) : (
                      <TextScramble className="btn-caption mxd-scramble">
                        Enviar
                      </TextScramble>
                    )}
                    <i className="btn-icon" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 18 18"
                        aria-hidden
                      >
                        <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                      </svg>
                    </i>
                  </button>
                </div>
              </CommonLoadItem>
            </div>
          </div>
        </form>

        {/* Mensagem de Erro / Validação */}
        {status === "error" && feedback ? (
          <div
            role="alert"
            style={{
              marginTop: "2rem",
              padding: "1rem 1.25rem",
              borderRadius: "6px",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <i
              className="ph-bold ph-warning-circle"
              style={{ color: "#ef4444", fontSize: "1.25rem", flexShrink: 0 }}
              aria-hidden="true"
            />
            <p
              className="reply__text"
              style={{
                color: "#fca5a5",
                margin: 0,
                fontSize: "0.95rem",
                lineHeight: 1.4,
              }}
            >
              {feedback}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
