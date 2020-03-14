import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@faterial/icon';

export default function ListItemMeta({ className, meta, ...otherProps }) {
  const classes = classNames('mdc-list-item__meta', className);
  return <Icon className={classes} icon={meta} {...otherProps} />;
}

ListItemMeta.propTypes = {
  className: PropTypes.string,
  meta: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};
