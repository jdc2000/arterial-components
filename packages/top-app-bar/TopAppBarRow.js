import classNames from 'classnames';
import PropTypes from 'prop-types';

export function TopAppBarRow({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-top-app-bar__row', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
TopAppBarRow.displayName = 'TopAppBarRow';
TopAppBarRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
