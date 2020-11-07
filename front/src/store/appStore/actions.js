import API from '../../API';

export const APP_STORE_CREATE_STORE = 'APP_STORE_CREATE_STORE';
export const APP_STORE_UPDATE_STORE = 'APP_STORE_UPDATE_STORE';
export const APP_STORE_DELETE_STORE = 'APP_STORE_DELETE_STORE';

export const appStoreCreateStore = ({ storeName, data }) => {
  return {
    type: APP_STORE_CREATE_STORE,
    payload: { storeName, data },
  };
};

export const appStoreUpdateStore = ({ storeName, data, mapper }) => {
  return {
    type: APP_STORE_UPDATE_STORE,
    payload: { storeName, data, mapper },
  };
};

export const appStoreDeleteStore = storeName => {
  return {
    type: APP_STORE_DELETE_STORE,
    payload: { storeName },
  };
};

export const appStoreMakeRequest = ({ storeName, dataSource, data, method = 'GET', ...other }) => {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(appStoreUpdateStore({ storeName, data: { dataSource, isLoading: true } }));

      API.request(dataSource, { method, data, ...other })
        .then(resolve)
        .catch(reject)
        .finally(() => dispatch(appStoreUpdateStore({ storeName, data: { isLoading: false } })));
    });
};

export const appStoreLoadData = ({ storeName, dataSource, dataType, mapper }) => {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch(appStoreCreateStore({ storeName, data: { dataSource, data: dataType || [] } }));
      dispatch(appStoreMakeRequest({ storeName, dataSource, method: 'GET' }))
        .then(resp => {
          dispatch(appStoreUpdateStore({ storeName, data: { data: !!mapper ? mapper(resp) : resp } }));
          resolve(resp);
        })
        .catch(error => reject(error));
    });
};
