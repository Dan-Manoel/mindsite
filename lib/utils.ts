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

/**
 * Retorna a data civil atual (ano, mês, dia) no Horário Oficial de Brasília (America/Sao_Paulo)
 * zerada em 00:00:00.000 local para comparações de calendário.
 */
export function getBrasiliaTodayMidnight(): Date {
  const now = new Date();
  const brasiliaDateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now); // Retorna formato 'YYYY-MM-DD'

  const [year, month, day] = brasiliaDateStr.split("-").map(Number);
  // Meia-noite do dia civil de Brasília
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

/**
 * Converte qualquer data (Date ou string ISO/YYYY-MM-DD) para a data civil correspondente
 * no fuso de Brasília zerada na meia-noite.
 */
export function toBrasiliaDateMidnight(dateInput: Date | string): Date {
  if (!dateInput) return new Date();
  if (typeof dateInput !== "string" || dateInput.includes("T")) {
    const formatted = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(typeof dateInput === "string" ? new Date(dateInput) : dateInput);
    const [y, m, d] = formatted.split("-").map(Number);
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }
  const clean = dateInput.split("T")[0].trim();
  const [year, month, day] = clean.split("-").map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

/**
 * Verifica se uma data de vencimento está rigorosamente em atraso.
 * Só é considerada atrasada se a data de vencimento for ANTERIOR ao dia de hoje em Brasília.
 * Se o vencimento for HOJE, retorna false.
 */
export function isDateStrictlyOverdue(dueDateInput: Date | string): boolean {
  const todayMidnight = getBrasiliaTodayMidnight();
  const dueMidnight = toBrasiliaDateMidnight(dueDateInput);
  return dueMidnight.getTime() < todayMidnight.getTime();
}

/**
 * Verifica se a data vence exatamente no dia de hoje em Brasília.
 */
export function isDateDueToday(dueDateInput: Date | string): boolean {
  const todayMidnight = getBrasiliaTodayMidnight();
  const dueMidnight = toBrasiliaDateMidnight(dueDateInput);
  return dueMidnight.getTime() === todayMidnight.getTime();
}
