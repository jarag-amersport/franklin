import React from 'react';

import { useOrderRow } from './useOrderRow';
import ItemRow from './ItemRow';

import classes from './OrderItemsList.module.css';

const OrderItemsList = props => {
    const { items } = props;

    // TODO: We could leverage catalog service instead to get image data
    const talonProps = useOrderRow({ items });
    const { loading, imagesData } = talonProps;

    return (
        <div className={classes.root}>
            <table className={classes.tableDesktop}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item) => <ItemRow
                        key={item.id}
                        item={item}
                        imageLoading={loading}
                        imageData={imagesData ? imagesData[item.product_sku] : null} />
                    )}
                </tbody>
            </table>
            <div className={classes.tableMobile}>
                {items && items.map((item) => <ItemRow
                    key={item.id}
                    item={item}
                    mobile={true}
                    imageLoading={loading}
                    imageData={imagesData ? imagesData[item.product_sku] : null}/>
                )}
            </div>
        </div>
    );
};

export default OrderItemsList;
