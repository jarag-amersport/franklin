import React, { useEffect } from 'react';
import { AlertCircle as AlertCircleIcon } from 'react-feather';

import { useToasts } from '@magento/peregrine/lib/Toasts';
import OrderHistoryContextProvider from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

import Button from '../../../components/Button/button';
import Icon from '../../../components/Icon';
import AddressCard from '../AccountOverview/AddressCard';
import OrderTotal from './OrderTotal';
import OrderItemsList from './OrderItemsList';
import { useReorder } from '../../../talons/useReorder';
import { useCancelOrder } from '../../../talons/useCancelOrder';
import { useOrderDetailPage } from './useOrderDetailPage';

import classes from './OrderDetailsPage.module.css';
import buttonClasses from './button.module.css';

const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);

const OrderDetailsPage = props => {
    const { number, goBack } = props;
    const { order, loading, error } = useOrderDetailPage({ number });
    const [, { addToast }] = useToasts();
    const { reorder } = useReorder();
    const { cancel } = useCancelOrder();

    useEffect(() => {
        if (error) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: error,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, error]);

    if (loading) {
        return <LoadingIndicator />;
    }

    if (!order) {
        window.location = '/customer/order-history';
        return <div className={classes.root}><div className={classes.section}>Could not find order.</div></div>;
    }

    const isRecentOrder = order.status === 'Cancellation Period';

    const isoFormattedDate = order.order_date.replace(' ', 'T');
    const formattedDate = new Date(isoFormattedDate).toLocaleDateString(
        undefined,
        {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    );

    return (
        <OrderHistoryContextProvider>
            <div className={classes.root}>
                <div className={classes.title}>
                    <h1>Order #{order.number}</h1>
                    <div className={classes.orderStatus}>{order.status}</div>
                </div>
                <div className={classes.section}>
                    <div className={classes.sectionContent}>
                        <div>{formattedDate}</div>
                        <div className={classes.actions}>
                            <a href="#" onClick={() => reorder(order.number)}>Reorder</a>
                            {isRecentOrder && (<a href="#" onClick={() => cancel(order.id)}>Cancel</a>)}
                            <a href="#" onClick={() => window.print()}>Print Order</a>
                        </div>
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={[classes.sectionHeader, classes.sectionItems].join(' ')}>
                        <h2>Items Ordered</h2>
                    </div>
                    <div className={classes.sectionContent}>
                        <OrderItemsList items={order.items} />
                        <div className={classes.orderTotal}>
                            <OrderTotal data={order.total} />
                        </div>
                    </div>
                </div>
                <div className={[classes.section, classes.orderInformation].join(' ')}>
                    <div className={classes.sectionHeader}>
                        <h2>Order Information</h2>
                    </div>
                    <div className={classes.sectionContent}>
                        <div className={classes.box}>
                            <div className={classes.boxTitle}>Shipping Address</div>
                            <AddressCard address={order.shipping_address} />
                        </div>
                        <div className={classes.box}>
                            <div className={classes.boxTitle}>Shipping Method</div>
                            <div className={classes.boxContent}>
                                {order.shipping_method}
                            </div>
                        </div>
                        <div className={classes.box}>
                            <div className={classes.boxTitle}>Billing Address</div>
                            <AddressCard address={order.billing_address} />
                        </div>
                        <div className={classes.box}>
                            <div className={classes.boxTitle}>Payment Method</div>
                            <div className={classes.boxContent}>
                                {order.payment_methods.map((m) => m.name).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={[classes.sectionContent, classes.sectionActions].join(' ')}>
                        <Button classes={buttonClasses} onClick={goBack} priority="low">Go Back</Button>
                    </div>
                </div>
            </div>
        </OrderHistoryContextProvider>
    );
};

export default OrderDetailsPage;
