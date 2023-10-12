import React, { useMemo } from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useAddToCartDialog } from '@magento/peregrine/lib/talons/AddToCartDialog/useAddToCartDialog';

import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import Button from '../Button/button';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import Image from '../Image';
import Price from '../Price';
import Options from '../ProductOptionsDetail/options';
import defaultClasses from '@magento/venia-ui/lib/components/AddToCartDialog/addToCartDialog.module.css';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { Spinner } from '@magento/venia-ui/lib/components/LoadingIndicator';

import dialogClasses from './dialog.module.css';
import overrideClasses from './addToCartDialog.module.css';
import SimpleImage from '@magento/venia-ui/lib/components/Image/simpleImage';

const AddToCartDialog = props => {
  const { item } = props;

  const talonProps = useAddToCartDialog(props);
  const {
    buttonProps,
    configurableOptionProps,
    formErrors,
    handleOnClose,
    outOfStockVariants,
    imageProps,
    isFetchingProductDetail,
    priceProps
  } = talonProps;

  const classes = useStyle(defaultClasses, overrideClasses, props.classes);

  const imageComponent = useMemo(
    () =>
      imageProps ? (
        <SimpleImage {...imageProps} className={classes.image} />
      ) : (
        <div className={classes.image} />
      ),
    [classes.image, imageProps]
  );

  const priceComponent = useMemo(
    () => (priceProps ? <Price {...priceProps} /> : null),
    [priceProps]
  );

  console.log("config options", configurableOptionProps)

  const dialogContent = useMemo(() => {
    if (item) {
      return (
        <div className={classes.root}>
          {imageComponent}
          <div className={classes.detailsContainer}>
            <span className={classes.name}>
                {item.product.name}
            </span>
            <span className={classes.price}>{priceComponent}</span>
            <Options
              {...configurableOptionProps}
              classes={{
                root: classes.optionRoot,
                title: classes.optionTitle
              }}
              outOfStockVariants={outOfStockVariants}
              cartItem={item}
            />
            <Button {...buttonProps}>
              <FormattedMessage
                id="addToCartDialog.addToCart"
                defaultMessage="Add to Cart"
              />
            </Button>
          </div>
        </div>
      );
    }

    return null;
  }, [
    buttonProps,
    classes.detailsContainer,
    classes.name,
    classes.optionTitle,
    classes.price,
    classes.root,
    configurableOptionProps,
    imageComponent,
    item,
    priceComponent,
    outOfStockVariants
  ]);

  const titleElement = isFetchingProductDetail ? (
    <div className={classes.titleContainer}>
      <Spinner />
    </div>
  ) : null;

  return (
    <Dialog
      classes={{
        headerText: classes.dialogHeaderText,
        headerButton: classes.dialogHeaderButton,
        mask: classes.mask,
        ...dialogClasses
      }}
      isOpen={!!props.item}
      onCancel={handleOnClose}
      shouldShowButtons={false}
      title={titleElement}
      isMaskDisabled={true}
    >
      <FormError errors={formErrors} />
      {dialogContent}
    </Dialog>
  );
};

export default AddToCartDialog;

AddToCartDialog.propTypes = {
  classes: shape({
    root: string,
    image: string,
    detailsContainer: string,
    name: string,
    price: string,
    optionTitle: string,
    dialogHeaderText: string,
    titleContainer: string
  }),
  item: shape({
    product: shape({
      name: string.isRequired
    }).isRequired
  })
};
