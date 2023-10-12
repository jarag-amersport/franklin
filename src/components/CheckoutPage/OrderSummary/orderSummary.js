import React from 'react';
import { FormattedMessage } from 'react-intl';
import PriceSummary from '../../CartPage/PriceSummary';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './orderSummary.module.css';
import ItemsInBag from './ItemsInBag/itemsInBag';

const OrderSummary = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div data-cy="OrderSummary-root" className={classes.root}>
            <div className={classes.title}>
                <FormattedMessage
                    id={'checkoutPage.orderSummary'}
                    defaultMessage={'Order Summary'}
                />
            </div>
            <PriceSummary isUpdating={props.isUpdating} />
            <ItemsInBag cartItems={props.cartItems} />
        </div>
    );
};

export default OrderSummary;
