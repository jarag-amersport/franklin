import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import store from '../../store';
import Adapter from '../../components/Adapter/adapter.js';
import { getGQLEndpoint } from '../../franklin-configs';
import { getProduct } from './productQuery';
import MiniCart from './mini-cart';

import '../../index.css';

const origin = globalThis.location.origin;
const styles = new Set();
const configureLinks = links => [...links.values()];

const unmount = () => {
  unmountComponentAtNode(document.querySelector('#my-mini-cart'));
}

const addToCart = (sku, options, quantity) => {
  const event = new CustomEvent('addToCart', {detail: { sku, options, quantity, unmount }});
  document.querySelector('#my-mini-cart').dispatchEvent(event);
}

const sku = document.querySelector('#my-mini-cart').dataset.sku;
const image = document.querySelector('#my-mini-cart').dataset.image;

Promise.all([getGQLEndpoint(), getProduct(sku)]).then(
    ([config, product]) => {
          product.small_image.url = image;

          // Select first available variant since the whole logic expects a selection
          const firstAvailableVariant = product.variants.filter(variant => variant.product.stock_status === 'IN_STOCK')[0];
          product.configurable_options = product.configurable_options.map(option => {
            const value_id = firstAvailableVariant.attributes.find(attribute => attribute.code == option.attribute_code).value_index;
            const value_label = option.values.find(value => value.value_index === value_id).label;
            return {
              ...option,
              value_id,
              value_label,
              id: option.attribute_id,
            };
          });

          render((
            <Adapter
                apiUrl={config}
                configureLinks={configureLinks}
                origin={origin}
                store={store}
                styles={styles}>
                <MiniCart product={product} addToCart={addToCart}/>
            </Adapter>
        ), document.querySelector('#my-mini-cart'));
      },
    (reason) => {
        console.log(reason);
    }
)
