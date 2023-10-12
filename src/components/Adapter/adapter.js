import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider as HeadProvider } from 'react-helmet-async';
import { useAdapter } from '@magento/peregrine/lib/talons/Adapter/useAdapter';

import ToastContainer from '../ToastContainer';
import AppContextProvider from '../App/contextProvider';
import ExperiencePlatformConnector from '../ExperiencePlatformConnector/ExperiencePlatformConnector';

const Adapter = props => {
    console.log('POSSIBLE_TYPES', POSSIBLE_TYPES);
    const talonProps = useAdapter(props);
    const {
        apolloProps,
        initialized,
        reduxProps,
        routerProps,
    } = talonProps;

    if (!initialized) {
        console.debug('Adapter not initialized...');
        return null;
    }

    if (initialized) {
        console.debug('Adapter initialized');
    }

    const children = props.children;

    return (
        <ApolloProvider {...apolloProps}>
            <ReduxProvider {...reduxProps}>
                <BrowserRouter {...routerProps}>
                    <AppContextProvider>
                        <HeadProvider>
                            {children}
                            <ToastContainer/>
                            <ExperiencePlatformConnector />
                        </HeadProvider>
                    </AppContextProvider>
                </BrowserRouter>
            </ReduxProvider>
        </ApolloProvider>
    );
};

export default Adapter;
