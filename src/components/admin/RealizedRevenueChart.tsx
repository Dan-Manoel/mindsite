"use client";

import React, { useState } from "react";
import type { MonthlyRealizedRevenue } from "@/app/actions/finance.types";

export interface RealizedRevenueChartProps {
  data?: MonthlyRealizedRevenue[];
  totalRealized?: number;
  averageMonthlyRealized?: number;
}

export default function RealizedRevenueChart({
  data = [],
  totalRealized,
  averageMonthlyRealized,
}: RealizedRevenueChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items = data;
  const maxMonth = Math.max(
    ...items.map((i) => Math.max(i.realizedAmount, i.projectedAmount)),
    1
  );

  const computedTotal =
    totalRealized ?? items.reduce((acc, curr) => acc + curr.realizedAmount, 0);
  const computedAverage =
    averageMonthlyRealized ??
    (items.length > 0 ? computedTotal / items.length : 0);

  const formatCurrency = (val: number) =>
    val.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      style={{
        backgroundColor: "var(--base-tint)",
        border: "1px solid var(--st-medium)",
        padding: "3.5rem",
        borderRadius: "0.4rem",
        position: "relative",
      }}
    >
      {/* Cabeçalho do Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "3rem",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontFamily: "var(--_font-accent)",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              color: "#10b981",
              fontWeight: 700,
              marginBottom: "0.5rem",
              letterSpacing: "0.08rem",
            }}
          >
            FLUXO DE CAIXA REALIZADO
          </span>
          <h3
            style={{
              fontSize: "2.2rem",
              fontFamily: "var(--_font-default)",
              fontWeight: 700,
              color: "var(--t-bright)",
              margin: 0,
            }}
          >
            Receita Confirmada / Liquidada (Últimos 12 Meses)
          </h3>
          <p
            style={{
              fontSize: "1.3rem",
              color: "var(--t-medium)",
              margin: "0.5rem 0 0 0",
            }}
          >
            Total de entradas financeiras efetivamente pagas via Pix ou Cartão.
          </p>
        </div>

        <div style={{ textAlign: "right", fontFamily: "var(--_font-accent)" }}>
          <span
            style={{
              fontSize: "1.1rem",
              textTransform: "uppercase",
              color: "var(--t-muted)",
              display: "block",
              letterSpacing: "0.06rem",
            }}
          >
            Total Consolidado Liquidado (12 Meses)
          </span>
          <strong
            style={{
              fontSize: "2.6rem",
              color: "#10b981",
              display: "block",
              marginTop: "0.2rem",
            }}
          >
            R$ {formatCurrency(computedTotal)}
          </strong>
          <span
            style={{
              fontSize: "1.2rem",
              color: "var(--t-medium)",
              display: "block",
              marginTop: "0.3rem",
            }}
          >
            Média mensal: R$ {formatCurrency(computedAverage)}
          </span>
        </div>
      </div>

      {/* Renderização do Gráfico de Barras */}
      <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
        <div
          style={{
            minWidth: "780px",
            display: "flex",
            alignItems: "flex-end",
            gap: "1.2rem",
            height: "280px",
            borderBottom: "1px solid var(--st-medium)",
            paddingTop: "4rem",
            position: "relative",
          }}
        >
          {items.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const realizedHeightPercent =
              item.realizedAmount > 0
                ? Math.max((item.realizedAmount / maxMonth) * 100, 6)
                : 2;
            const projectedHeightPercent =
              item.projectedAmount > 0
                ? Math.max((item.projectedAmount / maxMonth) * 100, 6)
                : 2;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "flex-end",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {/* Tooltip interativo ao passar o mouse */}
                {isHovered && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 10px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#0d0d12",
                      border: "1px solid #10b981",
                      borderRadius: "0.4rem",
                      padding: "1rem 1.4rem",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                      zIndex: 30,
                      pointerEvents: "none",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--_font-accent)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "0.4rem",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.monthLabel}
                    </div>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        color: "#10b981",
                        marginBottom: "0.2rem",
                      }}
                    >
                      ● Liquidado: R$ {formatCurrency(item.realizedAmount)}{" "}
                      <span style={{ color: "#9ca3af", fontSize: "1rem" }}>
                        ({item.count} {item.count === 1 ? "fatura" : "faturas"})
                      </span>
                    </div>
                    <div style={{ fontSize: "1.1rem", color: "#819ffe" }}>
                      ○ Projetado: R$ {formatCurrency(item.projectedAmount)}
                    </div>
                    {item.projectedAmount > 0 && (
                      <div
                        style={{
                          fontSize: "1rem",
                          color:
                            item.realizedAmount >= item.projectedAmount
                              ? "#10b981"
                              : "#f59e0b",
                          marginTop: "0.3rem",
                          fontWeight: 600,
                        }}
                      >
                        Atingimento:{" "}
                        {(
                          (item.realizedAmount / item.projectedAmount) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    )}
                  </div>
                )}

                {/* Valor Realizado no Topo da Barra */}
                <div
                  style={{
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: item.realizedAmount > 0 ? "var(--t-bright)" : "var(--t-muted)",
                    marginBottom: "0.8rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.realizedAmount >= 1000
                    ? `R$ ${(item.realizedAmount / 1000).toFixed(1)}k`
                    : item.realizedAmount > 0
                    ? `R$ ${item.realizedAmount.toFixed(0)}`
                    : "R$ 0"}
                </div>

                {/* Grupo de Barras: Realizada (Cash-in) + Meta Projetada */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: "54px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: "4px",
                    height: "100%",
                  }}
                >
                  {/* Barra Realizada */}
                  <div
                    style={{
                      flex: 1,
                      height: `${realizedHeightPercent}%`,
                      background:
                        item.realizedAmount > 0
                          ? "linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.45) 100%)"
                          : "rgba(16, 185, 129, 0.1)",
                      border:
                        item.realizedAmount > 0
                          ? "1px solid #10b981"
                          : "1px solid rgba(16, 185, 129, 0.2)",
                      borderRadius: "0.3rem 0.3rem 0 0",
                      transition: "height 0.4s ease, filter 0.2s ease",
                      filter: isHovered ? "brightness(1.15)" : "none",
                    }}
                    title={`${item.monthLabel} - Realizado: R$ ${formatCurrency(item.realizedAmount)}`}
                  />

                  {/* Barra Meta Projetada */}
                  <div
                    style={{
                      flex: 1,
                      height: `${projectedHeightPercent}%`,
                      backgroundColor:
                        item.projectedAmount > 0
                          ? "rgba(129, 159, 254, 0.15)"
                          : "rgba(129, 159, 254, 0.05)",
                      border:
                        item.projectedAmount > 0
                          ? "1px dashed #819ffe"
                          : "1px dashed rgba(129, 159, 254, 0.2)",
                      borderRadius: "0.3rem 0.3rem 0 0",
                      transition: "height 0.4s ease",
                    }}
                    title={`${item.monthLabel} - Projetado: R$ ${formatCurrency(item.projectedAmount)}`}
                  />
                </div>

                {/* Eixo Inferior: Abreviação do Mês em Caixa Alta */}
                <span
                  style={{
                    marginTop: "1rem",
                    fontFamily: "var(--_font-accent)",
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    color: isHovered ? "var(--t-bright)" : "var(--t-medium)",
                    fontWeight: isHovered ? 700 : 600,
                    letterSpacing: "0.04rem",
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.monthLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legenda no Rodapé */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2.5rem",
          marginTop: "2rem",
          fontFamily: "var(--_font-accent)",
          fontSize: "1.2rem",
          color: "var(--t-medium)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span
            style={{
              width: "1.4rem",
              height: "1.4rem",
              background:
                "linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.45) 100%)",
              border: "1px solid #10b981",
              borderRadius: "0.2rem",
              display: "inline-block",
            }}
          />
          <span style={{ color: "var(--t-bright)" }}>
            ■ Receita Efetivamente Liquidada (Cash-in)
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span
            style={{
              width: "1.4rem",
              height: "1.4rem",
              backgroundColor: "rgba(129, 159, 254, 0.15)",
              border: "1px dashed #819ffe",
              borderRadius: "0.2rem",
              display: "inline-block",
            }}
          />
          <span>■ Comparativo vs. Meta Projetada</span>
        </div>
      </div>
    </div>
  );
}
