import PropTypes from 'prop-types';
import classNames from 'classnames';

export function DrawerContent({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-drawer__content', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
DrawerContent.displayName = 'DrawerContent';
DrawerContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
