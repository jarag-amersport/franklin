import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from 'informed';
import { func, shape, string, bool } from 'prop-types';
import Button from '../../components/Button/button';
import { useCreateAccount } from '../../talons/CreateAccountPage/useCreateAccount';
import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import {
  hasLengthAtLeast,
  isRequired,
  validatePassword
} from '@magento/venia-ui/lib/util/formValidators';
import Field from '../../components/Field/field';
import TextInput from '../../components/TextInput/textInput';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Password from '../../components/Password/password';
import GoogleRecaptcha from '@magento/venia-ui/lib/components/GoogleReCaptcha';
import defaultClasses from './createAccount.module.css';
import fieldClasses from './field.module.css';
import textInputClasses from './textInput.module.css';
import messageClasses from './inputMessage.module.css';
import buttonClasses from './button.module.css';
import { CREATE_ACCOUNT } from './mutations.gql.js';
import Select from '../../components/Select/select';
import Country from '../../components/Country/country';
import useRegion from '../../talons/CreateAccountPage/useRegion';

const validateDate = (value, values, fieldKey) => {
  const message = {
    id: 'validation.validDate',
    defaultMessage: '{value} must be a date with format mm/dd/yyyy.',
    value
  };
  if (!value.match(/\d\d?\/\d\d?\/\d\d\d\d/)) {
    return message;
  }

  if (isNaN(Date.parse(value))) {
    return message;
  }
};

const validateSelect = (value) => {
  if (!value) {
    return {
      id: 'validation.state',
      defaultMessage: 'Please select a state.'
    }
  }
};

const StateField = (props) => {
  const {
    classes,
    label,
    textInputClasses
  } = props;

  const { loading, regions } = useRegion();

  console.log(regions)

  return <Field
    classes={classes}
    id="state"
    label={label}
  >
    <Select
      items={regions}
      messageClasses={messageClasses}
      classes={textInputClasses}
      id="state"
      field="customer.state"
      autoComplete="state"
      validate={validateSelect}
      validateOnBlur
      mask={value => value && value.trim()}
      maskOnBlur={true}
      data-cy="customer-state"
      aria-label='State Required'
    />
  </Field>;
}

