/**
 * Utilitários gerais para manipulação de dados, datas e formatação no MindSite.
 */

/**
 * Converte uma string de data no formato "YYYY-MM-DD" (ou ISO) para um objeto Date
 * fixado rigorosamente ao meio-dia UTC (12:00:00).
 * 
 * Isso neutraliza integralmente desvios de fuso horário (UTC drift), garantindo que fusos
 * com offset negativo (como America/Sao_Paulo, UTC-3) não recuem a data para o dia anterior
 * ao interpretar a meia-noite (00:00:00 UTC).
 */
export function parseLocalDate(dateString: string): Date {
  if (!dateString) return new Date();

  // Limpa possíveis sufixos de hora ou timezone mantendo apenas YYYY-MM-DD
  const cleanDate = dateString.split("T")[0].trim();
  const parts = cleanDate.split("-").map(Number);

  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    const [year, month, day] = parts;
    // Fixa ao meio-dia UTC (12h) para imunidade a flutuações de fuso horário (-12h a +12h)
    return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  }

  // Fallback caso a string venha em outro formato
  const parsed = new Date(dateString);
  if (isNaN(parsed.getTime())) return new Date();
  return parsed;
}

/**
 * Formata um objeto Date ou string de data para exibição no padrão brasileiro ("DD/MM/YYYY"),
 * forçando o fuso horário oficial 'America/Sao_Paulo'.
 */
export function formatLocalDate(date: Date | string | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

/**
 * Formata valores monetários em Real Brasileiro (R$ 0,00).
 */
export function formatCurrencyBRL(value: number | string | null | undefined): string {
  const num = Number(value) || 0;
  return `R$ ${num.toFixed(2).replace(".", ",")}`;
}
