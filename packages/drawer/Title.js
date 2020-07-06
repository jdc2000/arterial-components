import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Title({
  children,
  className,
  tag: Tag = 'h3',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__title', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
Title.displayName = 'DrawerTitle';
Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
