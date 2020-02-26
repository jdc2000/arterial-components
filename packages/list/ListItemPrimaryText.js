import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ListItemPrimaryText({
  children,
  className,
  tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item__primary-text', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ListItemPrimaryText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};

export default ListItemPrimaryText;
