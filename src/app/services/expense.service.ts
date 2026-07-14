import { Injectable } from '@angular/core';

import { getSupabaseClient } from '../core/supabase-client';
import { demoExpenses, nextDemoId } from '../core/demo-data';
import { MonthRef, monthDateRange } from '../core/month.utils';
import { Expense, ExpenseRow, NewExpense, mapExpenseRow } from '../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  async getExpensesForMonth(month: MonthRef): Promise<Expense[]> {
    const client = getSupabaseClient();
    const { from, to } = monthDateRange(month);

    if (!client) {
      return demoExpenses
        .filter((expense) => expense.date >= from && expense.date <= to)
        .sort((a, b) => b.date.localeCompare(a.date));
    }

    const { data, error } = await client
      .from('expenses')
      .select('*')
      .gte('date', from)
      .lte('date', to)
      .order('date', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return (data as ExpenseRow[]).map(mapExpenseRow);
  }

  async addExpense(expense: NewExpense): Promise<Expense> {
    const client = getSupabaseClient();

    if (!client) {
      const created: Expense = { ...expense, id: nextDemoId('expense'), userId: null };
      demoExpenses.push(created);
      return created;
    }

    const { data, error } = await client
      .from('expenses')
      .insert({
        title: expense.title,
        amount: expense.amount,
        date: expense.date,
        category: expense.category,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return mapExpenseRow(data as ExpenseRow);
  }

  async deleteExpense(id: string): Promise<void> {
    const client = getSupabaseClient();

    if (!client) {
      const index = demoExpenses.findIndex((expense) => expense.id === id);
      if (index !== -1) {
        demoExpenses.splice(index, 1);
      }
      return;
    }

    const { error } = await client.from('expenses').delete().eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
  }
}
