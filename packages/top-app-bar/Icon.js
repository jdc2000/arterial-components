import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconButton } from '@arterial/icon-button';

export default function Icon({ action, className, nav, ...otherProps }) {
  const classes = classNames(
    {
      'mdc-top-app-bar__action-item': action,
      'mdc-top-app-bar__navigation-icon': nav
    },
    className
  );
  return <IconButton className={classes} {...otherProps} />;
}

Icon.propTypes = {
  action: PropTypes.bool,
  className: PropTypes.string,
  nav: PropTypes.bool
};
