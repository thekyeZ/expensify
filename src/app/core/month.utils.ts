/**
 * Czysta, niezależna od frameworka logika operacji na miesiącach.
 * Miesiące reprezentujemy jako `MonthRef`, a w bazie jako klucz `YYYY-MM`.
 */
export interface MonthRef {
  year: number;
  /** 1-12 */
  month: number;
}

export function currentMonthRef(today: Date = new Date()): MonthRef {
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
}

export function addMonths(ref: MonthRef, delta: number): MonthRef {
  const index = ref.year * 12 + (ref.month - 1) + delta;
  return { year: Math.floor(index / 12), month: ((index % 12) + 12) % 12 + 1 };
}

export function monthKey(ref: MonthRef): string {
  return `${ref.year}-${String(ref.month).padStart(2, '0')}`;
}

/** Zakres dat (włącznie) obejmujący cały miesiąc — do zapytań o wydatki. */
export function monthDateRange(ref: MonthRef): { from: string; to: string } {
  const lastDay = new Date(ref.year, ref.month, 0).getDate();
  return {
    from: `${monthKey(ref)}-01`,
    to: `${monthKey(ref)}-${String(lastDay).padStart(2, '0')}`,
  };
}

export function formatMonthLabel(ref: MonthRef, locale = 'pl-PL'): string {
  const label = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(ref.year, ref.month - 1, 1),
  );
  return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
}

export function todayIso(today: Date = new Date()): string {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate(),
  ).padStart(2, '0')}`;
}
