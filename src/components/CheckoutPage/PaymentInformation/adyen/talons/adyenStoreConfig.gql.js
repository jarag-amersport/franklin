import { gql } from '@apollo/client';

export const AdyenConfigQuery = gql`
    query getAdyenStoreConfig {
        storeConfig {
            id
            locale
            adyen_demo_mode
            adyen_client_key_live
            adyen_client_key_test
        }
    }
`;
