import { MonthlyBudget } from '../models/budget.model';
import { Expense } from '../models/expense.model';
import { addMonths, currentMonthRef, monthKey } from './month.utils';

/**
 * Dane trybu demo — używane, gdy Supabase nie jest jeszcze skonfigurowane.
 * Trzymane w pamięci, więc znikają po odświeżeniu strony.
 */
const current = currentMonthRef();
const previous = addMonths(current, -1);

function day(key: string, dayOfMonth: number): string {
  return `${key}-${String(dayOfMonth).padStart(2, '0')}`;
}

export const demoExpenses: Expense[] = [
  { id: 'd1', title: 'Zakupy spożywcze', amount: 187.4, date: day(monthKey(current), 12), category: 'Jedzenie', userId: null },
  { id: 'd2', title: 'Bilet miesięczny', amount: 119, date: day(monthKey(current), 3), category: 'Transport', userId: null },
  { id: 'd3', title: 'Prąd i gaz', amount: 342.55, date: day(monthKey(current), 8), category: 'Rachunki', userId: null },
  { id: 'd4', title: 'Kino', amount: 58, date: day(monthKey(current), 10), category: 'Rozrywka', userId: null },
  { id: 'd5', title: 'Apteka', amount: 46.9, date: day(monthKey(current), 6), category: 'Zdrowie', userId: null },
  { id: 'd6', title: 'Obiad na mieście', amount: 74.5, date: day(monthKey(current), 11), category: 'Jedzenie', userId: null },
  { id: 'd7', title: 'Czynsz', amount: 950, date: day(monthKey(previous), 2), category: 'Rachunki', userId: null },
  { id: 'd8', title: 'Paliwo', amount: 260, date: day(monthKey(previous), 15), category: 'Transport', userId: null },
  { id: 'd9', title: 'Kolacja urodzinowa', amount: 189, date: day(monthKey(previous), 21), category: 'Jedzenie', userId: null },
];

export const demoBudgets: MonthlyBudget[] = [
  { id: 'b1', monthYear: monthKey(current), amount: 3000, userId: null },
  { id: 'b2', monthYear: monthKey(previous), amount: 2800, userId: null },
];

let demoIdCounter = 100;

export function nextDemoId(prefix: string): string {
  demoIdCounter += 1;
  return `${prefix}-${demoIdCounter}`;
}
