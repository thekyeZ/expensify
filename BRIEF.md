# BRIEF: Expensify - Aplikacja do logowania wydatków

## 1. Opis Projektu
Expensify to nowoczesna, minimalistyczna aplikacja webowa służąca do śledzenia osobistych wydatków i kontrolowania miesięcznego budżetu. Priorytetem jest prostota obsługi, przejrzysty interfejs oraz w pełni responsywny design (Desktop & Mobile).

## 2. Główne Funkcjonalności
*   **Formularz dodawania wydatku**: 
    *   Pola: Nazwa wydatku, Kwota (PLN), Data, Kategoria (opcjonalnie, np. Jedzenie, Transport, Rachunki).
    *   Szybkie dodawanie z poziomu głównego widoku.
*   **Lista wydatków (Ostatnie transakcje)**:
    *   Przeglądanie historii dodanych wydatków.
    *   Nawigacja pomiędzy poszczególnymi miesiącami (przełączanie "per miesiąc").
*   **Dynamiczny Miesięczny Budżet**:
    *   Możliwość ustawienia kwoty budżetu na początku każdego miesiąca.
    *   **Wizualizacja zużycia (Progres Bar)**: Pasek postępu pokazujący procentowe wykorzystanie budżetu.
    *   **Logika kolorów paska**: 
        *   Domyślny kolor (np. fioletowy/niebieski dopasowany do motywu).
        *   **Pomarańczowy**: gdy wykorzystano >= 75% budżetu.
        *   **Czerwony**: gdy wykorzystano >= 90% budżetu.
    *   *Brak inwazyjnych, czerwonych komunikatów tekstowych z ostrzeżeniami.*
*   **Widok Mobilny (Mobile First)**:
    *   Dolny pasek nawigacji (Home, Analysis, Budget, Profile).
    *   Skondensowany formularz "Szybki Wydatek".

## 3. Design i UI/UX
*   Aplikacja oparta na dostarczonym mockupie (`image_2b7a3f.jpg`).
*   **Kolorystyka**: Czysta biel, jasne tła, fioletowy jako kolor wiodący (akcenty, przyciski).
*   **Układ Desktop**: Panel główny z widocznym podsumowaniem budżetu, po lewej stronie duży formularz, po prawej/środku lista transakcji z możliwością zmiany miesiąca.
*   **Układ Mobile**: Skupienie na jednym ciągu informacji, najpierw budżet, pod nim miniformularz na jednym wierszu, na dole ostatnie transakcje.

## 4. Stos Technologiczny
*   **Frontend**: Angular (najnowsza wersja)
*   **Styling**: Tailwind CSS
*   **Backend / Baza danych**: Supabase
