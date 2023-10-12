import React from 'react';
import { array, func } from 'prop-types';

import Option from './Option/option.js';
import ColorSelector from './ColorSelector/colorSelector.js';
import { useOptions } from '@magento/peregrine/lib/talons/ProductOptions/useOptions';

const Options = props => {
    const {
        classes,
        onSelectionChange,
        options,
        selectedValues = [],
        isEverythingOutOfStock,
        outOfStockVariants,
        cartItem
    } = props;

    const talonProps = useOptions({
        onSelectionChange,
        selectedValues,
        options
    });

    const { handleSelectionChange, selectedValueMap } = talonProps;

    // Render a list of options passing in any pre-selected values.
    return options.map(option => {
        if (option.attribute_code === "color") {
            return (<ColorSelector
                {...option}
                key={option.attribute_id}
                onSelectionChange={handleSelectionChange}
                selectedValue={selectedValueMap.get(option.label)}
                isEverythingOutOfStock={isEverythingOutOfStock}
                outOfStockVariants={outOfStockVariants}
                cartItem={cartItem}
                classes={classes}
            />)
        } else {
            return (<Option
                {...option}
                key={option.attribute_id}
                onSelectionChange={handleSelectionChange}
                selectedValue={selectedValueMap.get(option.label)}
                isEverythingOutOfStock={isEverythingOutOfStock}
                outOfStockVariants={outOfStockVariants}
                classes={classes}
            />)
        }
    });
};

Options.propTypes = {
    onSelectionChange: func,
    options: array.isRequired,
    selectedValues: array
};

export default Options;
