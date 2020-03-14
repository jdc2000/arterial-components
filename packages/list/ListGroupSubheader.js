import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ListGroupSubheader({
  children,
  className,
  tag = 'h3',
  ...otherProps
}) {
  const classes = classNames('mdc-list-group__subheader', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ListGroupSubheader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
