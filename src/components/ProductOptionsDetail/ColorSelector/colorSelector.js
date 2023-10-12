import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    arrayOf,
    func,
    number,
    object,
    oneOfType,
    shape,
    string
} from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import TileList from './tileList';
import defaultClasses from './colorSelector.module.css';
import { useOption } from '@magento/peregrine/lib/talons/ProductOptions/useOption';

const getItemKey = ({ value_index }) => value_index;


const ColorSelector = props => {
    const {
        attribute_code,
        attribute_id,
        label,
        onSelectionChange,
        selectedValue,
        values,
        isEverythingOutOfStock,
        outOfStockVariants
    } = props;

    const talonProps = useOption({
        attribute_id,
        label,
        onSelectionChange,
        selectedValue,
        values
    });

    const {
        handleSelectionChange,
        initialSelection,
        selectedValueDescription
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

  return (
        <div className={classes.root} data-cy="ProductOptions-Option-root">
            <span className={classes.title}>{label}</span>
            <TileList
                getItemKey={getItemKey}
                selectedValue={initialSelection}
                items={values}
                onSelectionChange={handleSelectionChange}
                isEverythingOutOfStock={isEverythingOutOfStock}
                outOfStockVariants={outOfStockVariants}
                attributeLabel={label}
                cartItem={props.cartItem}
            />
            <dl className={classes.selection}>
                <dt
                    data-cy="ProductOptions-Option-selectedLabel"
                    className={classes.selectionLabel}
                >
                    <FormattedMessage
                        id="productOptions.selectedLabel"
                        defaultMessage="Selected {label}:"
                        values={{ label }}
                    />
                </dt>
                <dd>{selectedValueDescription}</dd>
            </dl>
        </div>
    );
};

ColorSelector.propTypes = {
    attribute_code: string.isRequired,
    attribute_id: string,
    classes: shape({
        root: string,
        title: string
    }),
    label: string.isRequired,
    onSelectionChange: func,
    selectedValue: oneOfType([number, string]),
    values: arrayOf(object).isRequired
};

export default ColorSelector;
