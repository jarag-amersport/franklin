import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useProductForm } from './useProductForm';

import configuredVariant from '@magento/peregrine/lib/util/configuredVariant';
import { useStyle } from '@magento/venia-ui/lib/classify';
import FormError from '@magento/venia-ui/lib/components/FormError';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import Options from '../../ProductOptionsDetail/options';
import Quantity from '../ProductListing/quantity';
import defaultClasses from '../ProductListing/EditModal/productForm.module.css';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import ProductDetail from '../ProductListing/EditModal/productDetail';
import SimpleImage from '@magento/venia-ui/lib/components/Image/simpleImage';

const IMAGE_SIZE = 165;

const ProductForm = props => {
    const {
        item: cartItem,
        setIsCartUpdating,
        variantPrice,
        setVariantPrice,
        setActiveEditItem,
    } = props;
    const { formatMessage } = useIntl();
    const talonProps = useProductForm({
        cartItem,
        setIsCartUpdating,
        setVariantPrice,
        setActiveEditItem,
        handleSubmitExternal: props.addToCart
    });
    const {
        configItem,
        errors,
        handleOptionSelection,
        handleSubmit,
        outOfStockVariants,
        isLoading,
        isSaving,
        isDialogOpen,
        handleClose,
        configurableThumbnailSource,
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const dialogButtonsDisabled = isLoading;
    const dialogSubmitButtonDisabled = isSaving;
    const dialogFormProps = {
        initialValues: cartItem
    };

    const message = isLoading
        ? formatMessage({
              id: 'productForm.fetchingProductOptions',
              defaultMessage: 'Fetching Product Options...'
          })
            ? isSaving
            : formatMessage({
                  id: 'productForm.updatingCart',
                  defaultMessage: 'Updating Cart...'
              })
        : null;

    const maybeLoadingIndicator =
        isLoading || isSaving ? (
            <LoadingIndicator
                classes={{
                    root: classes.loading
                }}
            >
                {message}
            </LoadingIndicator>
        ) : null;

    if (cartItem && !isLoading && !configItem) {
        return (
            <span className={classes.dataError}>
                <FormattedMessage
                    id={'productForm.dataError'}
                    defaultMessage={
                        'Something went wrong. Please refresh and try again.'
                    }
                />
            </span>
        );
    }

    const configured_variant_original = cartItem && configItem? configuredVariant(
        cartItem.configurable_options,
        cartItem.product
    ): null;

    const configured_variant = {...configured_variant_original, small_image: cartItem? cartItem.small_image: {url: ''}};

    const dialogContent =
        cartItem && configItem ? (
            <div className={classes.root}>
                <div className={classes.imageColumn}>
                    <SimpleImage
                            alt={cartItem.product.name}
                            classes={{
                                root: classes.imageRoot,
                                image: classes.image
                            }}
                            width={IMAGE_SIZE}
                            data-cy="Product-image"
                            src={(configurableThumbnailSource === 'itself' &&
                            configured_variant
                                ? configured_variant.small_image.url
                                : cartItem.product.small_image.url).replace('cdn.maidenform.com', 'franklin.maidenform.com/images/catalog')}
                        />
                </div>
                <div className={classes.productDetailColumn}>
                    <FormError
                        classes={{
                            root: classes.errorContainer
                        }}
                        errors={Array.from(errors.values())}
                        scrollOnError={false}
                    />
                    <ProductDetail
                        item={cartItem}
                        variantPrice={variantPrice}
                        configurableThumbnailSource={configurableThumbnailSource}
                    />
                    <Options
                        classes={{
                            root: classes.optionRoot
                        }}
                        onSelectionChange={handleOptionSelection}
                        options={configItem.configurable_options}
                        selectedValues={cartItem.configurable_options}
                        outOfStockVariants={outOfStockVariants}
                        cartItem={cartItem}
                    />
                    <div className={classes.quantity}>
                        {formatMessage({
                                id: 'product.quantity',
                                defaultMessage: 'Quantity: '
                            })}
                        <Quantity
                            itemId={cartItem.id}
                            initialValue={cartItem.quantity}
                        />
                    </div>
                </div>
            </div>
        ) : null;

    return (
        <Fragment>
            <Dialog
                classes={{
                    dialog: classes.rootDialog,
                    contents: classes.contents,
                    headerText: classes.dialogHeaderText,
                    buttons: classes.dialogButtons
                }}
                confirmText={'Add to Cart'}
                confirmTranslationId={'productForm.addToCart'}
                formProps={dialogFormProps}
                isOpen={isDialogOpen}
                onCancel={handleClose}
                onConfirm={handleSubmit}
                shouldDisableAllButtons={dialogButtonsDisabled}
                shouldDisableConfirmButton={dialogSubmitButtonDisabled}
                shouldUnmountOnHide={false}
                title={formatMessage({
                    id: 'cartOverlay.headerText',
                    defaultMessage: 'Add to cart'
                })}
            >
                {maybeLoadingIndicator}
                {dialogContent}
            </Dialog>
        </Fragment>
    );
};

export default ProductForm;
