import type { ExpenseCategory, ExpenseFrequency, Currency } from "@prisma/client";

export interface UpdateExpenseInput {
  name: string;
  category: ExpenseCategory;
  frequency: ExpenseFrequency;
  currency: Currency;
  estimatedAmount: number;
  actualAmountPaid?: number | null;
  exchangeRateUsed?: number | null;
  dueDate: string;
  paymentDate?: string | null;
  isPaid?: boolean;
  notes?: string | null;
  receiptUrl?: string | null;
}
