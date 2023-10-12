import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productOptions.module.css';
import React, { useMemo } from 'react';
import { arrayOf, shape, string } from 'prop-types';

const ProductOptions = props => {
    const { options = [] } = props;

    const classes = useStyle(defaultClasses, props.classes);
    const displayOptions = useMemo(
        () =>
            options.map(({ option_label, value_label }) => {
                const key = `${option_label}${value_label}`;
                return (
                    <div key={key} className={classes.optionLabel}>
                        <span className={classes.optionName}>
                            {option_label}:
                        </span>
                        <span className={classes.optionValue}>
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

    return <div className={classes.options}>{displayOptions}</div>;
};

ProductOptions.propTypes = {
    options: arrayOf(
        shape({
            option_label: string,
            value_label: string
        })
    )
};

export default ProductOptions;
