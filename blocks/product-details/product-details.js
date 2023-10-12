import {
  Component, Fragment, h, render,
} from '../../scripts/preact.js';

import htm from '../../scripts/htm.js';
import Carousel from './ProductDetailsCarousel.js';
import Sidebar from './ProductDetailsSidebar.js';
// Import here to preload script
// eslint-disable-next-line no-unused-vars
import ProductDetailsShimmer from './ProductDetailsShimmer.js';
import {
  getAmastyLabels,
  getProduct,
  getProductRatings,
  getSkuFromUrl,
  getUrlKeyFromUrl,
  performCatalogServiceQuery,
  performMonolithGraphQLQuery,
  productStockQuery,
  refineProductQuery,
} from '../../scripts/commerce.js';
import extractProductInfo from './product-details-mse.js';

const html = htm.bind(h);

export function errorGettingProduct(code = 404) {
  fetch(`/${code}.html`).then((response) => {
    if (response.ok) {
      return response.text();
    }
    throw new Error(`Error getting ${code} page`);
  }).then((htmlText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
    document.head.innerHTML = doc.head.innerHTML;
  });
  document.body.innerHTML = '';
}

async function getVariantDetails(variantIds, sku) {
  const result = await performCatalogServiceQuery(
    refineProductQuery,
    {
      sku,
      variantIds,
    },
  );
  return {
    images: result.refineProduct?.images,
    price: result.refineProduct?.price,
  };
}

