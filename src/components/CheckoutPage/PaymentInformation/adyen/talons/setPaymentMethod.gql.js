import { gql } from '@apollo/client';

export const SET_CARD_PAYMENT_METHOD_ON_CART = gql`
    mutation setAdyenCardPaymentOnCartWithAdditionalData(
        $cartId: String!
        $paymentMethod: String!
        $additionalDataCc: AdyenAdditionalDataCc
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: { 
                    code: $paymentMethod 
                    adyen_additional_data_cc: $additionalDataCc
                }
            }
        ) {
            cart {
                id
                selected_payment_method {
                    code
                    title
                }
            }
        }
    }
`;

export const SET_HPP_PAYMENT_METHOD_ON_CART_PAYPAL = gql`
    mutation setAdyenHppPaymentOnCartWithAdditionalData(
        $cartId: String!
        $paymentMethod: String!
        $additionalDataHpp: AdyenAdditionalDataHpp
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: { 
                    code: $paymentMethod 
                    adyen_additional_data_hpp: $additionalDataHpp
                }
            }
        ) {
            cart {
                id
                selected_payment_method {
                    code
                    title
                }
            }
        }
    }
`;

export default {
    setAdyenCardPaymentOnCartWithAdditionalData: SET_CARD_PAYMENT_METHOD_ON_CART,
    setAdyenHppPaymentOnCartWithAdditionalData: SET_HPP_PAYMENT_METHOD_ON_CART_PAYPAL
};
