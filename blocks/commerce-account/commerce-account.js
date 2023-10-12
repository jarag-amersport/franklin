import { loadPWA } from '../../scripts/pwa-dist/pwa-injector.js';
import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const accountSubpage = readBlockConfig(block).subpage || 'myaccount';

  block.textContent = '';
  document.body.appendChild(document.createRange().createContextualFragment('<div id="pwa-dialog-root"></div>'));

  document.body.appendChild(document.createRange().createContextualFragment(`
    <script id="account-page-type" type="application/json">
        {"pageType": "${accountSubpage}"}
    </script>
  `));

  await loadPWA('account');
}