function sortImages(images) {
  // Sort images alphabetically
  const sortedImages = images.sort((a, b) => a.url.localeCompare(b.url));
  // window.diffString = sortedImages.map((i) => i.url).join(' ');

  // Check if there is an image with role "thumbnail"
  const thumbnailIndex = sortedImages.findIndex((image) => image.roles.includes('thumbnail'));
  // If a thumbnail image exists, ensure it is in first place
  if (thumbnailIndex >= 0) {
    return [
      sortedImages[thumbnailIndex],
      ...sortedImages.slice(0, thumbnailIndex),
      ...sortedImages.slice(thumbnailIndex + 1),
    ];
  }
  return sortedImages;
}

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onQuantityChanged = this.onQuantityChanged.bind(this);
    this.getInStockProducts = this.getInStockProducts.bind(this);
    this.onAddToWishlist = this.onAddToWishlist.bind(this);
  }

  // Returns a map. Keys to the map are option type ids. Values are arrays of in-stock variant ids,
  // given the other options that are selected.
  async getInStockProducts() {
    const { data: result } = await performMonolithGraphQLQuery(productStockQuery, {
      urlKey: getUrlKeyFromUrl(),
    });
    const product = result?.products?.items?.[0];

    if (!product) {
      errorGettingProduct(500);
      return {};
    }

    const inStockVariants = product.variants
      .map((variant) => variant.attributes
        .reduce((acc, curr) => ({ ...acc, [curr.code]: { label: curr.label, id: curr.uid } }), {}));

    // for each option, store the in-stock products given all the other options that are selected
    const options = this.state.product.options.reduce((acc, curOption) => {
      const inStockVariantsForOption = inStockVariants
        .filter((variant) => Object.keys(this.state.selection)
          .filter((selectionType) => selectionType !== curOption.id)
          .reduce((inStockSoFar, curr) => inStockSoFar
            && this.state.selection[curr]?.id === variant[curr]?.id, true));
      return {
        ...acc,
        [curOption.id]: [
          ...new Set(inStockVariantsForOption.map((variant) => variant[curOption.id].id))],
      };
    }, {});
    return [product.id, options];
  }

  async componentDidMount() {
    const product = await getProduct(getSkuFromUrl());

    if (!product) {
      errorGettingProduct();
    }

    const selection = {
      color: product.options
        .find((option) => option.id === 'color')
        .values.sort((a, b) => (a.title < b.title ? -1 : 1))[0],
    };

    this.setState({
      product,
      loading: false,
      selection,
    });

    this.getInStockProducts().then(([numId, inStockVariants]) => this.setState((oldState) => ({
      product: {
        ...oldState.product,
        numId,
      },
      inStockVariants,
    })));
    getProductRatings(getSkuFromUrl()).then((result) => {
      this.setState((oldState) => ({ product: { ...oldState.product, reviewStats: result } }));
    });
    const variantIds = Object.values(selection)
      .map((s) => s.id);
    getVariantDetails(variantIds, getSkuFromUrl()).then(({ images, price }) => {
      this.setState((oldState) => ({
        product: {
          ...oldState.product,
          // oldState contains thumbnail image from franklin already, keep using that as 1st image
          productImages: [...oldState.product.productImages, ...sortImages(images).slice(1)],
          price,
        },
      }));
    });
    const productInfo = await extractProductInfo(product);
    try {
      localStorage.setItem('productInfo', JSON.stringify(productInfo));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  onAddToCart = async () => {
    if (Object.keys(this.state.selection).length === this.state.product.options.length) {
      const optionsUIDs = Object.values(this.state.selection).map((option) => option.id);
      console.log({
        sku: getSkuFromUrl(), optionsUIDs, quantity: this.state.selectedQuantity ?? 1,
      });
      const { cartApi } = await import('../../scripts/cart/init-cart.js');
      cartApi.addToCart(getSkuFromUrl(), optionsUIDs, this.state.selectedQuantity ?? 1, 'pdp');
    }
  };

  // eslint-disable-next-line class-methods-use-this
  onAddToWishlist = async () => {
    const wishlistApi = await import('../../scripts/wishlist/api.js');

    const wishlists = await wishlistApi.getWishlists();

    if (wishlists.length > 1) {
      const showWishlistModal = await import('../../scripts/wishlist/wishlist-modal.js');
      showWishlistModal.default(
        wishlists,
        (selectedWishlist) => wishlistApi.addToWishlist(getSkuFromUrl(), selectedWishlist),
      );
    } else {
      wishlistApi.addToWishlist(getSkuFromUrl(), null);
    }
  };

  onQuantityChanged = (quantity) => {
    this.setState({ selectedQuantity: quantity });
  };

  onSelectionChanged = (fragment) => {
    // update selection value
    this.setState((oldState) => ({
      selection: {
        ...oldState.selection,
        ...fragment,
      },
    }));

    this.getInStockProducts().then(([numId, inStockVariants]) => this.setState((oldState) => ({
      product: {
        ...oldState.product,
        numId,
      },
      inStockVariants,
    })));

    // fetch new images and prices
    const variantIds = Object.values({ ...this.state.selection, ...fragment })
      .map((selection) => selection.id);
    getVariantDetails(variantIds, getSkuFromUrl()).then(({ images, price }) => {
      this.setState((oldState) => ({
        product: {
          ...oldState.product,
          productImages: sortImages(images),
          price,
        },
      }));
    });
  };

  async componentDidUpdate() {
    if (this.state.product?.numId && !this.state.product.amasty) {
      const [amasty] = await getAmastyLabels([this.state.product.numId]);
      if (!amasty) {
        return;
      }
      this.setState((oldState) => ({
        product: {
          ...oldState.product,
          amasty,
        },
      }));
    }
  }

  render() {
    if (this.state.loading) {
      return html`<${ProductDetailsShimmer} />`;
    }

    return html`
      <${Fragment} >
          <${Carousel} product=${this.state.product} />
          <${Sidebar}
                  product=${this.state.product}
                  selection=${this.state.selection}
                  onSelectionChanged=${this.onSelectionChanged}
                  onAddToCart=${this.onAddToCart}
                  onAddToWishlist=${this.onAddToWishlist}
                  onQuantityChanged=${this.onQuantityChanged}
                  inStockVariants=${this.state.inStockVariants}
          />
          <div class="product-detail-description">
              <h3>PRODUCT DETAILS</h3>
              <div dangerouslySetInnerHTML=${{ __html: this.state.product.description }}></div>
          </div>
      <//>
    `;
  }
}

export default async function decorate($block) {
  $block.innerHTML = '<div class="full-height"></div>';

  const sku = getSkuFromUrl();
  if (!sku) {
    errorGettingProduct();
  }

  const app = html`<${ProductDetailPage} sku=${sku} />`;

  render(app, $block);
}
