import { Injectable } from '@angular/core';

import { suggestCategoryByKeywords } from '../core/category-keywords';
import { getSupabaseClient } from '../core/supabase-client';
import { ExpenseCategory, toExpenseCategory } from '../models/expense.model';

/**
 * Sugeruje kategorię wydatku na podstawie tytułu — przez Edge Function
 * `categorize-expense` (Gemini), z fallbackiem słownikowym w trybie demo
 * lub przy błędzie sieci/limitu.
 */
@Injectable({ providedIn: 'root' })
export class CategorizationService {
  async suggestCategory(title: string): Promise<ExpenseCategory> {
    const client = getSupabaseClient();
    if (!client) {
      return suggestCategoryByKeywords(title);
    }

    try {
      const { data, error } = await client.functions.invoke<{ category: string }>(
        'categorize-expense',
        { body: { title } },
      );
      if (error || !data) {
        return suggestCategoryByKeywords(title);
      }
      return toExpenseCategory(data.category);
    } catch {
      return suggestCategoryByKeywords(title);
    }
  }
}
