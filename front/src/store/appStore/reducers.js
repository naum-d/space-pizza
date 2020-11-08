import * as ACTION from './actions';

const initialStore = {
  data: null,
  dataSource: null,
  isLoading: true,
};

export const appStoreReducer = (state = {}, action) => {
  const storeName = action.payload ? action.payload.storeName : null;
  const store = !!storeName ? state[storeName] : {};

  switch (action.type) {
    case ACTION.APP_STORE_CREATE_STORE:
      return { ...state, [storeName]: { ...initialStore, ...action.payload.data } };

    case ACTION.APP_STORE_UPDATE_STORE:
      const { data, mapper } = action.payload;
      return {
        ...state,
        [storeName]: { ...store, ...data, ...(!!mapper ? { data: mapper(store?.data) } : {}) },
      };

    case ACTION.APP_STORE_DELETE_STORE:
      if (!!storeName) {
        const { [storeName]: obj, ...other } = state;
        return other;
      }
      return {};

    default:
      return state;
  }
};
