import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string, bool, func, arrayOf } from 'prop-types';
import { Check as CheckmarkIcon, Edit2 as EditIcon } from 'react-feather';
import { useAddressCard } from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/useAddressCard';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import defaultClasses from './addressCard.module.css';

const AddressCard = props => {
    const {
        address,
        classes: propClasses,
        isSelected,
        onEdit,
        onSelection
    } = props;

    const talonProps = useAddressCard({
        address,
        onEdit,
        onSelection
    });
    const {
        handleClick,
        handleEditAddress,
        handleKeyPress,
        hasUpdate
    } = talonProps;

    const {
        city,
        country_code,
        default_shipping,
        firstname,
        lastname,
        postcode,
        region: { region },
        street
    } = address;

    const streetRows = street.map((row, index) => {
        return <span key={index}>{row}</span>;
    });

    const classes = useStyle(defaultClasses, propClasses);
    const rootClass = isSelected ? classes.rootSelected : classes.root;

    const selectedBadge = (
        <div className={classes.selectionBadge}>
            <CheckmarkIcon className={classes.selectionBadgeIcon} />
        </div>
    );

    const editButton = isSelected ? (
        <button className={classes.editButton} onClick={handleEditAddress}>
            <Icon
                classes={{
                    icon: classes.editIcon
                }}
                size={16}
                src={EditIcon}
            />
        </button>
    ) : null;

    const nameString = `${firstname} ${lastname}`;
    const additionalAddressString = `${city}, ${region} ${postcode}`;

    return (
        <div className={rootClass}>
            {isSelected && selectedBadge}
            <div
                className={classes.content}
                onClick={handleClick}
                onKeyPress={handleKeyPress}
                role="button"
                tabIndex="0"
            >
                <span className={classes.name}>{nameString}</span>
                {streetRows}
                <span>{additionalAddressString}</span>
                <span>{country_code}</span>
                {editButton}
            </div>
        </div>
    );
};

export default AddressCard;

AddressCard.propTypes = {
    address: shape({
        city: string,
        country_code: string,
        default_shipping: bool,
        firstname: string,
        lastname: string,
        postcode: string,
        region: shape({
            region_code: string,
            region: string
        }),
        street: arrayOf(string)
    }).isRequired,
    classes: shape({
        root: string,
        root_selected: string,
        root_updated: string,
        editButton: string,
        editIcon: string,
        defaultBadge: string,
        name: string,
        address: string
    }),
    isSelected: bool.isRequired,
    onEdit: func.isRequired,
    onSelection: func.isRequired
};
