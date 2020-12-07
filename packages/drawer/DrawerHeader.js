import PropTypes from 'prop-types';
import classNames from 'classnames';

export function DrawerHeader({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__header', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
DrawerHeader.displayName = 'DrawerHeader';
DrawerHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
