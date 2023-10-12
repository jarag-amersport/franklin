import React, { useMemo, Fragment, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { Heart } from 'react-feather';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useProduct } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProduct';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Price from '@magento/venia-ui/lib/components/Price';

import Icon from '@magento/venia-ui/lib/components/Icon';
import SimpleImage from '@magento/venia-ui/lib/components/Image/simpleImage';
import ProductOptions from './productOptions';
import Section from '@magento/venia-ui/lib/components/LegacyMiniCart/section';
import Quantity from './quantity';


import classes from './product.module.css';
import buttonClasses from '../PriceAdjustments/CouponCode/button.module.css'

import { CartPageFragment } from '@magento/peregrine/lib/talons/CartPage/cartPageFragments.gql.js';
import { AvailableShippingMethodsCartFragment } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/ShippingMethods/shippingMethodsFragments.gql.js';
import Button from '../../Button/button';



const IMAGE_SIZE = 165;

const HeartIcon = <Icon size={16} src={Heart} />;

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMatches(window.matchMedia(query).matches);
    })
  })

  return matches;
}

const Product = props => {
    const { item, totalQuantity } = props;

    const { formatMessage } = useIntl();
    const talonProps = useProduct({
        operations: {
            removeItemMutation: REMOVE_ITEM_MUTATION,
            updateItemQuantityMutation: UPDATE_QUANTITY_MUTATION
        },
        ...props
    });

    const isMobile = useMediaQuery('(max-width: 800px)');

    const {
        addToWishlistProps,
        errorMessage,
        handleEditItem,
        handleRemoveFromCart,
        handleUpdateItemQuantity,
        isEditable,
        product,
        isProductUpdating
    } = talonProps;

    const {
        currency,
        image,
        name,
        options,
        quantity,
        stockStatus,
        unitPrice,
        urlKey,
        urlSuffix
    } = product;

    const itemClassName = isProductUpdating
        ? classes.item_disabled
        : classes.item;

    const editItemSection = isEditable ? (
        <Section
            text={formatMessage({
                id: 'product.editItem',
                defaultMessage: 'Edit item'
            })}
            data-cy="Product-Section-editItem"
            onClick={handleEditItem}
            icon="Edit2"
            classes={{
                text: classes.sectionText
            }}
        />
    ) : null;

    const itemLink = useMemo(
        () => resourceUrl(`/products/${urlKey}/${item.product.sku}`),
        [urlKey, urlSuffix]
    );

    const stockStatusMessage =
        stockStatus === 'OUT_OF_STOCK'
            ? formatMessage({
                  id: 'product.outOfStock',
                  defaultMessage: 'Out-of-stock'
              })
            : '';


    const discountedValue = item.prices.hasOwnProperty('total_item_discount')
        ? item.prices.total_item_discount.value
        : 0;
    const priceAfterDiscount = item.prices.row_total.value - discountedValue;

    const priceBeforeDiscount = discountedValue > 0 ?
        <span className={classes.priceBeforeDiscount}>
            <Price currencyCode={currency} value={item.prices.row_total.value} />
        </span> : null;

    const discountsLabels = item.prices.discounts ? item.prices.discounts.map((discount) => 
        {
            return <div className={classes.discountText}>
                <p>{discount.label}</p>
            </div>;
        }
    ) : null;

    const finalPrice = (
      <div className={classes.price}>
        <div>
          { priceBeforeDiscount }
          <span data-cy="Product-price">
                              <Price currencyCode={currency} value={priceAfterDiscount} />
                          </span>
        </div>
        { discountsLabels }
      </div>
    );

    return (
        <Fragment>
               <div className={classes.imageContainer} data-cy="Product-imageContainer">
                <a href={itemLink}>
                    <SimpleImage
                        alt={name}
                        width={IMAGE_SIZE}
                        className={classes.image}
                        data-cy="Product-image"
                        src={image.replace('cdn.maidenform.com', 'franklin.maidenform.com/images/catalog')}
                    />
                </a>
                </div>
                <div className={classes.productDetails}>
                <div className={classes.details}>
                    <div className={classes.name} data-cy="Product-name">
                        <a href={itemLink}><div dangerouslySetInnerHTML={{__html:name}}></div></a>
                    </div>
                    <div className={classes.style} data-cy="Product-style">
                        <span>Style: </span><span>{item.product.sku}</span>
                    </div>
                    <ProductOptions
                        options={options}
                        classes={{
                            options: classes.options,
                            optionLabel: classes.optionLabel
                        }}
                    />
                    <span className={classes.stockStatusMessage}>
                        {stockStatusMessage}
                    </span>
                    <div className={classes.quantity}>
                    {formatMessage({
                            id: 'product.quantity',
                            defaultMessage: 'Quantity: '
                        })}
                        <Form>
                        <Quantity
                            itemId={item.id}
                            initialValue={quantity}
                            onChange={handleUpdateItemQuantity}
                        /></Form>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button onClick={handleEditItem}
                        classes={buttonClasses}
                        className={classes.actionButtonClass}
                        priority={'normal'}
                        >
                    {formatMessage({
                            id: 'product.editItem',
                            defaultMessage: 'Edit item'
                        })}
                    </Button>
                    <Button onClick={handleRemoveFromCart}
                        classes={buttonClasses}
                        className={classes.actionButtonClass}
                        priority={'normal'}
                        >
                        {formatMessage({
                            id: 'product.removeFromCart',
                            defaultMessage: 'Remove from cart'
                        })}
                    </Button>
                </div>
                { isMobile && finalPrice }
                </div>
          { !isMobile && finalPrice }
        </Fragment>
    );
};

export default Product;

export const REMOVE_ITEM_MUTATION = gql`
    mutation removeItem($cartId: String!, $itemId: ID!) {
        removeItemFromCart(
            input: { cart_id: $cartId, cart_item_uid: $itemId }
        ) {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation updateItemQuantity(
        $cartId: String!
        $itemId: ID!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_uid: $itemId, quantity: $quantity }]
            }
        ) {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;
