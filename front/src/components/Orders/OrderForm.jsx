import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as FORM from '../Users/form';
import * as CONST from '../../CONST';
import FormLine from '../FormElements/FormLine';
import FormikInput from '../FormikElements/FormikInput';
import FormikContainer from '../FormikElements/FormikContainer';
import { appStoreDeleteStore } from '../../store/appStore/actions';

const OrderForm = () => {
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.appStore[CONST.STORE.CART]);
  const currencyStore = useSelector(state => state.appStore[CONST.STORE.CURRENCY]);

  const beforeSubmit = data => {
    return { user: data, order: Object.values(cartStore?.data || {}), currency: currencyStore?.data || 'usd' };
  };

  const afterSubmit = () => {
    dispatch(appStoreDeleteStore(CONST.STORE.CART));
    localStorage.clear();
  };

  return (
    <FormikContainer
      {...{ afterSubmit, beforeSubmit }}
      size={12}
      method="POST"
      storeName="sign-up-form"
      initialForm={FORM.INIT_FORM}
      dataSource={CONST.URL.ORDERS}
      validationSchema={FORM.VALIDATION}
      renderFormFields={() => (
        <Fragment>
          <FormLine>
            <FormikInput name={FORM.EMAIL} label="E-mail" autoFocus />
            <FormikInput name={FORM.NAME} label="Name" />
          </FormLine>

          <FormikInput name={FORM.ADDRESS} label="Address" multiline rows={3} />

          <FormLine>
            <FormikInput name={FORM.PASSWORD} label="Password" type="password" />
            <FormikInput name={FORM.PASSWORD_AGAIN} label="Password Again" type="password" />
          </FormLine>
        </Fragment>
      )}
    />
  );
};

OrderForm.propTypes = {};

export default OrderForm;
