import React, { useRef } from 'react';
import { useIntl } from "react-intl";
import { useGuestForm } from "@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/useGuestForm";
import usePCAPredict from '../../usePCAPredict';
import AddressForm from '../../addressForm';

const GuestForm = props => {
    const {
        afterSubmit,
        classes: propClasses,
        onCancel,
        onSuccess,
        shippingData,
        toggleSignInContent,
        setGuestSignInUsername,
        isCancelable
    } = props;

    const talonProps = useGuestForm({
        afterSubmit,
        onCancel,
        onSuccess,
        shippingData,
        toggleSignInContent,
        setGuestSignInUsername
    });
    const {
        errors,
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving,
        isUpdate,
        handleValidateEmail
    } = talonProps;

    const { formatMessage } = useIntl();

    const submitButtonText = isUpdate
        ? formatMessage({
              id: "shippingForm.shipHere",
              defaultMessage: "Ship Here"
          })
        : formatMessage({
              id: "guestForm.continueToNextStep",
              defaultMessage: "Continue to Shipping Method"
          });

    const formRef = useRef();

    // set up PCA address verification
    const { setRegionMappings } = usePCAPredict(formRef);

    const formProps = {
        classes: propClasses,
        errors,
        handleCancel,
        handleSubmit,
        initialValues,
        isSaving,
        isCancelable: isCancelable || isUpdate,
        submitButtonText,
        handleValidateEmail,
        setRegionMappings,
        parentFormRef: formRef,
    };

    return (<AddressForm {...formProps} />);
};

export default GuestForm;

GuestForm.defaultProps = {
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
