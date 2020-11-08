import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { turnOffEvent } from '../../helpers/helpers';

export const FormikSubmitButton = props => {
  const { isValid, isSubmitting, actions, formData } = props;

  const [hasActions, setHasActions] = useState(false);

  useEffect(() => {
    setHasActions(!!Object.keys(actions).length);
  }, [actions]);

  const renderActions = () => {
    return Object.keys(actions).map(key => {
      const { onClick, component } = actions[key];
      const props = { key, onClick: e => turnOffEvent(e, onClick)(formData) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  return (
    <Grid item xs={12}>
      <Grid container justify={hasActions ? 'space-between' : 'flex-end'} alignItems="center">
        {hasActions && (
          <Grid item>
            <ButtonGroup color="primary" variant="outlined" children={renderActions()} />
          </Grid>
        )}

        <Grid item>
          <Button disabled={!isValid || isSubmitting} color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

FormikSubmitButton.propTypes = {
  formData: PropTypes.any,
  actions: PropTypes.object,
};
