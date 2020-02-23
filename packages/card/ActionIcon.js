import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconButton } from '@faterial/icon-button';

function ActionIcon({ className, ...otherProps }) {
  const classes = classNames(
    'mdc-card__action',
    'mdc-card__action--icon',
    className
  );
  return <IconButton className={classes} {...otherProps} />;
}

ActionIcon.propTypes = {
  className: PropTypes.string
};

export default ActionIcon;
