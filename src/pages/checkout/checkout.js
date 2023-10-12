import React from 'react';
import CheckoutPage from '../../components/CheckoutPage/checkoutPage.js';
import { CheckoutProvider } from '../../components/CheckoutPage/paymentContext.js';;
import '../../index.css';

const CheckoutWrapper = () => {
    return (
        <CheckoutProvider>
            <CheckoutPage />
        </CheckoutProvider>
    );
};

export default CheckoutWrapper;
