const form = document.getElementById('surveyForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value.trim(),
    age: document.getElementById('age').value.trim(),
    language: document.getElementById('language').value.trim()
  };

  try {
    const result = await window.surveyAPI.submitSurvey(data);
    if (result.success) {
      showMessage('Answers saved successfully!', 'success');
      form.reset();
    }
  } catch (err) {
    showMessage('Error saving answers. Please try again.', 'error');
  }
});

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  setTimeout(() => {
    messageDiv.className = 'message hidden';
  }, 3000);
}
