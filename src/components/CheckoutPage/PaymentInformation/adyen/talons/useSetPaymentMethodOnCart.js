import DEFAULT_OPERATIONS from './setPaymentMethod.gql';
import { useMutation } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCallback } from 'react';
import { handleError } from '../util';
import { useCheckoutDispatch } from '../../../paymentContext'
import { useIntl } from 'react-intl';

export const useSetPaymentMethodOnCart = (props) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props?.operations);
    const dispatchCheckout = useCheckoutDispatch();
    const { formatMessage } = useIntl();

    const {
        setAdyenCardPaymentOnCartWithAdditionalData,
        setAdyenHppPaymentOnCartWithAdditionalData
    } = operations;

    const [
        setCardPaymentMethodOnCart,
        { called : calledCard, error: errorCard, loading: loadingCard }
    ] = useMutation(setAdyenCardPaymentOnCartWithAdditionalData);

    const [
        setHppPaymentMethodOnCart,
        { called : calledHpp, error: errorHpp, loading: loadingHpp }
    ] = useMutation(setAdyenHppPaymentOnCartWithAdditionalData);

    const called = calledCard || calledHpp;
    const error = errorCard || errorHpp;
    const loading = loadingCard || loadingHpp;

    const setPaymentMethod = useCallback(
        ({ cartId, method }) => {
            try {
                const variables = {
                    cartId: cartId,
                    paymentMethod: method.type,
                };
                let setPaymentMethod;

                if (method.type === 'adyen_hpp') {
                    variables.additionalDataHpp = method.additionalData;
                    setPaymentMethod = setHppPaymentMethodOnCart;
                } else {
                    variables.additionalDataCc = method.additionalData;
                    setPaymentMethod = setCardPaymentMethodOnCart;
                }

                setPaymentMethod({ variables }).then(() => {
                    dispatchCheckout({
                        type: 'setMethod',
                        method: method.type,
                        details: method.additionalData
                    });
                });
            } catch (e) {
                handleError(
                    e,
                    formatMessage({
                        id: 'adyen.errorToast',
                        defaultMessage: 'Error while handling your payment'
                    })
                );
            }
        },
        [dispatchCheckout, formatMessage, setCardPaymentMethodOnCart, setHppPaymentMethodOnCart]
    );

    return {
        setPaymentMethod,
        called,
        error,
        loading,
        completed: called && !loading
    };
};
