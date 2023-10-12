import React, {useEffect, useRef, useState} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { shape, string } from 'prop-types';
import { Form } from 'informed';

import { useToasts } from '@magento/peregrine';
import { useResetPassword } from '@magento/peregrine/lib/talons/MyAccount/useResetPassword';

import { isRequired } from "@magento/venia-ui/lib/util/formValidators";
import defaultClasses from './resetPassword.module.css';
import resetPasswordOperations from './resetPassword.gql';
import {useStyle} from "@magento/venia-ui/lib/classify";
import Field from "../../components/Field/field";
import TextInput from "../../components/TextInput/textInput";
import Password from "../../components/Password/password";
import GoogleReCaptcha from "@magento/venia-ui/lib/components/GoogleReCaptcha";
import Button from "../../components/Button/button";
import {StoreTitle} from "@magento/venia-ui/lib/components/Head";

import fieldClasses from './field.module.css';
import textInputClasses from './textInput.module.css';
import buttonClasses from './button.module.css';
import Checkbox from "../../components/Checkbox/checkbox";
import messageClasses from "../forgot-password/inputMessage.module.css";
import FormError from "@magento/venia-ui/lib/components/FormError";

const ResetPassword = props => {
    const { classes: propClasses } = props;
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, propClasses);
    const talonProps = useResetPassword({ ...resetPasswordOperations });
    const {
        hasCompleted,
        loading,
        token,
        formErrors,
        handleSubmit,
        recaptchaWidgetProps
    } = talonProps;

    const [, { addToast }] = useToasts();
    useEffect(() => {
        if (hasCompleted) {
            addToast({
                type: 'info',
                message: formatMessage({
                    id: 'resetPassword.savedPasswordText',
                    defaultMessage: 'Your new password has been saved.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, hasCompleted]);

    const recoverPassword = hasCompleted ? (
        <FormattedMessage
            id={'resetPassword.successMessage'}
            defaultMessage={
                'Your new password has been saved. Please use this password to sign into your Account.'
            }
        />
    ) : (
        <Form className={classes.form} onSubmit={handleSubmit}>
            <Field
                classes={fieldClasses}
                label={formatMessage({
                    id: 'resetPassword.emailAddress',
                    defaultMessage: 'Email'
                })}
            >
                <TextInput
                    messageClasses={messageClasses}
                    classes={textInputClasses}
                    autoComplete="email"
                    field="email"
                    validate={isRequired}
                    validateOnBlur
                    mask={value => value && value.trim()}
                    maskOnBlur={true}
                    data-cy="email"
                    aria-label={formatMessage({
                        id: 'global.emailRequired',
                        defaultMessage: 'Email Required'
                    })}
                />
            </Field>
            <Password
                fieldClasses={fieldClasses}
                textInputClasses={textInputClasses}
                label={formatMessage({
                    id: 'resetPassword.newPassword',
                    defaultMessage: 'New Password'
                })}
                fieldName={'newPassword'}
                isToggleButtonHidden={false}
            />
            <GoogleReCaptcha {...recaptchaWidgetProps} />
            <div className={classes.buttonContainer}>
                <Button
                    classes={buttonClasses}
                    className={classes.submitButton}
                    type="submit"
                    priority="high"
                    disabled={loading}
                >
                    <FormattedMessage
                        id="resetPassword.submit"
                        defaultMessage="Set a new Password"
                    />
                </Button>
            </div>
            <FormError errors={formErrors} />
        </Form>
    );

    const tokenMissing = (
        <FormattedMessage
            id={'resetPassword.invalidTokenMessage'}
            defaultMessage={
                'Uh oh, something went wrong. Check the link or try again.'
            }
        />
    );

    return (
        <div className={classes.contentContainer}>
            {token ? recoverPassword : tokenMissing}
        </div>
    );
};

export default ResetPassword;

ResetPassword.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string,
        form: string,
        description: string,
        invalidToken: string,
        buttonContainer: string,
        submitButton: string,
        successMessage: string
    })
};
