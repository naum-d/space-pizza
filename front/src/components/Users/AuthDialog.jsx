import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import SignInForm from './SignInForm';
import AppTabs from '../Layouts/AppTabs';
import { turnOffEvent } from '../../helpers/helpers';
import SignUpForm from './SignUpForm';

const AuthDialog = props => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = e => {
    turnOffEvent(e);
    setOpen(true);
  };

  return (
    <Fragment>
      <Button fullWidth {...props} onClick={handleOpen} children="Sign In" />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <AppTabs {...{ tab }} handleChange={setTab} tabsList={['Sign In', 'Sign Up']} />

          {tab === 0 && <SignInForm handleClose={setOpen} />}
          {tab === 1 && <SignUpForm handleClose={setOpen} />}

        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

AuthDialog.propTypes = {};

export default AuthDialog;
