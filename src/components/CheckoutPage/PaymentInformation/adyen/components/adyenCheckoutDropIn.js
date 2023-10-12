import React, { useCallback, useEffect } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { FormattedMessage } from 'react-intl';
import defaultClasses from './adyenCheckoutDropIn.module.css';
import { useAdyenDropIn } from '../talons/useAdyenDropIn';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { BillingAddressForm } from '../../../AddressForm';
// this is necessary for disable style loader for this external stylesheet
import '!style-loader!css-loader!@adyen/adyen-web/dist/adyen.css';

/**
 * Create a new Adyen web drop in where customers can enter their credit card data.
 * @param props
 * @returns {JSX.Element}
 */
const AdyenCheckoutDropIn = (props) => {
    const classes = useStyle(defaultClasses, props.classes);

    const {
        type,
        shouldSubmit,
        resetShouldSubmit,
        onPaymentSuccess,
        onPaymentError
    } = props;

    // fetch the adyen config from backend
    const {
      paymentContainerRef,
      loading
    } = useAdyenDropIn({
        type,
        onPaymentSuccess,
        onPaymentError,
        shouldSubmit,
        resetShouldSubmit
    });

    /**
     * This function will be called if cant not set address.
     */
    const onBillingAddressChangedError = useCallback(() => {
        resetShouldSubmit();
    }, [resetShouldSubmit]);

    /**
     * This function will be called if address was successfully set.
     */
    const onBillingAddressChangedSuccess = useCallback(() => {
        return;
    }, []);

    const loadingIndicator = loading ? (
        <LoadingIndicator classes={{root: classes.loader}}>
            <FormattedMessage
                defaultMessage={
                    'Loading Payment'
                }
                id={'checkoutPage.loadingPayment'}
            />
        </LoadingIndicator>
    ) : null;

    return (
        <React.Fragment>
            <div className={classes.dropinContainer}>
                <div ref={paymentContainerRef} />
            </div>
            {loadingIndicator}
            <BillingAddressForm
                resetShouldSubmit={resetShouldSubmit}
                shouldSubmit={shouldSubmit}
                onBillingAddressChangedError={onBillingAddressChangedError}
                onBillingAddressChangedSuccess={onBillingAddressChangedSuccess}
            />
        </React.Fragment>
    );
};

export default AdyenCheckoutDropIn;
