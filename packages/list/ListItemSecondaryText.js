import classNames from 'classnames';
import PropTypes from 'prop-types';

export function ListItemSecondaryText({
  children,
  className,
  tag: Tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item__secondary-text', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
ListItemSecondaryText.displayName = 'ListItemSecondaryText';
ListItemSecondaryText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
