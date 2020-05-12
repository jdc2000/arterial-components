import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function HelperText({
  children,
  className,
  id,
  persistent,
  validationMessage,
  ...otherProps
}) {
  const classes = classNames('mdc-select-helper-text', className, {
    'mdc-select-helper-text--persistent': persistent,
    'mdc-select-helper-text--validation-msg': validationMessage
  });
  return (
    <p className={classes} id={id} aria-hidden="true" {...otherProps}>
      {children}
    </p>
  );
}

HelperText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  persistent: PropTypes.bool,
  validationMessage: PropTypes.bool
};
