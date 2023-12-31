import React, { Fragment, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { func, string, shape } from 'prop-types';
import { Edit2 as EditIcon } from 'react-feather';
import { useShippingInformation } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/useShippingInformation';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { ShippingAddressForm } from '../AddressForm';
import Card from './card';
import defaultClasses from './shippingInformation.module.css';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

const EditModal = React.lazy(() => import('./EditModal/editModal'));

const ShippingInformation = props => {
    const {
        classes: propClasses,
        shippingMethodElem,
        stepState,
        onSave,
        onSuccess,
        toggleActiveContent,
        toggleSignInContent,
        setGuestSignInUsername
    } = props;
    const talonProps = useShippingInformation({
        onSave,
        toggleActiveContent
    });
    const {
        doneEditing,
        handleEditShipping,
        hasUpdate,
        isSignedIn,
        isLoading,
        shippingData
    } = talonProps;

    const classes = useStyle(defaultClasses, propClasses);

    const rootClassName = !doneEditing
        ? classes.root_editMode
        : hasUpdate
        ? classes.root_updated
        : classes.root;

    if (isLoading) {
        return (
            <LoadingIndicator classes={{ root: classes.loading }}>
                <FormattedMessage
                    id={'shippingInformation.loading'}
                    defaultMessage={'Fetching Shipping Information...'}
                />
            </LoadingIndicator>
        );
    }

    const editModal = !isSignedIn ? (
        <Suspense fallback={null}>
            <EditModal onSuccess={onSuccess} shippingData={shippingData} />
        </Suspense>
    ) : null;

    const shippingInformation = doneEditing ? (
        <Fragment>
            <div className={stepState?classes.cardHeader:classes.cardHeaderInactive}>
                <h3 className={classes.cardTitle}>
                    <FormattedMessage
                        id={'shippingInformation.cardTitle'}
                        defaultMessage={'Shipping Information'}
                    />
                </h3>
                <LinkButton
                    onClick={handleEditShipping}
                    className={classes.editButton}
                    data-cy="ShippingInformation-editButton"
                >
                    <Icon
                        size={16}
                        src={EditIcon}
                        classes={{ icon: classes.editIcon }}
                    />
                    <span className={classes.editText}>
                        <FormattedMessage
                            id={'global.editButton'}
                            defaultMessage={'Edit'}
                        />
                    </span>
                </LinkButton>
            </div>
            <Card shippingData={shippingData} shippingMethodElem={shippingMethodElem} />
            {editModal}
        </Fragment>
    ) : (
        <Fragment>
            <h3
                data-cy="ShippingInformation-editTitle"
                className={stepState?classes.stepTitle:classes.stepTitleInactive}
            >
                <FormattedMessage
                    id={'shippingInformation.stepTitle'}
                    defaultMessage={'STEP 1. Shipping Information'}
                />
            </h3>
            <div className={classes.editWrapper}>
            <h4 className={classes.subtitle}><FormattedMessage
                    id={'shippingInformation.editSubtitle'}
                    defaultMessage={'Where should we send your order?'}
                /></h4>
                <ShippingAddressForm
                    onSuccess={onSuccess}
                    shippingData={shippingData}
                    toggleSignInContent={toggleSignInContent}
                    setGuestSignInUsername={setGuestSignInUsername}
                />
            </div>
        </Fragment>
    );

    return (
        <div className={rootClassName} data-cy="ShippingInformation-root">
            {shippingInformation}
        </div>
    );
};

export default ShippingInformation;

ShippingInformation.propTypes = {
    classes: shape({
        root: string,
        root_editMode: string,
        cardHeader: string,
        cartTitle: string,
        stepTitle: string,
        stepTitleInactive: string,
        cardHeaderInactive: string,
        editWrapper: string,
        editTitle: string,
        editButton: string,
        editIcon: string,
        editText: string
    }),
    onSave: func.isRequired,
    onSuccess: func.isRequired,
    toggleActiveContent: func.isRequired,
    toggleSignInContent: func.isRequired,
    setGuestSignInUsername: func.isRequired
};
