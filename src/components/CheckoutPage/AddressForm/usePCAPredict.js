import { getConfigValue } from '../../../franklin-configs';
import { useCallback, useEffect, useState } from 'react';

async function getPCAPredict(callback) {
  return new Promise((resolve) => {
    if (window.pca) {
      if (callback) {
        callback(window.pca);
      }
      resolve(window.pca);
      return;
    }

    const eventHandler = ({ data }) => {
      if (data === 'pca-predict') {
        window.removeEventListener('message', eventHandler);
        if (callback) {
          callback(window.pca);
        }
        resolve(window.pca);
      }
    };
    window.addEventListener('message', eventHandler);
  });
}

const opts = {
  // copied config from http://hanes11111.pcapredict.com/js/sensor.js
  "fields": [
    {
      "element": "street[0]",
      "field": "{Line1}",
      "persistantDisplayField": "{Line1}",
      "mode": 3
    },
    {
      "element": "street[1]",
      "field": "{Line2}",
      "persistantDisplayField": "{Line2}",
      "mode": 2
    },
    {
      "element": "city",
      "field": "{City}",
      "persistantDisplayField": "{City}",
      "mode": 2
    },
    {
      "element": "region",
      "field": "{ProvinceName}",
      "persistantDisplayField": "{ProvinceName}",
      "mode": 2
    },
    {
      "element": "region_id",
      "field": "{ProvinceName}",
      "persistantDisplayField": "{ProvinceName}",
      "mode": 2
    },
    {
      "element": "postcode",
      "field": "{PostalCode}",
      "persistantDisplayField": "{PostalCode}",
      "mode": 2
    },
    {
      "element": "country_id",
      "field": "{CountryName}",
      "persistantDisplayField": "{CountryName}",
      "mode": 10
    }
  ],
  options: {
    countries: { codesList:"USA,CAN"},
    setCountryByIP: false,
  }
};

export default function usePCAPredict(formRef) {
  // Stores object mapping <region name> -> <region value used in select> so we can update the value
  const [ regionMappings, setRegionMappings ] = useState({});

  useEffect(() => {
    if (regionMappings && Object.entries(regionMappings).length > 0) {
      getPCAPredict().then(async (pca) => {
        // Get the Hanes config value for PCA Predict
        const key = await getConfigValue('pca-predict-key');

        // Initialize
        const control = new pca.Address(opts.fields, { ...opts.options, key });
        control.load();

        // On address populate, also update informed state
        control.listen('populate', (address) => {
          formRef.current.setValues({
            street0: address.FormattedLine1,
            street1: address.FormattedLine2,
            city: address.City,
            postcode: address.PostalCode,
            region: { region_id: regionMappings[address.ProvinceName] }
          });
        });
      });
    }
  }, [regionMappings]);

  return { setRegionMappings };
}
