import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ChipSet({
  children,
  className,
  choice,
  filter,
  input,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-chip-set', className, {
    'mdc-chip-set--choice': choice,
    'mdc-chip-set--filter': filter,
    'mdc-chip-set--input': input,
  });
  return (
    <Tag className={classes} role="grid" {...otherProps}>
      {children}
    </Tag>
  );
}
ChipSet.displayName = 'ChipSet';
ChipSet.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  choice: PropTypes.bool,
  filter: PropTypes.bool,
  input: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
