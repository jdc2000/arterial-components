import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function ListItemText({
  children,
  className,
  tag: Tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item__text', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
ListItemText.displayName = 'ListItemText';
ListItemText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
