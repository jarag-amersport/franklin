import { useFieldApi, Select } from 'informed';
import React, { useEffect, useState } from 'react';
import classes from './quantity.module.css';

const Quantity = props => {
    const { max, onChange, initialValue, itemId } = props
    let options = Array.from({length: props.max}, (_, i) => i + 1);
    const [quantity, setQuantity] = useState(initialValue)

    const quantityFieldApi = useFieldApi('quantity');

    function handleChange(event) {
        const newQuantity = event.target.value;
        quantityFieldApi.setValue(newQuantity)
        setQuantity(newQuantity);
        onChange(newQuantity);
    }

    useEffect(() => {
        quantityFieldApi.setValue(initialValue);
    }, [initialValue, quantityFieldApi]);

    return (
            <Select className={classes.select} onChange={handleChange} value={quantity} field="quantity" id={props.itemId}>
                {options.map((value) => (
                    <option value={value} key={value} >{value}</option>
                ))}
            </Select>
    );
};

Quantity.defaultProps = {
    label: 'Quantity',
    min: 0,
    max: 10,
    initialValue: 1,
    onChange: () => {}
};

export default Quantity;
