import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@arterial/button';

export default function ActionButton({ className, ...otherProps }) {
  const classes = classNames(
    'mdc-card__action',
    'mdc-card__action--button',
    className
  );
  return <Button className={classes} {...otherProps} />;
}
ActionButton.displayName = 'CardActionButton';
ActionButton.propTypes = {
  className: PropTypes.string,
};
