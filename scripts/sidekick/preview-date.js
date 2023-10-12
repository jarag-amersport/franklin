export const showDateSelection = () => {
  const today = new Date().toISOString().split('T')[0];
  const current = window.sessionStorage.getItem('preview-date') || today;
  const dateSelection = document.createRange().createContextualFragment(`
      <div class="date-selection">
        <label for="date">Date</label>
        <input type="date" id="date" name="preview-start" value=${current} required pattern="\\d{4}-\\d{2}-\\d{2}" />
      </div>
    `);
  dateSelection.querySelector('input').addEventListener('change', (event) => {
    const newValue = event.target.value.trim();
    if (newValue) {
      window.sessionStorage.setItem('preview-date', event.target.value);
    } else {
      window.sessionStorage.removeItem('preview-date');
    }
    window.location.reload();
  });
  document.body.append(dateSelection);
};

export const hideDateSelection = () => {
  document.querySelector('.date-selection')?.remove();
  window.sessionStorage.removeItem('preview-date');
  window.location.reload();
};
