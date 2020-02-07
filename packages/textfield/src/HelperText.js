import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function HelperText({
  'aria-hidden': ariaHidden = true,
  children,
  className,
  id,
  persistent,
  validationMessage,
  ...otherProps
}) {
  const classes = classNames('mdc-text-field-helper-text', className, {
    'mdc-text-field-helper-text--persistent': persistent,
    'mdc-text-field-helper-text--validation-msg': validationMessage
  });
  return (
    <div id={id} className={classes} aria-hidden={ariaHidden} {...otherProps}>
      {children}
    </div>
  );
}

HelperText.propTypes = {
  'aria-hidden': PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  persistent: PropTypes.bool,
  validationMessage: PropTypes.bool
};

export default HelperText;
