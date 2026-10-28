export default function AdminLoading() {
  return (
    <main
      className="mxd-page-content inner-page-content"
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--base, #0f0f0f)",
        paddingBottom: "10rem",
      }}
    >
      <style>{`
        @keyframes mindsiteAdminPulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
        .ms-admin-skeleton {
          animation: mindsiteAdminPulse 1.6s ease-in-out infinite;
        }
      `}</style>

      <div className="mxd-container grid-l-container">
        {/* Header do Painel Executivo (Imediato no Streaming) */}
        <div
          className="mxd-block"
          style={{
            paddingTop: "4rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid var(--st-medium, #27272a)",
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
              width: "100%",
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
                [ ADMIN EXECUTIVE // STREAMING ]
              </span>
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 3.8vw, 4.4rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: "var(--t-bright, #ffffff)",
                  fontFamily: "var(--_font-default, sans-serif)",
                  margin: 0,
                }}
              >
                Painel Executivo MindSite
              </h1>
              <p
                style={{
                  color: "var(--t-medium, #a1a1aa)",
                  fontSize: "1.4rem",
                  marginTop: "0.8rem",
                  fontFamily: "var(--_font-accent, monospace)",
                  margin: 0,
                }}
              >
                Sincronizando MRR, fluxo de caixa, contratos e fila de SLA...
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <div
                className="ms-admin-skeleton"
                style={{
                  width: "15rem",
                  height: "4.2rem",
                  backgroundColor: "var(--base-tint, #171719)",
                  border: "1px solid var(--st-medium, #27272a)",
                  borderRadius: "0.2rem",
                }}
              />
              <div
                className="ms-admin-skeleton"
                style={{
                  width: "11rem",
                  height: "4.2rem",
                  backgroundColor: "var(--base-tint, #171719)",
                  border: "1px solid var(--st-medium, #27272a)",
                  borderRadius: "0.2rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Barra de Abas Executivas (Estrutura Imediata) */}
        <div
          className="mxd-block"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "4rem",
            borderBottom: "1px solid var(--st-medium, #27272a)",
            paddingBottom: "1.5rem",
          }}
        >
          {[
            "[ 01. VISÃO GERAL ]",
            "[ 02. MOTOR FINANCEIRO ]",
            "[ 03. FILA DE CHAMADOS ]",
            "[ 04. DESPESAS & USD ]",
            "[ 05. CARTEIRA DE CLIENTES ]",
          ].map((tab, idx) => (
            <div
              key={tab}
              style={{
                padding: "1rem 1.8rem",
                fontFamily: "var(--_font-accent, monospace)",
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: "0.06rem",
                borderRadius: "0.2rem",
                backgroundColor:
                  idx === 0 ? "var(--accent, #002bba)" : "var(--base-tint, #171719)",
                color: idx === 0 ? "#ffffff" : "var(--t-muted, #71717a)",
                border: "1px solid var(--st-medium, #27272a)",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Skeleton: KPIs Financeiros & Operacionais (4 cards) */}
        <div
          className="mxd-block"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {[
            "MRR SUSTENTAÇÃO ATIVO",
            "RECEITA REALIZADA (12M)",
            "PROJEÇÃO 120 DIAS",
            "CHAMADOS & SLA CRÍTICO",
          ].map((metric) => (
            <div
              key={metric}
              className="ms-admin-skeleton"
              style={{
                backgroundColor: "var(--base-tint, #171719)",
                border: "1px solid var(--st-medium, #27272a)",
                padding: "2.6rem",
                borderRadius: "0.4rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--_font-accent, monospace)",
                  fontSize: "1.1rem",
                  color: "var(--t-muted, #71717a)",
                  letterSpacing: "0.08rem",
                  marginBottom: "1.4rem",
                }}
              >
                [ {metric} ]
              </div>
              <div
                style={{
                  width: "14rem",
                  height: "3.6rem",
                  backgroundColor: "var(--base, #0f0f0f)",
                  borderRadius: "0.2rem",
                  marginBottom: "1rem",
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: "1.4rem",
                  backgroundColor: "var(--base, #0f0f0f)",
                  borderRadius: "0.2rem",
                }}
              />
            </div>
          ))}
        </div>

        {/* Skeleton: Gráfico de Receita Realizada vs Projetada */}
        <div
          className="mxd-block ms-admin-skeleton"
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
              fontFamily: "var(--_font-accent, monospace)",
              fontSize: "1.2rem",
              color: "var(--t-muted, #71717a)",
              letterSpacing: "0.08rem",
              marginBottom: "2.5rem",
            }}
          >
            [ RECEITA REALIZADA VS PROJETADA (12 MESES) // CARREGANDO SÉRIE HISTÓRICA... ]
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              alignItems: " end",
              gap: "1.2rem",
              height: "22rem",
              paddingTop: "2rem",
            }}
          >
            {[45, 60, 52, 75, 68, 85, 70, 90, 64, 80, 95, 88].map((h, i) => (
              <div
                key={i}
                style={{
                  height: `${h}%`,
                  backgroundColor: "var(--base, #0f0f0f)",
                  border: "1px solid var(--st-medium, #27272a)",
                  borderRadius: "0.2rem",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

