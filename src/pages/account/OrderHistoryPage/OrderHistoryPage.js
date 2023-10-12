import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { shape, string } from 'prop-types';

import { useToasts } from '@magento/peregrine/lib/Toasts';
import OrderHistoryContextProvider from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';
import { useOrderHistoryPage } from '@magento/peregrine/lib/talons/OrderHistoryPage/useOrderHistoryPage';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

import Button from '../../../components/Button/button';
import Icon from '../../../components/Icon';
import OrderRow from '../AccountOverview/OrderRow';
import OrderDetailsPage from './OrderDetailsPage';
import { useReorder } from '../../../talons/useReorder';

import classes from './OrderHistoryPage.module.css';
import buttonClasses from './button.module.css';


const errorIcon = (
    <Icon
        src={AlertCircleIcon}
        attrs={{
            width: 18
        }}
    />
);

const OrderHistoryPage = props => {
    const talonProps = useOrderHistoryPage();
    const {
        errorMessage,
        loadMoreOrders,
        isBackgroundLoading,
        isLoadingWithoutData,
        orders,
        pageInfo,
    } = talonProps;
    const [, { addToast }] = useToasts();
    const [viewOrder, setViewOrder] = useState(null);
    const { reorder } = useReorder();

    useEffect(() => {
        if (errorMessage) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: errorMessage,
                dismissable: true,
                timeout: 10000
            });
        }
    }, [addToast, errorMessage]);

    useEffect(() => {
        // Check if ?order=id is set
        let viewOrderId = new URLSearchParams(window.location.search).get('order');
        if (!viewOrderId) {
            return;
        }

        // Switch to view single order mode
        setViewOrder(viewOrderId);
    }, [orders]);

    if (isLoadingWithoutData) {
        return <LoadingIndicator />;
    }

    const pageInfoLabel = pageInfo ? (
        <div className={classes.pagination}>
            <FormattedMessage
                defaultMessage={'Showing {current} of {total}'}
                id={'orderHistoryPage.pageInfo'}
                values={pageInfo}
            />
        </div>
    ) : null;

    const loadMoreButton = loadMoreOrders ? (
        <div className={classes.loadMore}>
            <Button
                classes={buttonClasses}
                disabled={isBackgroundLoading || isLoadingWithoutData}
                onClick={loadMoreOrders}
                priority="low"
            >
                <FormattedMessage
                    id={'orderHistoryPage.loadMore'}
                    defaultMessage={'Load More'}
                />
            </Button>
        </div>
    ) : null;

    if (viewOrder) {
        window.history.replaceState({}, '', `${window.location.pathname}?order=${viewOrder}`);
        return (<OrderDetailsPage number={viewOrder} goBack={() => setViewOrder(null)} />);
    }

    return (
        <OrderHistoryContextProvider>
            <div className={classes.root}>
                <div className={classes.title}>
                    <h1>My Orders</h1>
                    <div className={classes.titleInfo}>
                        <p>For all order inquiries please contact Customer Service at: 1-888-339-1429</p>
                        <span className={classes.red}>You can cancel your order within 30 minutes of submitting your order.</span>
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={classes.sectionContent}>
                        <table className={classes.orderTableDesktop}>
                            <thead>
                                <tr>
                                    <th>Order #</th>
                                    <th>Date</th>
                                    <th>Ship To</th>
                                    <th>Order Total</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.length > 0 ?
                                (orders.map((order) => <OrderRow
                                        key={order.id}
                                        order={order}
                                        actions={[
                                            { label: 'View Order', onClick: ({ number }) => setViewOrder(number) },
                                            { label: 'Reorder', onClick: ({ number }) => reorder(number) }
                                        ]}
                                    />)) : 
                                (<tr className={classes.orderTableEmpty}>
                                    <td colSpan="6">You have not placed any orders.</td>
                                </tr>)}
                            </tbody>
                        </table>
                        <div className={classes.orderTableMobile}>
                            {orders?.length > 0 ?
                            (orders.map((order) => <OrderRow
                                    key={order.id}
                                    order={order}
                                    mobile={true}
                                    actions={[
                                        { label: 'View Order', onClick: ({ number }) => setViewOrder(number) },
                                        { label: 'Reorder', onClick: ({ number }) => reorder(number) }
                                    ]}
                                />)) :
                            (<div className={classes.orderTableEmpty}>
                                You have not placed any orders.
                            </div>)}
                        </div>
                        {loadMoreButton}
                        {pageInfoLabel}
                    </div>
                </div>
            </div>
        </OrderHistoryContextProvider>
    );
};

export default OrderHistoryPage;

OrderHistoryPage.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        emptyHistoryMessage: string,
        orderHistoryTable: string,
        search: string,
        searchButton: string,
        submitIcon: string,
        loadMoreButton: string
    })
};
