import React, { Fragment, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useWishlistPage } from '@magento/peregrine/lib/talons/WishlistPage/useWishlistPage';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import Wishlist from '../../../components/Wishlist/wishlist';
import defaultClasses from '@magento/venia-ui/lib/components/WishlistPage/wishlistPage.module.css';
import overrideClasses from './wishlistPage.module.css';
import { CreateWishlist } from '../../../components/Wishlist/createWishlist';

const WishlistPage = props => {
  const talonProps = useWishlistPage();
  const {
    errors,
    loading,
    shouldRenderVisibilityToggle,
    wishlists
  } = talonProps;
  const { formatMessage } = useIntl();
  const error = errors.get('getCustomerWishlistQuery');

  const [activeWishlist, setActiveWishlist] = useState(0);

  const classes = useStyle(defaultClasses, overrideClasses, props.classes);
  const WISHLIST_DISABLED_MESSAGE = formatMessage({
    id: 'wishlistPage.wishlistDisabledMessage',
    defaultMessage: 'The wishlist is not currently available.'
  });
  const wishlistElements = useMemo(() => {
    if (wishlists.length === 0) {
      return <Wishlist />;
    }

    const wishlist = wishlists[activeWishlist];

    return <Wishlist
      key={wishlist.id}
      isCollapsed={false}
      data={wishlist}
      shouldRenderVisibilityToggle={false}
    />;
  }, [wishlists, activeWishlist]);

  const wishlistHeading = useMemo(() => {
    return <div className={classes.favoritesHeading}>
      <span className={classes.myFavorites}>My Favorites: </span>
      {
        wishlists.map((wishlist, index) =>
          <button className={activeWishlist === index ? classes.active : ""} key={wishlist.id} onClick={() => setActiveWishlist(index)}>{wishlist.name}</button>)
      }
      <CreateWishlist />
    </div>
  }, [wishlists, activeWishlist]);

  if (loading && !error) {
    return fullPageLoadingIndicator;
  }

  let content;
  if (error) {
    const derivedErrorMessage = deriveErrorMessage([error]);
    const errorElement =
      derivedErrorMessage === WISHLIST_DISABLED_MESSAGE ? (
        <p>
          <FormattedMessage
            id={'wishlistPage.disabledMessage'}
            defaultMessage={
              'Sorry, this feature has been disabled.'
            }
          />
        </p>
      ) : (
        <p className={classes.fetchError}>
          <FormattedMessage
            id={'wishlistPage.fetchErrorMessage'}
            defaultMessage={
              'Something went wrong. Please refresh and try again.'
            }
          />
        </p>
      );

    content = <div className={classes.errorContainer}>{errorElement}</div>;
  } else {
    content = (
      <Fragment>
        {wishlistElements}
      </Fragment>
    );
  }

  return (
    <div className={classes.root} data-cy="Wishlist-root">
      {wishlistHeading}
      {content}
    </div>
  );
};

export default WishlistPage;
