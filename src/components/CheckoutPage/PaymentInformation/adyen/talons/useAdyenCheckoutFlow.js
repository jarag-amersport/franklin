import { clearCartDataFromCache } from '@magento/peregrine/lib/Apollo/clearCartDataFromCache';
import DEFAULT_OPERATIONS from './adyenCheckoutFlow.gql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage.js';
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { useCallback, useState } from 'react';
import { handleError } from '../util';
import { useAdyenPayment } from './checkoutStore/useAdyenPayment';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { GET_ADYEN_PAYMENT_DETAILS } from './adyenPaymentDetail.gql.js';

export const getAction = (order) => {
    const adyenPaymentStatus = order.adyen_payment_status;

    if (!adyenPaymentStatus || adyenPaymentStatus.isFinal) {
        return null;
    }

    return JSON.parse(adyenPaymentStatus.action || '');
};

export const useAdyenCheckoutFlow = (props) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props?.operations);
    const { setCheckoutStep } = props;

    const {
        getOrderDetailsGql,
        setAdyenPlaceCardOrderGql,
        setAdyenPlaceHppOrderGql,
        setPlaceOrderGql,
        setCreateCartGql
    } = operations;

    const {
        paymentMethod,
        cartId: adyenPaymentCartId,
        resetPaymentMethod
    } = useAdyenPayment();
    const [orderNumber, setOrderNumber] = useState();
    const [adyenCheckoutAction, setAdyenCheckoutAction] = useState();
    const [hppComponent, setHppComponent] = useState();
    const [{ cartId }, { createCart, removeCart }] = useCartContext();
    const [fetchCartId] = useMutation(setCreateCartGql)

    const apolloClient = useApolloClient();
    const clearCart = useCallback(async () => {
        await removeCart();
        await clearCartDataFromCache(apolloClient);
        await createCart({
            fetchCartId
        });
    }, [apolloClient, createCart, fetchCartId, removeCart]);

    const onClearCart = async (order) => {
        if (
            !order.adyen_payment_status ||
            order.adyen_payment_status.isFinal === true
        ) {
            // Payment is final and go directly to confirmation page
            setOrderNumber(order.order_number);
            await clearCart();
        } else {
            if (hppComponent) { // PayPal
                hppComponent.handleAction(getAction(order));
                setAdyenCheckoutAction('paypal');
                setOrderNumber(order.order_number);
            } else { // Credit card 3DS
                setAdyenCheckoutAction(getAction(order));
                setOrderNumber(order.order_number);
            }
        }
    };

    const onCompleted = useCallback(
        async ({ placeOrder: { order } }) => {
            onClearCart(order);
        },
        [clearCart, onClearCart]
    );

    const onError = useCallback(
        (error) => {
            resetPaymentMethod();
            handleError(error, error.message);
            setCheckoutStep(CHECKOUT_STEP.SHIPPING_METHOD);
            const url = new URL(window.location);
            url.searchParams.set('paymentError', true);
            window.history.replaceState({}, '', url);
        },
        [resetPaymentMethod, setCheckoutStep]
    );

    const [getPaymentDetails] = useMutation(GET_ADYEN_PAYMENT_DETAILS);

    const [
        defaultPlaceOrder,
        { loading: defaultPlaceOrderLoading }
    ] = useMutation(setPlaceOrderGql, { onCompleted, onError });

    const [
        adyenPlaceCardOrder,
        { loading: adyenPlaceCardOrderLoading }
    ] = useMutation(setAdyenPlaceCardOrderGql, { onCompleted, onError });

    const [
        adyenPlaceHppOrder,
        { loading: adyenPlaceHppOrderLoading }
    ] = useMutation(setAdyenPlaceHppOrderGql, { onCompleted, onError });

    const placeOrderLoading = defaultPlaceOrderLoading || adyenPlaceCardOrderLoading || adyenPlaceHppOrderLoading;

    const [
        getOrderDetails,
        { data: orderDetailsData, loading: orderDetailsLoading }
    ] = useLazyQuery(getOrderDetailsGql, {
        // We use this query to fetch details _just_ before submission, so we
        // want to make sure it is fresh.
        // We also don't want to cache these data
        // because it may contain PCI.
        fetchPolicy: 'no-cache',
        onCompleted: async () => {
            if (paymentMethod && adyenPaymentCartId === cartId) {
                const variables = {
                    cartId,
                    paymentMethod: paymentMethod.type,
                };

                let placeOrder;
                if (paymentMethod.type === 'adyen_hpp') {
                    placeOrder = adyenPlaceHppOrder;
                    if (paymentMethod.additionalData) {
                        variables.additionalDataHpp = paymentMethod.additionalData;
                    }
                }
                if (paymentMethod.type === 'adyen_cc') {
                    placeOrder = adyenPlaceCardOrder;
                    if (paymentMethod.additionalData) {
                        variables.additionalDataCc = paymentMethod.additionalData;
                    }
                }
                await placeOrder({ variables });
            } else {
                await defaultPlaceOrder({
                    variables: {
                        cartId
                    }
                });
            }
        },
        onError
    });

    const handleAdyenPlaceOrder = useCallback(async (state, component) => {
        setHppComponent(component);
        await getOrderDetails({
            variables: {
                cartId
            }
        });
    }, [cartId, getOrderDetails]);

    const handlePaypalAdditionalData = useCallback(async (state, orderNumber) => {
        const variables = {
            payload: JSON.stringify({
                ...state.data,
                orderId: orderNumber
            }),
            cart_id: cartId,
        };

        try {
            const result = await getPaymentDetails({ variables });
            const isFinal = result?.data?.adyenPaymentDetails?.isFinal;

            if (isFinal) {
                // Show confirmation page
                setAdyenCheckoutAction(null);
                await clearCart();
                return;
            } else {
                throw new Error('Payment not final');
            }
        } catch (err) {
            console.error('Could not get payment details', err);
            window.location = '/checkout?paymentError';
        }
    }, [orderNumber, cartId, setAdyenCheckoutAction])

    if (!paymentMethod) {
        return {
            adyenCheckoutAction,
            orderDetailsLoading,
            clearCart
        };
    }

    return {
        orderNumber,
        setOrderNumber,
        orderDetailsData,
        orderDetailsLoading,
        handlePlaceOrder: handleAdyenPlaceOrder,
        handlePaypalAdditionalData,
        placeOrderLoading,
        adyenCheckoutAction,
        clearCart,
        paymentMethod
    };
};
