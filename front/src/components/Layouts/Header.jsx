import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Cart from '../Cart/Cart';
import Currency from '../Currency/Currency';

const useStyles = makeStyles(theme => ({
  appBar: {
    margin: '0',
    padding: '0',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title} children="Super Pizza" />

        <ButtonGroup variant="outlined" color="inherit">
          <Currency />
          <Cart />
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {};

export default Header;
