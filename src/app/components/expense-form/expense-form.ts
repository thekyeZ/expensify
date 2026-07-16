import { ChangeDetectionStrategy, Component, DestroyRef, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

import { todayIso } from '../../core/month.utils';
import { EXPENSE_CATEGORIES, ExpenseCategory, NewExpense } from '../../models/expense.model';
import { CategorizationService } from '../../services/categorization.service';

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

  private readonly categorization = inject(CategorizationService);
  private readonly destroyRef = inject(DestroyRef);

  /** Trwa zapytanie o sugestię kategorii. */
  protected readonly suggesting = signal(false);
  /** Aktualna wartość kategorii pochodzi z sugestii AI. */
  protected readonly aiSuggested = signal(false);

  private categoryTouchedByUser = false;
  private suggestionSeq = 0;

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

  constructor() {
    this.form.controls.title.valueChanges
      .pipe(
        map((title) => title.trim()),
        debounceTime(600),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((title) => void this.requestSuggestion(title));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, amount, date, category } = this.form.getRawValue();
    this.add.emit({ title: title.trim(), amount: amount ?? 0, date, category });

    this.form.reset({ title: '', amount: null, date: todayIso(), category });
    this.categoryTouchedByUser = false;
    this.aiSuggested.set(false);
    this.suggesting.set(false);
    this.suggestionSeq++;
  }

  protected onCategoryPicked(): void {
    this.categoryTouchedByUser = true;
    this.aiSuggested.set(false);
    this.suggesting.set(false);
    this.suggestionSeq++;
  }

  protected isInvalid(name: 'title' | 'amount' | 'date'): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }

  private async requestSuggestion(title: string): Promise<void> {
    if (this.categoryTouchedByUser || title.length < 3) {
      return;
    }

    const seq = ++this.suggestionSeq;
    this.suggesting.set(true);

    const category = await this.categorization.suggestCategory(title);

    if (seq !== this.suggestionSeq) {
      return;
    }
    this.suggesting.set(false);

    if (this.categoryTouchedByUser || title !== this.form.controls.title.value.trim()) {
      return;
    }

    this.form.controls.category.setValue(category);
    this.aiSuggested.set(true);
  }
}
