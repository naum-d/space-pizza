import React from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

import * as CONST from '../../CONST';
import GridContainer from '../Layouts/GridContainer';
import { appStoreUpdateStore } from '../../store/appStore/actions';
import { getImageFromBase64, turnOffEvent } from '../../helpers/helpers';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
  },
}));

const HistoryCard = props => {
  const { createdAt, currency, totalPrice, order } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRepeat = e => {
    turnOffEvent(e);
    const data = order.reduce((res, i) => ({ ...res, [i.pizza.id]: { count: i.count, pizza: i.pizza.id } }), {});
    dispatch(appStoreUpdateStore({ storeName: CONST.STORE.CART, data: { data } }));
  };

  const renderOrders = () => {
    return order.map(({ count, pizza: { id, name, img } }) => (
      <Grid item xs={2} key={id}>
        <GridContainer direction="column" alignItems="center">
          <Grid item xs={12} children={getImageFromBase64(img, { width: '100%' })} />
          <Grid item xs={12} children={<Typography children={`${name} * ${count}`} />} />
        </GridContainer>
      </Grid>
    ));
  };

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" alignItems="flex-start">
        <Grid item>
          <Typography variant="h6" children={moment(createdAt).format('DD-MM-YYYY | H:m')} />
          <Typography gutterBottom color="primary"
                      children={`Price: ${totalPrice.toFixed(2)} ${currency.toUpperCase()}`} />
        </Grid>
        <Grid>
          <IconButton color="primary" onClick={handleRepeat} children={<ReplayIcon fontSize="small" />} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {renderOrders()}
      </Grid>
    </Paper>
  );
};

HistoryCard.propTypes = {
  createdAt: PropTypes.string,
  totalPrice: PropTypes.number,
  currency: PropTypes.string,
  order: PropTypes.array,
};

export default HistoryCard;
