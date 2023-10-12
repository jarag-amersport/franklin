import React from 'react';

import AdyenDropIn from './adyenCheckoutDropIn';

/**
 * Renders the payment method for the checkout
 */
const AdyenWebPayment = (props) => {
    const {
        shouldSubmit,
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError
    } = props;

    return (
        <React.Fragment>
            <AdyenDropIn
                type="dropin"
                shouldSubmit={shouldSubmit}
                resetShouldSubmit={resetShouldSubmit}
                onPaymentSuccess={onPaymentSuccess}
                onPaymentError={onPaymentError}
            />
        </React.Fragment>
    );
};

export default AdyenWebPayment;
