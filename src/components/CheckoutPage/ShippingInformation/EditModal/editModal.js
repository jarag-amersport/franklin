import React from 'react';
import { FormattedMessage } from 'react-intl';
import { object, shape, string } from 'prop-types';
import { useEditModal } from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/useEditModal';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { ShippingAddressForm } from '../../AddressForm';
import Modal from '../../../Modal';

import defaultClasses from './editModal.module.css';
import formClasses from './editModalForm.module.css';

const EditModal = props => {
    const { classes: propClasses, shippingData, onSuccess } = props;
    const talonProps = useEditModal();
    const { handleClose, isOpen } = talonProps;

    const classes = useStyle(defaultClasses, propClasses);

    // Unmount the form to force a reset back to original values on close
    const bodyElement = isOpen ? (
        <ShippingAddressForm
            onSuccess={onSuccess}
            afterSubmit={handleClose}
            onCancel={handleClose}
            isCancelable={true}
            shippingData={shippingData}
            classes={formClasses}
        />
    ) : null;

    return (
        <Modal isOpen={isOpen} classes={propClasses}>
            <div className={classes.header}>
                <span className={classes.headerText}>
                    <FormattedMessage
                        id={'checkoutPage.editShippingInfo.header'}
                        defaultMessage={'Shipping Address'}
                    />
                </span>
            </div>
            <div className={classes.body}>{bodyElement}</div>
        </Modal>
    );
};

export default EditModal;

EditModal.propTypes = {
    classes: shape({
        root: string,
        root_open: string,
        body: string,
        header: string,
        headerText: string
    }),
    shippingData: object
};
