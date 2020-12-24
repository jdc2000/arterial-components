import classNames from 'classnames';
import PropTypes from 'prop-types';

export function DialogActions({
  children,
  className,
  tag: Tag = 'footer',
  ...otherProps
}) {
  const classes = classNames('mdc-dialog__actions', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
DialogActions.displayName = 'DialogActions';
DialogActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
