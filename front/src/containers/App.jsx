import React, { Fragment } from 'react';
import 'fontsource-roboto';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../components/Layouts/Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ef6c00',
    },
  },
});

const App = () => {

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
