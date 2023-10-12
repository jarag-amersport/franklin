import { useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useFieldApi } from 'informed';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

// Difference to vanilla useRegion:
// Wraps formattedRegionsData in useMemo to prevent infinite rerender loop

export const useRegion = props => {
  const {
    countryCodeField = 'country',
    fieldInput = 'region',
    fieldSelect = 'region',
    optionValueKey = 'code',
    queries: { getRegionsQuery }
  } = props;

  const hasInitialized = useRef(false);
  const countryFieldState = useFieldState(countryCodeField);
  const { value: country } = countryFieldState;

  const regionInputFieldApi = useFieldApi(fieldInput);
  const regionSelectFieldApi = useFieldApi(fieldSelect);

  const { data, loading } = useQuery(getRegionsQuery, {
    variables: { countryCode: country },
    skip: !country
  });

  // Reset region value when country changes. Because of how Informed sets
  // initialValues, we want to skip the first state change of the value being
  // initialized.
  useEffect(() => {
    if (country && !loading) {
      if (hasInitialized.current) {
        regionInputFieldApi.exists() && regionInputFieldApi.setValue();
        regionSelectFieldApi.exists() &&
        regionSelectFieldApi.setValue();
      } else {
        hasInitialized.current = true;
      }
    }
  }, [country, regionInputFieldApi, regionSelectFieldApi, loading]);

  let formattedRegionsData = useMemo(() => {
    let regionsData = [{ label: 'Loading Regions...', value: '' }];
    if (data) {
      const { country } = data;
      const { available_regions: availableRegions } = country;
      if (availableRegions) {
        regionsData = availableRegions.map(region => ({
          key: region.id,
          label: region.name,
          value: region[optionValueKey]
        }));
        regionsData.unshift({
          disabled: true,
          hidden: true,
          label: '',
          value: ''
        });
      } else {
        regionsData = [];
      }
    }
    return regionsData;
  }, [data]);

  return {
    loading,
    regions: formattedRegionsData
  };
};
