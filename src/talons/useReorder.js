import { gql, useMutation } from '@apollo/client';
import { useToasts } from '@magento/peregrine/lib/Toasts';

export const useReorder = () => {
    const [, { addToast }] = useToasts();
    const [
        reorderOrder,
        { 
            error: reorderOrderError,
            loading: isLoading
        }
    ] = useMutation(REORDER_ORDER_MUTATION);

    const reorder = async (orderId) => {
        const { waitForCart } = await import(/* webpackIgnore: true */ '/scripts/cart/api.js');
        const done = waitForCart();
        const { data } = await reorderOrder({ variables: { orderNumber: orderId } });

        const userInputErrors = data?.reorderItems?.userInputErrors || [];
        if (reorderOrderError || userInputErrors.length > 0) {
            const message = userInputErrors.map(error => error.message).join(', ') || reorderOrderError;
            addToast({
                type: 'error',
                message,
                dismissable: true,
                timeout: 10000
            });
            console.error('Error while reordering', reorderOrderError, userInputErrors);
            return;
        }

        // Redirect to cart page
        done();
        window.location = '/checkout/cart';
    }

    return {
        reorder,
        isLoading
    }
};

const REORDER_ORDER_MUTATION = gql`
    mutation ReorderOrder($orderNumber: String!) {
        reorderItems(orderNumber: $orderNumber) {
            cart {
                id
            }
            userInputErrors {
                code
                message
                path
            }
        }
    }
`;