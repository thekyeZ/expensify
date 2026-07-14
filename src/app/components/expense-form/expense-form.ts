import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { todayIso } from '../../core/month.utils';
import { EXPENSE_CATEGORIES, ExpenseCategory, NewExpense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  host: { class: 'block' },
})
export class ExpenseForm {
  readonly add = output<NewExpense>();

  readonly categories = EXPENSE_CATEGORIES;

  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(80)],
    }),
    amount: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    date: new FormControl(todayIso(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: new FormControl<ExpenseCategory>('Jedzenie', { nonNullable: true }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, amount, date, category } = this.form.getRawValue();
    this.add.emit({ title: title.trim(), amount: amount ?? 0, date, category });

    this.form.reset({ title: '', amount: null, date: todayIso(), category });
  }

  protected isInvalid(name: 'title' | 'amount' | 'date'): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }
}
