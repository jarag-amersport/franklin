import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

const LocaleProvider = props => {
    const [messages, setMessages] = useState(null);
    const language = 'en-US';

    /**
     * At build time, `__fetchLocaleData__` is injected as a global. Depending on the environment, this global will be
     * either an ES module with a `default` property, or a plain CJS module.
     *
     * Please see {LocalizationPlugin} at @magento/pwa-buildpack/WebpackTools/plugins/LocalizationPlugin.js
     */
    const fetchLocale =
        'default' in __fetchLocaleData__
            ? __fetchLocaleData__.default
            : __fetchLocaleData__;

    useEffect(() => {
        const locale = 'en_US';
        fetchLocale(locale)
            .then(data => {
                setMessages(data.default);
            })
            .catch(error => {
                console.error(
                    `Unable to load translation file. \n${error}`
                );
            });
    }, [fetchLocale]);

    const handleIntlError = error => {
        if (messages) {
            if (error.code === 'MISSING_TRANSLATION') {
                console.warn('Missing translation', error.message);
                return;
            }
            throw error;
        }
    };

    return (
        <IntlProvider
            key={language}
            {...props}
            defaultLocale={DEFAULT_LOCALE}
            locale={language}
            messages={messages}
            onError={handleIntlError}
        />
    );
};

export default LocaleProvider;
