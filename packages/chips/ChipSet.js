import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ChipSet({
  children,
  className,
  choice,
  filter,
  input,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-chip-set', className, {
    'mdc-chip-set--choice': choice,
    'mdc-chip-set--filter': filter,
    'mdc-chip-set--input': input
  });
  const Tag = tag;
  return (
    <Tag className={classes} role="grid" {...otherProps}>
      {children}
    </Tag>
  );
}

ChipSet.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  choice: PropTypes.bool,
  filter: PropTypes.bool,
  input: PropTypes.bool
};

export default ChipSet;