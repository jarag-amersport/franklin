import { gql } from '@apollo/client';
import AccountInformationPageOperations from '@magento/venia-ui/lib/components/AccountInformationPage/accountInformationPage.gql.js';


const AccountInformationPageFragment = gql`
    fragment AccountInformationPageFragment on Customer {
        id
        firstname
        lastname
        email
        allow_remote_shopping_assistance
    }
`;


export const SET_CUSTOMER_INFORMATION = gql`
    mutation SetCustomerInformation($customerInput: CustomerUpdateInput!) {
        updateCustomerV2(input: $customerInput) {
            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            customer {
                ...AccountInformationPageFragment
            }
        }
    }
    ${AccountInformationPageFragment}
`;

export const SET_CUSTOMER_EMAIL = gql`
    mutation SetCustomerEmail($email: String!, $password: String!) {
        updateCustomerEmail(email: $email, password: $password) {
            customer {
                ...AccountInformationPageFragment
            }
        }
    }
    ${AccountInformationPageFragment}
`;

export const GET_CUSTOMER_INFORMATION = gql`
    query GetCustomerInformation {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        customer {
            ...AccountInformationPageFragment
        }
    }
    ${AccountInformationPageFragment}
`;

export default {
    mutations: {
        setCustomerInformationMutation: SET_CUSTOMER_INFORMATION,
        setCustomerEmailMutation: SET_CUSTOMER_EMAIL,
        changeCustomerPasswordMutation: AccountInformationPageOperations.mutations.changeCustomerPasswordMutation
    },
    queries: {
        getCustomerInformationQuery: GET_CUSTOMER_INFORMATION
    }
};
