import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ActionButtons({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__action-buttons', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
ActionButtons.displayName = 'CardActionButtons';
ActionButtons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
