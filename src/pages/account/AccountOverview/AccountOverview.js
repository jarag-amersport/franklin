import React, { Fragment, useEffect } from 'react';

import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useAddressBookPage } from '@magento/peregrine/lib/talons/AddressBookPage/useAddressBookPage';
import { useOrderHistoryPage } from '@magento/peregrine/lib/talons/OrderHistoryPage/useOrderHistoryPage';
import { GET_CUSTOMER } from './AccountOverview.gql';
import AddressCard from './AddressCard';

import classes from './AccountOverview.module.css';
import OrderRow from './OrderRow';
import { BrowserPersistence } from '@magento/peregrine/lib/util';

const AccountOverview = () => {
    const fetchUserDetails = useAwaitQuery(GET_CUSTOMER);
    const [{ currentUser }, { getUserDetails }] = useUserContext();
    const { customerAddresses, countryDisplayNameMap } = useAddressBookPage();
    const { orders } = useOrderHistoryPage();

    useEffect(() => {
        console.log('fetchUserDetails', fetchUserDetails);
        getUserDetails({ fetchUserDetails });
    }, [fetchUserDetails, getUserDetails]);

    const { email, firstname, middlename, lastname } = currentUser;

    useEffect(() => {
        console.log('got user details', currentUser);
    }, [currentUser]);

    if (!email) {
        // TODO: Shimmer
        return <div className={classes.root}>Loading...</div>;
    }

    console.log('orders', orders);

    const defaultBillingAddress = customerAddresses.find(({ default_billing }) => default_billing);
    const defaultShippingAddress = customerAddresses.find(({ default_shipping }) => default_shipping);

    return (
        <div className={classes.root}>
            <h1>My Account</h1>
            <div className={classes.section}>
                <div className={classes.sectionHeader}>
                    <h2>Account Information</h2>
                </div>
                <div className={classes.sectionContent}>
                    <div className={classes.box}>
                        <div className={classes.boxTitle}>Contact Information</div>
                        <div className={classes.boxContent}>
                            {[firstname, middlename, lastname].join(' ')}<br />
                            {email}
                        </div>
                        <div className={classes.boxActions}>
                            <a href="/customer/account/edit">Edit</a>
                            <a href="/customer/account/edit?changepassword=true">Change Password</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.sectionHeader}>
                    <h2>Address Book</h2> <a href="/customer/address">Manage Addresses</a>
                </div>
                <div className={classes.sectionContent}>
                    <div className={classes.box}>
                        <div className={classes.boxTitle}>Default Billing Address</div>
                        {defaultBillingAddress ? (
                            <AddressCard
                                address={defaultBillingAddress}
                                countryName={countryDisplayNameMap.get(defaultBillingAddress.country_code)}
                                onEdit={({ id }) => window.location = `/customer/address?edit=${id}`} />
                        ) : (
                            <div className={classes.boxContent}>
                                You have not set a default billing address.
                            </div>
                        )}
                    </div>
                    <div className={classes.box}>
                        <div className={classes.boxTitle}>Default Shipping Address</div>
                        {defaultShippingAddress ? (
                            <AddressCard
                                address={defaultShippingAddress}
                                countryName={countryDisplayNameMap.get(defaultShippingAddress.country_code)}
                                onEdit={({ id }) => window.location = `/customer/address?edit=${id}`} />
                        ) : (
                            <div className={classes.boxContent}>
                                You have not set a default shipping address.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={classes.section}>
                <div className={[classes.sectionHeader, classes.sectionOrders].join(' ')}>
                    <h2>Recent Orders</h2> <a href="/customer/order-history">View all</a>
                </div>
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
                                    actions={[{ label: 'View Order', onClick: ({ number }) => { window.location = `/customer/order-history?order=${number}`; } }]}
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
                                actions={[{ label: 'View Order', onClick: ({ number }) => { window.location = `/customer/order-history?order=${number}`; } }]}
                            />)) :
                        (<div className={classes.orderTableEmpty}>
                            You have not placed any orders.
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AccountOverview;
