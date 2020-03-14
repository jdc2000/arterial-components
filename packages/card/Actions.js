import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Actions({
  children,
  className,
  fullBleed,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__actions', className, {
    'mdc-card__actions--full-bleed': fullBleed
  });
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Actions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fullBleed: PropTypes.bool,
  tag: PropTypes.element
};
