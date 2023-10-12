import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Text } from 'informed';
import { useCustomerForm } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/useCustomerForm';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Message from '@magento/venia-ui/lib/components/Field/message';
import Checkbox from '../../../../Checkbox/checkbox'
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import AddressForm from '../../addressForm';

import defaultClasses from "./customerForm.module.css";
import GuestForm from '../GuestForm/guestForm';

const CustomerForm = props => {
    const {
        afterSubmit,
        classes: propClasses,
        onCancel,
        onSuccess,
        shippingData,
        isCancelable
    } = props;

    const talonProps = useCustomerForm({
        afterSubmit,
        onCancel,
        onSuccess,
        shippingData
    });
    const {
        errors,
        handleCancel,
        handleSubmit,
        hasDefaultShipping,
        initialValues,
        isLoading,
        isSaving,
        isUpdate
    } = talonProps;

    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, propClasses);

    if (isLoading) {
        return (
            <LoadingIndicator>
                <FormattedMessage
                    id={'customerForm.loading'}
                    defaultMessage={'Fetching Customer Details...'}
                />
            </LoadingIndicator>
        );
    }

    const formMessageElement = !hasDefaultShipping ? (
        <div className={classes.formMessage}>
            <Message>
                <FormattedMessage
                    id={'customerForm.formMessage'}
                    defaultMessage={
                        'The shipping address you enter will be saved to your address book and set as your default for future purchases.'
                    }
                />
            </Message>
        </div>
    ) : null;

    const defaultShippingElement = hasDefaultShipping ? (
        <div className={classes.defaultShipping}>
            <Checkbox
                disabled={!!initialValues.default_shipping}
                id="default_shipping"
                field="default_shipping"
                label={formatMessage({
                    id: 'customerForm.defaultShipping',
                    defaultMessage: 'Make this my default address'
                })}
            />
        </div>
    ) : (
        <Text type="hidden" field="default_shipping" initialValue={true} />
    );

    const submitButtonText = !hasDefaultShipping
        ? formatMessage({
              id: "global.saveAndContinueButton",
              defaultMessage: "Save and Continue"
          })
        : isUpdate
        ? formatMessage({
              id: "shippingForm.shipHere",
              defaultMessage: "Ship Here"
          })
        : formatMessage({
              id: "global.addButton",
              defaultMessage: "Add"
          });

    const formProps = {
        classes: propClasses,
        errors,
        handleCancel,
        handleSubmit,
        hasDefaultShipping,
        initialValues,
        isSaving,
        isCancelable: isCancelable || isUpdate,
        submitButtonText,
        additionalFormFields: [defaultShippingElement, formMessageElement]
    };

    return (<AddressForm {...formProps} />);
};

export default CustomerForm;

CustomerForm.defaultProps = {
    shippingData: {
        country: {
            code: DEFAULT_COUNTRY_CODE
        },
        region: {
            id: null,
            code: ""
        }
    }
};
