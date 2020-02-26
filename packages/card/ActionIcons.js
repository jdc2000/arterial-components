import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ActionIcons({ children, className, tag = 'div', ...otherProps }) {
  const classes = classNames('mdc-card__action-icons', className);
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

ActionIcons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};

export default ActionIcons;
