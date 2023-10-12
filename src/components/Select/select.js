import React, { Fragment } from "react";
import { arrayOf, node, number, oneOfType, shape, string } from "prop-types";
import {
    Option as InformedOption,
    Select as InformedSelect,
    useFieldState
} from "informed";

import useStyle from "@magento/peregrine/lib/util/shallowMerge";
import { FieldIcons, Message } from "@magento/venia-ui/lib/components/Field";
import defaultClasses from "../TextInput/textInput.module.css";

const Select = props => {
    const {
        before,
        classes: propClasses,
        field,
        items,
        message,
        messageClasses,
        ...rest
    } = props;
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);
    const inputClass = fieldState.error ? classes.input_error : classes.input;

    const options = items.map(
        ({ disabled = null, hidden = null, label, value, key = value, selected }) => (
            <InformedOption
                key={key}
                disabled={disabled}
                hidden={hidden}
                value={value}
                selected={selected}
            >
                {label || (value != null ? value : "")}
            </InformedOption>
        )
    );

    return (
        <Fragment>
            <div className={classes.root}>
                <FieldIcons before={before}>
                    <InformedSelect
                        {...rest}
                        className={inputClass}
                        field={field}
                    >
                        {options}
                    </InformedSelect>
                </FieldIcons>
                <Message classes={messageClasses} fieldState={fieldState}>
                    {message}
                </Message>
            </div>
        </Fragment>
    );
};

export default Select;

Select.propTypes = {
    before: node,
    classes: shape({
        input: string
    }),
    field: string.isRequired,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: string,
            value: oneOfType([number, string])
        })
    ),
    message: node
};
