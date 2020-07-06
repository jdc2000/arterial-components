import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function MediaContent({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__media-content', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
MediaContent.displayName = 'CardMediaContent';
MediaContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
