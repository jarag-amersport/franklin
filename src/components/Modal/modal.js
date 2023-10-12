import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Portal } from '../Portal';

import defaultClasses from './modal.module.css';

const Modal = props => {

    const {
        classes: propClasses,
        isOpen,
        children
    } = props;

    const classes = useStyle(defaultClasses, propClasses);
    const rootClass = isOpen ? classes.root_open : classes.root;

    return (
        <Portal>
            <div className={rootClass}>
                <div className={classes.container}>
                    {children}
                </div>
                <div className={classes.backdrop} />
            </div>

        </Portal>
    );

};

export default Modal;
