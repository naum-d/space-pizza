import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'fontsource-roboto';
import { Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as CONST from '../CONST';
import PizzasPage from './PizzasPage';
import Main from '../components/Layouts/Main';
import Header from '../components/Layouts/Header';
import Router from '../components/Layouts/Router';
import { appStoreLoadData } from '../store/appStore/actions';
import OrdersPage from './OrdersPage';
import Typography from '@material-ui/core/Typography';
import HistoriesPage from './HistoriesPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ef6c00',
    },
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(CONST.LOCAL_STORE.TOKEN);
    !!token && dispatch(appStoreLoadData({ storeName: CONST.STORE.USER, dataSource: `${CONST.URL.USERS}/self` }));
  }, [dispatch]);

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />

        <Main>
          <Switch>
            <Router path="/" exact component={PizzasPage} />

            <Router path="/order" component={OrdersPage} />

            <Router path="/history" isPrivate component={HistoriesPage} />

            <Route render={() => <Typography variant="h4" children="404. Page not found" />} />
          </Switch>
        </Main>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
