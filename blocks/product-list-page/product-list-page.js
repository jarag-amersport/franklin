import {
  h, Component, Fragment, render, createRef,
} from '../../scripts/preact.js';
import htm from '../../scripts/htm.js';
import ProductList from './ProductList.js';
import FacetList from './FacetList.js';
import { readBlockConfig } from '../../scripts/lib-franklin.js';
import {
  loadCategory,
  getProductRatings,
  parseQueryParams,
  getAmastyLabels,
  ALLOWED_FILTER_PARAMETERS,
  getMagentoStorefrontEvents,
  loadCategoryInfo,
} from '../../scripts/commerce.js';
import savePlpInteractionData from './product-list-mse-helper.js';

const html = htm.bind(h);

function Pagination(props) {
  if (props.loading) {
    return html`<div class="pagination shimmer"></div>`;
  }

  return html`<div class="pagination">
    <div>
      <label for="select-pagesize">Show:</label>
      <select id="select-pagesize" name="pageSize" value=${props.currentPageSize} onChange=${(e) => props.onPageSizeChange?.(parseInt(e.target.value, 10))}>
        ${props.pageSizeOptions.map((size) => html`<option value=${size}>${size} Items</option>`)}
      </select>
    </div>
    <div>
      <label for="select-page">Page:</label>
      <select id="select-page" name="page" value=${props.currentPage} onChange=${(e) => props.onPageChange?.(parseInt(e.target.value, 10))}>
        ${Array(props.pages).fill(0).map((_, i) => html`<option value=${i + 1}>${i + 1}</option>`)}
      </select>
      <span>of ${props.pages}</span>
    </div>
    <div>
      ${props.currentPage > 1 ? html`<button class="previous" onClick=${() => props.onPageChange?.(props.currentPage - 1)}>Previous</button>` : ''}
      ${props.currentPage < props.pages ? html`<button class="next" onClick=${() => props.onPageChange?.(props.currentPage + 1)}>Next</button>` : ''}
    </div>
  </div>`;
}

function Sort(props) {
  const {
    type, disabled, sortMenuRef, onSort,
  } = props;
  const options = [
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Product Name', value: 'name-asc' },
    { label: 'Relevance', value: type === 'category' ? 'position-asc' : 'relevance-desc' },
  ];

  const currentSort = options.find((option) => option.value === `${props.currentSort}-${props.sortDirection}`) || options[3];

  return html`<div class="sort" disabled=${disabled}>
    <button disabled=${disabled}>Sort By: ${currentSort.label}</button>
    <div class="overlay" ref=${sortMenuRef}>
      <button class="close" onClick=${() => sortMenuRef.current.classList.toggle('active')}>Close</button>
      <ul>
        ${options.map((option) => html`<li>
          <a href="#" class="${currentSort.value === option.value ? 'active' : ''}" onClick=${(e) => {
  sortMenuRef.current.classList.toggle('active');
  const [sort, direction = 'asc'] = option.value.split('-');
  onSort?.(sort, direction);
  e.preventDefault();
}}>${option.label}</a>
        </li>`)}
      </ul>
    </div>
  </div>`;
}

class ProductListPage extends Component {
  constructor(props) {
    const { type = 'category', category } = props;
    super();

    this.facetMenuRef = createRef();
    this.sortMenuRef = createRef();

    const queryParams = parseQueryParams();
    const isMobile = window.matchMedia('only screen and (max-width: 900px)').matches;

    let headline = 'Search Results';
    let sort = 'relevance';
    let sortDirection = 'desc';
    const defaultPageSize = isMobile ? 10 : 12;
    if (type === 'category') {
      // Get from H1
      headline = document.querySelector('.default-content-wrapper > h1')?.innerText;
      sort = 'position';
      sortDirection = 'asc';
    }

    this.state = {
      loading: true,
      pages: 1,
      currentPage: 1,
      basePageSize: defaultPageSize,
      currentPageSize: defaultPageSize,
      type,
      category: {
        name: headline,
        id: category || null,
      },
      sort,
      sortDirection,
      products: {
        items: [],
        total: 0,
      },
      filters: {},
      facets: [],
      ...queryParams,
    };
  }

  setStatePromise(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  static updateQueryParams = (params) => {
    const newParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (!ALLOWED_FILTER_PARAMETERS.includes(key)) {
        return;
      }

      if (Array.isArray(params[key]) && params[key].length > 0) {
        newParams.set(key, params[key].join(','));
      } else if (!Array.isArray(params[key]) && params[key]) {
        newParams.set(key, params[key]);
      }
    });

    // Keep existing params that do not interfere with the search
    const curentParams = new URLSearchParams(window.location.search);
    curentParams.forEach((value, key) => {
      if (!ALLOWED_FILTER_PARAMETERS.includes(key)) {
        newParams.set(key, value);
      }
    });

