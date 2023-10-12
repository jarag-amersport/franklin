import React, { Fragment, useMemo } from 'react';
import { arrayOf, shape, string } from 'prop-types';

import useStyle from '@magento/peregrine/lib/util/shallowMerge';

import defaultClasses from './productOptions.module.css';

const ProductOptions = props => {
  const { options = [] } = props;

  const classes = useStyle(defaultClasses, props.classes);
  const displayOptions = useMemo(
      () =>
          options.map(({ label, value }) => {
              const key = `${label}${value}`;
              return (
                  <Fragment key={key}>
                      <dt className={classes.optionName}>
                          {label}
                      </dt>
                      <dd className={classes.optionValue}>
                          {value}
                      </dd>
                  </Fragment>
              );
          }),
      [classes, options]
  );

  if (displayOptions.length === 0) {
    return null;
  }

  return <dl className={classes.options}>{displayOptions}</dl>;
};

ProductOptions.propTypes = {
    options: arrayOf(
        shape({
            label: string,
            value: string
        })
    )
};

export default ProductOptions;
