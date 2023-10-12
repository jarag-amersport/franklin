import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/peregrine/lib/context/style';
import defaultClasses from './logout.module.css';
import { useAccountMenu } from '../../talons/useAccountMenu';

const Logout = props => {
  const accountMenuIsOpen = true;
  const preventRefresh = true;
  const redirectSeconds = 5;

  const [loggedOut, setLoggedOut] = useState(false);
  const [, setAccountMenuIsOpen] = useState(accountMenuIsOpen);

  const { handleSignOut } = useAccountMenu({
    accountMenuIsOpen,
    setAccountMenuIsOpen,
    preventRefresh
  });

  const classes = useStyle(defaultClasses, props.classes);

  useEffect(() => {
    const signOut = async () => {
      await handleSignOut();
      setLoggedOut(true);

      const notifyFranklinComponents = async () => {
        const {
          dispatchPWAEvent,
          PWA_EVENT_USER_SIGNED_OUT
        } = await import('../../../scripts/pwa-events.js');
        // Notify franklin components
        dispatchPWAEvent(PWA_EVENT_USER_SIGNED_OUT, null);
      }

      notifyFranklinComponents();

      setTimeout(() => {
        window.location = '/';
      }, 5000);
    };
    signOut();
  }, []);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>
        <FormattedMessage
          id="signOutPage.header"
          defaultMessage="You are signed out"
        />
      </h1>
      <div className={classes.contentContainer}>
        <div className={classes.message}>
          <FormattedMessage
            id="signOutPage.message"
            defaultMessage={`You have signed out and will go to our homepage in ${redirectSeconds} seconds` + '…'}
            // TODO: proper localization and symbol encoding
          />
        </div>
      </div>
    </div>
  );
};

/**
 * @RootComponent
 * description = 'Basic Logout Page'
 * pageTypes = LOGOUT
 */
function LogoutPage() {
  return <Logout/>;
}

export default LogoutPage;
