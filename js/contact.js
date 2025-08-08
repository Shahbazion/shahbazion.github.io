document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.contact-form');

  // ایجاد جعبه پیام بالای فرم
  const messageBox = document.createElement('div');
  messageBox.setAttribute('role', 'alert');
  messageBox.setAttribute('aria-live', 'polite');
  messageBox.style.marginBottom = '1rem';
  messageBox.style.fontWeight = '700';
  form.parentNode.insertBefore(messageBox, form);

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // اعتبارسنجی ساده
    if (!name || !email || !message) {
      messageBox.textContent = 'Please fill out all fields before submitting.';
      messageBox.style.color = '#e03e3e'; // قرمز
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      messageBox.textContent = 'Please enter a valid email address.';
      messageBox.style.color = '#e03e3e';
      return;
    }

    // ساخت داده‌ها برای ارسال
    const formData = new FormData(form);
    formData.append('_captcha', 'false'); // غیرفعال کردن کپچا

    try {
      const response = await fetch('https://formsubmit.co/ajax/saeed.shahbazi98@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      const result = await response.json();

      if (response.ok) {
        messageBox.textContent = 'پیام شما با موفقیت ارسال شد.';
        messageBox.style.color = '#d4af37'; // طلایی
        form.reset();
      } else {
        throw new Error(result.message || 'An error occurred');
      }
    } catch (error) {
      messageBox.textContent = 'ارسال پیام موفق نبود. لطفاً دوباره تلاش کنید.';
      messageBox.style.color = '#e03e3e';
      console.error('FormSubmit error:', error);
    }
  });
});
