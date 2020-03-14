import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ListItemText({
  children,
  className,
  tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item__text', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ListItemText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
