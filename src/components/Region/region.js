import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { func, number, oneOfType, shape, string } from 'prop-types';
import { useRegion } from '../../talons/Region/useRegion';

import useStyle from '@magento/peregrine/lib/util/shallowMerge';
import Field from '../Field/field';
import Select from '../Select/select';
import TextInput from '../TextInput/textInput';
import defaultClasses from './region.module.css';
import { GET_REGIONS_QUERY } from '@magento/venia-ui/lib/components/Region/region.gql';

/**
 * Form component for Region that is seeded with backend data.
 *
 * @param {string} props.optionValueKey - Key to use for returned option values. In a future release, this will be removed and hard-coded to use "id" once GraphQL has resolved MC-30886.
 */
const Region = props => {
    const {
        classes: propClasses,
        countryCodeField,
        fieldInput,
        fieldSelect,
        label,
        translationId,
        optionValueKey,
        fieldClasses,
        inputClasses,
        messageClasses,
        setRegionMappings,
        ...inputProps
    } = props;
    const { formatMessage } = useIntl();

    const talonProps = useRegion({
        countryCodeField,
        fieldInput,
        fieldSelect,
        optionValueKey,
        queries: { getRegionsQuery: GET_REGIONS_QUERY }
    });
    const { loading, regions } = talonProps;

    // Creates mapping of <region name> -> <region id>
    useEffect(() => {
      if (!loading && regions && regions.length) {
        const regionMappings = {};
        regions.forEach((region) => regionMappings[region.label] = region.key);
        setRegionMappings?.(regionMappings);
      }
    }, [regions]);

    const classes = useStyle(defaultClasses, propClasses);
    const regionProps = {
        classes: inputClasses,
        messageClasses,
        disabled: loading,
        ...inputProps
    };

    const regionField =
        regions.length || loading ? (
            <Select
                {...regionProps}
                field={fieldSelect}
                id={classes.root}
                items={regions}
            />
        ) : (
            <TextInput {...regionProps} field={fieldInput} id={classes.root} />
        );

    return (
        <Field
            id={classes.root}
            label={formatMessage({ id: translationId, defaultMessage: label })}
            classes={fieldClasses}
        >
            {regionField}
        </Field>
    );
};

export default Region;

Region.defaultProps = {
    countryCodeField: 'country',
    fieldInput: 'region',
    fieldSelect: 'region',
    label: 'State',
    translationId: 'region.label',
    optionValueKey: 'code'
};

Region.propTypes = {
    classes: shape({
        root: string
    }),
    countryCodeField: string,
    fieldInput: string,
    fieldSelect: string,
    label: string,
    translationId: string,
    optionValueKey: string,
    validate: func,
    initialValue: oneOfType([number, string])
};
