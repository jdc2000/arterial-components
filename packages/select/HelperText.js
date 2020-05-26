import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function HelperText({
  className,
  id,
  persistent,
  text,
  validationMessage,
  ...otherProps
}) {
  const classes = classNames('mdc-select-helper-text', className, {
    'mdc-select-helper-text--persistent': persistent,
    'mdc-select-helper-text--validation-msg': validationMessage
  });
  return (
    <p className={classes} id={id} aria-hidden="true" {...otherProps}>
      {text}
    </p>
  );
}

HelperText.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  persistent: PropTypes.bool,
  text: PropTypes.node,
  validationMessage: PropTypes.bool
};
