import React, { useCallback, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { handleError } from '../util';

import { useAdyenCheckout } from './checkoutStore/useAdyenCheckout';
import { useAdyenPayment } from './checkoutStore/useAdyenPayment';

/**
 * Hook to get load drop in information show 3D state after place order
 * @param props
 */
export const useAdyenDropIn = ({
    onPaymentSuccess,
    onPaymentError,
    shouldSubmit,
    resetShouldSubmit
}) => {
    const { formatMessage } = useIntl();
    const paymentContainerRef = useRef(null);
    const dropinRef = useRef();

    const {
        setPaymentMethod,
        resetPaymentMethod,
        paymentMethod,
        submitPaymentMethod,
        called: paymentMethodMutationCalled,
        error: paymentMethodMutationError,
        loading: paymentMethodMutationLoading
    } = useAdyenPayment();

    // Callback for when the customer enters their card details
    const onChange = useCallback(
        (
            state,
            element,
            selectedElement
        ) => {
            const activeElement =
                selectedElement ||
                (element.elementRef.dropinRef?.state
                    .activePaymentMethod) ||
                element;
            const { data, isValid } = state;
            const { type: method } = activeElement;

            if (method === 'dropin') {
                return;
            }

            // Make sure the "Review Order" button gets enabled again after making changes to the payment method
            resetShouldSubmit();

            //some form fields are not filled, so we have to clear potential previous selections
            if (!isValid) {
                resetPaymentMethod();
                return;
            }
            try {
                setPaymentMethod(method, data);
            } catch (error) {
                handleError(
                    error,
                    `Unsupported payment method "${activeElement.accessibleName}"`
                );
            }
        },
        [resetShouldSubmit, setPaymentMethod, resetPaymentMethod]
    );

    const { adyenCheckout, loading } = useAdyenCheckout({ onChange });

    /* Effect for persisting the selected payment in magento backend */
    useEffect(() => {
        // shouldSubmit will be true when the customer clicks on "Review Order"
        if (!shouldSubmit) {
            return;
        }

        if (!paymentMethod) {
            dropinRef.current?.showValidation();

            resetShouldSubmit();

            handleError(
                null,
                formatMessage({
                    id: 'adyen.creditFormError',
                    defaultMessage:
                        'Your entered Credit Card information is not valid'
                })
            );
            return;
        }

        submitPaymentMethod();
    }, [
        shouldSubmit,
        formatMessage,
        paymentMethod,
        submitPaymentMethod,
        resetShouldSubmit
    ]);

    // Effect to update payment state on cart
    useEffect(() => {
        const paymentMethodMutationCompleted =
            paymentMethodMutationCalled && !paymentMethodMutationLoading;

        if (paymentMethodMutationCompleted && !paymentMethodMutationError) {
            onPaymentSuccess('adyen_cc');
        }

        if (paymentMethodMutationCompleted && paymentMethodMutationError) {
            onPaymentError();
        }
    }, [
        paymentMethodMutationError,
        paymentMethodMutationLoading,
        onPaymentSuccess,
        onPaymentError,
        paymentMethodMutationCalled
    ]);

    const onSelect = useCallback(
        (element) => {
            /**
             * we're creating the same arguments that the onChange callback receives by default
             * with the addition of the original element since the active payment method is set on the dropin after this callback
             * @see {https://github.com/Adyen/adyen-web/blob/master/packages/lib/src/components/UIElement.tsx#L36}
             */
            const state = {
                data: element.data,
                errors: element.state.errors,
                valid: element.state.valid,
                isValid: element.isValid
            };
            onChange(state, element.elementRef, element);
        },
        [onChange]
    );

    /** cleanup mounted dropin when the component using this hook is unmounted */
    useEffect(
        () => () => {
            if (dropinRef.current) {
                dropinRef.current?.remove();
                dropinRef.current = undefined;
            }
        },
        []
    );

    /* Effect for initializing the Adyen DropIn*/
    useEffect(() => {
        // bail out if not initialized or the dropin is already mounted
        if (
            !adyenCheckout ||
            !paymentContainerRef.current ||
            dropinRef.current ||
            loading
        ) {
            return;
        }
        dropinRef.current = adyenCheckout
            .create('dropin', { onSelect: onSelect })
            .mount(paymentContainerRef.current);
    }, [onChange, onSelect, adyenCheckout, loading]);

    return {
        loading,
        paymentContainerRef,
    };
};
