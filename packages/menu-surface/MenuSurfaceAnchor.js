import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const MenuSurfaceAnchor = React.forwardRef((props, ref) => {
  const { children, className, tag = 'div', ...otherProps } = props;
  const classes = classNames('mdc-menu-surface--anchor', className);
  const Tag = tag;
  return (
    <Tag className={classes} ref={ref} {...otherProps}>
      {children}
    </Tag>
  );
});

MenuSurfaceAnchor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
