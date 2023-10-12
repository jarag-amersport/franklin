import React, { Fragment } from "react";
import { useIntl } from "react-intl";
import { isRequired } from "@magento/venia-ui/lib/util/formValidators";

import Field from "../Field/field";
import TextInput from "../TextInput/textInput";

import messageClasses from "./inputMessage.module.css";
import textInputClasses from "./textInput.module.css";

function AddressFormContactSection() {
    const { formatMessage } = useIntl();
    const firstNameLabel = formatMessage({
        id: "global.firstName",
        defaultMessage: "First Name"
    });
    const lastNameLabel = formatMessage({
        id: "global.lastName",
        defaultMessage: "Last Name"
    });
    const telephoneLabel = formatMessage({
        id: "global.phoneNumber",
        defaultMessage: "Phone Number"
    });

    return (
        <Fragment>
            <Field id="firstname" label={firstNameLabel}>
                <TextInput
                    field="firstname"
                    messageClasses={messageClasses}
                    classes={textInputClasses}
                    validate={isRequired}
                />
            </Field>
            <Field id="lastname" label={lastNameLabel}>
                <TextInput
                    field="lastname"
                    messageClasses={messageClasses}
                    classes={textInputClasses}
                    validate={isRequired}
                />
            </Field>
            <Field id="telephone" label={telephoneLabel}>
                <TextInput
                    field="telephone"
                    messageClasses={messageClasses}
                    classes={textInputClasses}
                    validate={isRequired}
                />
            </Field>
        </Fragment>
    );
}

export default AddressFormContactSection;
