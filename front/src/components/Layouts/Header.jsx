import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';

import Cart from '../Cart/Cart';
import * as CONST from '../../CONST';
import MenuButton from './MenuButton';
import Currency from '../Currency/Currency';
import AuthDialog from '../Users/AuthDialog';
import { turnOffEvent } from '../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from '../../helpers/routerHooks';
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
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { navigate } = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const userStore = useSelector(state => state.appStore[CONST.STORE.USER]);

  useEffect(() => {
    setIsLogin(!!userStore?.data?.token);
  }, [userStore]);

  const handleClick = e => {
    turnOffEvent(e);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(appStoreDeleteStore(CONST.STORE.USER));
    dispatch(appStoreDeleteStore(CONST.STORE.CART));
    dispatch(appStoreDeleteStore(CONST.STORE.CURRENCY));
  };

  const menuList = [
    { name: 'history', label: 'History', path: '/history' },
    { name: 'logout', label: 'Sign Out', action: handleLogout },
  ];

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title} children="Super Pizza" onClick={handleClick} />

        <ButtonGroup variant="outlined" color="inherit">
          <Currency />
          <Cart />
          {isLogin && <MenuButton {...{ menuList }} label={<FaceOutlinedIcon fontSize="small" />} />}
          {!isLogin && <AuthDialog />}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {};

export default Header;
