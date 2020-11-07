import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};

Main.propTypes = {};

export default Main;
