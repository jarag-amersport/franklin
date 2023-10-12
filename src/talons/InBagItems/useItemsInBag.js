import { useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import DEFAULT_OPERATIONS from './itemsInBag.gql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

export const useItemsInBag = (props) => {
    const { itemsInCart } = props;
    const [, { dispatch }] = useEventingContext();

    const {
        removeItemMutation,
        getStoreConfigQuery
    } = DEFAULT_OPERATIONS;

    const [{ cartId }] = useCartContext();

    const { data: storeConfigData } = useQuery(getStoreConfigQuery, {
        fetchPolicy: 'cache-and-network'
    });

    const configurableThumbnailSource = useMemo(() => {
        if (storeConfigData) {
            return storeConfigData.storeConfig.configurable_thumbnail_source;
        }
    }, [storeConfigData]);

    const [
        removeItem,
        {
            loading: removeItemLoading,
            called: removeItemCalled
        }
    ] = useMutation(removeItemMutation);

    const handleRemoveItem = useCallback(
        async id => {
            try {
                await removeItem({
                    variables: {
                        cartId,
                        itemId: id
                    }
                });

                const [product] = itemsInCart.filter(
                    p => (p.uid || p.id) === id
                );

                const selectedOptionsLabels =
                    product.configurable_options?.map(
                        ({ option_label, value_label }) => ({
                            attribute: option_label,
                            value: value_label
                        })
                    ) || null;

                dispatch({
                    type: 'CART_REMOVE_ITEM',
                    payload: {
                        cartId,
                        sku: product.product.sku,
                        name: product.product.name,
                        priceTotal: product.prices.price.value,
                        currencyCode: product.prices.price.currency,
                        discountAmount:
                        product.prices.total_item_discount.value,
                        selectedOptions: selectedOptionsLabels,
                        quantity: product.quantity
                    }
                });
            } catch (e) {
                // Error is logged by apollo link - no need to double log.
            }
        },
        [removeItem, cartId, dispatch, itemsInCart]
    );

    return {
        loading: (removeItemCalled && removeItemLoading),
        configurableThumbnailSource,
        handleRemoveItem,
    };
};
