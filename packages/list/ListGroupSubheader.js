import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function ListGroupSubheader({
  children,
  className,
  tag: Tag = 'h3',
  ...otherProps
}) {
  const classes = classNames('mdc-list-group__subheader', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
ListGroupSubheader.displayName = 'ListGroupSubheader';
ListGroupSubheader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
