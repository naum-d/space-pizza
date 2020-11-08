import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Cart from '../Cart/Cart';
import * as CONST from '../../CONST';
import Currency from '../Currency/Currency';
import AuthDialog from '../Users/AuthDialog';
import { turnOffEvent } from '../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { appStoreDeleteStore } from '../../store/appStore/actions';

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
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const userStore = useSelector(state => state.appStore[CONST.STORE.USER]);

  useEffect(() => {
    setIsLogin(!!userStore?.data?.token);
  }, [userStore]);

  const handleLogout = e => {
    turnOffEvent(e);
    localStorage.clear();
    dispatch(appStoreDeleteStore(CONST.STORE.USER));
    dispatch(appStoreDeleteStore(CONST.STORE.CART));
    dispatch(appStoreDeleteStore(CONST.STORE.CURRENCY));
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title} children="Super Pizza" />

        <ButtonGroup variant="outlined" color="inherit">
          <Currency />
          {!isLogin && <AuthDialog />}
          {isLogin && <Button onClick={handleLogout} children={'Logout'} />}
          <Cart />
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {};

export default Header;
