import { gql } from '@apollo/client';
import { CartPageFragment } from '@magento/peregrine/lib/talons/CartPage/cartPageFragments.gql.js';
import { ItemsInBagFragment } from './itemsInBagFragment.gql';

export const ITEMS_IN_BAG_QUERY = gql`
    query ItemsInBagQuery($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...ItemsInBagFragment
        }
    }
    ${ItemsInBagFragment}
`;

export const REMOVE_ITEM_MUTATION = gql`
    mutation RemoveItemForItemsInBag($cartId: String!, $itemId: ID!) {
        removeItemFromCart(
            input: { cart_id: $cartId, cart_item_uid: $itemId }
        ) {
            cart {
                id
                ...ItemsInBagFragment
                ...CartPageFragment
            }
        }
    }
    ${ItemsInBagFragment}
    ${CartPageFragment}
`;

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigForItemsInBag {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        storeConfig {
            store_code
            product_url_suffix
            configurable_thumbnail_source
        }
    }
`;

export default {
    itemsInBagQuery: ITEMS_IN_BAG_QUERY,
    removeItemMutation: REMOVE_ITEM_MUTATION,
    getStoreConfigQuery: GET_STORE_CONFIG_DATA
};
