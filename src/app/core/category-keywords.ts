import { ExpenseCategory } from '../models/expense.model';

/**
 * Słownikowy fallback dla sugestii kategorii — używany w trybie demo
 * oraz gdy Edge Function `categorize-expense` jest niedostępna (offline, 429).
 */
const KEYWORD_RULES: ReadonlyArray<[readonly string[], ExpenseCategory]> = [
  [
    ['biedronka', 'lidl', 'zabka', 'kaufland', 'auchan', 'zakupy', 'spozywcze', 'restauracja', 'pizza', 'obiad', 'kawa'],
    'Jedzenie',
  ],
  [['pkp', 'mpk', 'ztm', 'bilet', 'paliwo', 'orlen', 'uber', 'bolt', 'taxi', 'parking'], 'Transport'],
  [
    ['prad', 'gaz', 'woda', 'czynsz', 'internet', 'telefon', 'faktura', 'rachunek', 'abonament'],
    'Rachunki',
  ],
  [['kino', 'netflix', 'spotify', 'hbo', 'koncert', 'gra', 'steam', 'ksiazka'], 'Rozrywka'],
  [['apteka', 'lekarz', 'dentysta', 'leki', 'badania', 'silownia'], 'Zdrowie'],
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l');
}

export function suggestCategoryByKeywords(title: string): ExpenseCategory {
  const normalized = normalize(title);
  for (const [keywords, category] of KEYWORD_RULES) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return category;
    }
  }
  return 'Inne';
}
