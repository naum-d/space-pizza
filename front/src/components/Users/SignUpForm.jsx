import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import * as Yup from 'yup';

import * as CONST from '../../CONST';
import FormLine from '../FormElements/FormLine';
import FormikInput from '../FormikElements/FormikInput';
import FormikContainer from '../FormikElements/FormikContainer';
import { appStoreUpdateStore } from '../../store/appStore/actions';

const NAME = 'name';
const EMAIL = 'email';
const ADDRESS = 'address';
const PASSWORD = 'password';
const PASSWORD_AGAIN = 'passwordAgain';

const INIT_FORM = {
  [NAME]: '',
  [EMAIL]: '',
  [ADDRESS]: '',
  [PASSWORD]: '',
  [PASSWORD_AGAIN]: '',
};

const VALIDATION = Yup.object({
  [NAME]: Yup.string().required('Required'),
  [ADDRESS]: Yup.string().required('Required'),
  [EMAIL]: Yup.string().email('Invalid Email').required('Required'),
  [PASSWORD]: Yup.string().required('Required'),
  [PASSWORD_AGAIN]: Yup.string()
    .oneOf([Yup.ref(PASSWORD), null], 'Passwords must match')
    .required('Required'),
});

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
      initialForm={INIT_FORM}
      storeName="sign-up-form"
      validationSchema={VALIDATION}
      dataSource={`${CONST.URL.USERS}/signUp`}
      renderFormFields={() => (
        <Fragment>
          <FormLine>
            <FormikInput name={EMAIL} label="E-mail" autoFocus />
            <FormikInput name={NAME} label="Name" />
          </FormLine>

          <FormikInput name={ADDRESS} label="Address" multiline rows={3} />

          <FormLine>
            <FormikInput name={PASSWORD} label="Password" type="password" />
            <FormikInput name={PASSWORD_AGAIN} label="Password Again" type="password" />
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
