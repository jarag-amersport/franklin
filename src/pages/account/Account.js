import React from 'react';

import store from '../../store';
import Adapter from '../../components/Adapter/adapter';
import AccountPage from './AccountPage';

const origin = globalThis.location.origin;
const styles = new Set();
const configureLinks = links => [...links.values()];

const Account = props => {
    return (<Adapter
        apiUrl={props.apiUrl}
        configureLinks={configureLinks}
        origin={origin}
        store={store}
        styles={styles}>
        <AccountPage pageType={props.pageType} />
    </Adapter>);
}
export default Account;
