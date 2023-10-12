import {
  getMagentoStorefrontEvents,
} from '../../scripts/commerce.js';

function savePlpInteractionData(state) {
  if (!state || !state.products) {
    console.log('No state to save to Interaction data');
    return;
  }

  const {
    products,
    filters,
    pages,
    currentPage,
    basePageSize,
    pageSize,
    type,
    category,
    sort,
    sortDirection,
  } = state;

  const productMap = products.items.reduce((acc, item, index) => ({
    ...acc,
    [item.sku]: {
      index,
      productid: item.id,
    },
  }), {});

  const refinementType = [];
  const refinementValue = [];

  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      refinementType.push(key);
      refinementValue.push(`${key}:[${values.join(',')}]`);
    });
  }

  const extractedData = {
    categoryURL: window.location.href,
    pages,
    pagination: currentPage,
    basePageSize,
    currentPageSize: pageSize,
    showItems: pageSize,
    type,
    refinementCategory: type,
    refinementType: refinementType.join('|'),
    refinementValue: refinementValue.join('|'),
    category,
    sort,
    sortDirection,
    sortType: `${sort}|${sortDirection}`,
    products: productMap,
    filters: filters || {},
  };

  try {
    localStorage.setItem('plpInteractionData', JSON.stringify(extractedData));
    getMagentoStorefrontEvents((mse) => {
      mse.publish.custom({
        eventType: 'web.webinteraction.listingFilters',
        plp: extractedData,
      });
    });
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

export default savePlpInteractionData;
