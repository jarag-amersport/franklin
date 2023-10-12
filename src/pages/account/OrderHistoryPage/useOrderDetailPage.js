import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryPage.gql';

const PAGE_SIZE = 1;

export const useOrderDetailPage = (props = {}) => {
    const number = props.number;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getCustomerOrdersQuery } = operations;

    const {
        data: orderData,
        error: getOrderError,
        loading
    } = useQuery(getCustomerOrdersQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            filter: {
                number: {
                    match: number
                }
            },
            pageSize: PAGE_SIZE
        }
    });

    console.log('orderData', orderData, loading, getOrderError);

    const order = orderData?.customer?.orders?.items?.length > 0 ? orderData.customer.orders.items[0] : null;

    const derivedErrorMessage = useMemo(
        () => deriveErrorMessage([getOrderError]),
        [getOrderError]
    );

    return {
        order,
        error: derivedErrorMessage,
        loading
    };
};
