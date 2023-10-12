import React from 'react';
import { render } from 'react-dom';
import SignUp from './signup';
import '../../index.css';
import store from '../../store';
import Adapter from '../../components/Adapter/adapter';
import { getGQLEndpoint } from '../../franklin-configs';

console.log('Login Loaded');

const origin = globalThis.location.origin;
const styles = new Set();
const configureLinks = links => [...links.values()];

getGQLEndpoint().then(
    (config) => {
        render((<Adapter
            apiUrl={config}
            configureLinks={configureLinks}
            origin={origin}
            store={store}
            styles={styles}>
            <SignUp />
        </Adapter>),
        document.querySelector('.block.commerce-signup'));
    },
    (reason) => {
        console.log(reason);
    }
);
