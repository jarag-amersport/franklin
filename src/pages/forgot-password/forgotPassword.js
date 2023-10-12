import React, { Fragment } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { func, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { useForgotPassword } from '@magento/peregrine/lib/talons/ForgotPassword/useForgotPassword';

import defaultClasses from './forgotPassword.module.css';
import FormSubmissionSuccessful from "@magento/venia-ui/lib/components/ForgotPassword/FormSubmissionSuccessful";
import * as PropTypes from "prop-types";

import forgotPasswordOperations from './forgotPassword.gql';
import Field from "../../components/Field/field";
import TextInput from "../../components/TextInput/textInput";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";
import GoogleReCaptcha from "@magento/venia-ui/lib/components/GoogleReCaptcha";
import Button from "../../components/Button/button";
import {Form} from "informed";

import fieldClasses from './field.module.css';
import textInputClasses from './textInput.module.css';
import messageClasses from './inputMessage.module.css';
import buttonClasses from './button.module.css';

function FormErrors(props) {
    return null;
}

FormErrors.propTypes = {errors: PropTypes.arrayOf(PropTypes.any)};
const ForgotPassword = props => {
    const { initialValues, onCancel } = props;

    const { formatMessage } = useIntl();
    const talonProps = useForgotPassword({
        onCancel,
        ...forgotPasswordOperations
    });

    const {
        forgotPasswordEmail,
        formErrors,
        handleFormSubmit,
        hasCompleted,
        isResettingPassword,
        recaptchaWidgetProps
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const INFO = formatMessage({
        id: 'forgotPassword.info',
        defaultMessage:
            'Please enter your email address below to receive a password reset link.'
    });
    const children = hasCompleted ? (
        <FormSubmissionSuccessful email={forgotPasswordEmail} />
    ) : (
        <Fragment>
            <Form
                className={classes.root}
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                data-cy="forgotPassword-root"
            >
                <p data-cy="ForgotPassword-info" className={classes.info}>
                    {INFO}
                </p>
                <Field
                    classes={fieldClasses}
                    label={formatMessage({
                        id: 'forgotPassword.emailAddress',
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
                <GoogleReCaptcha {...recaptchaWidgetProps} />
                <Button
                    classes={buttonClasses}
                    className={classes.submitButton}
                    disabled={isResettingPassword}
                    type="submit"
                    priority="high"
                    data-cy="forgotPassword-submitButton"
                >
                    <FormattedMessage
                        id={'forgotPassword.submitButton'}
                        defaultMessage={'Reset my password'}
                    />
                </Button>
            </Form>
            <FormErrors errors={formErrors} />
        </Fragment>
    );

    return <div className={classes.root}>{children}</div>;
};

export default ForgotPassword;

ForgotPassword.propTypes = {
    classes: shape({
        info: string,
        fieldset: string,
        root: string
    }),
    initialValues: shape({
        email: string
    }),
    onCancel: func
};

ForgotPassword.defaultProps = {
    onCancel: () => {}
};
