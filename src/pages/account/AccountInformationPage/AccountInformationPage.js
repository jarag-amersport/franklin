import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'informed';
import { useIntl, FormattedMessage } from 'react-intl';

import { useAccountInformationPage } from './useAccountInformationPage';
import AccountInformationPageOperations from './accountInformationPage.gql.js';
import {
    isRequired,
    hasLengthAtLeast,
    validatePassword,
    isNotEqualToField
} from '@magento/venia-ui/lib/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import Checkbox from '../../../components/Checkbox/checkbox'
import { Message } from '@magento/venia-ui/lib/components/Field';
import FormError from '@magento/venia-ui/lib/components/FormError';
import GoogleReCaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import Password from '../../../components/Password/password';

import TextInput from '../../../components/TextInput/textInput';
import Field from '../../../components/Field/field';
import Button from '../../../components/Button/button';

import classes from './AccountInformationPage.module.css';

// TODO: These classes should be unified across the app
import fieldClasses from '../AddressBookPage/field.module.css';
import textInputClasses from './textInput.module.css';
import messageClasses from '../AddressBookPage/inputMessage.module.css';
import buttonClasses from '../AddressBookPage/button.module.css';
import checkboxClasses from './checkbox.module.css';

const AccountInformationPage = () => {
    const { formatMessage } = useIntl();
    const [successFullSubmision, setSuccessFullSubmision] = useState(false)
    const params = new URL(globalThis.location).searchParams;

    const customQueries = {...AccountInformationPageOperations}

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    });

    const {
        formErrors,
        handleChangePassword,
        handleSubmit,
        initialValues,
        isDisabled,
        loadDataError,
        shouldShowNewPassword,
        recaptchaWidgetProps
    } = talonProps;

    const showSuccessMessage = successFullSubmision && formErrors.length === 0

    const handleFormSubmission = useCallback(async (data) => {
        await handleSubmit(data)
        setSuccessFullSubmision(true)
    },[handleSubmit, setSuccessFullSubmision])

    const passwordLabel = shouldShowNewPassword
    ? formatMessage({
          id: 'global.currentPassword',
          defaultMessage: 'Current Password'
    })
    : formatMessage({
          id: 'global.password',
          defaultMessage: 'Password'
    });

    const maybeNewPasswordField = shouldShowNewPassword ? (
        <div className={classes.newPassword}>
            <Password
                fieldName="newPassword"
                label={formatMessage({
                    id: 'global.newPassword',
                    defaultMessage: 'New Password'
                })}
                validate={combine([
                    isRequired,
                    [hasLengthAtLeast, 8],
                    validatePassword,
                    [isNotEqualToField, 'password']
                ])}
                isToggleButtonHidden={false}
                textInputClasses={textInputClasses}
                messageClasses={messageClasses}
                fieldClasses={fieldClasses}
            />
        </div>
    ) : null;

    useEffect(() => {
        if(params.get('changepassword') === "true") {
            handleChangePassword()
        }
    },[params, handleChangePassword])

    const maybeChangePasswordButton = !shouldShowNewPassword ? (
        <div
            className={classes.changePasswordButtonContainer}
        >
            <button
                className={classes.changePasswordButton}
                type="button"
                onClick={handleChangePassword}
            >
                <FormattedMessage
                    id={'global.changePassword'}
                    defaultMessage={'Change Password'}
                />
            </button>
        </div>
    ) : null;


    const errorMessage = loadDataError ? (
        <Message>
            <FormattedMessage
                id={'accountInformationPage.errorTryAgain'}
                defaultMessage={
                    'Something went wrong. Please refresh and try again.'
                }
            />
        </Message>
    ) : null;

    let pageContent = null;
    if (!initialValues) {
        return fullPageLoadingIndicator;
    } else {
        const { customer } = initialValues;
        pageContent = (
            <div className={classes.root}>
                <h1>Edit Account information</h1>
                <div className={classes.section}>
                    <div className={classes.sectionHeader}>
                        <h2>Account Information</h2>
                    </div>
                    <div className={classes.sectionContent}>
                        <Form
                            className={classes.form}
                            initialValues={customer}
                            onSubmit={(data) => handleFormSubmission(data)}
                            >
                            {showSuccessMessage?'Information saved successfully':null}
                            <div className={classes.formInner}>
                                <FormError
                                    classes={{ root: classes.errorContainer }}
                                    errors={formErrors}
                                />
                                <div className={classes.firstname}>
                                    <Field
                                        id="firstname"
                                        label={formatMessage({
                                            id: 'global.firstName',
                                            defaultMessage: 'First Name'
                                        })}
                                        classes={fieldClasses}
                                    >
                                        <TextInput
                                            field="firstname"
                                            validate={isRequired}
                                            classes={textInputClasses}
                                            messageClasses={messageClasses}
                                        />
                                    </Field>
                                </div>
                                <div className={classes.lastname}>
                                    <Field
                                        id="lastname"
                                        label={formatMessage({
                                            id: 'global.lastName',
                                            defaultMessage: 'Last Name'
                                        })}
                                        classes={fieldClasses}
                                    >
                                        <TextInput
                                            field="lastname"
                                            validate={isRequired}
                                            classes={textInputClasses}
                                            messageClasses={messageClasses}
                                        />
                                    </Field>
                                </div>
                                <div className={classes.email}>
                                    <Field
                                        id="email"
                                        label={formatMessage({
                                            id: 'global.email',
                                            defaultMessage: 'Email'
                                        })}
                                        classes={fieldClasses}
                                    >
                                        <TextInput
                                            field="email"
                                            validate={isRequired}
                                            classes={textInputClasses}
                                            messageClasses={messageClasses}
                                        />
                                    </Field>
                                </div>
                                <div className={classes.password}>
                                    <Password
                                        fieldName="password"
                                        label={passwordLabel}
                                        validate={isRequired}
                                        autoComplete="current-password"
                                        isToggleButtonHidden={false}
                                        textInputClasses={textInputClasses}
                                        messageClasses={messageClasses}
                                        fieldClasses={fieldClasses}
                                    />
                                </div>
                                {maybeChangePasswordButton}
                                {maybeNewPasswordField}
                                <div className={classes.remoteAssistance}>
                                    <Checkbox
                                        id={'remoteAssistance'}
                                        field={'allow_remote_shopping_assistance'}
                                        classes={checkboxClasses}
                                        label={formatMessage({
                                            id: 'global.remoteAssistance',
                                            defaultMessage: 'Allow remote shopping assistance'
                                        })}
                                    />
                                </div>
                            </div>
                            <Button disabled={isDisabled} classes={buttonClasses} priority="high" type="submit">Save</Button>
                            <GoogleReCaptcha {...recaptchaWidgetProps} />
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

    return errorMessage ? errorMessage : pageContent
};

export default AccountInformationPage;
