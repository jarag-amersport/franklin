import React from 'react';

import CreateAccountPage from './createAccountPage';
import useProtectedPage from '../../hooks/useProtectedPage';

function SignUp() {
    const [, redirectIfSignedIn] = useProtectedPage(true);

    redirectIfSignedIn();

    return  <CreateAccountPage
        signedInRedirectUrl='/customer/account'
        signInPageUrl='/customer/account/login'
    />;
}

export default SignUp;
