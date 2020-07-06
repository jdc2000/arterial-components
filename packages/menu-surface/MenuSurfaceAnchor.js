import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const MenuSurfaceAnchor = React.forwardRef((props, ref) => {
  const { children, className, tag: Tag = 'div', ...otherProps } = props;
  const classes = classNames('mdc-menu-surface--anchor', className);
  return (
    <Tag className={classes} ref={ref} {...otherProps}>
      {children}
    </Tag>
  );
});
MenuSurfaceAnchor.displayName = 'MenuSurfaceAnchor';
MenuSurfaceAnchor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
