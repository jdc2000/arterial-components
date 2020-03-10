import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function AppContent({
  children,
  className,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer-app-content', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

AppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
