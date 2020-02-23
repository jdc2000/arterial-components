import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function MediaContent({ children, className, tag = 'div', ...otherProps }) {
  const classes = classNames('mdc-card__media-content', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

MediaContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};

export default MediaContent;
