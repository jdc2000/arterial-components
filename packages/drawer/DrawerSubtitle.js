import PropTypes from 'prop-types';
import classNames from 'classnames';

export function DrawerSubtitle({
  children,
  className,
  tag: Tag = 'h6',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__subtitle', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
DrawerSubtitle.displayName = 'DrawerSubtitle';
DrawerSubtitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element,
};
