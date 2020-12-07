import PropTypes from 'prop-types';
import classNames from 'classnames';

export function CardActionIcons({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__action-icons', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
CardActionIcons.displayName = 'CardActionIcons';
CardActionIcons.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
