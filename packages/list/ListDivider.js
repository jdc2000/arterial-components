import classNames from 'classnames';
import PropTypes from 'prop-types';

export function ListDivider({
  children,
  className,
  inset,
  insetLeading,
  insetPadding,
  insetTrailing,
  padded,
  tag: Tag = 'li',
  ...otherProps
}) {
  const classes = classNames('mdc-list-divider', className, {
    'mdc-list-divider--inset': inset,
    'mdc-list-divider--inset-leading': insetLeading,
    'mdc-list-divider--inset-padding': insetPadding,
    'mdc-list-divider--inset-trailing': insetTrailing,
    'mdc-list-divider--padded': padded,
  });
  const role = Tag === 'li' ? 'separator' : null;
  return (
    <Tag className={classes} role={role} {...otherProps}>
      {children}
    </Tag>
  );
}
ListDivider.displayName = 'ListDivider';
ListDivider.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  inset: PropTypes.bool,
  insetLeading: PropTypes.bool,
  insetPadding: PropTypes.bool,
  insetTrailing: PropTypes.bool,
  padded: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
