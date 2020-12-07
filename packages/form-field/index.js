import classNames from 'classnames';
import PropTypes from 'prop-types';

export function FormField({
  alignEnd,
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-form-field', className, {
    'mdc-form-field--align-end': alignEnd,
  });
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
FormField.displayName = 'FormField';
FormField.propTypes = {
  alignEnd: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
