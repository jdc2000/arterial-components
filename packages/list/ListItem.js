import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ListItem({
  activated,
  children,
  className,
  disabled,
  selected,
  tag = 'li',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item', className, {
    'mdc-list-item--activated': activated,
    'mdc-list-item--disabled': disabled,
    'mdc-list-item--selected': selected
  });
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ListItem.propTypes = {
  activated: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  tag: PropTypes.element
};