const CreateAccount = props => {
  const talonProps = useCreateAccount({
    initialValues: props.initialValues,
    onSubmit: () => {
      window.location = '/customer/account/login';
    },
    onCancel: props.onCancel,
    operations: {
      createAccountMutation: CREATE_ACCOUNT
    }
  });

  const {
    errors,
    handleCancel,
    handleSubmit,
    handleEnterKeyPress,
    isDisabled,
    initialValues,
    recaptchaWidgetProps
  } = talonProps;
  const { formatMessage } = useIntl();
  const classes = useStyle(defaultClasses, props.classes);

  const submitButton = (
    <Button
      classes={buttonClasses}
      className={classes.submitButton}
      disabled={isDisabled}
      type="submit"
      priority="high"
      onKeyDown={handleEnterKeyPress}
      data-cy="CreateAccount-submitButton"
    >
      <FormattedMessage
        id={'createAccount.createAccountText'}
        defaultMessage={'Create an Account'}
      />
    </Button>
  );

  return (
    <Form
      data-cy="CreateAccount-form"
      className={classes.root}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <FormError classes={classes} errors={Array.from(errors.values())} allowErrorMessages={true} />
      <h2 className={classes['form-section']}>Personal Information</h2>
      <Field
        classes={fieldClasses}
        id="firstName"
        label={formatMessage({
          id: 'createAccount.firstNameText',
          defaultMessage: 'First Name'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="firstName"
          field="customer.firstname"
          autoComplete="given-name"
          validate={isRequired}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-firstname"
          aria-label={formatMessage({
            id: 'global.firstNameRequired',
            defaultMessage: 'First Name Required'
          })}
        />
      </Field>
      <Field
        classes={fieldClasses}
        id="lastName"
        label={formatMessage({
          id: 'createAccount.lastNameText',
          defaultMessage: 'Last Name'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="lastName"
          field="customer.lastname"
          autoComplete="family-name"
          validate={isRequired}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-lastname"
          aria-label={formatMessage({
            id: 'global.lastNameRequired',
            defaultMessage: 'Last Name Required'
          })}
        />
      </Field>
      <Field
        classes={fieldClasses}
        id="dateOfBirth"
        label={formatMessage({
          id: 'createAccount.dateOfBirthText',
          defaultMessage: 'Date of Birth'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="dateOfBirth"
          field="customer.dateofbirth"
          autoComplete="bday"
          validate={combine([isRequired, validateDate])}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-dateofbirth"
          aria-label={formatMessage({
            id: 'global.dateOfBirthRequired',
            defaultMessage: 'Date of Birth Required'
          })}
        />
      </Field>
      <h2 className={classes['form-section']}>Address Information</h2>
      <Field
        classes={fieldClasses}
        id="streetAddress"
        label={formatMessage({
          id: 'createAccount.streetAddress',
          defaultMessage: 'Street Address'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="streetAddress1"
          field="customer.streetAddress1"
          autoComplete="address"
          validate={isRequired}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-streetAddress1"
          aria-label={formatMessage({
            id: 'global.streetAddressRequired',
            defaultMessage: 'Street Address Required'
          })}
        />
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="streetAddress2"
          field="customer.streetAddress2"
          autoComplete="address"
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-streetAddress2"
          aria-label={formatMessage({
            id: 'global.streetAddressRequired',
            defaultMessage: 'Street Address Required'
          })}
        />
      </Field>
      <Field
        classes={fieldClasses}
        id="city"
        label={formatMessage({
          id: 'createAccount.city',
          defaultMessage: 'City'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="city"
          field="customer.city"
          autoComplete="city"
          validate={isRequired}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-city"
          aria-label={formatMessage({
            id: 'global.cityRequired',
            defaultMessage: 'City Required'
          })}
        />
      </Field>
      <Field
        classes={fieldClasses}
        id="country"
        label={formatMessage({
          id: 'createAccount.country',
          defaultMessage: 'Country'
        })}
      >
        <Select
          items={[{ key: 'US', value: 'US', label: 'United States' }]}
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="country"
          field="customer.country"
          autoComplete="country"
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-city"
          aria-label={formatMessage({
            id: 'global.cityRequired',
            defaultMessage: 'City Required'
          })}
        />
      </Field>
      <Field
        classes={fieldClasses}
        id="zip`"
        label={formatMessage({
          id: 'createAccount.zip',
          defaultMessage: 'Zip/Postal Code'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="zip"
          field="customer.zip"
          autoComplete="zip"
          validate={isRequired}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-zip"
          aria-label={formatMessage({
            id: 'global.zipRequired',
            defaultMessage: 'zip Required'
          })}
        />
      </Field>
      <StateField
        classes={fieldClasses}
        textInputClasses={textInputClasses}
        label={formatMessage({
          id: 'createAccount.state',
          defaultMessage: 'State/Region'
        })}
      />
      <Field
        classes={fieldClasses}
        id="phoneNumber"
        label={formatMessage({
          id: 'createAccount.phoneNumberText',
          defaultMessage: 'Phone Number'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="phoneNumber"
          field="customer.phonenumber"
          autoComplete="phone"
          validate={isRequired}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-phonenumber"
          aria-label={formatMessage({
            id: 'global.phoneNumberRequired',
            defaultMessage: 'Phone Number Required'
          })}
        />
      </Field>
      <h2 className={classes['form-section']}>Sign-In Information</h2>
      <Field
        classes={fieldClasses}
        id="Email"
        label={formatMessage({
          id: 'createAccount.emailText',
          defaultMessage: 'Email'
        })}
      >
        <TextInput
          messageClasses={messageClasses}
          classes={textInputClasses}
          id="Email"
          field="customer.email"
          autoComplete="email"
          validate={isRequired}
          validateOnBlur
          mask={value => value && value.trim()}
          maskOnBlur={true}
          data-cy="customer-email"
          aria-label={formatMessage({
            id: 'global.emailRequired',
            defaultMessage: 'Email Required'
          })}
        />
      </Field>
      <Password
        messageClasses={messageClasses}
        textInputClasses={textInputClasses}
        fieldClasses={fieldClasses}
        id="Password"
        autoComplete="new-password"
        fieldName="password"
        isToggleButtonHidden={false}
        label={formatMessage({
          id: 'createAccount.passwordText',
          defaultMessage: 'Password'
        })}
        validate={combine([
          isRequired,
          [hasLengthAtLeast, 8],
          validatePassword
        ])}
        validateOnBlur
        mask={value => value && value.trim()}
        maskOnBlur={true}
        data-cy="password"
        aria-label={formatMessage({
          id: 'global.passwordRequired',
          defaultMessage: 'Password Required'
        })}
      />
      <GoogleRecaptcha {...recaptchaWidgetProps} />
      <div className={classes.actions}>
        {submitButton}
      </div>
    </Form>
  );
};

CreateAccount.propTypes = {
  classes: shape({
    actions: string,
    lead: string,
    root: string,
    subscribe: string
  }),
  initialValues: shape({
    email: string,
    firstName: string,
    lastName: string
  }),
  isCancelButtonHidden: bool,
  onSubmit: func,
  onCancel: func
};

CreateAccount.defaultProps = {
  onCancel: () => { },
  isCancelButtonHidden: true
};

export default CreateAccount;
