const PRODUCT_DETAIL_QUERY = `query productDetailBySku($sku: String) {
  products(filter: { sku: { eq: $sku } }) {
    items {
      id
      uid
      name
      sku
      url_key
      __typename
      small_image {
        url
      }
      stock_status
      price_range {
        minimum_price {
          regular_price {
            currency
            value
          }
        }
      }
      ... on ConfigurableProduct {
        configurable_options {
          id
          attribute_code
          attribute_id
          uid
          label
          values {
            uid
            default_label
            label
            store_label
            use_default_value
            value_index
            swatch_data {
              ... on ImageSwatchData {
                thumbnail
              }
              value
            }
          }
        }
        variants {
          attributes {
            code
            uid
            value_index
          }
          product {
            uid
            media_gallery_entries {
              id
              disabled
              file
              label
              position
            }
            sku
            stock_status
          }
        }
      }
    }
  }
}`;

export async function performMonolithGraphQLQuery(graphQlEndpoint, query, variables) {
  const GRAPHQL_ENDPOINT = graphQlEndpoint;

  const headers = {
    'Content-Type': 'application/json',
    Store: 'maidenform_store_view',
  };

  let response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        operationName: 'productDetailBySku',
        query: query,
        variables,
      }),
    });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

const productsCache = {};
export async function getProduct(sku) {
    if (productsCache[sku]) {
      return productsCache[sku];
    }
    const rawProductPromise = performMonolithGraphQLQuery('https://franklin.maidenform.com/graphql', PRODUCT_DETAIL_QUERY, { sku });

    const productPromise = rawProductPromise.then((productData) => {
      if (!productData?.data?.products?.items?.[0]) {
        return null;
      }
  
      const product = productData?.data?.products?.items?.[0];
      product.prices = { price: product.price_range.minimum_price.regular_price }
      product.product = product;
  
      return product;
    });
  
    productsCache[sku] = productPromise;
    return productPromise;
  }