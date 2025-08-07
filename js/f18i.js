document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const i18nElements = document.querySelectorAll('[data-i18n]');
  const html = document.documentElement;
  const langSwitcher = document.querySelector('.lang-switcher');

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

      updateDirection(lang);
    } catch (error) {
      console.error(error);
    }
  }

  function updateButtons(selectedLang) {
    langButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === selectedLang ? 'true' : 'false');
    });
  }

  function updateDirection(lang) {
    const rtlLanguages = ['fa', 'ar'];
    const dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    html.setAttribute('dir', dir);
    html.setAttribute('lang', lang);

    // ثابت نگه داشتن جهت سوئیچر زبان
    if (langSwitcher) {
      langSwitcher.setAttribute('dir', 'ltr');
    }
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
