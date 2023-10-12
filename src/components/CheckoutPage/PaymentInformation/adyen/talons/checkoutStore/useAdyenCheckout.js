import { useQuery } from '@apollo/client'
import DEFAULT_OPERATIONS from './getAdyenPaymentMethods.gql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCheckoutStore } from './useCheckoutStore';

const notUndefinedOrNull = (item) =>
    item != null;

export const useAdyenCheckout = (options) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, options?.operations);
    const {
        getAdyenPaymentMethods,
    } = operations;

    const [{ cartId }] = useCartContext();
    const {
        checkout: adyenCheckout,
        setCheckoutConfig,
        loading: adyenLoading
    } = useCheckoutStore();

    const { error, loading } = useQuery(getAdyenPaymentMethods ,{
        fetchPolicy: 'no-cache',
        variables: { cart_id: cartId },
        onCompleted: async (data) => {
            const {
                adyen_demo_mode,
                adyen_client_key_live,
                adyen_client_key_test,
                locale,
                adyen_holder_name_required,
                adyen_has_holder_name
            } = data.storeConfig || {};

            const clientKey =
                (adyen_demo_mode
                    ? adyen_client_key_test
                    : adyen_client_key_live) || undefined;

            const {
                paymentMethodsResponse
            } = data.adyenPaymentMethods || {};

            const paypalConfig = paymentMethodsResponse?.paymentMethods?.find(p => p.type === 'paypal')?.configuration || {};
            if (!paypalConfig) {
                console.error('No paypal config found');
            }

            const config = {
                paymentMethodsResponse:
                    (data.adyenPaymentMethods
                        ?.paymentMethodsResponse) ||
                    undefined,
                clientKey,
                onPaymentCompleted: (result) => {
                    // TODO: NOOP this should never happen
                    console.log("onPaymentCompleted", result);
                },
                onError: (error) => {
                    console.error('Payment failed', error);
                    window.location = '/checkout?paymentError';
                },
                locale: locale || undefined,
                environment: adyen_demo_mode ? 'test' : 'live',
                showPayButton: false,
                paymentMethodsConfiguration: {
                    card: {
                        // Example optional configuration for Cards
                        hasHolderName: adyen_has_holder_name || undefined,
                        holderNameRequired:
                            adyen_holder_name_required || undefined,
                        hideCVC: false // Change this to true to hide the CVC field for stored cards
                    },
                    paypal: {
                        showPayButton: false,
                        merchantId: paypalConfig.merchantId,
                        configuration: {
                            merchantId: paypalConfig.merchantId,
                        },
                        intent: "authorize",
                        // We disable the button here, since we don't want users to use it when they select the payment method.
                        onInit: (data, actions) => actions.disable(),
                    }
                }
            };

            const extraDetails =
                data.adyenPaymentMethods?.paymentMethodsExtraDetails?.filter(
                    notUndefinedOrNull
                ) || [];

            setCheckoutConfig(cartId, { ...config, ...options }, extraDetails);
        }
    });

    return {
        adyenCheckout,
        error,
        loading: loading || adyenLoading
    };
};
