import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { CATEGORY_ICONS, Expense, ExpenseCategory } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './expense-list.html',
})
export class ExpenseList {
  readonly expenses = input.required<Expense[]>();

  readonly remove = output<string>();

  protected icon(category: ExpenseCategory): string {
    return CATEGORY_ICONS[category];
  }
}
