import React from 'react';
import { Field, getIn } from 'formik';
import * as PropTypes from 'prop-types';

const FormikField = props => {
  const { name, onChange, render, ...other } = props;

  return (
    <Field
      {...{ name }}
      render={props => {
        const {
          field: { value },
          form,
        } = props;
        const { touched, errors, setFieldTouched, setFieldValue, handleBlur: onBlur } = form;

        const error = getIn(errors, name);
        const touch = getIn(touched, name);
        const hasError = !!error && !!touch;
        const helperText = hasError ? error : '';

        const handleChange = value => {
          setFieldValue(name, value);
          setFieldTouched(name);
          onChange(value);
        };

        return render({ name, value, helperText, onBlur, error: hasError, onChange: handleChange, ...other });
      }}
    />
  );
};

FormikField.propTypes = {
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

FormikField.defaultProps = {
  onChange: () => {},
};

export default FormikField;
