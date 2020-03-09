import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Content({
  children,
  className,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__content', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
