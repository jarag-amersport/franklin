import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './resetPasswordPage.module.css';
import ResetPassword from "./resetPassword";

const ResetPasswordPage = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>
                <FormattedMessage
                    id="resetPasswordPage.header"
                    defaultMessage="Set a new password"
                />
            </h1>
            <div className={classes.contentContainer}>
                <ResetPassword />
            </div>
        </div>
    );
};

ResetPasswordPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string
    })
};

export default ResetPasswordPage;
