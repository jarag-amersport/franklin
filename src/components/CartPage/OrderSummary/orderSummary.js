import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { func } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './orderSummary.module.css';
import CouponCode from '../PriceAdjustments/CouponCode';
import PriceSummary from '../PriceSummary';


const OrderSummary = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const { setIsCartUpdating } = props;
    const { formatMessage } = useIntl();

    return (
        <div className={classes.root} data-cy="PriceAdjustments-root">
            <div className={classes.orderSummaryTitle}>
                <strong>Order Summary</strong>
            </div>
            <CouponCode setIsCartUpdating={setIsCartUpdating} />
            <PriceSummary />
            <div className={classes.goToCheckout}>
            <a
                        data-cy="goToCheckout"
                        href="/checkout"
                    >
                        <FormattedMessage
                            id={'goToCheckout'}
                            defaultMessage={'Go to Checkout'}
                        />
                    </a>
            </div>
        </div>
    );
};

export default OrderSummary;

OrderSummary.propTypes = {
    setIsCartUpdating: func
};
