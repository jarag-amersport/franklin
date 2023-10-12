import React from 'react';
import { string, bool, shape, func } from 'prop-types';
import { Eye, EyeOff } from 'react-feather';
import { useIntl } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { usePassword } from '@magento/peregrine/lib/talons/Password/usePassword';

import Button from '../Button/button';
import Field from '../Field/field';
import TextInput from '../TextInput/textInput';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import defaultClasses from '@magento/venia-ui/lib/components/Password/password.module.css';
import passwordButtonClasses from './passwordButton.module.css';

const Password = props => {
    const {
        messageClasses,
        textInputClasses,
        fieldClasses,
        classes: propClasses,
        label,
        fieldName,
        isToggleButtonHidden,
        autoComplete,
        validate,
        ...otherProps
    } = props;

    const talonProps = usePassword();
    const { handleBlur, togglePasswordVisibility, visible } = talonProps;
    const classes = useStyle(defaultClasses, propClasses);

    const handleKeypress = e => {
        if (e.code == 'Enter') {
            togglePasswordVisibility;
        }
    };
    const { formatMessage } = useIntl();
    const hidePassword = formatMessage({
        id: 'password.hide',
        defaultMessage: 'Hide Password'
    });
    const viewPassword = formatMessage({
        id: 'password.view',
        defaultMessage: 'View Password'
    });
    const speak = visible ? hidePassword : viewPassword;

    const passwordButton = (
        <Button
            classes={passwordButtonClasses}
            className={passwordButtonClasses.passwordButton}
            onClick={togglePasswordVisibility}
            onKeyDown={handleKeypress}
            type="button"
        >
            {visible ? (
                <Eye aria-label={speak} />
            ) : (
                <EyeOff aria-label={speak} />
            )}
        </Button>
    );

    const fieldType = visible ? 'text' : 'password';

    return (
        <Field id="Password" label={label} classes={{ root: classes.root, ...fieldClasses }}>
            <TextInput
                messageClasses={messageClasses}
                classes={{
                  ...textInputClasses,
                  fieldIconAfter: textInputClasses.fieldIconAfter
                }}
                after={!isToggleButtonHidden && passwordButton}
                autoComplete={autoComplete}
                field={fieldName}
                type={fieldType}
                validate={validate}
                onBlur={handleBlur}
                {...otherProps}
            />
        </Field>
    );
};

Password.propTypes = {
    autoComplete: string,
    textInputClasses: shape({
        input: string
    }),
    fieldClasses: shape({
        label: string,
        root: string
    }),
    classes: shape({
        root: string
    }),
    label: string,
    fieldName: string,
    isToggleButtonHidden: bool,
    validate: func
};

Password.defaultProps = {
    isToggleButtonHidden: true,
    validate: isRequired
};

export default Password;
