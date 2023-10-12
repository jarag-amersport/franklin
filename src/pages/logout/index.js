import React from 'react';
import { render } from 'react-dom';
import '../../index.css';
import store from '../../store';
import Adapter from '../../components/Adapter/adapter';
import Logout from '../../components/Logout/logout';
import { getGQLEndpoint } from '../../franklin-configs';

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
                <Logout/>
            </Adapter>),
            document.querySelector('.block.commerce-logout'));
    },
    (reason) => {
        console.error('Error loading logout!', reason);
    }
)
