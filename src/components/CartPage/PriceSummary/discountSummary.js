import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import classes from './discountSummary.module.css';
import { useDiscountSummary } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/useDiscountSummary';

const MINUS_SYMBOL = '-';

/**
 * A component that renders the discount summary line item.
 *
 * @param {Object} props.classes
 * @param {Object} props.data fragment response data
 */
const DiscountSummary = props => {
    const { formatMessage } = useIntl();

    const {
        totalDiscount,
        discountData,
    } = useDiscountSummary(props);

    return totalDiscount.value ? (
        <Fragment>
    {discountData.map(discount => {
                    return (
                        <li
                            className={classes.individualDiscountsListLineItem}
                            key={discount.label}
                        >
                            <span
                                className={classes.lineItemLabel}
                                data-cy="DiscountSummary-IndividualDiscount-Label"
                            >
                                <span data-cy="DiscountSummary-IndividualDiscount-DiscountLabel">
                                    {discount.label}
                                </span>
                            </span>
                            <span
                                data-cy="DiscountSummary-IndividualDiscount-DiscountValue"
                                className={classes.price}
                            >
                                {MINUS_SYMBOL}
                                <Price
                                    value={discount.amount.value}
                                    currencyCode={discount.amount.currency}
                                />
                            </span>
                        </li>
                    );
                })}
        </Fragment>
    ) : null;
};

export default DiscountSummary;
