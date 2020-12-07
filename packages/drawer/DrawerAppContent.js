import PropTypes from 'prop-types';
import classNames from 'classnames';

export function DrawerAppContent({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer-app-content', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
DrawerAppContent.displayName = 'DrawerAppContent';
DrawerAppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
