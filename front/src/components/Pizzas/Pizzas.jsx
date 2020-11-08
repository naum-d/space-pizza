import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import PizzaCard from './PizzaCard';
import * as CONST from '../../CONST';

const Pizzas = () => {
  const [data, setData] = useState(Array(12).fill({}));
  const pizzasStore = useSelector(state => state.appStore[CONST.STORE.PIZZAS]);

  useEffect(() => {
    !!pizzasStore && !pizzasStore.isLoading && setData(pizzasStore.data);
  }, [pizzasStore]);

  return (
    <Grid container spacing={2}>
      {data.map((i, index) => <PizzaCard {...i} key={i.id || index} isLoading={!('id' in i)} />)}
    </Grid>
  );
};

export default Pizzas;
