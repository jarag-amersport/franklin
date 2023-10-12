import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

export const useCheckoutStore = create((set, get) => ({
    loading: false,
    state: {},
    setCheckoutConfig: async (cartId, config, extraDetails) => {
        const {
            checkout,
            state: { config: oldConfig }
        } = get();
        if (checkout === undefined) {
            set(() => ({ loading: true }));
            const AdyenCheckout = await import('@adyen/adyen-web');
            const checkout = await AdyenCheckout.default(config);
            set(({ state }) => ({
                checkout,
                state: { ...state, cartId, config, extraDetails },
                loading: false
            }));
            return;
        }
        // TODO: use better compare function to see if adyen checkout needs to be rebuilt
        if (!shallow(oldConfig, config)) {
            set(() => ({ loading: true }));
            await checkout.update(config);
            set(({ state }) => ({
                state: { ...state, cartId, config, extraDetails },
                loading: false
            }));
        }
    },
    setPaymentMethod: (paymentMethod) => {
        const { paymentMethod: oldPaymentMethod, extraDetails } = get().state;
        if (oldPaymentMethod !== paymentMethod) {
            if (paymentMethod) {
                const details = extraDetails?.find(
                    (details) => details.type === paymentMethod.method
                );
                paymentMethod.extraDetailsConfig =
                    details?.configuration || undefined;
            }
            set(({ state }) => ({ state: { ...state, paymentMethod } }));
        }
    }
}));
