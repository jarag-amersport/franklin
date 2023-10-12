import { gql } from '@apollo/client';
import { ProductListFragment } from './productListFragment.gql';

export const ItemsInBagFragment = gql`
    fragment ItemsInBagFragment on Cart {
        id
        total_quantity
        ...ProductListFragment
    }
    ${ProductListFragment}
`;
