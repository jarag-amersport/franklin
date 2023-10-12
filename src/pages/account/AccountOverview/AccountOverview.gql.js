import { gql } from '@apollo/client';

export const GET_CUSTOMER = gql`query GetCustomerInformation {
    customer {
        allow_remote_shopping_assistance
        created_at
        email
        firstname
        gender
        lastname
        middlename
        prefix
    }
}`;
