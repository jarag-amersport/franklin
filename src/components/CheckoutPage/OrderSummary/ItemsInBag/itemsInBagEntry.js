import React, { useMemo, Fragment, useEffect, useState } from 'react';
import { XCircle, PlusCircle, Trash2 } from 'react-feather';

import Price from '@magento/venia-ui/lib/components/Price';

import SimpleImage from '@magento/venia-ui/lib/components/Image/simpleImage';

import classes from './itemsInBagEntry.module.css';

import configuredVariant from '@magento/peregrine/lib/util/configuredVariant';
import ProductOptions from './productOptions';
import Image from '@magento/venia-ui/lib/components/Image';
import { useItem } from '@magento/peregrine/lib/talons/MiniCart/useItem';

const ItemsInBagEntry = props => {

    const [showDetails, setShowDetails] = useState(false)

    const {
        item,
        thumbnailSource,
        handleRemoveItem,
    } = props;

    const {
        product,
        prices,
        quantity,
        configurable_options,
        uid,
    } = item;

    const {
        name,
        thumbnail,
    } = product;

    const {
        price,
    } = prices;

    const configured_variant = configuredVariant(configurable_options, product);
    const quantityOption = {
        option_label: 'Qty',
        value_label: quantity.toString()
    };

    const { isDeleting, removeItem } = useItem({
        uid,
        handleRemoveItem
    });

    return (
        <Fragment>
            <div className={classes.item}>
                <Image
                    alt={product.name}
                    classes={{
                        image: classes.productImage
                    }}
                    width={100}
                    resource={
                        thumbnailSource === 'itself' &&
                        configured_variant
                            ? configured_variant.thumbnail.url
                            : thumbnail.url
                    }
                />
                <div className={classes.productInfo}>
                    <div className={classes.productName} dangerouslySetInnerHTML={{ __html: name }}></div>
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className={classes.toggleButton}
                    >
                        {showDetails ? <XCircle size="16" /> : <PlusCircle size="16" />}
                    </button>
                    {showDetails && (
                        <div className={classes.productDetails}>
                            <div className={classes.productPrice}>
                                <Price
                                    currencyCode={price.currency}
                                    value={price.value}
                                />
                            </div>
                            <ProductOptions
                                options={[quantityOption].concat(configurable_options)}
                            />
                            <button className={classes.deleteButton} onClick={removeItem} disabled={isDeleting}>
                                <Trash2 size={20}/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ItemsInBagEntry;
