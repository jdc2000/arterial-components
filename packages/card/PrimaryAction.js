import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function PrimaryAction({ children, className, tag = 'div', ...otherProps }) {
  const classes = classNames('mdc-card__primary-action', className);
  const Tag = tag;
  return (
    <Tag className={classes} tabIndex="0" {...otherProps}>
      {children}
    </Tag>
  );
}

PrimaryAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};

export default PrimaryAction;
