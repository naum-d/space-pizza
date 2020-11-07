import { combineReducers } from 'redux';

import { appStoreReducer } from './appStore/reducers';

const rootReducer = () =>
  combineReducers({
    appStore: appStoreReducer,
  });

export default rootReducer;
