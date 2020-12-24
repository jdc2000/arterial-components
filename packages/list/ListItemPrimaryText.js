import classNames from 'classnames';
import PropTypes from 'prop-types';

export function ListItemPrimaryText({
  children,
  className,
  tag: Tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item__primary-text', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
ListItemPrimaryText.displayName = 'ListItemPrimaryText';
ListItemPrimaryText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
