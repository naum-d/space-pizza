import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';

import * as CONST from '../../CONST';

const Router = props => {
  const { isPrivate, path, component, ...other } = props;

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem(CONST.LOCAL_STORE.TOKEN));
  const userStore = useSelector(state => state.appStore[CONST.STORE.USER]);

  useEffect(() => {
    setIsLogin(!!userStore?.data?.token || !!localStorage.getItem(CONST.LOCAL_STORE.TOKEN));
  }, [userStore]);

  return (
    <Fragment>
      {isPrivate
        ? isLogin ? <Route {...{ path, component, ...other }} /> : <Redirect to="/" />
        : <Route {...{ path, component, ...other }} />
      }
    </Fragment>
  );
};

Router.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
  isPrivate: PropTypes.bool,
};

Router.defaultProps = {
  isPrivate: false,
};

export default Router;
