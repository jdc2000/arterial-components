import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Row({
  children,
  className,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-top-app-bar__row', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
