import * as Yup from 'yup';

export const NAME = 'name';
export const EMAIL = 'email';
export const ADDRESS = 'address';
export const PASSWORD = 'password';
export const PASSWORD_AGAIN = 'passwordAgain';

export const INIT_FORM = {
  [NAME]: '',
  [EMAIL]: '',
  [ADDRESS]: '',
  [PASSWORD]: '',
  [PASSWORD_AGAIN]: '',
};

export const VALIDATION = Yup.object({
  [NAME]: Yup.string().required('Required'),
  [ADDRESS]: Yup.string().required('Required'),
  [EMAIL]: Yup.string().email('Invalid Email').required('Required'),
  [PASSWORD]: Yup.string().required('Required'),
  [PASSWORD_AGAIN]: Yup.string()
    .oneOf([Yup.ref(PASSWORD), null], 'Passwords must match')
    .required('Required'),
});
