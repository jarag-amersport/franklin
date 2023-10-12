import React from 'react';
import { bool, func, number, oneOfType, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './tile.module.css';
import { useTile } from '@magento/peregrine/lib/talons/ProductOptions/useTile';

const getClassName = (
    name,
    isSelected,
    hasFocus,
    isOptionOutOfStock,
    isEverythingOutOfStock
) =>
    `${name}${isSelected ? '_selected' : ''}${hasFocus ? '_focused' : ''}${
        isEverythingOutOfStock || isOptionOutOfStock ? '_outOfStock' : ''
    }`;

const Tile = props => {
    const {
        hasFocus,
        isSelected,
        item: { label, value_index },
        onClick,
        isEverythingOutOfStock,
        isOptionOutOfStock,
        cartItem,
    } = props;

    const talonProps = useTile({
        onClick,
        value_index
    });

    const { handleClick } = talonProps;
    const classes = useStyle(defaultClasses, props.classes);
    const className =
        classes[
            getClassName(
                'root',
                isSelected,
                hasFocus,
                isOptionOutOfStock,
                isEverythingOutOfStock
            )
        ];


    function toColorName(name) {
        return name.replace(/[^A-Za-z0-9]/ig, '');
    }

    const sku = cartItem.product.sku;
    const buttonClasses = {
        background: `url("https://franklin.maidenform.com/images/swatches/HNS_${sku}/HNS_${sku}_${toColorName(label)}_sw.jpg?quality=85&height=36&width=36&fit=bounds&format=webply") center center no-repeat`
    }

    return (
        <button
            className={className}
            onClick={handleClick}
            title={label}
            type="button"
            data-cy="Tile-button"
            style={buttonClasses}
            disabled={isEverythingOutOfStock || isOptionOutOfStock}
        >
        </button>
    );
};

export default Tile;

Tile.propTypes = {
    hasFocus: bool,
    isSelected: bool,
    item: shape({
        label: string.isRequired,
        value_index: oneOfType([number, string]).isRequired
    }).isRequired,
    onClick: func.isRequired,
};

Tile.defaultProps = {
    hasFocus: false,
    isSelected: false,
};
