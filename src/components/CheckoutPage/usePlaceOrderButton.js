import { useCartContext } from '@magento/peregrine/lib/context/cart';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from './placeOrderButton.gql.js';
import { useState } from 'react';
import { useCheckoutState } from '../context/paymentContext';

export const usePlaceOrderButton = (props) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props?.operations);
    const checkoutState = useCheckoutState();

    const { getSelectedPaymentMethodQuery } = operations
    const [paymentMethod, setPaymentMethod] = useState(
        checkoutState.method || null
    );

    const [{ cartId }] = useCartContext();
    const { loading } = useQuery(getSelectedPaymentMethodQuery ,{
        fetchPolicy: 'no-cache',
        variables: { cartId: cartId },
        // the payment method is already resolved via checkout context no query required
        skip: paymentMethod !== null,
        onCompleted: ({ cart }) => {
            if (cart?.selected_payment_method?.code) {
                setPaymentMethod(cart.selected_payment_method.code);
            }
        }
    });

    return {
        paymentMethod,
        loading
    };
};
