import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BottomNav } from '../../components/bottom-nav/bottom-nav';
import { BudgetSummary } from '../../components/budget-summary/budget-summary';
import { ExpenseForm } from '../../components/expense-form/expense-form';
import { ExpenseList } from '../../components/expense-list/expense-list';
import { MonthSelector } from '../../components/month-selector/month-selector';
import { DashboardStore } from '../../services/dashboard.store';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BudgetSummary, ExpenseForm, ExpenseList, MonthSelector, BottomNav],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly store = inject(DashboardStore);
}
