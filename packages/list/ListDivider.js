import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function ListDivider({
  children,
  className,
  inset,
  padded,
  tag = 'li',
  ...otherProps
}) {
  const classes = classNames('mdc-list-divider', className, {
    'mdc-list-divider--inset': inset,
    'mdc-list-divider--padded': padded
  });
  const props = {
    ...otherProps,
    role: tag === 'li' ? 'separator' : undefined
  };
  const Tag = tag;
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

ListDivider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inset: PropTypes.bool,
  padded: PropTypes.bool,
  tag: PropTypes.element
};
