import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ActionButtons({ children, className, tag = 'div', ...otherProps }) {
  const classes = classNames('mdc-card__action-buttons', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ActionButtons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};

export default ActionButtons;
