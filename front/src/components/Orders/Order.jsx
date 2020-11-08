import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import OrderForm from './OrderForm';
import * as CONST from '../../CONST';
import AuthDialog from '../Users/AuthDialog';
import CartMenuItem from '../Cart/CartMenuItem';
import GridContainer from '../Layouts/GridContainer';
import { appStoreDeleteStore, appStoreMakeRequest } from '../../store/appStore/actions';

const useStyles = makeStyles(theme => ({
  line: {
    height: theme.spacing(20),
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(0, 2),
  },
}));

const Order = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  const [pizzas, setPizzas] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [currency, setCurrency] = useState('usd');
  const [totalPrice, setTotalPrice] = useState(0);
  const userStore = useSelector(state => state.appStore[CONST.STORE.USER]);
  const cartStore = useSelector(state => state.appStore[CONST.STORE.CART]);
  const pizzasStore = useSelector(state => state.appStore[CONST.STORE.PIZZAS]);
  const currencyStore = useSelector(state => state.appStore[CONST.STORE.CURRENCY]);

  useEffect(() => {
    setCart(cartStore?.data || {});
  }, [cartStore]);

  useEffect(() => {
    setPizzas(pizzasStore?.data || []);
  }, [pizzasStore]);

  useEffect(() => {
    setCurrency(currencyStore?.data || 'usd');
  }, [currencyStore]);

  useEffect(() => {
    setIsLogin(!!userStore?.data?.token);
  }, [userStore]);

  useEffect(() => {
    const orderIds = Object.keys(cart);
    setTotalPrice(pizzas.reduce((price, i) => orderIds.includes(i.id)
      ? price + i[currency] * cart[i.id]?.['count']
      : price, 0));
  }, [cart, pizzas, currency]);

  const handleOrder = () => {
    const data = { order: Object.values(cart), currency };
    dispatch(appStoreMakeRequest({ storeName: 'order-form', dataSource: CONST.URL.ORDERS, data, method: 'POST' }))
      .then(() => localStorage.setItem(CONST.LOCAL_STORE.CART, JSON.stringify({})))
      .then(() => dispatch(appStoreDeleteStore(CONST.STORE.CART)))
  };

  const renderItems = () => {
    const orderIds = Object.keys(cart);
    return pizzas.map(({ id, ...other }) => {
      const count = cart?.[id]?.count || 0;
      return !!orderIds.includes(id) && (
        <Grid key={id} xs={12} item className={classes.line} children={<CartMenuItem {...{ id, count, ...other }} />} />
      );
    });
  };

  return (
    <Grid container spacing={2}>
      {!Object.keys(cartStore?.data || {}).length && <Redirect to="/" />}
      <Grid item xs={12}>
        <Paper>
          <Grid container>
            {renderItems()}
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <GridContainer alignItems="center" spacing={1}>
              <Grid item children={<Typography variant="h6" children="Subtotal:" />} />
              <Grid item children={<Typography variant="h6" color="primary" children={totalPrice} />} />
              <Grid item children={<Typography variant="h6" color="primary" children={currency.toUpperCase()} />} />
            </GridContainer>
          </Grid>
          <Grid container spacing={2}>
            <GridContainer alignItems="center" spacing={1}>
              <Grid item children={<Typography children="Delivery:" />} />
              <Grid item children={<Typography color="primary" children={2} />} />
              <Grid item children={<Typography color="primary" children={currency.toUpperCase()} />} />
            </GridContainer>
          </Grid>
          <Grid container spacing={2}>
            <GridContainer alignItems="center" spacing={1}>
              <Grid item children={<Typography variant="h5" children="Total:" />} />
              <Grid item children={<Typography variant="h5" color="primary" children={totalPrice + 2} />} />
              <Grid item children={<Typography variant="h5" color="primary" children={currency.toUpperCase()} />} />
            </GridContainer>
          </Grid>
        </Paper>
      </Grid>

      {!isLogin && <Grid item xs={12} children={<AuthDialog color="primary" variant="contained" />} />}
      {!isLogin && <OrderForm />}
      {!!isLogin && (
        <Grid item xs={12}>
          <Button fullWidth color="primary" variant="contained" onClick={handleOrder} children="Make Order" />
        </Grid>
      )}
    </Grid>
  );
};

export default Order;
