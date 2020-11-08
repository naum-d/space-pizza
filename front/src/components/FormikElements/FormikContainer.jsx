import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { Formik } from 'formik';
import { Grid, Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {
  appStoreCreateStore,
  appStoreDeleteStore,
  appStoreLoadData,
  appStoreMakeRequest,
} from '../../store/appStore/actions';
import Progress from '../Layouts/Progress';
import { useLocation } from '../../helpers/routerHooks';
import { FormikSubmitButton } from './FormikSubmitButton';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 3),
  },
  noPaper: {
    padding: 0,
    border: 'none',
    boxShadow: 'none',
  },
}));

const FormikContainer = props => {
  const { size, mapper, method, storeName, withPaper, dataSource, afterSubmit, initialForm, ...another } = props;
  const { beforeSubmit, redirectPath, submitSource, renderFormFields, ...other } = another;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { navigate, goBack } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [formFields, setFormFields] = useState(initialForm);
  const formStore = useSelector(state => state.appStore[storeName]);

  useEffect(() => {
    method === 'POST'
      ? dispatch(appStoreCreateStore({ storeName, data: { data: initialForm, isLoading: false } }))
      : dispatch(appStoreLoadData({ storeName, dataSource, dataType: initialForm, mapper }));
    return () => dispatch(appStoreDeleteStore(storeName));
  }, [dispatch, storeName, dataSource, initialForm, mapper, method]);

  useEffect(() => {
    !!formStore && setIsLoading(formStore.isLoading);
    !!formStore && !formStore.isLoading && setFormFields(formStore.data);
  }, [formStore]);

  const handleSubmit = (values, actions) => {
    const data = beforeSubmit(values);

    dispatch(appStoreMakeRequest({ storeName, data, method, dataSource }))
      .then(resp => {
        !!afterSubmit ? afterSubmit(resp, actions, navigate) : method === 'PUT' ? goBack() : navigate(redirectPath);
      })
      .catch(error => actions.setErrors(error || {}))
      .finally(() => actions.setSubmitting(false));
  };

  const renderForm = props => {
    const { handleSubmit } = props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Grid container spacing={2}>
          {isLoading && <Progress />}
          {renderFormFields({ ...props, ...other, formFields })}
          <FormikSubmitButton {...{ ...other, ...props }} formData={formFields} />
        </Grid>
      </form>
    );
  };

  return (
    <Grid item xs={size}>
      <Paper className={clsx(classes.card, { [classes.noPaper]: !withPaper })}>
        <Formik {...other} enableReinitialize render={renderForm} onSubmit={handleSubmit} initialValues={formFields} />
      </Paper>
    </Grid>
  );
};

FormikContainer.propTypes = {
  size: PropTypes.number,
  actions: PropTypes.object,
  withPaper: PropTypes.bool,
  storeName: PropTypes.string,
  dataSource: PropTypes.string,
  initialForm: PropTypes.object,
  redirectPath: PropTypes.string,
  validationSchema: PropTypes.any,

  method: PropTypes.string.isRequired,

  mapper: PropTypes.func,
  afterSubmit: PropTypes.func,
  beforeSubmit: PropTypes.func,
  renderFormFields: PropTypes.func.isRequired,
};

FormikContainer.defaultProps = {
  size: 7,
  actions: {},
  needToMap: true,
  withPaper: true,
  beforeSubmit: i => i,
  withoutSubmitButton: false,
};

export default FormikContainer;