    window.history.pushState({}, '', `${window.location.pathname}?${newParams.toString()}`);
  };

  static loadProductRatings = async (items) => {
    const skus = items.map((product) => product.sku);
    const ratings = await getProductRatings(skus);

    return items.map((p) => ({
      sku: p.sku,
      rating: {
        average: ratings[p.sku]?.average ?? 0,
        count: ratings[p.sku]?.count ?? 0,
      },
    }));
  };

  static loadAmastyLabels = async (items) => {
    const ids = items.map((product) => product.id);
    const labels = await getAmastyLabels(ids);
    return items.map((p) => ({
      id: p.id,
      amasty: labels.find((label) => label.product_id === p.id),
    }));
  };

  loadAdditionalProductData = async () => {
    const { items } = this.state.products;

    // Load label and ratings in parallel
    let ratings = ProductListPage.loadProductRatings(items);
    let labels = ProductListPage.loadAmastyLabels(items);
    ([ratings, labels] = await Promise.all([ratings, labels]));

    // Combine and add to product list
    const newItems = items.map((p) => ({
      ...p,
      rating: ratings.find((r) => r.sku === p.sku)?.rating,
      amasty: labels.find((l) => l.id === p.id)?.amasty,
    }));

    this.setState({ products: { ...this.state.products, items: newItems } });

    loadCategoryInfo(window.location, document.referrer).then((categoryInfo) => {
      getMagentoStorefrontEvents((mse) => {
        mse.context.setCategory(categoryInfo);
        mse.publish.pageView();
      });
    });
  };

  loadState = async (state) => {
    await this.setStatePromise({ ...state, loading: false });
    if (this.state && this.state.products) {
      savePlpInteractionData(this.state);
    }
    this.props.resolve();
    setTimeout(() => this.loadAdditionalProductData(), 2500);
  };

  loadProducts = async () => {
    this.setState({ loading: true });

    const state = await loadCategory(this.state);
    await this.loadState(state);
  };

  async componentDidMount() {
    if (window.loadCategoryPromise) {
      const state = await window.loadCategoryPromise;
      await this.loadState(state);
    } else {
      await this.loadProducts();
    }
  }

  componentDidUpdate(_, prevState) {
    // Update URL
    ProductListPage.updateQueryParams({
      page: this.state.currentPage,
      basePageSize: this.state.basePageSize,
      pageSize: this.state.currentPageSize,
      sort: this.state.sort,
      sortDirection: this.state.sortDirection,
      q: this.state.searchTerm,
      ...this.state.filters,
    });

    // Load new products if filters, pagination or sort have changed
    const diff = Object.keys(Object.keys(prevState).reduce((acc, key) => {
      if (prevState[key] !== this.state[key]) {
        acc[key] = this.state[key];
      }
      return acc;
    }, {}));

    const keysToCheck = ['filters', 'sort', 'sortDirection', 'searchTerm', 'currentPageSize', 'currentPage'];
    if (keysToCheck.some((key) => diff.includes(key))) {
      this.loadProducts();
    }
  }

  render(props, state) {
    const { type = 'category' } = props;

    return html`<${Fragment}>
    <${FacetList} 
      facets=${state.facets}
      filters=${state.filters}
      facetMenuRef=${this.facetMenuRef}
      onFilterChange=${(filters) => this.setState({ filters, currentPage: 1 })}
      loading=${state.loading} />
    <div class="products">
      <div class="title">
        <h1>${state.category.name}</h1>
        ${!state.loading && html`<span>(${state.products.total} ${state.products.total === 1 ? 'Product' : 'Products'})</span>`}
        <${Sort}
          disabled=${state.loading}
          currentSort=${state.sort}
          sortDirection=${state.sortDirection}
          type=${type}
          onSort=${(sort, direction) => this.setState({ sort, sortDirection: direction })}
          sortMenuRef=${this.sortMenuRef} />
      </div>
      <div class="mobile-menu">
        <button disabled=${state.loading} id="toggle-filters" onClick=${() => this.facetMenuRef.current.classList.toggle('active')}>Filters</button>
        <button disabled=${state.loading} id="toggle-sortby" onClick=${() => this.sortMenuRef.current.classList.toggle('active')}>Sort By</button>
      </div>
      <${ProductList} products=${state.products} disruptors=${state.disruptors} loading=${state.loading} currentPageSize=${state.currentPageSize} />
      <${Pagination}
        pages=${state.pages}
        currentPage=${state.currentPage}
        pageSizeOptions=${[state.basePageSize, 20, 28, 36]}
        currentPageSize=${state.currentPageSize}
        loading=${state.loading}
        onPageChange=${(page) => this.setState({ currentPage: page })}
        onPageSizeChange=${(pageSize) => this.setState({ currentPageSize: pageSize, currentPage: 1 })} />
    </div>
  </>`;
  }
}

export default function decorate(block) {
  const config = readBlockConfig(block);

  // Will hold the React Component that generate the dialog
  document.body.appendChild(document.createRange().createContextualFragment('<div id="my-mini-cart"></div>'));
  // Required to load the PWA Dialog
  document.body.appendChild(document.createRange().createContextualFragment('<div id="pwa-dialog-root"></div>'));

  document.querySelector('#my-mini-cart').addEventListener('addToCart', async (event) => {
    const {
      sku, options, quantity, unmount,
    } = event.detail;
    const { cartApi } = await import('../../scripts/cart/init-cart.js');
    await cartApi.addToCart(sku, options, quantity, 'quickview');
    unmount();
  });

  block.textContent = '';

  return new Promise((resolve) => {
    const app = html`<${ProductListPage} ...${config} resolve=${resolve} />`;
    render(app, block);
  });
}
