import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { ButtonGroup } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import * as CONST from '../../CONST';
import GridContainer from '../Layouts/GridContainer';
import { getImageFromBase64, turnOffEvent } from '../../helpers';
import { appStoreUpdateStore } from '../../store/appStore/actions';

const useStyles = makeStyles(theme => ({
  grid: {
    height: '100%',
  },
}));

const CartMenuItem = props => {
  const { id, name, count, img, ...other } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState('usd');
  const currencyStore = useSelector(state => state.appStore[CONST.STORE.CURRENCY]);

  useEffect(() => {
    !!currencyStore?.data && setCurrency(currencyStore.data);
  }, [currencyStore]);

  const handlePlus = e => {
    turnOffEvent(e);
    const mapper = d => ({ ...d, [id]: { pizza: id, count: count + 1 } });
    dispatch(appStoreUpdateStore({ storeName: CONST.STORE.CART, mapper }));
  };

  const handleMinus = e => {
    turnOffEvent(e);
    const mapper = d => {
      const { [id]: obj, ...other } = d;
      return count === 1 ? { ...other } : { ...other, [id]: { ...obj, count: count - 1 } };
    };
    dispatch(appStoreUpdateStore({ storeName: CONST.STORE.CART, mapper }));
  };

  const handleRemove = e => {
    turnOffEvent(e);
    const mapper = d => {
      const { [id]: obj, ...other } = d;
      return other;
    };
    dispatch(appStoreUpdateStore({ storeName: CONST.STORE.CART, mapper }));
  };

  const renderButtons = () => {
    return (
      <ButtonGroup size="small" color="primary" variant="outlined">
        <Button onClick={handleMinus} children={<RemoveIcon fontSize="small" />} />
        <Button children={count} />
        <Button onClick={handlePlus} children={<AddIcon fontSize="small" />} />
      </ButtonGroup>
    );
  };

  return (
    <Grid container className={classes.grid} alignItems="flex-start" justify="space-between" spacing={1}>
      <Grid item className={classes.grid}>
        <Grid container className={classes.grid} spacing={1}>
          <Grid item className={classes.grid} children={getImageFromBase64(img, { height: '100%' })} />

          <GridContainer direction="column" justify="space-around" style={{ height: '100%' }}>
            <Grid item children={<Typography variant="h6" children={name} />} />
            <Grid item children={renderButtons()} />
          </GridContainer>
        </Grid>
      </Grid>

      <GridContainer direction="column" justify="center" alignItems="flex-end" style={{ height: '100%' }}>
        <Grid item children={<IconButton onClick={handleRemove} children={<CloseIcon fontSize="small" />} />} />
        <Grid item children={<Typography children={`${count * other[currency]} ${currency.toUpperCase()}`} />} />
      </GridContainer>
    </Grid>
  );
};

CartMenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default CartMenuItem;
