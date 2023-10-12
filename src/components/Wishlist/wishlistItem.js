import React, { Fragment, useEffect, useMemo } from 'react';
import { Trash2 } from 'react-feather';
import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';
import { useWishlistItem } from '../../talons/WishlistPage/useWishlistItem';

import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import Icon from '../Icon';
import Image from '../Image';
import Price from '../Price';

import defaultClasses from '@magento/venia-ui/lib/components/WishlistPage/wishlistItem.module.css';
import overrideClasses from './wishlistItem.module.css';

const WishlistItem = props => {
  const { item } = props;

  const { configurable_options: configurableOptions = [], product } = item;
  const {
    name,
    price_range: priceRange,
    stock_status: stockStatus
  } = product;

  const { maximum_price: maximumPrice } = priceRange;
  const { final_price: finalPrice } = maximumPrice;
  const { currency, value: unitPrice } = finalPrice;

  const talonProps = useWishlistItem(props);
  const {
    addToCartButtonProps,
    handleRemoveProductFromWishlist,
    hasError,
    isRemovalInProgress,
    isSupportedProductType
  } = talonProps;

  const { formatMessage } = useIntl();
  const [, { addToast }] = useToasts();

  useEffect(() => {
    if (hasError) {
      addToast({
        type: 'error',
        message: formatMessage({
          id: 'wishlistItem.addToCartError',
          defaultMessage:
            'Something went wrong. Please refresh and try again.'
        }),
        timeout: 5000
      });
    }
  }, [addToast, formatMessage, hasError]);

  const classes = useStyle(defaultClasses, overrideClasses, props.classes);

  const optionElements = useMemo(() => {
    const options = configurableOptions.map(option => {
        const {
        id,
        option_label: optionLabel,
        value_label: valueLabel
      } = option;

      return (<Fragment key={id}>
          <dt className={classes.optionName}>{optionLabel}</dt>
          <dd className={classes.optionValue}>{valueLabel}</dd>
        </Fragment>
      );
    });
  
  return (<dl className={classes.options}>{options}</dl>);
  }, [classes.optionName, classes.optionValue, classes.options, configurableOptions]);

  const imageProps = {
    classes: {
      root: classes.imageContainer,
      image:
        stockStatus === 'OUT_OF_STOCK'
          ? classes.image_disabled
          : classes.image
    },
    ...talonProps.imageProps
  };

  const removeProductAriaLabel = formatMessage({
    id: 'wishlistItem.removeAriaLabel',
    defaultMessage: 'Remove Product from wishlist'
  });

  const rootClass = isRemovalInProgress
    ? classes.root_disabled
    : classes.root;

  const addToCart = isSupportedProductType ? (
    <button
      className={classes.addToCart}
      {...addToCartButtonProps}
      data-cy="wishlistItem-addToCart"
    >
      {formatMessage({
        id: 'wishlistItem.addToCart',
        defaultMessage: 'Add to Cart'
      })}
    </button>
  ) : null;

  return (
    <div className={rootClass} data-cy="wishlistItem-root">
      <Image {...imageProps} />

      <div className={classes.actionWrap}>
                <span
                  className={classes.name}
                  data-cy="wishlistItem-productName"
                >
                    {name}
                </span>{' '}
        <button
          className={classes.deleteItem}
          onClick={handleRemoveProductFromWishlist}
          aria-label={removeProductAriaLabel}
          data-cy="wishlistItem-deleteItem"
        >
          <Icon size={16} src={Trash2} />
        </button>
      </div>
      <div
        className={classes.priceContainer}
        data-cy="wishlistItem-priceContainer"
      >
        <Price currencyCode={currency} value={unitPrice} />
      </div>
      {optionElements}
      {addToCart}
    </div>
  );
};

export default WishlistItem;
