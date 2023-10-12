import React, { Suspense, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Form } from 'informed';
import { shape, func, string, bool, instanceOf } from 'prop-types';

import { usePaymentInformation } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/usePaymentInformation';
import CheckoutError from '@magento/peregrine/lib/talons/CheckoutPage/CheckoutError';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './paymentInformation.module.css';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { CHECKOUT_STEP } from '../useCheckoutPage';

const PaymentMethods = React.lazy(() => import('./paymentMethods'));
const EditModal = React.lazy(() => import('./editModal'));
const Summary = React.lazy(() => import('./summary'));

const PaymentInformation = props => {
    const {
        classes: propClasses,
        stepState,
        onSave,
        resetShouldSubmit,
        setCheckoutStep,
        shouldSubmit,
        checkoutError,
        checkoutStep
    } = props;

    const classes = useStyle(defaultClasses, propClasses);

    const talonProps = usePaymentInformation({
        onSave,
        checkoutError,
        resetShouldSubmit,
        setCheckoutStep,
        shouldSubmit
    });

    const displayPaymentError = new URLSearchParams(window.location.search).has('paymentError');
    useEffect(() => {
        if (displayPaymentError && checkoutStep === CHECKOUT_STEP.REVIEW) {
            const url = new URL(window.location);
            url.searchParams.delete('paymentError');
            window.history.replaceState({}, '', url);
        }
    }, [checkoutStep]);

    const {
        doneEditing,
        handlePaymentError,
        handlePaymentSuccess,
        hideEditModal,
        isLoading,
        isEditModalActive,
        showEditModal
    } = talonProps;

    const onEdit = () => {
      setCheckoutStep(CHECKOUT_STEP.PAYMENT);
    }

    if (isLoading) {
        return (
            <LoadingIndicator classes={{ root: classes.loading }}>
                <FormattedMessage
                    id={'checkoutPage.loadingPaymentInformation'}
                    defaultMessage={'Fetching Payment Information'}
                />
            </LoadingIndicator>
        );
    }

    const paymentInformation = checkoutStep >= CHECKOUT_STEP.REVIEW ? (
        <Summary onEdit={onEdit} />
    ) : (
        <Form>
            <PaymentMethods
                onPaymentError={handlePaymentError}
                onPaymentSuccess={handlePaymentSuccess}
                resetShouldSubmit={resetShouldSubmit}
                shouldSubmit={shouldSubmit}
            />
        </Form>
    );

    const editModal = doneEditing ? (
        <Suspense fallback={null}>
            <EditModal onClose={hideEditModal} isOpen={isEditModalActive} />
        </Suspense>
    ) : null;

    return (
        <div className={classes.root} data-cy="PaymentInformation-root">
            <div className={classes.payment_info_container}>
              <h3 className={stepState ? classes.stepTitle : classes.stepTitleInactive}>
                <FormattedMessage
                  id={'paymentInformation.cardTitle'}
                  defaultMessage={'STEP 2. Payment Information'}
                />
              </h3>
              {stepState && displayPaymentError && (<div className={classes.payment_failed_message}>
                <FormattedMessage
                    id={'paymentInformation.paymentFailed'}
                    defaultMessage={'Payment failed. Please try again.'}
                    />
              </div>)}
              <Suspense fallback={null}>{paymentInformation}</Suspense>
            </div>
            {editModal}
        </div>
    );
};

export default PaymentInformation;

PaymentInformation.propTypes = {
    classes: shape({
        container: string,
        payment_info_container: string,
        review_order_button: string,
        stepTitle: string,
        stepTitleInactive: string,
    }),
    onSave: func.isRequired,
    checkoutError: instanceOf(CheckoutError),
    resetShouldSubmit: func.isRequired,
    shouldSubmit: bool
};
