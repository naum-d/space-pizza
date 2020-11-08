import React, { cloneElement } from 'react';
import * as PropTypes from 'prop-types';

import GridContainer from '../Layouts/GridContainer';

const FormLine = props => {
  const { children } = props;

  const renderChildren = () => {
    if (Array.isArray(children)) {
      const list = children.filter(item => !!item);
      const size = Math.floor(12 / list.length);
      return list.map((child, key) => cloneElement(child, { ...child.props, key, size }));
    }
    return children;
  };

  return (
    <GridContainer size={12} spacing={3} justify="space-between" children={renderChildren()} />
  );
};

FormLine.propTypes = {
  title: PropTypes.string,
};

export default FormLine;
