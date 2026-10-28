export default function PortalLoading() {
  return (
    <main
      className="mxd-page-content inner-page-content"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--base, #0f0f0f)",
        paddingTop: "clamp(12rem, 16vw, 18rem)",
        paddingBottom: "10rem",
      }}
    >
      <style>{`
        @keyframes mindsitePulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
        .ms-skeleton-pulse {
          animation: mindsitePulse 1.6s ease-in-out infinite;
        }
      `}</style>

      <div className="mxd-container grid-l-container">
        {/* Top Header Bar do Cliente (Imediato no Streaming) */}
        <div
          className="mxd-block"
          style={{
            paddingTop: "2rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid var(--st-medium, #27272a)",
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
                  color: "var(--accent, #002bba)",
                  letterSpacing: "0.1rem",
                  display: "inline-block",
                  marginBottom: "0.8rem",
                  fontFamily: "var(--_font-accent, monospace)",
                  fontWeight: 700,
                }}
              >
                [ DASHBOARD // STREAMING ]
              </span>
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 3.5vw, 4.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "var(--t-bright, #ffffff)",
                  fontFamily: "var(--_font-default, sans-serif)",
                  margin: 0,
                }}
              >
                Painel do Projeto &amp; Chamados
              </h1>
              <div
                className="ms-skeleton-pulse"
                style={{
                  width: "26rem",
                  height: "1.8rem",
                  marginTop: "1rem",
                  backgroundColor: "var(--base-tint, #171719)",
                  border: "1px solid var(--st-medium, #27272a)",
                  borderRadius: "0.2rem",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div
                className="ms-skeleton-pulse"
                style={{
                  width: "16rem",
                  height: "4.4rem",
                  backgroundColor: "var(--base-tint, #171719)",
                  border: "1px solid var(--st-medium, #27272a)",
                  borderRadius: "0.2rem",
                }}
              />
              <div
                className="ms-skeleton-pulse"
                style={{
                  width: "12rem",
                  height: "4.4rem",
                  backgroundColor: "var(--base-tint, #171719)",
                  border: "1px solid var(--st-medium, #27272a)",
                  borderRadius: "0.2rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Skeleton: Card de Informações do Projeto & Sustentação */}
        <div
          className="mxd-block ms-skeleton-pulse"
          style={{
            backgroundColor: "var(--base-tint, #171719)",
            border: "1px solid var(--st-medium, #27272a)",
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
              <div
                style={{
                  fontFamily: "var(--_font-accent, monospace)",
                  fontSize: "1.1rem",
                  color: "var(--t-muted, #71717a)",
                  marginBottom: "1rem",
                }}
              >
                [ AMBIENTE ATIVO // CARREGANDO PROJETO... ]
              </div>
              <div
                style={{
                  width: "55%",
                  height: "2.6rem",
                  backgroundColor: "var(--base, #0f0f0f)",
                  borderRadius: "0.2rem",
                  marginBottom: "1.2rem",
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: "1.6rem",
                  backgroundColor: "var(--base, #0f0f0f)",
                  borderRadius: "0.2rem",
                }}
              />
            </div>

            <div
              style={{
                backgroundColor: "var(--base, #0f0f0f)",
                border: "1px solid var(--st-medium, #27272a)",
                padding: "2rem 2.5rem",
                borderRadius: "0.4rem",
                minWidth: "320px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--_font-accent, monospace)",
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  color: "var(--t-muted, #71717a)",
                  marginBottom: "1.2rem",
                }}
              >
                PLANO DE SUSTENTAÇÃO
              </div>
              <div
                style={{
                  width: "14rem",
                  height: "2.4rem",
                  backgroundColor: "var(--base-tint, #171719)",
                  borderRadius: "0.2rem",
                  marginBottom: "1rem",
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "0.8rem",
                  backgroundColor: "var(--base-tint, #171719)",
                  borderRadius: "0.2rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Skeleton: Cards de Métricas de SLA (4 colunas) */}
        <div
          className="mxd-block"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {["CHAMADOS EM ABERTO", "AGUARDANDO ACEITE", "RESOLVIDOS", "SLA EM ALERTA"].map(
            (label) => (
              <div
                key={label}
                className="ms-skeleton-pulse"
                style={{
                  backgroundColor: "var(--base-tint, #171719)",
                  border: "1px solid var(--st-medium, #27272a)",
                  padding: "2.4rem",
                  borderRadius: "0.4rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--_font-accent, monospace)",
                    fontSize: "1.1rem",
                    color: "var(--t-muted, #71717a)",
                    letterSpacing: "0.08rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  [ {label} ]
                </div>
                <div
                  style={{
                    width: "6rem",
                    height: "3.4rem",
                    backgroundColor: "var(--base, #0f0f0f)",
                    borderRadius: "0.2rem",
                  }}
                />
              </div>
            )
          )}
        </div>

        {/* Skeleton: Lista de Chamados & Faturas */}
        <div
          className="mxd-block"
          style={{
            backgroundColor: "var(--base-tint, #171719)",
            border: "1px solid var(--st-medium, #27272a)",
            padding: "3rem",
            borderRadius: "0.4rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--_font-accent, monospace)",
              fontSize: "1.2rem",
              color: "var(--t-muted, #71717a)",
              marginBottom: "2.4rem",
              letterSpacing: "0.08rem",
            }}
          >
            [ HISTÓRICO DE CHAMADOS &amp; SLA // SINCRONIZANDO... ]
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
            {[1, 2, 3].map((row) => (
              <div
                key={row}
                className="ms-skeleton-pulse"
                style={{
                  backgroundColor: "var(--base, #0f0f0f)",
                  border: "1px solid var(--st-medium, #27272a)",
                  padding: "2.2rem",
                  borderRadius: "0.4rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      width: "12rem",
                      height: "1.4rem",
                      backgroundColor: "var(--base-tint, #171719)",
                      borderRadius: "0.2rem",
                      marginBottom: "1rem",
                    }}
                  />
                  <div
                    style={{
                      width: "65%",
                      height: "2rem",
                      backgroundColor: "var(--base-tint, #171719)",
                      borderRadius: "0.2rem",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "14rem",
                    height: "3.2rem",
                    backgroundColor: "var(--base-tint, #171719)",
                    borderRadius: "0.2rem",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

