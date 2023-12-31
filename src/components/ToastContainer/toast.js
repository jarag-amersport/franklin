import React from 'react';
import { bool, func, number, object, oneOf, string } from 'prop-types';
import defaultClasses from './toast.module.css';
import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import Icon from '../Icon';

import { X as CloseIcon } from 'react-feather';

const Toast = props => {
    const {
        actionText,
        dismissable,
        hasDismissAction,
        dismissActionText,
        icon,
        message,
        onAction,
        handleAction,
        onDismiss,
        handleDismiss,
        type
    } = props;

    const classes = useStyle(defaultClasses, {});

    const iconElement = icon ? <>{icon}</> : null;

    const controls =
        onDismiss || dismissable ? (
            <button className={classes.dismissButton} onClick={handleDismiss}>
                <Icon src={CloseIcon} attrs={{ width: 14 }} />
            </button>
        ) : null;

    const dismissActionButton =
        hasDismissAction && (onDismiss || dismissable) ? (
            <button
                data-cy="Toast-dismissActionButton"
                className={classes.actionButton}
                onClick={handleDismiss}
            >
                {dismissActionText}
            </button>
        ) : null;

    const actions = onAction ? (
        <div className={classes.actions}>
            {dismissActionButton}
            <button
                data-cy="Toast-actionButton"
                className={classes.actionButton}
                onClick={handleAction}
            >
                {actionText}
            </button>
        </div>
    ) : null;

    return (
        <div className={classes[`${type}Toast`]} data-cy="Toast-root">
            <div className={classes.controls}>{controls}</div>
            <div className={classes.content}>
                <span className={classes.icon}>{iconElement}</span>
                <div className={classes.message} data-cy="Toast-message">
                    {message}
                </div>
                {actions}
            </div>
        </div>
    );
};

Toast.propTypes = {
    actionText: string,
    dismissable: bool,
    icon: object,
    id: number,
    message: string.isRequired,
    onAction: func,
    onDismiss: func,
    handleAction: func,
    handleDismiss: func,
    type: oneOf(['info', 'warning', 'error', 'success']).isRequired
};

export default Toast;
