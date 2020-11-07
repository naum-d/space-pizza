import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import * as CONST from '../../CONST';
import { turnOffEvent } from '../../helpers';
import { appStoreUpdateStore } from '../../store/appStore/actions';

const PizzaCardFooter = props => {
  const { id, ...other } = props;

  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [currency, setCurrency] = useState('usd');
  const cartStore = useSelector(state => state.appStore[CONST.STORE.CART]);
  const currencyStore = useSelector(state => state.appStore[CONST.STORE.CURRENCY]);

  useEffect(() => {
    !!currencyStore?.data && setCurrency(currencyStore.data);
  }, [currencyStore]);

  useEffect(() => {
    !!cartStore?.data && setCount(cartStore?.data?.[id]?.count || 0);
    !!cartStore?.data && setIsAdded(!!Object.keys(cartStore.data).includes(id));
  }, [cartStore, id]);

  const handleAdd = e => {
    turnOffEvent(e);
    const mapper = d => ({ ...d, [id]: { pizza: id, count: 1 } });
    dispatch(appStoreUpdateStore({ storeName: CONST.STORE.CART, mapper }));
  };

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

  return (
    <Fragment>
      <Grid item children={<Typography variant="h6" children={`${other[currency]} ${currency.toUpperCase()}`} />} />
      <Grid item>
        {!isAdded && <Button size="small" variant="outlined" color="primary" onClick={handleAdd} children="Add" />}
        {!!isAdded && (
          <ButtonGroup size="small" variant="outlined" color="primary">
            <Button onClick={handleMinus} children={<RemoveIcon fontSize="small" />} />
            <Button children={count} />
            <Button onClick={handlePlus} children={<AddIcon fontSize="small" />} />
          </ButtonGroup>
        )}
      </Grid>
    </Fragment>
  );
};

PizzaCardFooter.propTypes = {};

export default PizzaCardFooter;
