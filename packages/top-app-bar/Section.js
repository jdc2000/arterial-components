import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Section({
  alignEnd,
  alignStart = true,
  children,
  className,
  tag = 'section',
  ...otherProps
}) {
  const classes = classNames('mdc-top-app-bar__section', className, {
    'mdc-top-app-bar__section--align-end': alignEnd,
    'mdc-top-app-bar__section--align-start': !alignEnd && alignStart
  });
  const role = alignEnd ? 'toolbar' : null;
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps} role={role}>
      {children}
    </Tag>
  );
}

Section.propTypes = {
  alignEnd: PropTypes.bool,
  alignStart: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
