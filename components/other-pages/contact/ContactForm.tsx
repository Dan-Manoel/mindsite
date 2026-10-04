"use client";

import { type FormEvent, useState } from "react";
import { CommonLoadItem } from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";

type FormStatus = "idle" | "sending" | "success" | "error";

interface ApiResponse {
  success: boolean;
  message?: string;
  id?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setFeedback("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      _gotcha: formData.get("_gotcha"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await res.json().catch(() => ({
        success: false,
        message: "Erro na resposta do servidor.",
      }));

      if (res.ok && data.success) {
        setStatus("success");
        setFeedback(
          data.message ||
            "Obrigado pela sua mensagem. Entraremos em contato o mais breve possível.",
        );
        form.reset();
        return;
      }

      setStatus("error");
      setFeedback(
        data.message && data.message.length > 0
          ? data.message
          : "Ocorreu um erro ao enviar. Por favor, tente novamente em alguns instantes.",
      );
    } catch {
      setStatus("error");
      setFeedback(
        "A solicitação falhou. Verifique sua conexão e tente novamente.",
      );
    }
  }

  const showSuccessReply = status === "success";

  return (
    <div className="mxd-block contact">
      <div className="mxd-form-container">
        {showSuccessReply && (
          <div
            className="form__reply centered text-center is-visible"
            role="status"
            aria-live="polite"
          >
            <i className="ph-fill ph-smiley-wink reply__icon" />
            <p className="reply__title">Pronto!</p>
            <span className="reply__text">{feedback}</span>
            <div style={{ marginTop: "1.6rem" }}>
              <button
                type="button"
                className="btn btn-line"
                onClick={() => {
                  setStatus("idle");
                  setFeedback("");
                }}
              >
                <span className="btn-caption">Enviar outra mensagem</span>
              </button>
            </div>
          </div>
        )}

        <form
          className={`form contact-form${status === "success" ? " is-hidden" : ""}`}
          id="contact-form"
          onSubmit={onSubmit}
        >
          {/* Honeypot field for spam prevention */}
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
                    disabled={status === "sending" || showSuccessReply}
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
                    disabled={status === "sending" || showSuccessReply}
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
                    disabled={status === "sending" || showSuccessReply}
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
                    disabled={status === "sending" || showSuccessReply}
                  />
                </div>
              </CommonLoadItem>
              <CommonLoadItem index={4}>
                <div className="col-12 mxd-grid-item loading-item">
                  <textarea
                    name="message"
                    placeholder="Algumas palavras sobre o seu projeto*"
                    required
                    defaultValue={""}
                    disabled={status === "sending" || showSuccessReply}
                  />
                </div>
              </CommonLoadItem>
              <CommonLoadItem index={5}>
                <div className="col-12 mxd-grid-item loading-item">
                  <button
                    className="btn btn-default-icon btn-default-accent slide-right"
                    type="submit"
                    disabled={status === "sending" || showSuccessReply}
                  >
                    {status === "sending" ? (
                      <span className="btn-caption">Enviando…</span>
                    ) : (
                      <TextScramble className="btn-caption mxd-scramble">
                        Enviar
                      </TextScramble>
                    )}
                    <i className="btn-icon">
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
        {status === "error" && feedback ? (
          <p
            className="reply__text"
            role="alert"
            style={{ marginTop: "2.4rem", color: "#f87171" }}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </div>
  );
}
