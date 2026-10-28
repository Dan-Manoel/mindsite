export interface MonthlyRealizedRevenue {
  monthLabel: string; // Ex: "OUT/26"
  realizedAmount: number;
  projectedAmount: number;
  count: number;
}

export interface RevenueAnalyticsResult {
  success: boolean;
  data: MonthlyRealizedRevenue[];
  totalRealized: number;
  averageMonthlyRealized: number;
  totalCount: number;
  error?: string;
}
