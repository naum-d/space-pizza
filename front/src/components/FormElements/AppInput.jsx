import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import GridContainer from '../Layouts/GridContainer';
import { turnOffEvent } from '../../helpers/helpers';

const AppInput = props => {
  const { value, size, type, actions, onChange, ...other } = props;

  const [input, setInput] = useState('');
  const [isMultiple, setIsMultiple] = useState(false);

  useEffect(() => {
    setIsMultiple(Array.isArray(value));
    setInput(value === null || Array.isArray(value) ? '' : value);
  }, [value]);

  const handlePush = () => {
    !!input && onChange([...value, type === 'number' ? +input : input]);
    setInput('');
  };

  const handleChange = e => {
    const { value } = turnOffEvent(e, e.target);
    setInput(value);
    !isMultiple && onChange(type === 'number' ? +value : value);
  };

  const handleKeyDown = e => {
    if (!!isMultiple && e.key === 'Enter' && !!input) {
      turnOffEvent(e);
      handlePush();
    }
  };

  const handleDelete = val => e => {
    turnOffEvent(e);
    onChange([...value.filter(i => i !== val)]);
  };

  const renderActions = () => {
    return Object.keys(actions).map(key => {
      const { onClick, component } = actions[key];
      const props = { key, onClick: e => turnOffEvent(e, onClick)(input, handlePush) };
      return !!component ? component(props) : <Button {...props} children={key} />;
    });
  };

  const renderSelected = () => {
    return value.map((i, key) => <Grid key={key} item children={<Chip label={i} onDelete={handleDelete(i)} />} />);
  };

  return (
    <Grid item xs={size}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            {...{ type, ...other }}
            fullWidth
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            InputProps={{ endAdornment: <InputAdornment position="end" children={renderActions()} /> }}
          />
        </Grid>

        {isMultiple && <GridContainer spacing={1} children={renderSelected()} />}
      </Grid>
    </Grid>
  );
};

AppInput.propTypes = {
  value: PropTypes.any,
  size: PropTypes.number,
  onChange: PropTypes.func,
  actions: PropTypes.object,
};

AppInput.defaultProps = {
  size: 12,
  actions: {},
  type: 'text',
};

export default AppInput;
