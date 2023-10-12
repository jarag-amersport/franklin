import React from 'react';

import Price from '@magento/venia-ui/lib/components/Price';
import Spinner from '@magento/venia-ui/lib/components/LoadingIndicator';
import SimpleImage from '@magento/venia-ui/lib/components/Image/simpleImage';
import ProductOptions from '../../../components/ProductOptions/productOptions';

import classes from './ItemRow.module.css';

const ItemRow = props => {
    const { item, mobile, imageLoading, imageData } = props;
    const { product_name, product_sale_price, product_sku, product_url_key, quantity_ordered, selected_options } = item;

    const { currency, value } = product_sale_price;
    const price = currency && value !== null ? (
        <Price currencyCode={currency} value={value} />
    ) : (
        '-'
    );

    const parentSku = product_sku.split(' ').shift();
    const productLink = `/products/${product_url_key}/${parentSku}`;

    const thumbnailProps = {
        alt: product_name,
        width: 120
    };
    let thumbnailElem = <Spinner />;

    if (imageData) {
        const { thumbnail } = imageData;
        if (!imageLoading && thumbnailElem) {
            thumbnailElem = <SimpleImage {...thumbnailProps} src={thumbnail.url.replace('cdn.maidenform.com', 'franklin.maidenform.com/images/catalog')} />;
        }
        if (!imageLoading && !thumbnailElem) {
            thumbnailElem = <SimpleImage {...thumbnailProps} src="/product-images/placeholder.jpg" />;
        }
    }

    if (mobile) {
        return (
            <div className={classes.rootMobile}>
                <span className={classes.thumbnail}><strong>Product:</strong> {thumbnailElem}</span>
                <span>
                    <strong>Name:</strong> <a href={productLink} className={classes.productName} dangerouslySetInnerHTML={{ __html: product_name }} />
                    <ProductOptions options={selected_options} />
                </span>
                <span><strong>SKU:</strong> {product_sku}</span>
                <span><strong>Quantity:</strong> {quantity_ordered}</span>
                <span><strong>Subtotal:</strong> {price}</span>
            </div>
        );
    }

    return (
        <tr className={classes.root}>
            <td className={classes.thumbnail}>{thumbnailElem}</td>
            <td>
                <a href={productLink} className={classes.productName} dangerouslySetInnerHTML={{ __html: product_name }} />
                <ProductOptions options={selected_options} />
            </td>
            <td>{product_sku}</td>
            <td>{quantity_ordered}</td>
            <td>{price}</td>
        </tr>
    );
};

export default ItemRow;