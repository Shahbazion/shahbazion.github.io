document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.contact-form');
  const messageBox = document.createElement('div');
  messageBox.setAttribute('role', 'alert');
  messageBox.setAttribute('aria-live', 'polite');
  messageBox.style.marginBottom = '1rem';
  messageBox.style.fontWeight = '700';
  form.parentNode.insertBefore(messageBox, form);

  // پیام‌ها بر اساس زبان
  const messages = {
    en: {
      fillAll: 'Please fill out all fields before submitting.',
      invalidEmail: 'Please enter a valid email address.',
      success: 'Your message has been sent successfully.',
      error: 'Failed to send the message. Please try again.'
    },
    fa: {
      fillAll: 'لطفاً همه فیلدها را قبل از ارسال پر کنید.',
      invalidEmail: 'لطفاً یک ایمیل معتبر وارد کنید.',
      success: 'پیام شما با موفقیت ارسال شد.',
      error: 'ارسال پیام موفق نبود. لطفاً دوباره تلاش کنید.'
    },
    de: {
      fillAll: 'Bitte füllen Sie alle Felder aus, bevor Sie senden.',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      success: 'Ihre Nachricht wurde erfolgreich gesendet.',
      error: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.'
    },
    ar: {
      fillAll: 'يرجى ملء جميع الحقول قبل الإرسال.',
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
      success: 'تم إرسال رسالتك بنجاح.',
      error: 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.'
    }
  };

  // تابع گرفتن زبان فعلی
  function getCurrentLang() {
    const activeBtn = document.querySelector('.lang-btn[aria-pressed="true"]');
    return activeBtn ? activeBtn.dataset.lang : 'en';
  }

  // تابع تنظیم پیام جعبه پیام
  function setMessage(text, isError = false) {
    messageBox.textContent = text;
    messageBox.style.color = isError ? '#e03e3e' : '#d4af37';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const lang = getCurrentLang();
    const msgSet = messages[lang] || messages.en;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      setMessage(msgSet.fillAll, true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage(msgSet.invalidEmail, true);
      return;
    }

    const formData = new FormData(form);
    formData.append('_captcha', 'false');

    try {
      const response = await fetch('https://formsubmit.co/ajax/saeed.shahbazi98@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(msgSet.success, false);
        form.reset();
      } else {
        throw new Error(result.message || 'Error');
      }
    } catch (error) {
      setMessage(msgSet.error, true);
      console.error('FormSubmit error:', error);
    }
  });

  // به تغییر زبان گوش بده و اگر پیام قبلی هست آپدیت کن
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // کمی تاخیر برای اطمینان از تعویض زبان در صفحه
      setTimeout(() => {
        if (messageBox.textContent) {
          const lang = getCurrentLang();
          // اگر پیام قبلی خطا بود یا موفقیت، متن را به زبان جدید تبدیل کن
          // فرض می‌کنیم اگر رنگ قرمز بود خطا بوده
          const isError = messageBox.style.color === 'rgb(224, 62, 62)';
          const keyMap = {
            [messages.en.fillAll]: 'fillAll',
            [messages.en.invalidEmail]: 'invalidEmail',
            [messages.en.success]: 'success',
            [messages.en.error]: 'error',

            [messages.fa.fillAll]: 'fillAll',
            [messages.fa.invalidEmail]: 'invalidEmail',
            [messages.fa.success]: 'success',
            [messages.fa.error]: 'error',

            [messages.de.fillAll]: 'fillAll',
            [messages.de.invalidEmail]: 'invalidEmail',
            [messages.de.success]: 'success',
            [messages.de.error]: 'error',

            [messages.ar.fillAll]: 'fillAll',
            [messages.ar.invalidEmail]: 'invalidEmail',
            [messages.ar.success]: 'success',
            [messages.ar.error]: 'error',
          };
          const currentKey = keyMap[messageBox.textContent] || 'success';
          setMessage(messages[lang][currentKey], isError);
        }
      }, 100);
    });
  });
});
