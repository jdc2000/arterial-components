import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Actions({
  children,
  className,
  fullBleed,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__actions', className, {
    'mdc-card__actions--full-bleed': fullBleed,
  });
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
Actions.displayName = 'CardActions';
Actions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fullBleed: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
