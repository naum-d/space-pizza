import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import * as Yup from 'yup';

import * as CONST from '../../CONST';

import FormikInput from '../FormikElements/FormikInput';
import FormikContainer from '../FormikElements/FormikContainer';
import { appStoreUpdateStore } from '../../store/appStore/actions';

const EMAIL = 'email';
const PASSWORD = 'password';

const INITIAL_FORM = { [EMAIL]: '', [PASSWORD]: '' };

const VALIDATION = Yup.object({
  [EMAIL]: Yup.string().email('Invalid Email').required('Required'),
  [PASSWORD]: Yup.string().required('Required'),
});

const SignInForm = props => {
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
      storeName="sign-in-store"
      initialForm={INITIAL_FORM}
      dataSource={`${CONST.URL.USERS}/signIn`}
      validationSchema={VALIDATION}
      renderFormFields={() => (
        <Fragment>
          <FormikInput name={EMAIL} label="E-mail" autoFocus />
          <FormikInput name={PASSWORD} label="Password" type="password" />
        </Fragment>
      )}
    />
  );
};

SignInForm.propTypes = {
  handleClose: PropTypes.func,
};

export default SignInForm;
