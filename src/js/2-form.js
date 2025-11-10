const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');

document.addEventListener('DOMContentLoaded', () => {
  const savedData = loadFromLS(STORAGE_KEY);
  if (savedData) {
    formData = savedData;
    form.elements.email.value = savedData.email || '';
    form.elements.message.value = savedData.message || '';
  }
});

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();

  saveToLS(STORAGE_KEY, formData);
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing from localStorage', error);
    return null;
  }
}
