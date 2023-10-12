import React, { useCallback, useEffect, useRef } from 'react';
import { useAdyenCheckout } from '../talons/checkoutStore/useAdyenCheckout';
import { useCheckoutStore } from '../talons/checkoutStore/useCheckoutStore';

const useAdyenPaypalButton = (props) => {
  const { handlePlaceOrder, handlePaypalAdditionalData, orderNumber } = props;
  const { adyenCheckout } = useAdyenCheckout();
  const { state : checkoutState } = useCheckoutStore();
  const paypalButtonRefWrapper = useRef();
  const currentOrderNumber = useRef();

  useEffect(() => {
    if (orderNumber) {
      currentOrderNumber.current = orderNumber;
    }
  }, [orderNumber]);

  // Careful, while this is in a useCallback, the values are actually never updated. So use refs if you need to access
  // current values
  const paypalButtonRef = useCallback((node) => {
    // Get PayPal config from store
    const paypalConfig = checkoutState?.config?.paymentMethodsResponse?.paymentMethods?.find(p => p.type === 'paypal')?.configuration || {};
    if (!paypalConfig) {
        console.error('No paypal config found');
        return;
    }

    const config = {
      style: {
        layout: "horizontal",
        color: "gold"
      },
      showPayButton: true,
      merchantId: paypalConfig.merchantId,
      configuration: {
          merchantId: paypalConfig.merchantId,
      },
      intent: "authorize",
      // NOOP since this is not allowed
      onShippingChange: (data, actions) => {},
      onInit: (data, actions) => actions.enable(),
      onSubmit: (state, component) => handlePlaceOrder(state, component),
      onError: (error) => {
        console.error('Payment failed', error);
        window.location = '/checkout?paymentError';
      },
      onAdditionalDetails: (state) => handlePaypalAdditionalData(state, currentOrderNumber.current),
      blockPayPalCreditButton: true,
      blockPayPalPayLaterButton: false,
    };

    if (adyenCheckout && Boolean(node)) {
      paypalButtonRefWrapper.current = adyenCheckout
        .create('paypal', config)
        .mount(node);
    }
  }, [adyenCheckout, handlePlaceOrder, handlePaypalAdditionalData])

  useEffect(() => () => {
    if (paypalButtonRefWrapper.current) {
      paypalButtonRefWrapper.current?.remove();
      paypalButtonRefWrapper.current = undefined;
    }
  }, []);

  return {
    paypalButtonRef
  }
}

export default useAdyenPaypalButton;
