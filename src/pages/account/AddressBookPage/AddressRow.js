import React from 'react';
import { arrayOf, shape, string, bool, func } from 'prop-types';

import Button from '../../../components/Button/button';
import buttonClasses from './button.module.css';

import classes from './AddressRow.module.css';

const AddressRow = props => {
    const { 
        address,
        countryName,
        mobile,
        onEdit,
        onDelete,
        onCancelDelete,
        onConfirmDelete,
        isConfirmingDelete,
        isDeletingCustomerAddress
    } = props;
    const {
        city,
        firstname,
        lastname,
        postcode,
        region,
        street,
        telephone,
        id,
    } = address;

    const maybeConfirmingDeleteOverlay = isConfirmingDelete ? (
        <div className={classes.confirmDeleteContainerBackground}>
            <div className={classes.confirmDeleteContainer} role="dialog" aria-modal="true">
                <p>Are you sure you want to delete this address?</p>
                <div className={classes.confirmDeleteContainerButtons}>
                    <Button
                        classes={buttonClasses}
                        disabled={isDeletingCustomerAddress}
                        priority="low"
                        type="button"
                        onClick={onCancelDelete}
                    >Cancel</Button>
                    <Button
                        classes={buttonClasses}
                        disabled={isDeletingCustomerAddress}
                        priority="high"
                        type="button"
                        onClick={onConfirmDelete}
                    >Delete</Button>
                </div>
            </div>
        </div>
    ) : null;

    if (mobile) {
        return (
            <div>
                <span><strong>First Name:</strong> {firstname}</span>
                <span><strong>Last Name:</strong> {lastname}</span>
                <span><strong>Street Address:</strong> {street.length > 0 ? street[0] : ''}</span>
                <span><strong>City:</strong> {city}</span>
                <span><strong>Country:</strong> {countryName}</span>
                <span><strong>State:</strong> {region?.region}</span>
                <span><strong>Zip/Postal Code:</strong> {postcode}</span>
                <span><strong>Phone:</strong> {telephone}</span>
                <span className={classes.actions}>
                    <strong>Actions:</strong>
                    <a onClick={() => onEdit(address)}>Edit</a>
                    <a onClick={() => onDelete(id)}>Delete</a>
                    {maybeConfirmingDeleteOverlay}
                </span>
            </div>
        );
    }

    return (
        <tr>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{street.length > 0 ? street[0] : ''}</td>
            <td>{city}</td>
            <td>{countryName}</td>
            <td>{region?.region}</td>
            <td>{postcode}</td>
            <td>{telephone}</td>
            <td className={classes.actions}>
                <a onClick={() => onEdit(address)}>Edit</a>
                <a onClick={() => onDelete(id)}>Delete</a>
                {maybeConfirmingDeleteOverlay}
            </td>
        </tr>
    );
};

export default AddressRow;

AddressRow.propTypes = {
    address: shape({
        id: string,
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
        street: arrayOf(string),
        telephone: string
    }).isRequired,
    mobile: bool,
    countryName: string,
    onDelete: func.isRequired,
    onEdit: func.isRequired,
    onCancelDelete: func.isRequired,
    onConfirmDelete: func.isRequired,
    isConfirmingDelete: bool,
    isDeletingCustomerAddress: bool
};
