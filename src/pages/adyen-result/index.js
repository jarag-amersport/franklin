import React from 'react';
import { render } from 'react-dom';

import store from '../../store';
import Adapter from '../../components/Adapter/adapter.js';
import Result from './result';
import { getGQLEndpoint } from '../../franklin-configs';

const origin = globalThis.location.origin;
const styles = new Set();
const configureLinks = links => [...links.values()];

console.log('Checkout Loaded');

getGQLEndpoint().then(
    (config) => {
        render((
        <Adapter
            apiUrl={config}
            configureLinks={configureLinks}
            origin={origin}
            store={store}
            styles={styles}>
            <Result />
        </Adapter>),
        document.querySelector('.block.commerce-checkout-adyen-result'));
    },
    (reason) => {
        console.error('Error loading checkout result!', reason);
    }
)

export { Result as default };
