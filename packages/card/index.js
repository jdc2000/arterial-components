import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Card({ children, className, outlined, tag = 'div', ...otherProps }) {
  const classes = classNames('mdc-card', className, {
    'mdc-card--outlined': outlined
  });
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  outlined: PropTypes.bool,
  tag: PropTypes.element
};

export { Card };
export { default as CardPrimaryAction } from './PrimaryAction';
export { default as CardMedia } from './Media';
export { default as CardMediaContent } from './MediaContent';
export { default as CardActions } from './Actions';
export { default as CardActionButtons } from './ActionButtons';
export { default as CardActionButton } from './ActionButton';
export { default as CardActionIcons } from './ActionIcons';
export { default as CardActionIcon } from './ActionIcon';
