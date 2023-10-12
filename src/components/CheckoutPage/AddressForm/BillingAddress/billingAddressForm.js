import React, { useCallback, useMemo } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { shape, string, func, bool } from 'prop-types';
import { useIntl } from 'react-intl';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { useBillingAddress } from '@magento/peregrine/lib/talons/CheckoutPage/BillingAddress/useBillingAddress';
import Checkbox from '../../../Checkbox/checkbox';
import Field from '../../../Field/field';
import TextInput from '../../../TextInput/textInput';
import Region from '../../../Region/region';
import Postcode from '../../../Postcode/postcode';
import Country from '../../../Country/country';

import defaultClasses from './billingAddressForm.module.css';
import formClasses from '../innerAddressForm.module.css';
import textInputClasses from "../../checkoutTextInput.module.css";

const BillingAddressForm = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const fieldClasses = { root: formClasses.field, label: formClasses.fieldLabel };

    const {
        isBillingAddressSame,
        initialValues,
        shippingAddressCountry,
        errors
    } = useBillingAddress(props);

    const { formatMessage } = useIntl();

    /**
     * These 2 functions are wrappers around the `isRequired` function
     * of `formValidators`. They perform validations only if the
     * billing address is different from shipping address.
     */
    const isFieldRequired = useCallback((value, { isBillingAddressSame }) => {
        if (isBillingAddressSame) {
            /**
             * Informed validator functions return `undefined` if
             * validation is `true`
             */
            return undefined;
        } else {
            return isRequired(value);
        }
    }, []);

    const billingAddressFieldsClassName = isBillingAddressSame
        ? classes.rootHidden
        : formClasses.root;

    const fieldLabels = {
        isBillingAddressSame: formatMessage({
            id: 'checkoutPage.billingAddressSame',
            defaultMessage:
                'Billing address same as shipping address'
        }),
        email: formatMessage({
            id: "global.email",
            defaultMessage: "Email"
        }),
        firstName: formatMessage({
            id: "global.firstName",
            defaultMessage: "First Name"
        }),
        lastName: formatMessage({
            id: "global.lastName",
            defaultMessage: "Last Name"
        }),
        street0: formatMessage({
            id: "global.streetAddress",
            defaultMessage: "Street Address"
        }),
        street1: formatMessage({
            id: "global.streetAddress2",
            defaultMessage: "Street Address 2"
        }),
        city: formatMessage({
            id: "global.city",
            defaultMessage: "City"
        }),
        state: formatMessage({
            id: "global.region",
            defaultMessage: "State"
        }),
        postCode: formatMessage({
            id: "global.postcode",
            defaultMessage: "ZIP / Postal Code"
        }),
        phoneNumber: formatMessage({
            id: "global.phoneNumber",
            defaultMessage: "Phone Number"
        })
    };

    const fieldAriaLabels = {
        isBillingAddressSame: formatMessage({
            id: 'checkoutPage.billingAddressSame',
            defaultMessage:
                'Billing address same as shipping address'
        }),
        email: formatMessage({
            id: "global.emailRequired",
            defaultMessage: "Email Required"
        }),
        firstName: formatMessage({
            id: "global.firstNameRequired",
            defaultMessage: "First Name Required"
        }),
        lastName: formatMessage({
            id: "global.lastNameRequired",
            defaultMessage: "Last Name Required"
        }),
        street0: formatMessage({
            id: "global.streetAddressRequired",
            defaultMessage: "Street Address Required"
        }),
        street1: formatMessage({
            id: "global.streetAddress2",
            defaultMessage: "Street Address 2"
        }),
        city: formatMessage({
            id: "global.cityRequired",
            defaultMessage: "City Required"
        }),
        state: formatMessage({
            id: "global.regionRequired",
            defaultMessage: "State Required"
        }),
        postCode: formatMessage({
            id: "global.postCodeRequired",
            defaultMessage: "ZIP / Postal Code Required"
        }),
        country: formatMessage({
            id: "global.countryRequired",
            defaultMessage: "Country Required"
        }),
        phoneNumber: formatMessage({
            id: "global.phoneNumberRequired",
            defaultMessage: "Phone Number Required"
        })
    };

    return (
        <div>
            <FormError
                classes={{ root: formClasses.formErrorContainer }}
                errors={Array.from(errors.values())}
                allowErrorMessages={true}
            />
            <div className={classes.addressCheck}>
                <Checkbox
                    field="isBillingAddressSame"
                    label={fieldLabels.isBillingAddressSame}
                    initialValue={initialValues.isBillingAddressSame}
                />
            </div>
            <div className={billingAddressFieldsClassName}>
                <div className={formClasses.firstname}>
                    <Field
                        id="firstName"
                        label={fieldLabels.firstName}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.firstName}
                            placeholder={fieldLabels.firstName}
                            id="firstName"
                            field="firstName"
                            validate={isFieldRequired}
                            initialValue={initialValues.firstName}
                            aria-label={fieldAriaLabels.firstName}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={formClasses.lastname}>
                    <Field
                        id="lastName"
                        label={fieldLabels.lastName}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.lastName}
                            placeholder={fieldLabels.lastName}
                            id="lastName"
                            field="lastName"
                            validate={isFieldRequired}
                            initialValue={initialValues.lastName}
                            aria-label={fieldAriaLabels.lastName}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={formClasses.street0}>
                    <Field
                        id="street1"
                        label={fieldLabels.street0}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.street0}
                            placeholder={fieldLabels.street0}
                            id="street1"
                            field="street1"
                            validate={isFieldRequired}
                            initialValue={initialValues.street1}
                            aria-label={fieldAriaLabels.street0}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={formClasses.street1}>
                    <Field
                        id="street2"
                        label={fieldLabels.street1}
                        optional={true}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.street1}
                            placeholder={fieldLabels.street1}
                            id="street2"
                            field="street2"
                            initialValue={initialValues.street2}
                            aria-label={fieldAriaLabels.street1}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={formClasses.city}>
                    <Field
                        id="city"
                        label={fieldLabels.city}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.city}
                            placeholder={fieldLabels.city}
                            id="city"
                            field="city"
                            validate={isFieldRequired}
                            initialValue={initialValues.city}
                            aria-label={fieldAriaLabels.city}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={formClasses.region}>
                    <Region
                        fieldClasses={fieldClasses}
                        inputClasses={{ input: formClasses.select}}
                        initialValue={initialValues.region}
                        validate={isFieldRequired}
                        aria-label={fieldAriaLabels.state}
                    />
                </div>
                <div className={formClasses.postcode}>
                    <Postcode
                        autoComplete={fieldLabels.postCode}
                        placeholder={fieldLabels.postCode}
                        validate={isFieldRequired}
                        initialValue={initialValues.postcode}
                        aria-label={fieldAriaLabels.postCode}
                        fieldClasses={fieldClasses}
                        inputClasses={textInputClasses}
                    />
                </div>
                <div className={formClasses.country}>
                    <Country
                        validate={isFieldRequired}
                        initialValue={
                            /**
                             * If there is no initial value to start with
                             * use the country from shipping address.
                             */
                            initialValues.country || shippingAddressCountry
                        }
                        aria-label={fieldAriaLabels.country}
                        fieldClasses={fieldClasses}
                        inputClasses={{ input: formClasses.select}}
                    />
                </div>
                <div className={formClasses.telephone}>
                    <Field
                        id="phoneNumber"
                        label={fieldLabels.phoneNumber}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.phoneNumber}
                            placeholder={fieldLabels.phoneNumber}
                            id="phoneNumber"
                            field="phoneNumber"
                            validate={isFieldRequired}
                            initialValue={initialValues.phoneNumber}
                            aria-label={fieldAriaLabels.phoneNumber}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
            </div>
        </div>
    );
};

BillingAddressForm.propTypes = {
    classes: shape({ root: string }),
    shouldSubmit: bool.isRequired,
    onBillingAddressChangedError: func,
    onBillingAddressChangedSuccess: func
};

export default BillingAddressForm;
