import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dialog from './Dialog';
import DialogTitle from './DialogTitle';
import DialogContent from './DialogContent';

export default function SimpleDialog({
  className,
  content,
  onClose,
  open,
  title
}) {
  const classes = classNames('arm-dialog', 'arm-dialog--simple', className);
  function handleClose() {
    if (onClose) {
      onClose('close');
    }
  }
  return (
    <Dialog className={classes} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  className: PropTypes.string,
  content: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string
};
