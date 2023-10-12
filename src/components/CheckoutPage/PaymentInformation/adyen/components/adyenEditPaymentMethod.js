import * as React from 'react';
import AdyenCheckoutDropIn from './adyenCheckoutDropIn'

const AdyenEditPaymentMethod = ({
    onPaymentSuccess,
    onPaymentError,
    resetShouldSubmit,
    shouldSubmit
}) => {

    return (
        <AdyenCheckoutDropIn
            type="dropin"
            onPaymentSuccess={onPaymentSuccess}
            setShouldHideSubmit={() => {}}
            onPaymentError={onPaymentError}
            resetShouldSubmit={resetShouldSubmit}
            shouldSubmit={shouldSubmit}
        />
    )
}



export default AdyenEditPaymentMethod
