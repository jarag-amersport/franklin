import { useCallback, useEffect, useState } from 'react';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { BrowserPersistence } from '@magento/peregrine/lib/util';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { GET_CUSTOMER } from '../pages/account/AccountOverview/AccountOverview.gql';

export const useProtectedPage = (onFirstLoadOnly = false) => {
  const [{ isSignedIn, currentUser }, {getUserDetails}] = useUserContext();
  const fetchUserDetails = useAwaitQuery(GET_CUSTOMER);
  const [pwaEvents, setPwaEvents] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);


  useEffect(() => {
    console.log('fetchUserDetails', fetchUserDetails);
    getUserDetails({ fetchUserDetails });
  }, [fetchUserDetails, getUserDetails]);

  useEffect(() => {
    const loadDeps = async () => {
      const pwaEventsLib = await import('../../scripts/pwa-events.js');
      setPwaEvents(pwaEventsLib);
    }
    loadDeps()
  }, [])

  useEffect(() => {
    if(currentUser.email) {
      console.log('got user details', currentUser);
      // Persist user details in localStorage
      const storage = new BrowserPersistence();
      storage.setItem('user_details', currentUser, 3600);
    }
    setFirstLoad(false);
  }, [currentUser, onFirstLoadOnly]);

  useEffect(() => {
    if(currentUser.email) {
      if (pwaEvents) {
        const {dispatchPWAEvent, PWA_EVENT_USER_SIGNED_IN } = pwaEvents;
        dispatchPWAEvent(PWA_EVENT_USER_SIGNED_IN, { currentUser });
      }
    }
  }, [pwaEvents, currentUser]);

  const redirectIfNotSignedIn = useCallback((redirectAfterSignIn) => {
    const loginRedirect = redirectAfterSignIn || '/customer/account';

    if (!isSignedIn && (!onFirstLoadOnly || firstLoad)) {
        window.location = `/customer/account/login?login_redirect=${loginRedirect}`;
    }
  }, [isSignedIn])

  const redirectIfSignedIn = useCallback((where) => {
    const loginRedirect = where || '/customer/account';

    if (isSignedIn && (!onFirstLoadOnly || firstLoad)) {
        window.location = loginRedirect;
    }
  }, [isSignedIn])

  return [redirectIfNotSignedIn, redirectIfSignedIn];
}

export default useProtectedPage;
