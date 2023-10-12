import * as React from 'react';
import { useHandleAction } from '../talons/useHandleAction';
import { useStyle } from '@magento/venia-ui/lib/classify';
import OrderConfirmationPage from '../../../../../pages/checkout/confirmation/orderConfirmationPage';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { FormattedMessage } from 'react-intl';
import defaultClasses from './handleAction.module.css';

/**
 * Handles 3D Secure 1/2 action returned from place order data after successful status.
 *
 * @param props
 * @returns {JSX.Element}
 */
const HandleAction = (props) => {
    const {
        adyenPaymentStatus,
        orderNumber,
        clearCart,
        orderDetailsData,
    } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const {
        isAdditionalDetailsLoading,
        paymentContainerRef,
        adyenPaymentDetails,
        configuration
    } = useHandleAction({
        orderNumber,
        clearCart,
        adyenPaymentStatus
    });

    if (configuration === null) {
        return (
            <div className={classes.root}>
                <h2>
                    <FormattedMessage
                        id={'adyen.placeOrder'}
                        defaultMessage="Please wait we while collect information from PSP ..."
                    />
                </h2>
                <LoadingIndicator />
            </div>
        );
    }

    if(isAdditionalDetailsLoading) {
        return <LoadingIndicator />
    }

    if (adyenPaymentDetails && adyenPaymentDetails.isFinal) {
        return (
            <OrderConfirmationPage
                data={orderDetailsData}
                orderNumber={orderNumber}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div ref={paymentContainerRef} />
        </div>
    );
};
export default HandleAction;
