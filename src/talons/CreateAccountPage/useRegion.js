import { gql, useQuery } from '@apollo/client';

const getRegionsQuery = gql`
    query GetRegions {
        country(id: "US") {
            id
            available_regions {
                id
                code
                name
            }
        }
    }
`;

export default function useRegion() {
  const { data, loading } = useQuery(getRegionsQuery);

  let formattedRegionsData = [{ label: 'Loading Regions...', value: '' }];
  if (data) {
    const { country } = data;
    const { available_regions: availableRegions } = country;
    if (availableRegions) {
      formattedRegionsData = availableRegions.map(region => ({
        key: region.id,
        label: region.name,
        value: JSON.stringify({
          region: region.name,
          region_code: region.code,
          region_id: region.id
        })
      }));
      formattedRegionsData.unshift({
        disabled: true,
        hidden: true,
        label: '',
        value: ''
      });
    } else {
      formattedRegionsData = [];
    }
  }

  return {
    loading,
    regions: formattedRegionsData
  };
}
