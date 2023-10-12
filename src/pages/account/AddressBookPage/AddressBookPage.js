import React, { useEffect } from 'react';

import { useAddressBookPage } from '@magento/peregrine/lib/talons/AddressBookPage/useAddressBookPage';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import Button from '../../../components/Button/button';

import AddressCard from '../AccountOverview/AddressCard';
import AddEditDialog from './AddEditDialog';
import classes from './AddressBookPage.module.css';
import AddressRow from './AddressRow';
import buttonClasses from './button.module.css';

const AddressBookPage = props => {
    const talonProps = useAddressBookPage();
    const {
        confirmDeleteAddressId,
        countryDisplayNameMap,
        customerAddresses,
        formErrors,
        formProps,
        handleAddAddress,
        handleCancelDeleteAddress,
        handleCancelDialog,
        handleConfirmDeleteAddress,
        handleConfirmDialog,
        handleDeleteAddress,
        handleEditAddress,
        isDeletingCustomerAddress,
        isDialogBusy,
        isDialogEditMode,
        isDialogOpen,
        isLoading
    } = talonProps;

    const defaultBillingAddress = customerAddresses.find(({ default_billing }) => default_billing);
    const defaultShippingAddress = customerAddresses.find(({ default_shipping }) => default_shipping);
    const remainingAddresses = customerAddresses
        .filter(({ default_billing, default_shipping }) => !default_billing && !default_shipping)
        .map(address => ({ ...address, countryName: countryDisplayNameMap.get(address.country_code) }));

    useEffect(() => {
        // Check if ?edit=id is set
        let queryEditId = new URLSearchParams(window.location.search).get('edit');
        if (!queryEditId) {
            return;
        }

        // Parse id
        try {
            queryEditId = parseInt(queryEditId, 10);
        } catch(err) {
            console.error('Invalid edit id', queryEditId);
            return;
        }

        // Find address with id
        const addressToEdit = customerAddresses.find(({ id }) => id === queryEditId);
        if (!addressToEdit) {
            return;
        }

        // Switch to edit mode
        handleEditAddress(addressToEdit);
    }, [customerAddresses]);

    if (isLoading) {
        return fullPageLoadingIndicator;
    }

    if (isDialogOpen) {
        return <AddEditDialog
            formErrors={formErrors}
            formProps={formProps}
            isBusy={isDialogBusy}
            isEditMode={isDialogEditMode}
            isOpen={isDialogOpen}
            onCancel={handleCancelDialog}
            onConfirm={handleConfirmDialog}
        />;
    }

    return (<div className={classes.root}>
        <h1>Address Book</h1>
        <div className={classes.section}>
            <div className={classes.sectionHeader}>
                <h2>Default Addresses</h2>
            </div>
            <div className={classes.sectionContent}>
                <div className={classes.box}>
                    <div className={classes.boxTitle}>Default Billing Address</div>
                    {defaultBillingAddress ? (
                        <AddressCard
                            address={defaultBillingAddress}
                            countryName={countryDisplayNameMap.get(defaultBillingAddress.country_code)}
                            onEdit={(address) => handleEditAddress(address)} />
                    ) : (
                        <div className={classes.boxContent}>
                            You have not set a default billing address.
                        </div>
                    )}
                </div>
                <div className={classes.box}>
                    <div className={classes.boxTitle}>Default Shipping Address</div>
                    {defaultShippingAddress ? (
                        <AddressCard
                            address={defaultShippingAddress}
                            countryName={countryDisplayNameMap.get(defaultShippingAddress.country_code)}
                            onEdit={(address) => handleEditAddress(address)} />
                    ) : (
                        <div className={classes.boxContent}>
                            You have not set a default shipping address.
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className={classes.section}>
            <div className={[classes.sectionHeader, classes.sectionAdditionalAddresses].join(' ')}>
                <h2>Additional Address Entries</h2>
            </div>
            <div className={classes.sectionContent}>
                <table className={classes.addressTableDesktop}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Street Address</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>Zip/Postal Code</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {remainingAddresses?.length > 0 ?
                            (remainingAddresses.map((address) => <AddressRow
                                key={address.id}
                                address={address}
                                onCancelDelete={handleCancelDeleteAddress}
                                onConfirmDelete={handleConfirmDeleteAddress}
                                isConfirmingDelete={confirmDeleteAddressId === address.id}
                                isDeletingCustomerAddress={isDeletingCustomerAddress}
                                onEdit={(address) => handleEditAddress(address)}
                                onDelete={(id) => handleDeleteAddress(id)}
                                 />)) : 
                            (<tr className={classes.addressTableEmpty}>
                                <td colSpan="9">You have not have any additional addresses saved.</td>
                            </tr>)}
                    </tbody>
                </table>
                <div className={classes.addressTableMobile}>
                    {remainingAddresses?.length > 0 ?
                        (remainingAddresses.map((address) => <AddressRow
                            key={address.id}
                            address={address}
                            mobile={true}
                            onCancelDelete={handleCancelDeleteAddress}
                            onConfirmDelete={handleConfirmDeleteAddress}
                            isConfirmingDelete={confirmDeleteAddressId === address.id}
                            isDeletingCustomerAddress={isDeletingCustomerAddress}
                            onEdit={(address) => handleEditAddress(address)}
                            onDelete={(id) => handleDeleteAddress(id)} />)) :
                        (<div className={classes.addressTableEmpty}>
                            You have not have any additional addresses saved.
                        </div>)}
                </div>
            </div>
        </div>
        <div className={classes.section}>
            <div className={classes.sectionContent}>
                <Button classes={buttonClasses} priority="high" onPress={handleAddAddress}>Add New Address</Button>
            </div>
        </div>
    </div>);

};

export default AddressBookPage;
