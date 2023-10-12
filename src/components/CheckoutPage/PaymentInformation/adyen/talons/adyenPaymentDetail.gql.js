import { gql } from '@apollo/client';

export const GET_ADYEN_PAYMENT_DETAILS = gql`
    mutation adyenPaymentDetails($payload: String!, $cart_id: String!) {
        adyenPaymentDetails(payload: $payload, cart_id: $cart_id) {
            isFinal
            action
            additionalData
        }
    }
`;

export default {
    getAdyenPaymentDetails: GET_ADYEN_PAYMENT_DETAILS
};
