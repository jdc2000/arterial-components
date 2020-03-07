import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function FixedAdjust({
  children,
  className,
  dense,
  fixed,
  prominent,
  short,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames(
    {
      'mdc-top-app-bar--fixed-adjust': !dense && !prominent && !short,
      'mdc-top-app-bar--dense-fixed-adjust': dense && !prominent,
      'mdc-top-app-bar--dense-prominent-fixed-adjust': dense && prominent,
      'mdc-top-app-bar--prominent-fixed-adjust': !dense && prominent,
      'mdc-top-app-bar--short-fixed-adjust': short
    },
    className
  );
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

FixedAdjust.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
