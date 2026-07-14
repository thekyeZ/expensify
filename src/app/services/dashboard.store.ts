import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';

import { budgetUsagePercent, progressBarClass } from '../core/budget.utils';
import {
  MonthRef,
  addMonths,
  currentMonthRef,
  formatMonthLabel,
  monthKey,
} from '../core/month.utils';
import { MonthlyBudget } from '../models/budget.model';
import { Expense, NewExpense } from '../models/expense.model';
import { BudgetService } from './budget.service';
import { ExpenseService } from './expense.service';

/**
 * Stan dashboardu oparty o sygnały. Zmiana `currentMonth` (strzałki < >)
 * automatycznie pobiera z Supabase wydatki i budżet wybranego miesiąca.
 */
@Injectable({ providedIn: 'root' })
export class DashboardStore {
  private readonly expenseService = inject(ExpenseService);
  private readonly budgetService = inject(BudgetService);

  readonly currentMonth = signal<MonthRef>(currentMonthRef());
  readonly expenses = signal<Expense[]>([]);
  readonly budget = signal<MonthlyBudget | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly monthLabel = computed(() => formatMonthLabel(this.currentMonth()));
  readonly totalSpent = computed(() =>
    this.expenses().reduce((sum, expense) => sum + expense.amount, 0),
  );
  readonly budgetAmount = computed(() => this.budget()?.amount ?? 0);
  readonly usagePercent = computed(() => budgetUsagePercent(this.totalSpent(), this.budgetAmount()));
  readonly progressBarClass = computed(() => progressBarClass(this.usagePercent()));
  readonly remainingAmount = computed(() => this.budgetAmount() - this.totalSpent());

  constructor() {
    effect(() => {
      const month = this.currentMonth();
      untracked(() => void this.loadMonth(month));
    });
  }

  previousMonth(): void {
    this.currentMonth.update((month) => addMonths(month, -1));
  }

  nextMonth(): void {
    this.currentMonth.update((month) => addMonths(month, 1));
  }

  async addExpense(expense: NewExpense): Promise<void> {
    this.errorMessage.set(null);
    try {
      const created = await this.expenseService.addExpense(expense);
      if (created.date.startsWith(monthKey(this.currentMonth()))) {
        this.expenses.update((list) =>
          [created, ...list].sort((a, b) => b.date.localeCompare(a.date)),
        );
      }
    } catch {
      this.errorMessage.set('Nie udało się dodać wydatku. Spróbuj ponownie.');
    }
  }

  async removeExpense(id: string): Promise<void> {
    this.errorMessage.set(null);
    try {
      await this.expenseService.deleteExpense(id);
      this.expenses.update((list) => list.filter((expense) => expense.id !== id));
    } catch {
      this.errorMessage.set('Nie udało się usunąć wydatku. Spróbuj ponownie.');
    }
  }

  async setBudget(amount: number): Promise<void> {
    this.errorMessage.set(null);
    try {
      const saved = await this.budgetService.setBudget(this.currentMonth(), amount);
      if (saved.monthYear === monthKey(this.currentMonth())) {
        this.budget.set(saved);
      }
    } catch {
      this.errorMessage.set('Nie udało się zapisać budżetu. Spróbuj ponownie.');
    }
  }

  private async loadMonth(month: MonthRef): Promise<void> {
    const key = monthKey(month);
    this.loading.set(true);
    this.errorMessage.set(null);
    try {
      const [expenses, budget] = await Promise.all([
        this.expenseService.getExpensesForMonth(month),
        this.budgetService.getBudget(month),
      ]);
      if (monthKey(this.currentMonth()) !== key) {
        return;
      }
      this.expenses.set(expenses);
      this.budget.set(budget);
    } catch {
      if (monthKey(this.currentMonth()) !== key) {
        return;
      }
      this.expenses.set([]);
      this.budget.set(null);
      this.errorMessage.set('Nie udało się pobrać danych z serwera. Spróbuj ponownie.');
    } finally {
      if (monthKey(this.currentMonth()) === key) {
        this.loading.set(false);
      }
    }
  }
}
