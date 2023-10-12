import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import operations from './adyenPaymentDetail.gql';
import { AdyenConfigQuery } from './adyenStoreConfig.gql';
import { useLocalStorage, handleError } from '../util';
import { useAdyenPayment } from './checkoutStore/useAdyenPayment';

/**
 * Hook after palace order was successful but the result was not finale this cloud means we need
 * 3D secure 1/2 or additional verification
 *
 * @param clearCart
 * @param orderNumber
 * @param adyenPaymentStatus
 *
 */
export const useHandleAction = ({
    clearCart,
    orderNumber,
    adyenPaymentStatus
}) => {
    const [configuration, setConfiguration] = useState(null);
    const [isAdditionalDetailsLoading, setIsAdditionalDetailsLoading] = useState(false)
    const [, setLastCartId] = useLocalStorage(
        'paymentRef',
        null
    );

    const { cartId } = useAdyenPayment();

    const [adyenPaymentDetails, setAdyenPaymentDetails] = useState(null);
    const [getPaymentDetails] = useMutation(operations.getAdyenPaymentDetails);

    useQuery(
        AdyenConfigQuery,
        {
            fetchPolicy: 'no-cache',
            onCompleted: ({ storeConfig }) => {
                const {
                    adyen_demo_mode,
                    adyen_client_key_live,
                    adyen_client_key_test,
                    locale
                } = storeConfig || {};

                setConfiguration({
                    clientKey: adyen_demo_mode
                        ? adyen_client_key_test
                        : adyen_client_key_live,
                    locale: locale,
                    environment: adyen_demo_mode ? 'test' : 'live',
                    onAdditionalDetails: (state) => {
                        setIsAdditionalDetailsLoading(true)
                        handleOnAdditionalDetails(state, orderNumber);
                    },
                    onError: (error) => {
                        handleError(error);
                        window.location = '/checkout?paymentError';
                    }
                });
            }
        }
    );

    const handleOnAdditionalDetails = useCallback(
        (state, orderNumber) => {
            const payload = JSON.stringify({
                ...state.data,
                orderId: orderNumber
            });

            if (typeof cartId === 'string') {
                getPaymentDetails({
                    variables: {
                        payload: payload,
                        cart_id: cartId
                    }
                }).then((result) => {
                    const { adyenPaymentDetails } = result.data;
                    clearCart();
                    setIsAdditionalDetailsLoading(false)
                    setAdyenPaymentDetails(adyenPaymentDetails);
                }).catch((error) => {
                    handleError(error);
                    window.location = '/checkout?paymentError';
                });
            }
        },
        [cartId, getPaymentDetails]
    );

    const paymentContainerRef = React.useRef(null);
    const [mounted, setMounted] = React.useState(false);

    // Will render 3D Secure widget or forward the customer to 3D secure 1 page.
    useEffect(() => {
        const createAction = async () => {
            if (
                configuration !== null &&
                !mounted &&
                paymentContainerRef.current !== null
            ) {
                setMounted(true);

                const threeDSConfiguration = {
                    challengeWindowSize: '02'
                };

                if (cartId) {
                    setLastCartId(cartId); // this cart id is not the one coming from Commerce
                }

                const AdyenCheckout = await import('@adyen/adyen-web');

                const checkout = await AdyenCheckout.default(configuration);
                checkout
                    .createFromAction(adyenPaymentStatus, threeDSConfiguration)
                    .mount(paymentContainerRef.current);
            }
        };

        createAction();
    }, [
        setLastCartId,
        cartId,
        adyenPaymentStatus,
        mounted,
        handleOnAdditionalDetails,
        orderNumber,
        configuration,
        clearCart
    ]);

    return {
        isAdditionalDetailsLoading,
        paymentContainerRef,
        adyenPaymentDetails,
        configuration
    };
};
