import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'fontsource-roboto';
import { Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as CONST from '../CONST';
import Main from '../components/Layouts/Main';
import Header from '../components/Layouts/Header';
import Router from '../components/Layouts/Router';
import { appStoreLoadData } from '../store/appStore/actions';
import PizzasPage from './PizzasPage';

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
    !!token && dispatch(appStoreLoadData({ storeName: CONST.STORE.USER, dataSource: CONST.URL.USERS }));
  }, [dispatch]);

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />

        <Main>
          <Switch>
            <Router path="/" component={PizzasPage} />
          </Switch>
        </Main>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
