import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Header({
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
Header.displayName = 'DrawerHeader';
Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
