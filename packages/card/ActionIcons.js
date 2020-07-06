import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ActionIcons({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__action-icons', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
ActionIcons.displayName = 'CardActionIcons';
ActionIcons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
