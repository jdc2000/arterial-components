import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function ListDivider({
  children,
  className,
  inset,
  padded,
  tag: Tag = 'li',
  ...otherProps
}) {
  const classes = classNames('mdc-list-divider', className, {
    'mdc-list-divider--inset': inset,
    'mdc-list-divider--padded': padded
  });
  const role = Tag === 'li' ? 'separator' : null;
  return (
    <Tag className={classes} role={role} {...otherProps}>
      {children}
    </Tag>
  );
}

ListDivider.displayName = 'ListDivider';
ListDivider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inset: PropTypes.bool,
  padded: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};
