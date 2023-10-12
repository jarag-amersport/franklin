import { getSignInToken, performMonolithGraphQLQuery } from '../commerce.js';

const redirectToSignin = () => {
  window.location = `/customer/account/login?login_redirect=${window.location.pathname}`;
};

const getWishlistsQuery = `
 query GetWishlists {
  customer {
    wishlists {
      id
      name
      items_count
      items_v2 {
        items {
          id
          product {
            uid
            name
            sku
          }
        }
      }
    }
  }
}
`;

const addProductToWishlistMutation = `
mutation(
  $wishlistId: ID!,
  $sku: String!
) {
  addProductsToWishlist(
    wishlistId: $wishlistId,
    wishlistItems: [
      {
        sku: $sku
        quantity: 1
      }
    ]
  ) {
    user_errors {
      code
      message
    }
    wishlist {
      name
    }
  }
}
`;

export async function getWishlists() {
  const token = getSignInToken(redirectToSignin);

  const wishlists = await performMonolithGraphQLQuery(
    getWishlistsQuery,
    {},
    true,
    token,
  );

  if (wishlists.errors?.find((error) => error.message === "The current customer isn't authorized.")) {
    redirectToSignin();
  }

  return wishlists.data?.customer?.wishlists;
}

export async function addToWishlist(product, wishlistId) {
  const toWishlist = wishlistId ?? (await getWishlists())[0].id;
  const token = getSignInToken(redirectToSignin);

  const response = await performMonolithGraphQLQuery(
    addProductToWishlistMutation,
    {
      wishlistId: toWishlist,
      sku: product,
    },
    false,
    token,
  );

  if (response.user_errors) {
    console.error(response.user_errors);
  } else {
    window.location = `/customer/wishlist?wishlist_id=${toWishlist}`;
  }
}
