import React from 'react';
import { arrayOf, number, shape, string, func, bool } from 'prop-types';
import Price from '@magento/venia-ui/lib/components/Price';

const OrderRow = props => {
    const { order, mobile, actions } = props;
    const {
        id,
        number: orderNumber,
        order_date: orderDate,
        status,
        total,
        shipping_address: shippingAddress
    } = order;
    const { grand_total: grandTotal } = total;
    const { currency, value: orderTotal } = grandTotal;

    // Convert date to ISO-8601 format so Safari can also parse it
    const isoFormattedDate = orderDate.replace(' ', 'T');
    const formattedDate = new Date(isoFormattedDate).toLocaleDateString(
        undefined,
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    );

    const { firstname, lastname } = shippingAddress;
    const nameString = [firstname, lastname]
        .filter(name => !!name)
        .join(' ');

    const orderTotalPrice =
        currency && orderTotal !== null ? (
            <Price currencyCode={currency} value={orderTotal} />
        ) : (
            '-'
        );

    const actionElements = actions.map(({ label, onClick }) => (<a key={label} onClick={() => onClick(order)}>{label}</a>));

    if (mobile) {
        return (
            <div>
                <span><strong>Order #:</strong> {orderNumber}</span>
                <span><strong>Date:</strong> {formattedDate}</span>
                <span><strong>Ship To:</strong> {nameString}</span>
                <span><strong>Order Total:</strong> {orderTotalPrice}</span>
                <span><strong>Status:</strong> {status}</span>
                <span>{actionElements}</span>
            </div>
        );
    }

    return (
        <tr>
            <td>{orderNumber}</td>
            <td>{formattedDate}</td>
            <td>{nameString}</td>
            <td>{orderTotalPrice}</td>
            <td>{status}</td>
            <td>{actionElements}</td>
        </tr>
    );
};

export default OrderRow;

OrderRow.propTypes = {
    order: shape({
        billing_address: shape({
            city: string,
            country_code: string,
            firstname: string,
            lastname: string,
            postcode: string,
            region_id: string,
            street: arrayOf(string)
        }),
        items: arrayOf(
            shape({
                id: string,
                product_name: string,
                product_sale_price: shape({
                    currency: string,
                    value: number
                }),
                product_sku: string,
                selected_options: arrayOf(
                    shape({
                        label: string,
                        value: string
                    })
                ),
                quantity_ordered: number
            })
        ),
        invoices: arrayOf(
            shape({
                id: string
            })
        ),
        number: string,
        order_date: string,
        payment_methods: arrayOf(
            shape({
                type: string,
                additional_data: arrayOf(
                    shape({
                        name: string,
                        value: string
                    })
                )
            })
        ),
        shipping_address: shape({
            city: string,
            country_code: string,
            firstname: string,
            lastname: string,
            postcode: string,
            region_id: string,
            street: arrayOf(string),
            telephone: string
        }),
        shipping_method: string,
        shipments: arrayOf(
            shape({
                id: string,
                tracking: arrayOf(
                    shape({
                        number: string
                    })
                )
            })
        ),
        status: string,
        total: shape({
            discounts: arrayOf(
                shape({
                    amount: shape({
                        currency: string,
                        value: number
                    })
                })
            ),
            grand_total: shape({
                currency: string,
                value: number
            }),
            subtotal: shape({
                currency: string,
                value: number
            }),
            total_tax: shape({
                currency: string,
                value: number
            }),
            total_shipping: shape({
                currency: string,
                value: number
            })
        })
    }),
    actions: arrayOf(shape({
        label: string,
        onClick: func
    })),
    mobile: bool
};
