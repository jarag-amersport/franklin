import React from 'react';
import { shape, string } from 'prop-types';
import { useIntl } from 'react-intl';
import { usePostcode } from '@magento/peregrine/lib/talons/Postcode/usePostcode';

import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import Field from '../Field/field';
import TextInput from '../TextInput/textInput';
import defaultClasses from './postcode.module.css';

const Postcode = props => {
    const { classes: propClasses, fieldInput, label, fieldClasses, inputClasses, messageClasses, ...inputProps } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const postcodeProps = {
        classes: inputClasses,
        messageClasses,
        ...inputProps
    };

    const { formatMessage } = useIntl();

    const fieldLabel =
        label ||
        formatMessage({
            id: 'postcode.label',
            defaultMessage: 'ZIP / Postal Code'
        });

    usePostcode({ fieldInput });

    return (
        <Field
            id={classes.root}
            label={fieldLabel}
            classes={fieldClasses}
        >
            <TextInput
                {...postcodeProps}
                field={fieldInput}
                id={classes.root}
            />
        </Field>
    );
};

export default Postcode;

Postcode.defaultProps = {
    fieldInput: 'postcode'
};

Postcode.propTypes = {
    classes: shape({
        root: string
    }),
    fieldInput: string,
    label: string
};
