import { gql } from '@apollo/client';

export const CREATE_CART = gql`
    # This mutation will return a masked cart id. If a bearer token is provided for
    # a logged in user it will return the cart id for that user.
    mutation createCart {
        cartId: createEmptyCart
    }
`;

export const PLACE_ORDER = gql`
    mutation placeOrder($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) {
            order {
                cart_id
                order_number
                adyen_payment_status {
                    isFinal
                    resultCode
                    additionalData
                    action
                }
            }
        }
    }
`;

export const ADYEN_PLACE_CARD_ORDER = gql`
    mutation setAdyenPaymentMethodAndPlaceOrder(
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
                selected_payment_method {
                    code
                    title
                }
            }
        }

        placeOrder(input: { cart_id: $cartId }) {
            order {
                order_number
                cart_id
                adyen_payment_status {
                    isFinal
                    resultCode
                    additionalData
                    action
                }
            }
        }
    }
`;

export const ADYEN_PLACE_HPP_ORDER = gql`
    mutation setAdyenPaymentMethodAndPlaceOrder(
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
                selected_payment_method {
                    code
                    title
                }
            }
        }
        placeOrder(input: { cart_id: $cartId }) {
            order {
                order_number
                cart_id
                adyen_payment_status {
                    isFinal
                    resultCode
                    additionalData
                    action
                }
            }
        }
    }
`;

export const GET_ORDER_DETAILS = gql`
    query getOrderDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            email
            total_quantity
            selected_payment_method {
                code
                title
            }
            shipping_addresses {
                firstname
                lastname
                street
                city
                region {
                    label
                }
                postcode
                country {
                    label
                }

                selected_shipping_method {
                    carrier_title
                    method_title
                }
            }
            prices {
                grand_total {
                    currency
                    value
                }
            }
            items {
                id
                quantity
                product {
                    id
                    sku
                    name
                    thumbnail {
                        url
                    }
                    ... on ConfigurableProduct {
                        variants {
                            attributes {
                                uid
                            }
                            product {
                                id
                                thumbnail {
                                    url
                                }
                            }
                        }
                    }
                }
                prices {
                    price {
                        currency
                        value
                    }
                }
                ... on ConfigurableCartItem {
                    configurable_options {
                        id
                        option_label
                        value_id
                        value_label
                    }
                }
            }
        }
    }
`;

export default {
    getOrderDetailsGql: GET_ORDER_DETAILS,
    setAdyenPlaceCardOrderGql: ADYEN_PLACE_CARD_ORDER,
    setAdyenPlaceHppOrderGql: ADYEN_PLACE_HPP_ORDER,
    setPlaceOrderGql: PLACE_ORDER,
    setCreateCartGql: CREATE_CART
};