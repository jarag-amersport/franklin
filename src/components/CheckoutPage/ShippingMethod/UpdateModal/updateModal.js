import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, func, number, object, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Modal from '../../../Modal';
import Button from '../../../Button';
import ShippingRadios from '../shippingRadios';
import { Form } from 'informed';

import defaultClasses from './updateModal.module.css';
import buttonClasses from '../../button.module.css';
import InlineLoadingIndicator from '../../../LoadingIndicator/InlineLoadingIndicator';

const UpdateModal = props => {
    const {
        classes: propClasses,
        formErrors,
        formInitialValues,
        handleCancel,
        handleSubmit,
        isLoading,
        isOpen,
        pageIsUpdating,
        shippingMethods
    } = props;

    const classes = useStyle(defaultClasses, propClasses);

    const bodyElement = isOpen ? (
        <Form
            className={classes.form}
            initialValues={formInitialValues}
            onSubmit={handleSubmit}
        >
            <div className={classes.radios}>
                <ShippingRadios
                    disabled={pageIsUpdating || isLoading}
                    shippingMethods={shippingMethods}
                />
            </div>
            <div className={classes.buttons}>
                <div className={classes.buttonGroup}>
                    <Button
                        classes={buttonClasses}
                        onClick={handleCancel}
                        priority="low"
                        disabled={pageIsUpdating || isLoading}
                    >
                        <FormattedMessage
                            id={"global.cancelButton"}
                            defaultMessage={"Cancel"}
                        />
                    </Button>
                    <Button
                        classes={buttonClasses}
                        type="submit"
                        priority="high"
                        disabled={pageIsUpdating || isLoading}
                    >
                        <FormattedMessage
                            id={"global.updateButton"}
                            defaultMessage={"Update"}
                        />
                    </Button>
                </div>
                {(pageIsUpdating || isLoading) && (<InlineLoadingIndicator />)}
            </div>
        </Form>
    ) : null;

    return (
        // <Dialog
        //     confirmText={'Update'}
        //     confirmTranslationId={'global.updateButton'}
        //     formProps={dialogFormProps}
        //     isOpen={isOpen}
        //     onCancel={handleCancel}
        //     onConfirm={handleSubmit}
        //     shouldDisableAllButtons={dialogButtonsDisabled}
        //     shouldDisableConfirmButton={dialogSubmitButtonDisabled}
        //     shouldUnmountOnHide={false}
        //     title={formatMessage({
        //         id: 'checkoutPage.editShippingMethod',
        //         defaultMessage: 'Edit Shipping Method'
        //     })}
        //     data-cy="ShippingMethod-updateModal"
        // >
        // <FormError
        //     classes={{ root: classes.errorContainer }}
        //     errors={formErrors}
        // />
        // </Dialog>
        <Modal isOpen={isOpen}>
            <div className={classes.header}>
                <span className={classes.headerText}>
                    <FormattedMessage
                        id={'checkoutPage.editShippingMethod.header'}
                        defaultMessage={'Shipping Method'}
                    />
                </span>
            </div>
            <div className={classes.body}>
                {bodyElement}
            </div>
        </Modal>
    );
};

export default UpdateModal;
