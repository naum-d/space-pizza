import React from 'react';
import Tab from '@material-ui/core/Tab';
import * as PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.action.hover,
  },
}));

const AppTabs = ({ tab, tabsList, handleChange }) => {
  const classes = useStyles();

  return (
    <Grid component="div" item xs={12}>
      <div className={classes.root}>
        <Tabs
          value={tab}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          onChange={(e, tab) => handleChange(tab)}
        >
          {tabsList.map((item, index) => (
            <Tab key={index} label={item} />
          ))}
        </Tabs>
      </div>
    </Grid>
  );
};

AppTabs.propTypes = {
  tab: PropTypes.number,
  tabsList: PropTypes.array,
  handleChange: PropTypes.func,
};

export default AppTabs;
