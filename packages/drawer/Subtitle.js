import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Subtitle({
  children,
  className,
  tag: Tag = 'h6',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__subtitle', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
Subtitle.displayName = 'DrawerSubtitle';
Subtitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element,
};
