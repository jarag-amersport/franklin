import { useAdyenCheckoutFlow } from './PaymentInformation/adyen/talons/useAdyenCheckoutFlow';

/**
 * Allow extending useCheckout to overwrite function of the hook
 *
 * @param origUseCheckout
 * @returns {function(*): *&{orderNumber: *, placeOrderLoading: boolean, clearCart: ((function(): Promise<void>)|*), orderDetailsLoading: boolean, handlePlaceOrder: ((function(): void)|*), adyenCheckoutAction: *, orderDetailsData: *}}
 */
export default function wrapUseCheckout(origUseCheckout) {
    return function (props) {
        const originalReturn = origUseCheckout(props);
        return { ...originalReturn, ...useAdyenCheckoutFlow(originalReturn) };
    };
}
