import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ListGroup({
  children,
  className,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-list-group', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ListGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
