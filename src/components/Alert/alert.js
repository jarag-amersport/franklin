import React from 'react';
import { bool, func, number, object, oneOf, string } from 'prop-types';
import defaultClasses from './alert.module.css';
import useStyle from '@magento/peregrine/lib/util/shallowMerge';

import { Info as InfoIcon } from 'react-feather';
import { AlertTriangle as WarningIcon } from 'react-feather';
import { AlertOctagon as ErrorIcon } from 'react-feather';
import { Check as SuccessIcon } from 'react-feather';
import Icon from "../Icon";

const Alert = props => {
    const {
        actionText,
        icon,
        message,
        onAction,
        handleAction,
        type
    } = props;

    const classes = useStyle(defaultClasses, {});

    const defaultIcon = () => {
        switch (type) {
            case 'info':
                return <Icon src={InfoIcon} attrs={{ width: 20 }}/>;
            case 'warning':
                return <Icon src={WarningIcon} attrs={{ width: 20 }}/>;
            case 'error':
                return <Icon src={ErrorIcon} attrs={{ width: 20 }}/>;
            case 'success':
                return <Icon src={SuccessIcon} attrs={{ width: 20 }}/>;
            default:
                return null;
        }
    }

    const iconElement = icon ? <>{icon}</> : defaultIcon();

    const actions = onAction ? (
        <div className={classes.actions}>
            <button
                data-cy="Alert-actionButton"
                className={classes.actionButton}
                onClick={handleAction}
            >
                {actionText}
            </button>
        </div>
    ) : null;

    return (
        <div className={classes[`${type}Alert`]} data-cy="Alert-root">
            <div className={classes.content}>
                <span className={classes.icon}>{iconElement}</span>
                <div className={classes.message} data-cy="Alert-message">
                    {message}
                </div>
                {actions}
            </div>
        </div>
    );
};

Alert.propTypes = {
    actionText: string,
    icon: object,
    id: number,
    message: string.isRequired,
    onAction: func,
    handleAction: func,
    type: oneOf(['info', 'warning', 'error', 'success']).isRequired
};

export default Alert;
