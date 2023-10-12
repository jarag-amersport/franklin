import { gql, useMutation } from '@apollo/client';
import { useToasts } from '@magento/peregrine/lib/Toasts';

export const useCancelOrder = () => {
    const [, { addToast }] = useToasts();

    const [cancelOrder, {
            error: cancelOrderError,
            loading: isLoading
        }
    ] = useMutation(CANCEL_ORDER_MUTATION);

    const cancel = async (orderId) => {
        // orderId is a UID, so we need to base64 decode it to get the int
        orderId = parseInt(Buffer.from(orderId, 'base64').toString());

        let error;
        try {
            await cancelOrder({ variables: { orderId } });
        } catch(err) {
            error = err;
        }
        
        if (cancelOrderError || error) {
            addToast({
                type: 'error',
                message: String(cancelOrderError || error.message),
                dismissable: true,
                timeout: 10000
            });
            return;
        }

        // Reload page
        addToast({
            type: 'info',
            message: 'Order cancelled',
            dismissable: true,
            timeout: 10000
        })
        window.location.reload();
    };

    return {
        cancel,
        isLoading
    }
};

const CANCEL_ORDER_MUTATION = gql`
    mutation CancelOrder($orderId: Int!) {
        cancelOrder(orderId: $orderId) {
            status
        }
    }
`;