import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function PrimaryAction({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__primary-action', className);
  return (
    <Tag className={classes} tabIndex="0" {...otherProps}>
      {children}
    </Tag>
  );
}
PrimaryAction.displayName = 'CardPrimaryAction';
PrimaryAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
