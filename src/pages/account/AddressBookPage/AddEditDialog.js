import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { Form } from 'informed';

import AddressFormContactSection from '../../../components/AddressForm/addressFormContactSection';
import AddressFormStreetSection from '../../../components/AddressForm/addressFormStreetSection';

import FormError from '@magento/venia-ui/lib/components/FormError';
import Button from '../../../components/Button/button';

import classes from './AddEditDialog.module.css';
import buttonClasses from './button.module.css';

const AddEditDialog = props => {
    const {
        formErrors,
        formProps,
        isBusy,
        isEditMode,
        isOpen,
        onCancel,
        onConfirm
    } = props;

    const { formatMessage } = useIntl();

    let formatTitleArgs;
    if (isEditMode) {
        formatTitleArgs = {
            id: 'addressBookPage.editDialogTitle',
            defaultMessage: 'Edit Address'
        };
    } else {
        formatTitleArgs = {
            id: 'addressBookPage.addDialogTitle',
            defaultMessage: 'New Address'
        };
    }
    const title = formatMessage(formatTitleArgs);

    return (
        <div className={classes.root}>
        <h1>{title}</h1>
        <Form {...formProps} onSubmit={onConfirm}>
            <div className={classes.sectionFlex}>
                <div className={classes.section}>
                    <div className={classes.sectionHeader}>
                        <h2>Contact Information</h2>
                    </div>
                    <div className={classes.sectionContent}>
                        <FormError
                            classes={{ root: classes.errorContainer }}
                            errors={Array.from(formErrors.values())}
                        />
                        <AddressFormContactSection />
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={classes.sectionHeader}>
                        <h2>Address</h2>
                    </div>
                    <div className={classes.sectionContent}>
                        <AddressFormStreetSection />
                    </div>
                </div>
            </div>
            <div className={classes.section}>
                <div className={[classes.sectionContent, classes.sectionActions].join(' ')}>
                    <Button disabled={isBusy} classes={buttonClasses} priority="high" type="submit">Save Address</Button>
                    <Button disabled={isBusy} classes={buttonClasses} onClick={onCancel} priority="low" type="reset">Cancel</Button>
                </div>
            </div>
        </Form>
        </div>
    );
};

export default AddEditDialog;

AddEditDialog.propTypes = {
    classes: shape({
        root: string,
        city: string,
        country: string,
        default_address_check: string,
        errorContainer: string,
        firstname: string,
        lastname: string,
        middlename: string,
        postcode: string,
        region: string,
        street1: string,
        street2: string,
        telephone: string
    }),
    formErrors: object,
    isEditMode: bool,
    isOpen: bool,
    onCancel: func,
    onConfirm: func
};
