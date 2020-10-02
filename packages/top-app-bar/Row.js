import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Row({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-top-app-bar__row', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
