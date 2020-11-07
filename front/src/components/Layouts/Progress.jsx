import React from 'react';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, fade, makeStyles } from '@material-ui/core';

const getStyles = makeStyles(theme => ({
  progress: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    border: 'none',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fade(theme.palette.background.default, 0.7),
    zIndex: 900,
  },
}));

const Progress = () => {
  const classes = getStyles();

  return (
    <Paper className={classes.progress}>
      <CircularProgress />
    </Paper>
  );
};

export default Progress;
