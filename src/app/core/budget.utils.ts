/**
 * Czysta logika kalkulacji zużycia budżetu — bez zależności od Angulara,
 * łatwa do przeniesienia np. do środowiska React.
 */
export const PROGRESS_DEFAULT_CLASS = 'bg-violet-600';
export const PROGRESS_WARNING_CLASS = 'bg-orange-500';
export const PROGRESS_DANGER_CLASS = 'bg-red-500';

export function budgetUsagePercent(totalSpent: number, budgetAmount: number): number {
  if (budgetAmount <= 0) {
    return 0;
  }
  return (totalSpent / budgetAmount) * 100;
}

/** Klasa Tailwind paska postępu: <75% fiolet, 75-90% pomarańcz, >=90% czerwień. */
export function progressBarClass(percent: number): string {
  if (percent >= 90) {
    return PROGRESS_DANGER_CLASS;
  }
  if (percent >= 75) {
    return PROGRESS_WARNING_CLASS;
  }
  return PROGRESS_DEFAULT_CLASS;
}
