import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ListItemSecondaryText({
  children,
  className,
  tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item__secondary-text', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ListItemSecondaryText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};

export default ListItemSecondaryText;
