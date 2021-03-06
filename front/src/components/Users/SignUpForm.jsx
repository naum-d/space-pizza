import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';

import * as FORM from './form';
import * as CONST from '../../CONST';
import FormLine from '../FormElements/FormLine';
import FormikInput from '../FormikElements/FormikInput';
import FormikContainer from '../FormikElements/FormikContainer';
import { appStoreUpdateStore } from '../../store/appStore/actions';

const SignUpForm = props => {
  const { handleClose } = props;

  const dispatch = useDispatch();

  const afterSubmit = data => {
    handleClose(false);
    localStorage.setItem(CONST.LOCAL_STORE.TOKEN, data?.token);
    dispatch(appStoreUpdateStore({ storeName: CONST.STORE.USER, data: { data } }));
  };

  return (
    <FormikContainer
      {...{ afterSubmit }}
      size={12}
      method="POST"
      withPaper={false}
      storeName="sign-up-form"
      initialForm={FORM.INIT_FORM}
      validationSchema={FORM.VALIDATION}
      dataSource={`${CONST.URL.USERS}/signUp`}
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

SignUpForm.propTypes = {
  handleClose: PropTypes.func,
};

export default SignUpForm;
