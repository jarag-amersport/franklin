import { loadPWA } from '../../scripts/pwa-dist/pwa-injector.js';

export default async function decorate(block) {
  block.textContent = '';
  document.body.appendChild(document.createRange().createContextualFragment('<div id="pwa-dialog-root"></div>'));

  await loadPWA('logout');
}
