import { useSetPaymentMethodOnCart } from '../useSetPaymentMethodOnCart';
import { useCallback, useEffect, useState } from 'react';
import { getAdditionalData } from '../../util';
import { useCheckoutStore } from './useCheckoutStore';

export const useAdyenPayment = () => {
    const {
        state: { cartId, paymentMethod },
        setPaymentMethod: setPaymentMethodInternal,
    } = useCheckoutStore();
    const {
        setPaymentMethod: setPaymentMethodOnCart,
        called,
        error,
        loading,
        completed
    } = useSetPaymentMethodOnCart();

    const setPaymentMethod = useCallback(
        (method, data) => {
            if (method === 'card') {
                setPaymentMethodInternal({
                    method,
                    type: 'adyen_cc',
                    additionalData: getAdditionalData('adyen_cc', data)
                });
                return;
            }
            if (method === 'paypal') {
                setPaymentMethodInternal({
                    method,
                    type: 'adyen_hpp',
                    additionalData: getAdditionalData('adyen_hpp', data)
                });
                return;
            }
            setPaymentMethodInternal();
            throw Error(`Unsupported payment method ${method}`);
        },
        [setPaymentMethodInternal]
    );

    const resetPaymentMethod = useCallback(() => {
        setPaymentMethodInternal();
    }, [setPaymentMethodInternal]);

    const submitPaymentMethod = useCallback(() => {
        if (!cartId || !paymentMethod) {
            return;
        }
        setPaymentMethodOnCart({ cartId, method: paymentMethod });
    }, [cartId, paymentMethod, setPaymentMethodOnCart]);

    return {
        cartId,
        setPaymentMethod,
        resetPaymentMethod,
        paymentMethod,
        submitPaymentMethod,
        called,
        error,
        loading,
        completed
    };
};
