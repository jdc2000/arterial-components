import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function AppContent({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer-app-content', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
AppContent.displayName = 'DrawerAppContent';
AppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
