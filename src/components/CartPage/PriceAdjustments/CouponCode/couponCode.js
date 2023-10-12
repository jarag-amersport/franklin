import React, { Fragment, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { useToasts } from '@magento/peregrine';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import { useCouponCode } from '../../../../talons/CartPage/PriceAdjustments/CouponCode/useCouponCode';
import Button from '../../../Button/button';
import { Form } from 'informed';
import Icon from '@magento/venia-ui/lib/components/Icon';
import TextInput from '@magento/venia-ui/lib/components/TextInput';

import buttonClasses from './button.module.css';
import inputClasses from './input.module.css';
import classes from './couponCode.module.css';

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);

/**
 * A child component of the PriceAdjustments component.
 * This component renders a form for addingg a coupon code to the cart.
 *
 * @param {Object} props
 * @param {Function} props.setIsCartUpdating Function for setting the updating state for the cart.
 * @param {Object} props.classes CSS className overrides.
 * See [couponCode.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCode.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CouponCode from "@magento/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode";
 */
const CouponCode = props => {
    const talonProps = useCouponCode({
        setIsCartUpdating: props.setIsCartUpdating
    });
    const [, { addToast }] = useToasts();
    const {
        applyingCoupon,
        data,
        errors,
        handleApplyCoupon,
        handleRemoveCoupon,
        removingCoupon
    } = talonProps;
    const { formatMessage } = useIntl();

    const removeCouponError = deriveErrorMessage([
        errors.get('removeCouponMutation')
    ]);

    useEffect(() => {
        if (removeCouponError) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: removeCouponError,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, removeCouponError]);

    if (!data) {
        return null;
    }

    if (errors.get('getAppliedCouponsQuery')) {
        return (
            <div className={classes.errorContainer}>
                <FormattedMessage
                    id={'couponCode.errorContainer'}
                    defaultMessage={
                        'Something went wrong. Please refresh and try again.'
                    }
                />
            </div>
        );
    }

    if (data.cart.applied_coupons) {
        const codes = data.cart.applied_coupons.map(({ code }) => {
            return (
                <Fragment key={code}>
                    <div className={classes.promoCodeApplied}>
                    <div className={classes.title}>Applied</div>
                    <div className={classes.promoCodeAppliedList}>
                    <span className={classes.appliedCodeEntry}>{code}</span>
                    <span className={classes.appliedCodeAction}>
                    <Button
                            data-cy="CouponCode-removeCouponButton"
                            classes={buttonClasses}
                            className={classes.removeButton}
                            priority={'normal'}
                            onClick={() => {
                                handleRemoveCoupon(code);
                            }}
                        >
                            ✖
                    </Button>
                    </span>
                    </div>
                    </div>
                </Fragment>
            );
        });

        return <div className={classes.appliedCoupon}>{codes}</div>;
    } else {
        const errorMessage = deriveErrorMessage([
            errors.get('applyCouponMutation')
        ]);

        const formClass = errorMessage
            ? classes.entryFormError
            : classes.entryForm;

        return (
            <Form
                data-cy="CouponCode-form"
                className={formClass}
                onSubmit={handleApplyCoupon}
            >
                <div className={classes.root}>
                    <div className={classes.fieldPromoCode}>
                        <div className={classes.fieldPromoCodeText} id={"couponCode"}>
                            {formatMessage({
                                id: 'cartPage.useAPromoCode',
                                defaultMessage: 'Use a Promo Code'
                            })}
                        </div>
                        <div className={classes.fieldPromoCodeForm}>
                            <div>
                                <TextInput
                                    field="couponCode"
                                    id={'couponCode'}
                                    data-cy="CouponCode-couponCode"
                                    classes={inputClasses}
                                    placeholder={formatMessage({
                                        id: 'couponCode.enterCode',
                                        defaultMessage: 'Enter your code'
                                    })}
                                    mask={value => value && value.trim()}
                                    maskOnBlur={true}
                                    message={errorMessage}
                                />
                            </div>
                            <div className={classes.fieldApply}>
                                <Button
                                    data-cy="CouponCode-submit"
                                    disabled={applyingCoupon}
                                    priority={'normal'}
                                    type={'submit'}
                                    classes={buttonClasses}
                                    className={classes.applyButton}
                                >
                                    <FormattedMessage
                                        id={'couponCode.applyPromo'}
                                        defaultMessage={'Apply Promo'}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
};

export default CouponCode;
