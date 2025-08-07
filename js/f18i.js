document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const i18nElements = document.querySelectorAll('[data-i18n]');

  async function loadTranslations(lang) {
    try {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) throw new Error('Translation file not found');
      const translations = await response.json();

      i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          el.textContent = translations[key];
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  function updateButtons(selectedLang) {
    langButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === selectedLang ? 'true' : 'false');
    });
  }

  const savedLang = localStorage.getItem('site-lang') || 'en';
  loadTranslations(savedLang);
  updateButtons(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = btn.dataset.lang;
      loadTranslations(newLang);
      updateButtons(newLang);
      localStorage.setItem('site-lang', newLang);
    });
  });
});
