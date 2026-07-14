export type ExpenseCategory =
  | 'Jedzenie'
  | 'Transport'
  | 'Rachunki'
  | 'Rozrywka'
  | 'Zdrowie'
  | 'Inne';

export const EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  'Jedzenie',
  'Transport',
  'Rachunki',
  'Rozrywka',
  'Zdrowie',
  'Inne',
];

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  Jedzenie: '🍔',
  Transport: '🚗',
  Rachunki: '🧾',
  Rozrywka: '🎬',
  Zdrowie: '💊',
  Inne: '📦',
};

export interface Expense {
  id: string;
  title: string;
  amount: number;
  /** Data w formacie ISO `YYYY-MM-DD`. */
  date: string;
  category: ExpenseCategory;
  userId: string | null;
}

export interface NewExpense {
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}

/** Wiersz tabeli `expenses` w Supabase (snake_case). */
export interface ExpenseRow {
  id: string;
  title: string;
  amount: number | string;
  date: string;
  category: string;
  user_id: string | null;
}

export function toExpenseCategory(value: string): ExpenseCategory {
  return (EXPENSE_CATEGORIES as readonly string[]).includes(value)
    ? (value as ExpenseCategory)
    : 'Inne';
}

export function mapExpenseRow(row: ExpenseRow): Expense {
  return {
    id: row.id,
    title: row.title,
    amount: Number(row.amount),
    date: row.date,
    category: toExpenseCategory(row.category),
    userId: row.user_id,
  };
}
