import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function DialogActions({ children, className, tag = 'footer', ...otherProps }) {
  const classes = classNames('mdc-dialog__actions', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

DialogActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};

export default DialogActions;
