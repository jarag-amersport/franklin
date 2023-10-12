import React, { useMemo } from 'react';
import { arrayOf, shape, string } from 'prop-types';

import classes from './productOptions.module.css';

const ProductOptions = props => {
    const { options = [] } = props;

    const displayOptions = useMemo(
        () =>
            options.map(({ option_label, value_label }) => {
                const key = `${option_label}${value_label}`;
                const optionLabelString = `${option_label}: `;
                return (
                    <div key={key} className={classes.optionLabel}>
                        <span className={classes.optionName}>
                            {optionLabelString}
                        </span>
                        <span
                            className={classes.optionValue}
                            data-cy="ProductOptions-optionValue"
                        >
                            {value_label}
                        </span>
                    </div>
                );
            }),
        [classes, options]
    );

    if (displayOptions.length === 0) {
        return null;
    }

    return <dl className={classes.options}>{displayOptions}</dl>;
};

ProductOptions.propTypes = {
    options: arrayOf(
        shape({
            label: string,
            value: string
        })
    )
};

export default ProductOptions;
