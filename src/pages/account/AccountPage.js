import React from 'react';

import WishListPage from './WishlistPage/wishlistPage';
import OrderHistoryPage from './OrderHistoryPage/OrderHistoryPage';

import AccountInformationPage from './AccountInformationPage/AccountInformationPage';
import AccountNavigation from './AccountNavigation';
import AccountOverview from './AccountOverview/AccountOverview';
import Login from '../../components/Login/login';
import useProtectedPage from '../../hooks/useProtectedPage';

import classes from './AccountPage.module.css';
import AddressBookPage from './AddressBookPage/AddressBookPage';
import StoredPaymentMethodsPage from "./StoredPaymentMethodsPage/StoredPaymentMethodsPage";

const AccountTypeHandler = props => {
    const [redirectIfNotSignedIn, redirectIfSignedIn] = useProtectedPage();

    switch (props.pageType) {
        case 'myaccount':
            redirectIfNotSignedIn();
            return <AccountOverview />;
        case 'address':
            redirectIfNotSignedIn('/customer/address');
            return <AddressBookPage />;
        case 'editaccount':
            redirectIfNotSignedIn('/customer/account/edit');
            return <AccountInformationPage />;
        case 'history':
            redirectIfNotSignedIn('/customer/order-history');
            return <OrderHistoryPage />;
        case 'wishlist':
            redirectIfNotSignedIn('/customer/wishlist');
            return <WishListPage />;
        case 'creditcards':
            redirectIfNotSignedIn('/customer/cards');
            return <StoredPaymentMethodsPage />;
        default:
            return <Login />;
    }
}

const AccountPage = props => {
    const { pageType } = props;

    return (<div className={classes.root}>
        <div className={classes.sidebar}>
            <AccountNavigation pageType={pageType} />
            {/* TODO: Recently bought items */}
            {/* TODO: Favorites */}
        </div>
        <div className={classes.content}>
            <AccountTypeHandler pageType={pageType} />
        </div>
    </div>)
}

export default AccountPage;
