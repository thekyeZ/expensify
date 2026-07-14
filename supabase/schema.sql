-- Schemat bazy danych Expensify
-- Zaaplikowany jako migracja "create_expenses_and_budgets" w projekcie Supabase.

-- Tabela wydatków
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  amount numeric(12, 2) not null check (amount > 0),
  date date not null,
  category text not null default 'Inne' check (char_length(category) between 1 and 50),
  user_id uuid references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index expenses_date_idx on public.expenses (date);
create index expenses_user_id_date_idx on public.expenses (user_id, date);

-- Tabela budżetów miesięcznych
create table public.budgets (
  id uuid primary key default gen_random_uuid(),
  month_year text not null check (month_year ~ '^\d{4}-(0[1-9]|1[0-2])$'), -- format 'YYYY-MM'
  amount numeric(12, 2) not null check (amount >= 0),
  user_id uuid references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  -- Jeden budżet na miesiąc per użytkownik; NULLS NOT DISTINCT pilnuje
  -- unikalności także w trybie MVP bez logowania (user_id = null).
  -- Constraint tworzy też indeks na (user_id, month_year) używany przy odczytach.
  constraint budgets_user_month_unique unique nulls not distinct (user_id, month_year)
);

-- RLS: w trybie MVP (bez logowania) aplikacja korzysta z klucza anon, a wszystkie
-- rekordy mają user_id = null. Gałąź "user_id is null" w politykach istnieje TYLKO
-- na potrzeby tego trybu i oznacza świadomie zaakceptowane ryzyko: każdy posiadacz
-- klucza anon (czyli każdy, bo klucz jest w bundle'u frontendu) może czytać
-- i modyfikować wspólne dane demo.
--
-- UWAGA — włączenie autoryzacji WYMAGA migracji uzupełniającej:
--   1. usuń gałąź "user_id is null" ze wszystkich polityk (zostaje wyłącznie
--      user_id = (select auth.uid()) w USING i WITH CHECK),
--   2. ustaw user_id jako "not null default auth.uid()" (wcześniej usuń lub
--      przypisz właściciela rekordom z user_id = null),
--   3. usuń rolę anon z klauzuli "to" polityk.
-- Bez tego dane bez właściciela pozostaną widoczne i modyfikowalne dla wszystkich.
alter table public.expenses enable row level security;
alter table public.budgets enable row level security;

create policy "expenses_select" on public.expenses
  for select to anon, authenticated
  using (user_id is null or user_id = (select auth.uid()));
create policy "expenses_insert" on public.expenses
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));
create policy "expenses_update" on public.expenses
  for update to anon, authenticated
  using (user_id is null or user_id = (select auth.uid()))
  with check (user_id is null or user_id = (select auth.uid()));
create policy "expenses_delete" on public.expenses
  for delete to anon, authenticated
  using (user_id is null or user_id = (select auth.uid()));

create policy "budgets_select" on public.budgets
  for select to anon, authenticated
  using (user_id is null or user_id = (select auth.uid()));
create policy "budgets_insert" on public.budgets
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));
create policy "budgets_update" on public.budgets
  for update to anon, authenticated
  using (user_id is null or user_id = (select auth.uid()))
  with check (user_id is null or user_id = (select auth.uid()));
create policy "budgets_delete" on public.budgets
  for delete to anon, authenticated
  using (user_id is null or user_id = (select auth.uid()));
