import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import TextInput from "../../TextInput/textInput";
import Country from "../../Country/country";
import Postcode from "../../Postcode/postcode";
import Region from "../../Region/region";
import Field from "../../Field/field";

import defaultClasses from "./innerAddressForm.module.css";
import textInputClasses from "../checkoutTextInput.module.css";

const InnerAddressForm = props => {
    const {
        classes: propClasses,
        hasDefaultShipping,
        handleValidateEmail,
        additionalFormFields,
        setRegionMappings,
        formApiRef
    } = props;

    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, propClasses);
    const fieldClasses = { root: classes.field, label: classes.fieldLabel };

    const fieldLabels = {
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
        <Fragment>
            <div className={classes.root}>
                {!hasDefaultShipping && (
                    <div className={classes.email}>
                        <Field
                            id="email"
                            label={fieldLabels.email}
                            classes={fieldClasses}
                        >
                            <TextInput
                                autoComplete={fieldLabels.email}
                                placeholder={fieldLabels.email}
                                id="email"
                                field="email"
                                disabled={!handleValidateEmail}
                                validate={isRequired}
                                aria-label={fieldAriaLabels.email}
                                onBlur={() =>
                                    handleValidateEmail && handleValidateEmail(
                                        formApiRef.current.getValue("email")
                                    )
                                }
                                onPaste={e => {
                                    const text = e.clipboardData.getData(
                                        "text/plain"
                                    );
                                    handleValidateEmail && handleValidateEmail(text);
                                }}
                                classes={textInputClasses}
                            />
                        </Field>
                    </div>
                )}
                <div className={classes.firstname}>
                    <Field
                        id="firstname"
                        label={fieldLabels.firstName}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.firstName}
                            placeholder={fieldLabels.firstName}
                            id="firstname"
                            field="firstname"
                            validate={isRequired}
                            aria-label={fieldAriaLabels.firstName}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={classes.lastname}>
                    <Field
                        id="lastname"
                        label={fieldLabels.lastName}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.lastName}
                            placeholder={fieldLabels.lastName}
                            id="lastname"
                            field="lastname"
                            validate={isRequired}
                            aria-label={fieldAriaLabels.lastName}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={classes.street0}>
                    <Field
                        id="street0"
                        label={fieldLabels.street0}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.street0}
                            placeholder={fieldLabels.street0}
                            id="street0"
                            field="street[0]"
                            validate={isRequired}
                            aria-label={fieldAriaLabels.street0}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={classes.street1}>
                    <Field
                        id="street1"
                        label={fieldLabels.street1}
                        optional={true}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.street1}
                            placeholder={fieldLabels.street1}
                            id="street1"
                            field="street[1]"
                            aria-label={fieldAriaLabels.street1}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={classes.city}>
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
                            validate={isRequired}
                            aria-label={fieldAriaLabels.city}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                <div className={classes.region}>
                    <Region
                        setRegionMappings={setRegionMappings}
                        fieldInput={"region[region]"}
                        fieldSelect={"region[region_id]"}
                        inputClasses={{ input: classes.select}}
                        fieldClasses={fieldClasses}
                        optionValueKey={"id"}
                        validate={isRequired}
                        aria-label={fieldAriaLabels.state}
                    />
                </div>
                <div className={classes.postcode}>
                    <Postcode
                        autoComplete={fieldLabels.postCode}
                        placeholder={fieldLabels.postCode}
                        validate={isRequired}
                        aria-label={fieldAriaLabels.postCode}
                        fieldClasses={fieldClasses}
                        inputClasses={textInputClasses}
                    />
                </div>
                <div className={classes.country}>
                    <Country
                        validate={isRequired}
                        aria-label={fieldAriaLabels.country}
                        fieldClasses={fieldClasses}
                        inputClasses={{ input: classes.select}}
                    />
                </div>
                <div className={classes.telephone}>
                    <Field
                        id="telephone"
                        label={fieldLabels.phoneNumber}
                        classes={fieldClasses}
                    >
                        <TextInput
                            autoComplete={fieldLabels.phoneNumber}
                            placeholder={fieldLabels.phoneNumber}
                            id="telephone"
                            field="telephone"
                            validate={isRequired}
                            aria-label={fieldAriaLabels.phoneNumber}
                            classes={textInputClasses}
                        />
                    </Field>
                </div>
                {additionalFormFields}
            </div>
        </Fragment>
    );
};

export default InnerAddressForm;
