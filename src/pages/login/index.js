import React from 'react';
import { render } from 'react-dom';
import Login from '../../components/Login/login';
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
        render((
        <Adapter
            apiUrl={config}
            configureLinks={configureLinks}
            origin={origin}
            store={store}
            styles={styles}>
                <Login/>
        </Adapter>),
        document.querySelector('.block.commerce-login'));
    },
    (reason) => {
        console.log(reason);
    }
);
