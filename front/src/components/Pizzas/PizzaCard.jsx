import React from 'react';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Progress from '../Layouts/Progress';
import { getImageFromBase64 } from '../../helpers';
import GridContainer from '../Layouts/GridContainer';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    minHeight: '400px',
    position: 'relative',
    padding: theme.spacing(1),
  },
  grid: {
    width: '100%',
    paddingTop: theme.spacing(1),
  },
}));

const PizzaCard = props => {
  const { isLoading, img, name, description } = props;

  const classes = useStyles();

  const renderButtons = () => {
    return <Button children="Add" />;
  };

  const renderCard = () => {
    return (
      <Grid container direction="column" justify="space-between" style={{ height: '100%' }}>
        <GridContainer itemProps={{ className: classes.grid }}>
          <Grid item xs={12} children={getImageFromBase64(img, { width: '100%' })} />
          <Grid item xs={12} children={<Typography variant="h6" children={name} />} />
          <Grid item xs={12} children={<Typography variant="body2" children={description} />} />
        </GridContainer>

        <GridContainer itemProps={{ className: classes.grid }} alignItems="center" justify="space-between">
          <Grid item children={<Typography variant="h6" children="6.66 USD" />} />
          <Grid item>
            <ButtonGroup variant="outlined" color="primary" children={renderButtons()} />
          </Grid>
        </GridContainer>
      </Grid>
    );
  };

  return (
    <Grid item xs={3}>
      <Paper className={classes.card}>
        {!!isLoading && <Progress />}
        {!isLoading && renderCard()}
      </Paper>
    </Grid>
  );
};

PizzaCard.propTypes = {
  isLoading: PropTypes.bool,
};

PizzaCard.defaultProps = {
  isLoading: true,
};

export default PizzaCard;
