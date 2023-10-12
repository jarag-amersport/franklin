import React, { useEffect, useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './card.module.css';

const Card = props => {
    const [shippingMethodDetails, setShippingMethodDetails] = useState(null);
    const { classes: propClasses, shippingData, shippingMethodElem } = props;
    const {
        city,
        country: { label: country },
        email,
        firstname,
        lastname,
        postcode,
        region: { region },
        street,
        telephone
    } = shippingData;

    const streetRows = street.map((row, index) => {
        return <span key={index}>{row}</span>;
    });

    useEffect(() => {
      fetch('/fragments/shipping-methods.plain.html').then((res) => {
        if (res.status === 200) {
          return res.text();
        }
      }).then((text) => {
        setShippingMethodDetails(text);
      });
    }, []);

    const classes = useStyle(defaultClasses, propClasses);

    const nameString = `${firstname} ${lastname}`;
    const additionalAddressString = `${city}, ${region} ${postcode} ${country}`;

    return (
      <>
        <div className={classes.root} data-cy="Card-root">
          <div className={classes.cardDetailsGrid}>
            <span>{email}</span>
            <span>{nameString}</span>
            <span>{telephone}</span>
            <div className={classes.address}>
              {streetRows}
              <span>{additionalAddressString}</span>
            </div>
          </div>
          <div>
            {shippingMethodElem}
          </div>
        </div>
        {
          shippingMethodDetails && <div className={classes.shippingMethodDetails} dangerouslySetInnerHTML={{ __html: shippingMethodDetails }}/>
        }

      </>
    );
};

export default Card;

Card.propTypes = {
    classes: shape({
        root: string,
        address: string,
        area: string
    }),
    shippingData: shape({
        city: string.isRequired,
        country: shape({
            label: string.isRequired
        }).isRequired,
        email: string.isRequired,
        firstname: string.isRequired,
        lastname: string.isRequired,
        postcode: string.isRequired,
        region: shape({
            region: string.isRequired
        }).isRequired,
        street: arrayOf(string).isRequired,
        telephone: string.isRequired
    }).isRequired
};
