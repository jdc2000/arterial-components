import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dialog, DialogTitle, DialogContent } from '.';

export default function SimpleDialog({
  className,
  content,
  onClose,
  open,
  title
}) {
  const classes = classNames('fat-dialog', 'fat-dialog--simple', className);
  function handleClose() {
    if (onClose) {
      return onClose('close');
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
