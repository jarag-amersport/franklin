import React, { useEffect, useRef } from 'react';
import { shape, string, bool, func } from 'prop-types';
import { useIntl } from 'react-intl';

import { usePaymentMethods } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentMethods';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './paymentMethods.module.css';
import payments from './paymentMethodCollection';

const PaymentMethods = props => {
    const {
        classes: propClasses,
        onPaymentError,
        onPaymentSuccess,
        resetShouldSubmit,
        shouldSubmit
    } = props;

    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, propClasses);

    const talonProps = usePaymentMethods({});

    const {
        availablePaymentMethods,
        currentSelectedPaymentMethod,
        handlePaymentMethodSelection,
        initialSelectedMethod,
        isLoading
    } = talonProps;

    if (isLoading) {
        return null;
    }

    // adyen_cc is the only payment method needed, then implemented, so far.
    // it is safe to just render it without any other options:
    // in fact, it provides and manages multiple payment options.
    const paymentMethodCode = 'adyen_cc'
    const paymentMethod = availablePaymentMethods
        .find(({code}) => code === paymentMethodCode)

    const PaymentMethodComponent = payments[paymentMethodCode];

    const elementToBeRendered = !paymentMethod ? (
        <div className={classes.payment_errors}>
            <span>
                {formatMessage({
                    id: 'checkoutPage.paymentLoadingError',
                    defaultMessage: 'There was an error loading payments.'
                })}
            </span>
            <span>
                {formatMessage({
                    id: 'checkoutPage.refreshOrTryAgainLater',
                    defaultMessage: 'Please refresh or try again later.'
                })}
            </span>
        </div>
    ) : (
      <div className={classes.payment_method}>
        <PaymentMethodComponent
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
          resetShouldSubmit={resetShouldSubmit}
          shouldSubmit={shouldSubmit}
        />
      </div>
    );

    return (
        <div className={classes.root}>
            {elementToBeRendered}
        </div>
    );
};

export default PaymentMethods;

PaymentMethods.propTypes = {
    classes: shape({
        root: string,
        payment_method: string,
    }),
    onPaymentSuccess: func,
    onPaymentError: func,
    resetShouldSubmit: func,
    selectedPaymentMethod: string,
    shouldSubmit: bool
};
