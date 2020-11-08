import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import * as CONST from '../../CONST';
import HistoryCard from './HistoryCard';
import Progress from '../Layouts/Progress';
import { appStoreLoadData } from '../../store/appStore/actions';

const Histories = () => {

  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const orderStore = useSelector(state => state.appStore[CONST.STORE.ORDERS]);

  useEffect(() => {
    dispatch(appStoreLoadData({ storeName: CONST.STORE.ORDERS, dataSource: CONST.URL.ORDERS }));
  }, [dispatch]);

  useEffect(() => {
    setHistory(orderStore?.data || []);
    const timer = setTimeout(() => setIsLoading(!!orderStore?.isLoading), 200);
    return () => clearTimeout(timer);
  }, [orderStore]);

  const renderHistory = () => {
    return history.map(data => (
      <Grid item xs={12} key={data.id} children={<HistoryCard key={data.id} {...data} />} />
    ));
  };

  return (
    <Fragment>
      <Typography variant="h5" children="History" gutterBottom />
      {isLoading && <Container children={<Progress />} />}
      <Grid container spacing={2} children={renderHistory()} />
    </Fragment>
  );
};

export default Histories;
