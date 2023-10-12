import React from 'react';
import { render } from 'react-dom';
import '../../index.css';
import store from '../../store';
import Adapter from '../../components/Adapter/adapter';
import ResetPasswordPage from "./resetPasswordPage";
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
                <ResetPasswordPage />
            </Adapter>),
            document.querySelector('.block.commerce-create-password'));
    },
    (reason) => {
        console.error('Error loading reset password!', reason);
    }
)
