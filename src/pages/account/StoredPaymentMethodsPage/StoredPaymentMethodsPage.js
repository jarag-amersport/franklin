import React, { useMemo } from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import { useSavedPaymentsPage } from '@magento/peregrine/lib/talons/SavedPaymentsPage/useSavedPaymentsPage';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './StoredPaymentMethodsPage.module.css';
import PaymentCard from "@magento/venia-ui/lib/components/SavedPaymentsPage/paymentCard";
import {fullPageLoadingIndicator} from "@magento/venia-ui/lib/components/LoadingIndicator";
import Alert from "../../../components/Alert/alert";
import PaymentMethodsList from "./PaymentMethodsList";

const StoredPaymentMethodsPage = props => {
    const talonProps = useSavedPaymentsPage();

    const { isLoading, savedPayments } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const { formatMessage } = useIntl();

    const content = useMemo(() => {
        if (savedPayments.length) {
            return <PaymentMethodsList items={savedPayments} />
        } else {
            const message = formatMessage({
                id: 'savedPaymentsPage.noPaymentMethods',
                defaultMessage: 'You have no stored payment methods.',
            });
            return (
                <Alert message={message} type="warning" />
            );
        }
    }, [savedPayments, formatMessage]);

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>
                <FormattedMessage
                    id="savedPaymentsPage.header"
                    defaultMessage="Stored Payment Methods"
                />
            </h1>
            <div className={classes.content}>
                {content}
            </div>
        </div>
    );
};

export default StoredPaymentMethodsPage;
