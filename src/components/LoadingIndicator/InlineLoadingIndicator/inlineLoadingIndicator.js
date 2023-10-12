import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './inlineLoadingIndicator.module.css';
import { Loader as LoaderIcon } from 'react-feather';
import Icon from '@magento/venia-ui/lib/components/Icon';

const InlineLoadingIndicator = props => {

    const {
        classes: propClasses,
        size
    } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return (
        <span className={classes.root}>
            <span className={classes.indicatorWrapper}>
                <Icon
                    src={LoaderIcon}
                    size={size}
                    classes={{ icon: classes.indicator }}
                />
            </span>
            {props.children && (<span className={classes.message}>{props.children}</span>)}
        </span>
    );

};

export default InlineLoadingIndicator;
