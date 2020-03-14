import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from './Dialog';
import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent';
import DialogActions from './DialogActions';
import DialogButton from './DialogButton';

export default function ConfirmationDialog({
  className,
  confirmingButtonLabel = 'Ok',
  confirmingButtonDisabled,
  content,
  dismissiveButtonLabel = 'Cancel',
  onClose,
  open,
  title
}) {
  const classes = classNames(
    'arm-dialog',
    'arm-dialog--confirmation',
    className
  );
  function handleClose(action) {
    if (onClose) {
      onClose(action);
    }
  }
  return (
    <Dialog className={classes} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <DialogButton
          label={dismissiveButtonLabel}
          onSelect={() => handleClose('close')}
        />
        <DialogButton
          disabled={confirmingButtonDisabled}
          label={confirmingButtonLabel}
          onSelect={() => handleClose('confirm')}
        />
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  className: PropTypes.string,
  confirmingButtonLabel: PropTypes.string,
  content: PropTypes.node,
  dismissiveButtonLabel: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string
};
