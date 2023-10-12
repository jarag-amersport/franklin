import React, {useEffect} from 'react';

import { AlertCircle as AlertCircleIcon } from 'react-feather';

import classes from './PaymentMethodRow.module.css';
import Icon from "../../../components/Icon";
import {useCreditCard} from "@magento/peregrine/lib/talons/SavedPaymentsPage/useCreditCard";
import {useIntl} from "react-intl";
import {useToasts} from "@magento/peregrine";
import Button from "../../../components/Button/button";

import buttonClasses from './button.module.css';

const PaymentMethodRow = props => {
    const { item, mobile } = props;
    const { details, public_hash } = item;
    const talonProps = useCreditCard({ paymentHash: public_hash });
    const {
        handleDeletePayment,
        hasError,
        isConfirmingDelete,
        isDeletingPayment,
        toggleDeleteConfirmation
    } = talonProps;

    const errorIcon = <Icon src={AlertCircleIcon} size={20} />;
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: formatMessage({
                    id: 'savedPaymentsPage.creditCard.errorRemoving',
                    defaultMessage:
                        'Something went wrong deleting this payment method. Please refresh and try again.'
                }),
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, formatMessage, hasError]);

    /**
     * Enumerated list of supported credit card types from
     *
     * https://developer.cybersource.com/library/documentation/dev_guides/Retail_SO_API/html/Topics/app_card_types.htm
     */
    const cardTypeMapper = {
        '001': 'Visa',
        '002': 'Mastercard',
        '003': 'American Express',
        '004': 'Discover',
        '005': 'Diners Club',
        '006': 'Carte Blanche',
        '007': 'JCB',
        '014': 'EnRoute',
        '021': 'JAL',
        '024': 'Maestro',
        '033': 'Visa Electron',
        '034': 'Dankort',
        '036': 'Cartes Bancaires',
        '037': 'Carta Si',
        '039': 'EAN',
        '040': 'UATP',
        '042': 'Maestro',
        '050': 'Hipercard',
        '051': 'Aura',
        '054': 'Elo',
        '062': 'China UnionPay',
        '058': 'Carnet',
    };

    if (mobile) {
        return (
            <div className={classes.rootMobile}>
                <span><span className={classes.label}>Payment Type:</span>Credit Card</span>
                <span><span className={classes.label}>Card Number:</span>ending {details.maskedCC}</span>
                <span><span className={classes.label}>Expiry Date:</span>{details.expirationDate}</span>
                <span><span className={classes.label}>Type:</span>{cardTypeMapper[details.type] || details.type}</span>
                <span><span className={classes.label}>Actions:</span><br /><Button classes={buttonClasses} priority="link" onClick={handleDeletePayment}>Delete</Button></span>
            </div>
        );
    }

    return (
        <tr className={classes.root}>
            <td>Credit Card</td>
            <td>ending {details.maskedCC}</td>
            <td>{details.expirationDate}</td>
            <td>{cardTypeMapper[details.type] || details.type}</td>
            <td><Button classes={buttonClasses} priority="link" onClick={handleDeletePayment}>Delete</Button></td>
        </tr>
    );
};

export default PaymentMethodRow;
