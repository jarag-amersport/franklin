import { gql } from '@apollo/client';

/**
 * Fetch all available adyen payment methods
 */
export const GET_ADYEN_PAYMENT_METHODS = gql`
    query adyenPaymentMethods($cart_id: String!) {
        storeConfig {
            id
            locale
            adyen_demo_mode
            adyen_client_key_live
            adyen_client_key_test
            adyen_holder_name_required
            adyen_has_holder_name
        }
        adyenPaymentMethods(cart_id: $cart_id) {
            paymentMethodsResponse {
                paymentMethods {
                    name
                    type
                    brand
                    brands
                    configuration {
                        merchantId
                        merchantName
                    }
                    details {
                        key
                        type
                        items {
                            id
                            name
                        }
                        optional
                        value
                    }
                    issuers {
                        id
                        name
                    }
                }
                storedPaymentMethods {
                    id
                    brand
                    expiryMonth
                    expiryYear
                    holderName
                    lastFour
                    name
                    networkTxReference
                    supportedShopperInteractions
                    type
                }
            }
            paymentMethodsExtraDetails {
                type
                icon {
                    url
                    width
                    height
                }
                isOpenInvoice
                configuration {
                    amount {
                        currency
                        value
                    }
                    currency
                }
            }
        }
    }
`;

export default {
    getAdyenPaymentMethods: GET_ADYEN_PAYMENT_METHODS
};
