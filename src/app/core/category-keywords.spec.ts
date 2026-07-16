import { suggestCategoryByKeywords } from './category-keywords';

describe('suggestCategoryByKeywords', () => {
  it('rozpoznaje Jedzenie', () => {
    expect(suggestCategoryByKeywords('Biedronka zakupy')).toBe('Jedzenie');
  });

  it('rozpoznaje Transport', () => {
    expect(suggestCategoryByKeywords('Bilet PKP')).toBe('Transport');
  });

  it('rozpoznaje Rachunki', () => {
    expect(suggestCategoryByKeywords('Faktura za internet')).toBe('Rachunki');
  });

  it('rozpoznaje Rozrywkę', () => {
    expect(suggestCategoryByKeywords('Netflix')).toBe('Rozrywka');
  });

  it('rozpoznaje Zdrowie', () => {
    expect(suggestCategoryByKeywords('Apteka - leki')).toBe('Zdrowie');
  });

  it('ignoruje wielkość liter', () => {
    expect(suggestCategoryByKeywords('BIEDRONKA')).toBe('Jedzenie');
  });

  it('radzi sobie z polskimi znakami diakrytycznymi', () => {
    expect(suggestCategoryByKeywords('Prąd za czerwiec')).toBe('Rachunki');
    expect(suggestCategoryByKeywords('Prad za czerwiec')).toBe('Rachunki');
    expect(suggestCategoryByKeywords('Siłownia karnet')).toBe('Zdrowie');
    expect(suggestCategoryByKeywords('Żabka śniadanie')).toBe('Jedzenie');
  });

  it('zwraca Inne dla nieznanego tytułu', () => {
    expect(suggestCategoryByKeywords('Prezent dla babci')).toBe('Inne');
  });

  it('zwraca Inne dla pustego tytułu', () => {
    expect(suggestCategoryByKeywords('')).toBe('Inne');
  });
});
