import { Injectable } from '@angular/core';

import { getSupabaseClient } from '../core/supabase-client';
import { demoBudgets, nextDemoId } from '../core/demo-data';
import { MonthRef, monthKey } from '../core/month.utils';
import { BudgetRow, MonthlyBudget, mapBudgetRow } from '../models/budget.model';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  async getBudget(month: MonthRef): Promise<MonthlyBudget | null> {
    const client = getSupabaseClient();
    const key = monthKey(month);

    if (!client) {
      return demoBudgets.find((budget) => budget.monthYear === key) ?? null;
    }

    const { data, error } = await client
      .from('budgets')
      .select('*')
      .eq('month_year', key)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }
    return data ? mapBudgetRow(data as BudgetRow) : null;
  }

  async setBudget(month: MonthRef, amount: number): Promise<MonthlyBudget> {
    const client = getSupabaseClient();
    const key = monthKey(month);

    if (!client) {
      const existing = demoBudgets.find((budget) => budget.monthYear === key);
      if (existing) {
        existing.amount = amount;
        return { ...existing };
      }
      const created: MonthlyBudget = { id: nextDemoId('budget'), monthYear: key, amount, userId: null };
      demoBudgets.push(created);
      return created;
    }

    const { data, error } = await client
      .from('budgets')
      .upsert({ month_year: key, amount }, { onConflict: 'user_id,month_year' })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return mapBudgetRow(data as BudgetRow);
  }
}
