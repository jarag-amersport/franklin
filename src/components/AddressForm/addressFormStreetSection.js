import React, { Fragment } from "react";
import { useIntl } from "react-intl";
import { isRequired } from "@magento/venia-ui/lib/util/formValidators";

import Field from "../Field/field";
import TextInput from "../TextInput/textInput";
import Country from "../Country/country";
import Postcode from "../Postcode/postcode";
import Region from "../Region/region";

import classes from "./addressFormStreetSection.module.css"
import messageClasses from "./inputMessage.module.css";
import textInputClasses from "./textInput.module.css";

function AddressFormStreetSection() {
    const { formatMessage } = useIntl();
    const street2Label = formatMessage({
        id: "global.streetAddress2",
        defaultMessage: "Street Address 2"
    });

    return (
        <Fragment>
            <Field id="street1" label="Street Address">
                <TextInput
                    field="street[0]"
                    messageClasses={messageClasses}
                    classes={textInputClasses}
                    validate={isRequired}
                />
            </Field>
            <Field
                id="street2"
                label={street2Label}
                optional={true}
                classes={{
                    label: classes.optionalStreetField
                }}
            >
                <TextInput
                    field="street[1]"
                    messageClasses={messageClasses}
                    classes={textInputClasses}
                />
            </Field>
            <Field id="city" label="City">
                <TextInput
                    field="city"
                    messageClasses={messageClasses}
                    classes={textInputClasses}
                    validate={isRequired}
                />
            </Field>
            <Region
                messageClasses={messageClasses}
                countryCodeField={"country_code"}
                fieldInput={"region[region]"}
                fieldSelect={"region[region_id]"}
                optionValueKey="id"
                label="State/Province"
                validate={isRequired}
            />
            <Postcode
                validate={isRequired}
                messageClasses={messageClasses}
                inputClasses={textInputClasses}
            />
            <Country
                field={"country_code"}
                validate={isRequired}
                messageClasses={messageClasses}
            />
        </Fragment>
    );
}

export default AddressFormStreetSection;
