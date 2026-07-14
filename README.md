# Expensify

Nowoczesna, minimalistyczna aplikacja do śledzenia osobistych wydatków i kontrolowania miesięcznego budżetu. Zbudowana w oparciu o Angular 20 (Standalone Components + Signals), Tailwind CSS 4 i Supabase.

## Funkcjonalności

- **Dodawanie wydatków** — nazwa, kwota (PLN), data, kategoria.
- **Lista transakcji** — historia wydatków z nawigacją pomiędzy miesiącami (`<` / `>`).
- **Miesięczny budżet** — ustawiany per miesiąc, z paskiem postępu:
  - fioletowy poniżej 75% wykorzystania,
  - pomarańczowy od 75%,
  - czerwony od 90%.
- **Mobile first** — dolny pasek nawigacji i skondensowany układ na małych ekranach.

## Uruchomienie

```bash
npm install
npm start
```

Aplikacja wystartuje pod adresem `http://localhost:4200`.

## Konfiguracja Supabase

1. Utwórz projekt na [supabase.com](https://supabase.com) i wykonaj skrypt `supabase/schema.sql` w SQL Editorze.
2. Uzupełnij `src/environments/environment.ts` wartościami `supabaseUrl` i `supabaseAnonKey` (Project Settings → API).

Dopóki dane Supabase nie są uzupełnione, aplikacja działa w **trybie demo** na przykładowych danych trzymanych w pamięci przeglądarki (zmiany znikają po odświeżeniu).

## Architektura

- `src/app/core` — czysta logika biznesowa niezależna od Angulara (operacje na miesiącach, kalkulacja budżetu, klient Supabase, dane demo).
- `src/app/models` — interfejsy encji (`Expense`, `MonthlyBudget`) i mapowanie wierszy z bazy.
- `src/app/services` — `ExpenseService`, `BudgetService` (komunikacja z Supabase) oraz `DashboardStore` (stan na sygnałach: `currentMonth`, `expenses`, `budget` + `computed` dla kalkulacji budżetu).
- `src/app/components` — komponenty prezentacyjne (dumb): podsumowanie budżetu, formularz, lista, selektor miesiąca, dolna nawigacja.
- `src/app/pages/dashboard` — komponent smart spinający całość.
