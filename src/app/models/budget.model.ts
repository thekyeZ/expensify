export interface MonthlyBudget {
  id: string;
  /** Miesiąc w formacie `YYYY-MM`. */
  monthYear: string;
  amount: number;
  userId: string | null;
}

/** Wiersz tabeli `budgets` w Supabase (snake_case). */
export interface BudgetRow {
  id: string;
  month_year: string;
  amount: number | string;
  user_id: string | null;
}

export function mapBudgetRow(row: BudgetRow): MonthlyBudget {
  return {
    id: row.id,
    monthYear: row.month_year,
    amount: Number(row.amount),
    userId: row.user_id,
  };
}
