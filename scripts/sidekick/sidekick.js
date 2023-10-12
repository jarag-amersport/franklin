import { loadCSS } from '../lib-franklin.js';

let displayDateSelection = false;

const setDisplayDateSelection = async (show) => {
  const { showDateSelection, hideDateSelection } = await import('./preview-date.js');
  loadCSS(`${window.hlx.codeBasePath}/scripts/sidekick/preview-date.css`);

  displayDateSelection = show;
  if (displayDateSelection) {
    showDateSelection();
  } else {
    hideDateSelection();
  }
};

const displayIfSet = () => {
  if (!displayDateSelection && window.sessionStorage.getItem('preview-date')) {
    setDisplayDateSelection(true);
  }
};

const sidekick = await new Promise((resolve) => {
  const sk = document.querySelector('helix-sidekick');
  if (sk) {
    resolve(sk);
    return;
  }

  document.addEventListener('helix-sidekick-ready', () => {
    resolve(document.querySelector('helix-sidekick'));
  }, { once: true });
});
displayIfSet();

sidekick.addEventListener('custom:date-preview', () => setDisplayDateSelection(!displayDateSelection));
sidekick.addEventListener('shown', displayIfSet);
sidekick.addEventListener('hidden', () => setDisplayDateSelection(false));
