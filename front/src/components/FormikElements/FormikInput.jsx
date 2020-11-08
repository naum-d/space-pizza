import React from 'react';

import FormikField from './FormikField';
import AppInput from '../FormElements/AppInput';

const FormikInput = props => {
  return <FormikField {...props} render={props => <AppInput {...props} />} />;
};

export default FormikInput;
