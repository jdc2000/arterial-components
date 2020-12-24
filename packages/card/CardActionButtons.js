import classNames from 'classnames';
import PropTypes from 'prop-types';

export function CardActionButtons({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__action-buttons', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
CardActionButtons.displayName = 'CardActionButtons';
CardActionButtons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
