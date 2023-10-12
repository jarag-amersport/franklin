import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useCreateAccountPage } from '@magento/peregrine/lib/talons/CreateAccountPage/useCreateAccountPage';
import CreateAccount from './createAccount';

import defaultClasses from './createAccountPage.module.css';
import { useStyle } from '@magento/peregrine/lib/context/style';

const CreateAccountPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { createAccountProps } = useCreateAccountPage(props);

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>
                <FormattedMessage
                    id="createAccountPage.header"
                    defaultMessage="Create Your Account"
                />
            </h1>
            <div className={classes.contentContainer}>
                <CreateAccount {...createAccountProps} />
            </div>
        </div>
    );
};

CreateAccountPage.defaultProps = {
    signedInRedirectUrl: '/order-history',
    signInPageUrl: '/sign-in'
};

CreateAccountPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string
    }),
    signedInRedirectUrl: string,
    signInPageUrl: string
};

export default CreateAccountPage;
