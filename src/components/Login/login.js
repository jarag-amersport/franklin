import React from 'react';

import { useStyle } from '@magento/peregrine/lib/context/style';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Button from '../Button/button';
import Field from '../Field/field';
import TextInput from '../TextInput/textInput';
import Password from '../Password/password';

import messageClasses from './inputMessage.module.css';
import defaultClasses from './login.module.css';
import textInputClasses from './textInput.module.css';
import buttonClasses from './button.module.css';
import fieldClasses from './field.module.css';

import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import FormError from '@magento/venia-ui/lib/components/FormError/formError';
import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import { useSignIn } from '@magento/peregrine/lib/talons/SignIn/useSignIn';
import { FormattedMessage, useIntl } from 'react-intl';
import { func, shape, string } from 'prop-types';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { GET_CART_DETAILS_QUERY } from '@magento/venia-ui/lib/components/SignIn/signIn.gql';
import { useSignInPage } from '@magento/peregrine/lib/talons/SignInPage/useSignInPage';
import { Form } from 'informed';

const SignIn = props => {
  const classes = useStyle(defaultClasses, props.classes);
  const {
    setDefaultUsername,
    showCreateAccount,
    showForgotPassword,
    initialValues,
    signedInRedirectUrl
  } = props;

  const { formatMessage } = useIntl();
  const talonProps = useSignIn({
    getCartDetailsQuery: GET_CART_DETAILS_QUERY,
    setDefaultUsername,
    showCreateAccount,
    showForgotPassword
  });

  const {
    errors,
    handleCreateAccount,
    handleEnterKeyPress,
    handleForgotPassword,
    handleSubmit,
    isBusy,
    setFormApi,
    recaptchaWidgetProps
  } = talonProps;

  const wrappedHandleSubmit = async values => {
    await handleSubmit(values);
    window.location = signedInRedirectUrl;
  };

  const forgotPasswordClasses = {
    root: classes.forgotPasswordButton
  };

  return (
    <div data-cy="SignIn-root" className={classes.root}>
      <div className={classes['login-container']}>
        <div className={classes['grid-header']}>
          <h1 className={classes.header1}>Customer login</h1>
        </div>
        <div className={classes['grid-login']}>
          <h1 className={classes.header2}>Registered</h1>
          <span className={classes['desc-text']}><FormattedMessage
            id={'signIn.signInDescText'}
            defaultMessage={'If you have an account, sign in with your email address.'}
          /></span>
          <br />
          <span className={classes['desc-2-text']}><FormattedMessage
            id={'signIn.signInDesc2Text'}
            defaultMessage={'For more account benefits details click'}
          /> <a className={classes['desc-2-text-link']} href={'/my-account-faq'}><FormattedMessage
            id={'signIn.signInDesc2TextLink'}
            defaultMessage={'here'}
            /></a>
          </span>
          <FormError classes={{
            root: classes.root,
            errorMessage: classes['error-message']
          }} errors={Array.from(errors.values())}/>
          <Form
            getApi={setFormApi}
            className={classes.form}
            onSubmit={wrappedHandleSubmit}
            data-cy="SignIn-form"
            initialValues={initialValues && initialValues}
          >
            <Field
              id="email"
              label={formatMessage({
                id: 'signIn.emailAddressText',
                defaultMessage: 'Email address'
              })}
            >
              <TextInput
                classes={textInputClasses}
                fieldClasses={fieldClasses}
                messageClasses={messageClasses}
                id="email"
                data-cy="SignIn-email"
                autoComplete="email"
                field="email"
                validate={isRequired}
                data-cy="email"
                aria-label={formatMessage({
                  id: 'global.emailRequired',
                  defaultMessage: 'Email Required'
                })}
              />
            </Field>
            <Password
              textInputClasses={textInputClasses}
              fieldClasses={fieldClasses}
              messageClasses={messageClasses}
              data-cy="SignIn-password"
              fieldName="password"
              id="Password"
              label={formatMessage({
                id: 'signIn.passwordText',
                defaultMessage: 'Password'
              })}
              validate={isRequired}
              autoComplete="current-password"
              isToggleButtonHidden={false}
              data-cy="password"
              aria-label={formatMessage({
                id: 'global.passwordRequired',
                defaultMessage: 'Password Required'
              })}
            />
            <GoogleRecaptcha {...recaptchaWidgetProps} />
            <div className={classes.buttonsContainer}>
              <Button
                classes={buttonClasses}
                priority="high"
                type="submit"
                data-cy="SignInButton-root_highPriority"
                disabled={isBusy}
              >
                <FormattedMessage
                  id={'signIn.signInText'}
                  defaultMessage={'Sign In'}
                />
              </Button>
              <LinkButton
                classes={forgotPasswordClasses}
                type="button"
                onClick={handleForgotPassword}
                data-cy="SignIn-forgotPasswordButton"
              >
                <FormattedMessage
                  id={'signIn.forgotPasswordText'}
                  defaultMessage={'Forgot Password?'}
                />
              </LinkButton>
            </div>
            <span className={classes['mandatory-fields-message']}>
              <FormattedMessage
                id={'signIn.mandatoryFieldsMessage'}
                defaultMessage={'* Required fields'}
              />
            </span>
          </Form>
        </div>
        <div className={classes['grid-new-customer']}>
          <h1 className={classes.header2}>New customers</h1>
          <div className={classes['new-customer-container']}>
            <div className={classes['new-customer-description']}>
          <span className={classes['desc-text']}><FormattedMessage
            id={'signIn.createAccountDescription'}
            defaultMessage={'Creating an account has many benefits: check out faster, keep more than one address, track orders and more.'}
          /></span>
            </div>
            <div className={classes['new-customer-actions']}>
              <Button
                classes={buttonClasses}
                priority="normal"
                type="button"
                onClick={handleCreateAccount}
                data-cy="CreateAccount-initiateButton"
                onKeyDown={handleEnterKeyPress}
              >
                <FormattedMessage
                  id={'signIn.createAccountText'}
                  defaultMessage={'Create an Account'}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  classes: shape({
    buttonsContainer: string,
    form: string,
    forgotPasswordButton: string,
    forgotPasswordButtonContainer: string,
    root: string,
    title: string
  }),
  setDefaultUsername: func,
  showCreateAccount: func,
  showForgotPassword: func,
  initialValues: shape({
    email: string.isRequired
  })
};
SignIn.defaultProps = {
  setDefaultUsername: () => {
  },
  showCreateAccount: () => {
  },
  showForgotPassword: () => {
  }
};

const SignInPage = props => {
  const classes = useStyle(defaultClasses, props.classes);
  const { signInProps } = useSignInPage(props);
  const { formatMessage } = useIntl();

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>
        {formatMessage({
          id: 'signInPage.header',
          defaultMessage: 'Customer Login'
        })}
      </h1>
      <div className={classes.contentContainer}>
        <SignIn {...signInProps} signedInRedirectUrl={props.signedInRedirectUrl}  />
      </div>
    </div>
  );
};

SignInPage.defaultProps = {
  createAccountPageUrl: '/customer/account/create',
  forgotPasswordPageUrl: '/customer/account/forgotpassword',
  signedInRedirectUrl: '/customer/account'
};

SignInPage.propTypes = {
  classes: shape({
    root: string,
    header: string,
    contentContainer: string
  }),
  createAccountPageUrl: string,
  forgotPasswordPageUrl: string,
  signedInRedirectUrl: string
};

/**
 * @RootComponent
 * description = 'Basic Account Page'
 * pageTypes = ACCOUNT
 */
function Login() {
  const [, redirectIfSignedIn] = useProtectedPage(true);
  redirectIfSignedIn(new URL(window.location).searchParams.get('login_redirect'));

  return <SignInPage
    signedInRedirectUrl="/customer/account"
    createAccountPageUrl="/customer/account/create"
    forgotPasswordPageUrl="/customer/account/forgotpassword"/>;
}

export default Login;
