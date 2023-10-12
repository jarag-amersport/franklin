import React, { Fragment, useMemo } from 'react';
import { useWishlistItems } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistItems';

import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import defaultClasses from '@magento/venia-ui/lib/components/WishlistPage/wishlistItems.module.css';
import overrideClasses from './wishlistItems.module.css';
import WishlistItem from './wishlistItem';
import AddToCartDialog from './addToCartDialog';

const WishlistItems = props => {
  const { items, wishlistId } = props;

  const talonProps = useWishlistItems();
  const {
    activeAddToCartItem,
    handleCloseAddToCartDialog,
    handleOpenAddToCartDialog
  } = talonProps;

  const classes = useStyle(defaultClasses, overrideClasses, props.classes);

  const itemElements = useMemo(() => {
    return items.map(item => {
      return (
        <WishlistItem
          key={item.id}
          item={item}
          onOpenAddToCartDialog={handleOpenAddToCartDialog}
          wishlistId={wishlistId}
        />
      );
    });
  }, [handleOpenAddToCartDialog, items, wishlistId]);

  return (
    <Fragment>
      <div className={classes.root}>{itemElements}</div>
      <AddToCartDialog
        item={activeAddToCartItem}
        onClose={handleCloseAddToCartDialog}
      />
    </Fragment>
  );
};

export default WishlistItems;
