import React from 'react';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import classes from './static.module.css';

const staticIndicator = (
  <LoadingIndicator global={true} classes={classes}>
    <FormattedMessage
      id={'loadingIndicator.message'}
      defaultMessage={'Fetching Data...'}
    />
  </LoadingIndicator>
);

export default staticIndicator;
