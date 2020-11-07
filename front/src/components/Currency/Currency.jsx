import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as CONS from '../../CONST';
import MenuButton from '../Layouts/MenuButton';
import { appStoreCreateStore, appStoreUpdateStore } from '../../store/appStore/actions';

const Currency = () => {
  const storeName = CONS.STORE.CURRENCY;

  const dispatch = useDispatch();
  const [label, setLabel] = useState('usd');
  const currencyStore = useSelector(state => state.appStore[storeName]);

  useEffect(() => {
    const currency = localStorage.getItem(CONS.LOCAL_STORE.CURRENCY);
    dispatch(appStoreCreateStore({ storeName, data: { data: currency || 'usd' } }));
  }, [dispatch, storeName]);

  useEffect(() => {
    !!currencyStore?.data && setLabel(currencyStore.data);
    !!currencyStore?.data && localStorage.setItem(CONS.LOCAL_STORE.CURRENCY, currencyStore.data);
  }, [currencyStore]);

  const handleChange = val => {
    dispatch(appStoreUpdateStore({ storeName, data: { data: val.name } }));
  };

  const menuList = [
    { name: 'usd', label: 'USD', action: handleChange },
    { name: 'euro', label: 'EURO', action: handleChange },
  ];

  return <MenuButton {...{ label, menuList }} />;
};

Currency.propTypes = {};

export default Currency;
