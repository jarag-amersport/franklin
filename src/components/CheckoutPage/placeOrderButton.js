import React from 'react';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

import { usePlaceOrderButton } from '../talons/usePlaceOrderButton';
import placeOrderButtonCollection from './placeOrderButtonCollection';

/**
 * Replace the default place order button with a custom one.
 * @see @maidenform-extensions/checkout/src/target/extend-intercept.js
 */
const PlaceOrderButton = ({
    ...props
}) => {
    const { originalPlaceOrderButton } = props;
    const { paymentMethod, loading } = usePlaceOrderButton();

    if (loading && !paymentMethod) {
        return <LoadingIndicator />;
    }

    const CustomPlaceOrderButton = paymentMethod
        ? placeOrderButtonCollection[paymentMethod]
        : undefined;
    
    return CustomPlaceOrderButton ? (
        <CustomPlaceOrderButton {...props} />
    ) : (
        originalPlaceOrderButton
    );
    
};

export default PlaceOrderButton;
