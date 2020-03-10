import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Subtitle({
  children,
  className,
  tag = 'h6',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__subtitle', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Subtitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
