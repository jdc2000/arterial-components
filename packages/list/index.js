import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function List({
  avatarList,
  children,
  className,
  dense,
  nonInteractive,
  twoLine,
  tag = 'ul',
  ...otherProps
}) {
  const classes = classNames('mdc-list', className, {
    'mdc-list--avatar-list': avatarList,
    'mdc-list--dense': dense,
    'mdc-list--non-interactive': nonInteractive,
    'mdc-list--two-line': twoLine
  });
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

List.propTypes = {
  avatarList: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  nonInteractive: PropTypes.bool,
  twoLine: PropTypes.bool,
  tag: PropTypes.element
};

export { default as ListDivider } from './ListDivider';
export { default as ListGroup } from './ListGroup';
export { default as ListGroupSubheader } from './ListGroupSubheader';
export { default as ListItem } from './ListItem';
export { default as ListItemGraphic } from './ListItemGraphic';
export { default as ListItemMeta } from './ListItemMeta';
export { default as ListItemPrimaryText } from './ListItemPrimaryText';
export { default as ListItemSecondaryText } from './ListItemSecondaryText';
export { default as ListItemText } from './ListItemText';
