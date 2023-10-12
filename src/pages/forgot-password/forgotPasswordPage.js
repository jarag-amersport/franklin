import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './forgotPasswordPage.module.css';
import ForgotPassword from "./forgotPassword";

const ForgotPasswordPage = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>
                <FormattedMessage
                    id="forgotPasswordPage.header"
                    defaultMessage="Forgot Your Password?"
                />
            </h1>
            <div className={classes.contentContainer}>
                <ForgotPassword />
            </div>
        </div>
    );
};

ForgotPasswordPage.propTypes = {
    classes: shape({
        root: string,
        header: string,
        contentContainer: string
    })
};

export default ForgotPasswordPage;
