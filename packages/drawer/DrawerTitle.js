import classNames from 'classnames';
import PropTypes from 'prop-types';

export function DrawerTitle({
  children,
  className,
  tag: Tag = 'h3',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__title', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
DrawerTitle.displayName = 'DrawerTitle';
DrawerTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
