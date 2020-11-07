import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import { turnOffEvent } from '../../helpers';

const MenuButton = props => {
  const { label, menuList, ...other } = props;

  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    turnOffEvent(e);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = attrs => e => {
    const { path, action } = turnOffEvent(e, attrs);
    !!path && history.push(path);
    !!action && action(attrs);
    handleClose();
  };

  const renderMenuItems = () => {
    return menuList.map((i, index) => (
      <MenuItem key={index} {...i?.props} onClick={handleMenuClick(i)} children={i.label} />
    ));
  };

  return (
    <Fragment>
      <Button color="inherit" {...other} onClick={handleClick}>
        {label}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        children={renderMenuItems()}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Fragment>
  );
};

MenuButton.propTypes = {
  label: PropTypes.any,
  menuList: PropTypes.array,
};

export default MenuButton;
