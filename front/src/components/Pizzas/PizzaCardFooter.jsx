import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import * as CONST from '../../CONST';

const PizzaCardFooter = props => {
  const storeName = CONST.STORE.CURRENCY;

  const [currency, setCurrency] = useState('usd');
  const currencyStore = useSelector(state => state.appStore[storeName]);

  useEffect(() => {
    !!currencyStore?.data && setCurrency(currencyStore.data);
  }, [currencyStore]);

  return (
    <Fragment>
      <Grid item children={<Typography variant="h6" children={`${props[currency]} ${currency.toUpperCase()}`} />} />
      <Grid item>
        <ButtonGroup variant="outlined" color="primary">
          <Button children="Add" />;
        </ButtonGroup>
      </Grid>
    </Fragment>
  );
};

PizzaCardFooter.propTypes = {};

export default PizzaCardFooter;
