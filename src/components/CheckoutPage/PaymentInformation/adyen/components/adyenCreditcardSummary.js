import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Edit2 as EditIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './adyenSummary.module.css';

const AdyenCreditCardSummary = (props) => {
    const { classes: propClasses, onEdit } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return (
        <div className={classes.root}>
            <div className={classes.heading_container}>
                <h5 className={classes.heading}>
                    <FormattedMessage
                      id={'checkoutPage.selectedPaymentMethod'}
                      defaultMessage={'Selected payment method'}
                    />
                </h5>
                <LinkButton
                    className={classes.edit_button}
                    onClick={onEdit}
                    type="button"
                >
                    <Icon
                        size={16}
                        src={EditIcon}
                        classes={{ icon: classes.edit_icon }}
                    />
                    <span className={classes.edit_text}>
                        <FormattedMessage
                            id={'global.editButton'}
                            defaultMessage={'Edit'}
                        />
                    </span>
                </LinkButton>
            </div>
            <div className={classes.card_details_container}>
                <span className={classes.payment_type}>
                    <FormattedMessage
                        id={'global.creditCard'}
                        defaultMessage={'Credit Card'}
                    />
                </span>
            </div>
        </div>
    )

}

export default AdyenCreditCardSummary
