import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { useMutation } from '@apollo/client';

import operations from '../../components/CheckoutPage/PaymentInformation/adyen/talons/adyenPaymentDetail.gql';
import { handleError, useLocalStorage } from '../../components/CheckoutPage/PaymentInformation/adyen/util';
import OrderConfirmationPage from "../../pages/checkout/confirmation/orderConfirmationPage";


const Result = () => {
    const { formatMessage } = useIntl();
    const [orderId, setOrderId] = useState(null);

    const searchParams = new URLSearchParams(window.location.search);
    const merchantReference = searchParams.get('merchantReference');
    const redirectResult = searchParams.get('redirectResult');
    const [lastCartId, setLastCartId] = useLocalStorage(
        'paymentRef',
        null
    );

    // error handler for this hooks
    const catchError = useCallback(
        (error) => {
            setLastCartId(null);
            handleError(error);
            window.location = '/checkout';
        },
        [history, setLastCartId]
    );

    const [getPaymentDetails] = useMutation(operations.getAdyenPaymentDetails,{
        onError: catchError,
        onCompleted: ({ adyenPaymentDetails }) => {
            if (adyenPaymentDetails?.isFinal) {
                setLastCartId(null);
                setOrderId(merchantReference);
            } else {
                handleError(
                    new Error('Valid status returned from adyen'),
                    formatMessage({
                        id: 'adyen.creditFormError',
                        defaultMessage:
                            'Your entered Credit Card information is not valid'
                    })
                );
                // Return to checkout so the user can start again
                window.location = '/checkout?error=creditFormError';
            }
        }
    });

    useEffect(() => {
        if (!merchantReference || !redirectResult) {
            window.location = '/checkout'
            return;
        }

        const payload = JSON.stringify({
            orderId: merchantReference,
            details: {
                redirectResult
            }
        });

        if (lastCartId && payload) {
            getPaymentDetails({
                variables: {
                    payload: payload,
                    cart_id: lastCartId
                }
            });
        }
    }, [
        getPaymentDetails,
        history,
        lastCartId,
        merchantReference,
        redirectResult
    ]);

    if (orderId) {
        return <OrderConfirmationPage orderNumber={orderId} />;
    }
    return null;
};

export default Result;
