import PropTypes from 'prop-types';
import classNames from 'classnames';

export function TopAppBarTitle({
  children,
  className,
  tag: Tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-top-app-bar__title', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
TopAppBarTitle.displayName = 'TopAppBarTitle';
TopAppBarTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
