import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string } from 'prop-types';

import defaultClasses from './orderConfirmationPage.module.css';
import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import FeedbackPicker from "../../../components/FeedbackPicker/feedbackPicker";
import { useUserContext } from '@magento/peregrine/lib/context/user';

const OrderConfirmationPage = props => {
    const [{ isSignedIn }] = useUserContext();

    const classes = useStyle(defaultClasses, props.classes);
    const { orderNumber } = props;

    const [ratingState, setRatingState] = useState(0); // 0 = ready; 1 = pending; 2 = success
    const handleRating = async (rating) => {
      setRatingState(1);
      const { getMagentoStorefrontEvents } = await import(/* webpackIgnore: true */ '/scripts/commerce.js');
      void getMagentoStorefrontEvents((mse) => {
        if (!mse || ratingState > 1) {
          return;
        }
        window.adobeDataLayer = window.adobeDataLayer || [];
        window.adobeDataLayer.push({
          "order-rating": {
            "orderNumber": orderNumber,
            "rating": rating
          }
        });
        setRatingState(2);
      });
    }

    return (
        <div className={classes.root} data-cy="OrderConfirmationPage-root">
            <h1 className={classes.header}>
                <FormattedMessage
                    id={'checkoutConfirmationPage.header'}
                    defaultMessage={'Thank you'}
                />
            </h1>
            <p className={classes.info}>
                <FormattedMessage
                    id={'checkoutConfirmationPage.orderInfo'}
                    defaultMessage={'Order number {orderNumberLink} has been placed.'}
                    values={{
                        orderNumberLink: (isSignedIn ?
                            <a href={`/customer/order-history?order=${orderNumber}`} className={classes.orderNumber}>
                                <FormattedMessage
                                id="{'checkoutConfirmationPage.orderNumber'}"
                                defaultMessage="#{orderNumber}"
                                values={{orderNumber}}
                                />
                            </a> :
                            <span className={classes.orderNumber}>
                              <FormattedMessage
                                id="{'checkoutConfirmationPage.orderNumber'}"
                                defaultMessage="#{orderNumber}"
                                values={{orderNumber}}
                              />
                            </span>
                        )
                    }}
                />
            </p>
            <p className={classes.info}>
                <FormattedMessage
                    id={'checkoutConfirmationPage.additionalInfo'}
                    defaultMessage={'Please check your email for confirmation.'}
                />
            </p>

            <div className={classes.feedback}>
                {ratingState > 1 ?
                    <div className={classes.feedbackThankYou}>
                        <FormattedMessage
                            id={'checkoutConfirmationPage.feedbackThankYou'}
                            defaultMessage={'Thank you for your feedback!'}
                        />
                    </div> :
                    <>
                        <p className={classes.info}>
                            <FormattedMessage
                                id={'checkoutConfirmationPage.feedbackInfo'}
                                defaultMessage={'Help us improve our site.'}
                            />
                        </p>
                        <FormattedMessage
                            id={'checkoutConfirmationPage.feedbackQuestion'}
                            defaultMessage={'Would you recommend Maidenform.com to a friend?'}
                        />
                        <FeedbackPicker disabled={ratingState > 0} onSelect={rating => handleRating(rating)} />
                    </>
                }
            </div>
        </div>
    );
};

export default OrderConfirmationPage;

OrderConfirmationPage.propTypes = {
    classes: shape({
        header: string,
        info: string,
        orderNumber: string,
        feedback: string,
    }),
    orderNumber: string.isRequired
};
