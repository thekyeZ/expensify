-- Dane przykładowe Expensify (maj–lipiec 2026)
-- Sumy wydatków są dobrane tak, aby zademonstrować logikę kolorów paska budżetu:
--   maj 2026:     2688.72 / 3200.00 = 84.0%  -> pomarańczowy (>= 75%)
--   czerwiec 2026: 3097.19 / 3400.00 = 91.1% -> czerwony (>= 90%)
--   lipiec 2026:   2124.60 / 3500.00 = 60.7% -> kolor domyślny (< 75%)

insert into public.budgets (month_year, amount) values
  ('2026-05', 3200.00),
  ('2026-06', 3400.00),
  ('2026-07', 3500.00);

insert into public.expenses (title, amount, date, category) values
  -- Maj 2026 (suma 2688.72)
  ('Zakupy w Biedronce',      187.45, '2026-05-02', 'Jedzenie'),
  ('Bilet miesięczny ZTM',    110.00, '2026-05-03', 'Transport'),
  ('Czynsz za mieszkanie',    850.00, '2026-05-05', 'Rachunki'),
  ('Kino Helios',              78.00, '2026-05-08', 'Rozrywka'),
  ('Zakupy w Lidlu',          214.30, '2026-05-10', 'Jedzenie'),
  ('Rachunek za prąd',        156.80, '2026-05-12', 'Rachunki'),
  ('Apteka — leki',            64.99, '2026-05-14', 'Zdrowie'),
  ('Obiad z rodziną',         189.00, '2026-05-17', 'Jedzenie'),
  ('Paliwo Orlen',            220.00, '2026-05-20', 'Transport'),
  ('Internet UPC',             79.99, '2026-05-22', 'Rachunki'),
  ('Buty sportowe',           249.99, '2026-05-24', 'Zakupy'),
  ('Zakupy spożywcze',        168.20, '2026-05-28', 'Jedzenie'),
  ('Prezent urodzinowy',      120.00, '2026-05-30', 'Inne'),

  -- Czerwiec 2026 (suma 3097.19)
  ('Czynsz za mieszkanie',    850.00, '2026-06-01', 'Rachunki'),
  ('Zakupy w Biedronce',      203.15, '2026-06-03', 'Jedzenie'),
  ('Bilet miesięczny ZTM',    110.00, '2026-06-04', 'Transport'),
  ('Rachunek za gaz',          98.50, '2026-06-06', 'Rachunki'),
  ('Kolacja na mieście',      145.00, '2026-06-07', 'Jedzenie'),
  ('Wizyta u dentysty',       350.00, '2026-06-10', 'Zdrowie'),
  ('Zakupy w Lidlu',          232.40, '2026-06-12', 'Jedzenie'),
  ('Paliwo BP',               245.00, '2026-06-14', 'Transport'),
  ('Koncert — bilety',        260.00, '2026-06-15', 'Rozrywka'),
  ('Rachunek za telefon',      55.00, '2026-06-18', 'Rachunki'),
  ('Zakupy spożywcze',        176.85, '2026-06-21', 'Jedzenie'),
  ('Nowa koszula',            129.99, '2026-06-24', 'Zakupy'),
  ('Siłownia — karnet',       149.00, '2026-06-26', 'Zdrowie'),
  ('Zakupy w Żabce',           47.30, '2026-06-28', 'Jedzenie'),
  ('Myjnia samochodowa',       45.00, '2026-06-30', 'Transport'),

  -- Lipiec 2026 (suma 2124.60, stan na 14.07)
  ('Czynsz za mieszkanie',    850.00, '2026-07-01', 'Rachunki'),
  ('Bilet miesięczny ZTM',    110.00, '2026-07-02', 'Transport'),
  ('Zakupy w Biedronce',      195.60, '2026-07-03', 'Jedzenie'),
  ('Basen — wejściówki',       60.00, '2026-07-05', 'Rozrywka'),
  ('Rachunek za prąd',        162.35, '2026-07-07', 'Rachunki'),
  ('Lunch w pracy',            42.50, '2026-07-08', 'Jedzenie'),
  ('Zakupy w Lidlu',          221.75, '2026-07-10', 'Jedzenie'),
  ('Apteka — witaminy',        89.90, '2026-07-11', 'Zdrowie'),
  ('Paliwo Orlen',            230.00, '2026-07-12', 'Transport'),
  ('Pizza z dostawą',          68.00, '2026-07-13', 'Jedzenie'),
  ('Książki',                  94.50, '2026-07-14', 'Zakupy');
