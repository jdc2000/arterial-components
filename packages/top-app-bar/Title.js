import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Title({
  children,
  className,
  tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-top-app-bar__title', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Title.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
