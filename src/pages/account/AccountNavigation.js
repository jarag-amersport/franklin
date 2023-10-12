import React, { Fragment, useState } from 'react';

import classes from './AccountNavigation.module.css';

export const accountPages = {
    myaccount: {
        type: 'myaccount',
        text: 'My Account',
        url: '/customer/account'
    },
    history: {
        type: 'history',
        text: 'Order History',
        url: '/customer/order-history'
    },
    wishlist: {
        type: 'wishlist',
        text: 'My Favorites',
        url: '/customer/wishlist'
    },
    address: {
        type: 'address',
        text: 'Address Book',
        url: '/customer/address'
    },
    editaccount: {
        type: 'editaccount',
        text: 'Account Information',
        url: '/customer/account/edit'
    },
    creditcards: {
        type: 'creditcards',
        text: 'Stored Payment Methods',
        url: '/customer/cards'
    },
};

const AccountNavigation = props => {
    const [open, setOpen] = useState(false);
    const { pageType } = props;

    const links = Object.values(accountPages);
    links.splice(3, 0, { type: 'divider' });

    const activePage = links.find(link => link.type === pageType);

    return (<Fragment>
        <button
            className={[classes.navButton, open ? classes.navButtonOpen : ''].join(' ')}
            onClick={() => setOpen(open => !open)}>
            {activePage.text}
        </button>
        
        <div className={[classes.root, open ? classes.open : ''].join(' ')}>
            <ul>
                {links.map(link => {
                    const { type, text, url } = link;
                    const isActive = type === pageType;
                    if (type === 'divider') {
                        return <li key={type} className={classes.divider} />;
                    }
                    if (isActive) {
                        return <li key={type} className={classes.active} onClick={() => setOpen(false)}>{text}</li>;
                    }
                    return <li key={type}><a href={url} onClick={() => setOpen(false)}>{text}</a></li>;
                })}
            </ul>
        </div>
    </Fragment>)
}

export default AccountNavigation;
