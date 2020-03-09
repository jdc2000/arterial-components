import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Header({
  children,
  className,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__header', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
