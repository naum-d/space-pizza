import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import { MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { appStoreCreateStore, appStoreLoadData } from '../../store/appStore/actions';

import * as CONST from '../../CONST';
import CartMenuItem from './CartMenuItem';
import { turnOffEvent } from '../../helpers';

const useStyles = makeStyles(theme => ({
  menuItem: {
    height: theme.spacing(12),
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:click': {
      backgroundColor: 'transparent',
    },
  },
}));

const Cart = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  const [pizzas, setPizzas] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartStore = useSelector(state => state.appStore[CONST.STORE.CART]);
  const pizzasStore = useSelector(state => state.appStore[CONST.STORE.PIZZAS]);
  const currencyStore = useSelector(state => state.appStore[CONST.STORE.CURRENCY]);

  useEffect(() => {
    dispatch(appStoreLoadData({ storeName: CONST.STORE.PIZZAS, dataSource: CONST.URL.PIZZAS }));
  }, [dispatch]);

  useEffect(() => {
    !!pizzasStore && !pizzasStore.isLoading && setPizzas(pizzasStore.data);
  }, [pizzasStore]);

  useEffect(() => {
    const cart = localStorage.getItem(CONST.LOCAL_STORE.CART);
    const data = !!cart && JSON.parse(cart)['timer'] > new Date().getTime() ? JSON.parse(cart)['order'] : {};
    dispatch(appStoreCreateStore({ storeName: CONST.STORE.CART, data: { data, isLoading: false } }));
  }, [dispatch]);

  useEffect(() => {
    if (!!cartStore?.data) {
      const timer = new Date().getTime() + 24 * 60 * 60 * 1000;
      const order = cartStore.data;
      localStorage.setItem(CONST.LOCAL_STORE.CART, JSON.stringify({ timer, order }));
    }
  }, [cartStore]);

  useEffect(() => {
    !!cartStore?.data && setCart(cartStore.data);
    !!cartStore?.data && setTotalCount(Object.values(cartStore.data).reduce((total, i) => total + i['count'], 0));
  }, [cartStore]);

  useEffect(() => {
    const orderIds = Object.keys(cart);
    setTotalPrice(pizzas.reduce((price, i) => orderIds.includes(i.id)
      ? price + i[currencyStore.data] * cart[i.id]?.['count']
      : price, 0));
  }, [cart, pizzas, currencyStore]);

  const handleClick = e => {
    turnOffEvent(e);
    !!Object.keys(cart).length && setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = () => {
    const orderIds = Object.keys(cart);
    return pizzas.map(({ id, ...other }) => {
      const count = cart?.[id]?.count || 0;
      return !!orderIds.includes(id) && (
        <MenuItem key={id} className={classes.menuItem} children={<CartMenuItem {...{ id, count, ...other }} />} />
      );
    });
  };

  return (
    <Fragment>
      <Button
        {...props}
        onClick={handleClick}
        startIcon={!!totalCount && <ShoppingCartOutlinedIcon />}
        children={totalCount || <ShoppingCartOutlinedIcon fontSize="small" />}
      />

      {!!Object.keys(cart).length && (
        <Menu
          keepMounted
          variant="selectedMenu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
          {renderMenuItems()}
          <MenuItem>
            <Button fullWidth variant="contained" color="primary">
              Make Order: {totalPrice} {currencyStore.data.toString()}
            </Button>
          </MenuItem>
        </Menu>
      )}
    </Fragment>
  );
};

export default Cart;
