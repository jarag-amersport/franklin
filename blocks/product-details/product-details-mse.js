async function extractProductInfo(product) {
  const { id, sku: SKU, name } = product;
  const priceTotal = product.priceRange?.maximum?.regular?.amount?.value;
  const currencyCode = product.priceRange?.maximum?.regular?.amount?.currency;
  const productImageUrl = product.productImages?.[0]?.url || '';
  const genderAttribute = product.attributes?.find((attribute) => attribute.name === 'gender');
  const gender = genderAttribute?.value || '';
  const localStorageData = localStorage.getItem('plpInteractionData');
  let plpInteractionData = {};

  if (localStorageData) {
    plpInteractionData = JSON.parse(localStorageData);

    if (plpInteractionData.categoryURL !== document.referrer) {
      plpInteractionData = {};
    } else {
      Object.keys(plpInteractionData.products).forEach((key) => {
        if (key === SKU) {
          plpInteractionData.productPosition = plpInteractionData.products[key].index + 1;
        }
      });
    }
  }

  return {
    productListItems: [
      {
        id,
        SKU,
        name,
        priceTotal,
        currencyCode,
        productImageUrl,
      },
    ],
    gender,
    plp: {
      categories: [],
      plpInteractionData,
    },
  };
}

export default extractProductInfo;
