import classNames from 'classnames';
import PropTypes from 'prop-types';

export function CardPrimaryAction({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__primary-action', className);
  return (
    <Tag className={classes} tabIndex="0" {...otherProps}>
      {children}
    </Tag>
  );
}
CardPrimaryAction.displayName = 'CardPrimaryAction';
CardPrimaryAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
