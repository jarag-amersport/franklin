import { useEffect, useState } from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { default as handleEvent } from '@magento/experience-platform-connector/src/handleEvent';

const ExperiencePlatformConnector = () => {
    const [{ isSignedIn, currentUser }] = useUserContext();
    const [observable] = useEventingContext();

    const [sdk, setSdk] = useState();

    useEffect(() => {
        if (window.magentoStorefrontEvents) {
            setSdk(window.magentoStorefrontEvents);
            return;
        }

        import('@adobe/magento-storefront-events-sdk').then(mse => {
            if (!window.magentoStorefrontEvents) {
                window.magentoStorefrontEvents = mse;
            }
            setSdk(mse);
        });
    }, [setSdk]);

    useEffect(() => {
        if (sdk) {
            const sub = observable.subscribe(async event => {
                handleEvent(sdk, event);
            });

            return () => {
                sub.unsubscribe();
            };
        }
    }, [sdk, observable]);

    // Sets shopper context on initial load (when shopper context is null)
    useEffect(() => {
        if (sdk && !sdk.context.getShopper()) {
            if (isSignedIn) {
                sdk.context.setShopper({
                    shopperId: 'logged-in'
                });

                sdk.context.setAccount({
                    firstName: currentUser.firstname,
                    lastName: currentUser.lastname,
                    emailAddress: currentUser.email,
                    accountType: currentUser.__typename
                });
            } else {
                sdk.context.setShopper({
                    shopperId: 'guest'
                });
            }
        }
    }, [sdk, isSignedIn, currentUser]);

    return null;
};

export default ExperiencePlatformConnector;
