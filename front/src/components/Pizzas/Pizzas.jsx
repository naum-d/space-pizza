import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import PizzaCard from './PizzaCard';
import * as CONST from '../../CONST';
import { appStoreLoadData } from '../../store/appStore/actions';

const Pizzas = () => {
  const storeName = CONST.STORE.PIZZAS;
  const dataSource = CONST.URL.PIZZAS;

  const dispatch = useDispatch();
  const [data, setData] = useState(Array(12).fill({}));
  const pizzasStore = useSelector(state => state.appStore[storeName]);

  useEffect(() => {
    dispatch(appStoreLoadData({ storeName, dataSource }));
  }, [dispatch, storeName, dataSource]);

  useEffect(() => {
    setTimeout(() => !!pizzasStore && !pizzasStore.isLoading && setData(pizzasStore.data), 1000);
  }, [pizzasStore]);

  return (
    <Grid container spacing={2}>
      {data.map((i, index) => <PizzaCard {...i} key={i.id || index} isLoading={!('id' in i)} />)}
    </Grid>
  );
};

export default Pizzas;
