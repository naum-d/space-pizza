import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import * as CONST from '../../CONST';
import { appStoreCreateStore } from '../../store/appStore/actions';

const Cart = () => {

  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.appStore[CONST.STORE.CART]);

  useEffect(() => {
    console.log('START CART');
    const cart = localStorage.getItem(CONST.LOCAL_STORE.CART);
    const data = !!cart && JSON.parse(cart)['timer'] > new Date().getTime() ? JSON.parse(cart)['order'] : {};
    dispatch(appStoreCreateStore({ storeName: CONST.STORE.CART, data: { data, isLoading: false } }));
  }, [dispatch]);

  useEffect(() => {
    console.log('CART', cartStore);
    if (!!cartStore?.data) {
      const timer = new Date().getTime() + 24 * 60 * 60 * 1000;
      const order = cartStore.data;
      localStorage.setItem(CONST.LOCAL_STORE.CART, JSON.stringify({ timer, order }));
    }
  }, [cartStore]);

  return (
    <Fragment>
      <Button color="inherit">
        <ShoppingCartOutlinedIcon />
      </Button>
    </Fragment>
  );
};

export default Cart;
