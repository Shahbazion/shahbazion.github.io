// contact.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.contact-form');

  form.addEventListener('submit', e => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Please fill out all fields before submitting.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      return;
    }
  });
});
