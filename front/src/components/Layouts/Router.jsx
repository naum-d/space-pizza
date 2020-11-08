import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import * as CONST from '../../CONST';

const Router = props => {
  const { isPrivate, path, component, ...other } = props;

  const [isLogin, setIsLogin] = useState(false);
  const userStore = useSelector(state => state.appStore[CONST.STORE.USER]);

  useEffect(() => {
    setIsLogin(!!userStore?.data?.token);
  }, [userStore]);

  return (
    <Fragment>
      {isPrivate
        ? isLogin && <Route {...{ path, component, ...other }} />
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
