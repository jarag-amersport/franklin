import { useEffect } from 'react';
import { clearCartDataFromCache } from '@magento/peregrine/lib/Apollo/clearCartDataFromCache';
import { useApolloClient } from '@apollo/client';

export default (useCartPage) => function useMaidenformCart(props) {
  const apolloClient = useApolloClient();
  useEffect(() => {
    // TODO only clear this cart data if the minicart performed a mutation - store in session storage?
    clearCartDataFromCache(apolloClient);
  }, []);
  const result = useCartPage(props);
  return result;
};
