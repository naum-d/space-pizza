import React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const GridContainer = props => {
  const { itemProps, ...other } = props;

  return (
    <Grid item {...itemProps}>
      <Grid container {...other} />
    </Grid>
  );
};

GridContainer.propTypes = {
  itemProps: PropTypes.any,
};

GridContainer.defaultProps = {
  itemProps: { xs: 12 },
};

export default GridContainer;
