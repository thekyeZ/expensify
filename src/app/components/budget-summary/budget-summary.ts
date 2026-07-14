import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './budget-summary.html',
  host: { class: 'block' },
})
export class BudgetSummary {
  readonly budgetAmount = input.required<number>();
  readonly totalSpent = input.required<number>();
  readonly usagePercent = input.required<number>();
  readonly barClass = input.required<string>();
  readonly loading = input(false);

  readonly budgetChange = output<number>();

  readonly editing = signal(false);
  readonly showValidationError = signal(false);
  protected editedAmount: number | null = null;

  readonly hasBudget = computed(() => this.budgetAmount() > 0);
  readonly roundedPercent = computed(() => Math.round(this.usagePercent()));
  readonly barWidth = computed(() => Math.min(this.usagePercent(), 100));
  readonly remaining = computed(() => this.budgetAmount() - this.totalSpent());

  startEditing(): void {
    this.editedAmount = this.budgetAmount() > 0 ? this.budgetAmount() : null;
    this.showValidationError.set(false);
    this.editing.set(true);
  }

  cancelEditing(): void {
    this.editing.set(false);
    this.showValidationError.set(false);
  }

  saveBudget(): void {
    if (this.editedAmount === null || this.editedAmount <= 0) {
      this.showValidationError.set(true);
      return;
    }
    this.budgetChange.emit(this.editedAmount);
    this.editing.set(false);
    this.showValidationError.set(false);
  }
}
