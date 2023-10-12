/* eslint-disable import/no-cycle */
import {
  loadCSS,
  sampleRUM,
}
  from './lib-franklin.js';

import { loadScript } from './scripts.js';

import {
  calcEnvironment,
  getConfigValue,
} from './configs.js';
import { initMagentoStorefrontEvents } from './commerce.js';

const environment = calcEnvironment();
// OneTrust Cookies Consent Notice start
const otId = await getConfigValue('onetrustid');
const onetrustscript = await getConfigValue('onetrustscript');
const isProduction = (environment === 'prod');
if (otId && onetrustscript) {
  const cookieScript = loadScript(`${onetrustscript}`);
  cookieScript.setAttribute('data-domain-script', `${otId}${isProduction ? '' : '-test'}`);
  window.OptanonWrapper = () => {};
}

// TODO (#101): Load newrelic script
// if (!isProduction) loadScript('/scripts/newrelic-stage.js');

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

// Load Magento Storefront Events
initMagentoStorefrontEvents();

loadScript('https://assets.adobedtm.com/4b267f494b4f/aa3406ce34a4/launch-2ed27ae40d9b-development.min.js', {
  async: '',
});

if (window.location.pathname.includes('checkout')) {
  loadCSS('//services.postcodeanywhere.co.uk/css/address-3.91.css');
  loadScript('//services.postcodeanywhere.co.uk/js/address-3.91.js', {}, () => {
    window.postMessage('pca-predict');
  });
}
