import React, { Fragment, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { Form } from 'informed';

import { useStyle } from '@magento/venia-ui/lib/classify';
import FormError from '@magento/venia-ui/lib/components/FormError';
import Button from '../../Button'
import InlineLoadingIndicator from '../../LoadingIndicator/InlineLoadingIndicator';

import defaultClasses from "./addressForm.module.css";
import buttonClasses from '../button.module.css';
import InnerAddressForm from './innerAddressForm';

const AddressForm = props => {
    const {
        classes: propClasses,
        errors,
        handleCancel,
        handleSubmit,
        hasDefaultShipping,
        initialValues,
        isSaving,
        isCancelable,
        submitButtonText,
        handleValidateEmail,
        additionalFormFields,
        setRegionMappings,
        parentFormRef
    } = props;

    const formApiRef = useRef();
    const getFormApi = api => {
        formApiRef.current = api;
        if (parentFormRef) {
          parentFormRef.current = api;
        }
    };

    const classes = useStyle(defaultClasses, propClasses);

    const innerFormProps = {
        hasDefaultShipping,
        handleValidateEmail,
        additionalFormFields,
        setRegionMappings,
        formApiRef
    }

    return (
        <Fragment>
            <FormError errors={Array.from(errors.values())} allowErrorMessages={true}/>
            <Form
                className={classes.root}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                getApi={getFormApi}
            >
                <InnerAddressForm {...innerFormProps} />
                <div className={classes.buttons}>
                    <div className={classes.buttonGroup}>
                        {isCancelable && (
                            <Button
                                disabled={isSaving}
                                onClick={handleCancel}
                                priority="low"
                                classes={buttonClasses}
                            >
                                <FormattedMessage
                                    id={"global.cancelButton"}
                                    defaultMessage={"Cancel"}
                                />
                            </Button>
                        )}
                        <Button
                            disabled={isSaving}
                            priority="high"
                            type="submit"
                            classes={buttonClasses}
                        >
                            {submitButtonText}
                        </Button>
                    </div>
                    {isSaving && (<InlineLoadingIndicator />)}
                </div>
            </Form>
        </Fragment>
    );
};

export default AddressForm;
