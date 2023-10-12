import React, { Fragment } from 'react';
import { bool, func, shape, string } from 'prop-types';
import Button from "../Button/button";

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './feedbackPicker.module.css';
import buttonClasses from './button.module.css';

const FeedbackPicker = props => {
    const {
        classes: propClasses,
        disabled,
        onSelect,
    } = props;
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <Fragment>
            <div className={classes.root}>
                <div className={classes.buttonContainer}>
                    { Array.apply(0, Array(11)).map((x, i) =>
                        <Button
                            key={i}
                            classes={buttonClasses}
                            priority="low"
                            disabled={disabled}
                            onClick={event => onSelect(i)}
                        >{i}</Button>
                    )}
                </div>
                <div className={classes.legend}>
                    <span>Not Likely</span>
                    <span>Extremely Likely</span>
                </div>
            </div>
        </Fragment>
    );
};

export default FeedbackPicker;

FeedbackPicker.propTypes = {
    classes: shape({
        root: string
    }),
    disabled: bool,
    onSelect: func,
};
