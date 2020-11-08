import React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const GridContainer = props => {
  const { size, ...other } = props;

  return (
    <Grid item xs={size}>
      <Grid container {...other} />
    </Grid>
  );
};

GridContainer.propTypes = {
  size: PropTypes.any,
};

GridContainer.defaultProps = {
  size: 'auto',
};

export default GridContainer;
