import React from 'react';

import PaymentMethodRow from "./PaymentMethodRow";

import classes from './PaymentMethodsList.module.css';

const PaymentMethodsList = props => {
    const { items } = props;

    return (
        <div className={classes.root}>
            <table className={classes.tableDesktop}>
                <thead>
                <tr>
                    <th>Payment Type</th>
                    <th>Card Number</th>
                    <th>Expiration Date</th>
                    <th>Type</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {items && items.map((item) =>
                    <PaymentMethodRow
                        key={item.public_hash}
                        item={item}
                    />
                )}
                </tbody>
            </table>
            <div className={classes.tableMobile}>
                {items && items.map((item) =>
                    <PaymentMethodRow
                        key={item.public_hash}
                        item={item}
                        mobile={true}
                    />
                )}
            </div>
        </div>
    );
};

export default PaymentMethodsList;
