const ADYEN_CC = 'adyen_cc';
const ADYEN_HPP = 'adyen_hpp';

export const getAdditionalData = (type, data) => {
    const stateData = JSON.stringify(data);
    if (type === ADYEN_CC) {
        // const cc_type = data?.paymentMethod?.brand;
        // if (!cc_type) {
        //     throw Error('Could not detect credit card brand');
        // }
        const additionalData = { 
            //cc_type,
            stateData
        };
        return additionalData;
    } else if (type === ADYEN_HPP) {
        const additionalData = {
            stateData,
            brand_code: data?.paymentMethod?.type,
        };
        return additionalData;
    }
    throw Error('Unsupported payment type');
};
