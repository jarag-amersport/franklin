import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
    mutation CreateAccount(
        $email: String!
        $firstname: String!
        $lastname: String!
        $password: String!
        $is_subscribed: Boolean!
        $dateofbirth: String!
    ) {
        createCustomer(
            input: {
                date_of_birth: $dateofbirth
                email: $email
                firstname: $firstname
                lastname: $lastname
                password: $password
                is_subscribed: $is_subscribed
            }
        ) {
            # The createCustomer mutation returns a non-nullable CustomerOutput type
            # which requires that at least one of the sub fields be returned.

            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            customer {
                email
            }
        }
    }
`;
