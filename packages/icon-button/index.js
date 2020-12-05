import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon} from '@arterial/icon';

const ICON_CLASS = 'mdc-icon-button__icon';
const ON_ICON_CLASS = classNames(ICON_CLASS, 'mdc-icon-button__icon--on');

export function IconButton({
  className,
  icon,
  label,
  on,
  onIcon,
  style,
  tag: Tag = 'button',
  ...otherProps
}) {
  const classes = classNames('mdc-icon-button', className, {
    'mdc-icon-button--on': on,
  });
  const ariaProps = {
    'aria-label': label,
    'aria-pressed': on,
  };
  const styles = {
    ...(Tag === 'button' && {textAlign: 'initial'}),
    ...style,
  };
  return (
    <Tag className={classes} style={styles} {...ariaProps} {...otherProps}>
      {icon && <Icon className={ICON_CLASS} icon={icon} />}
      {onIcon && <Icon className={ON_ICON_CLASS} icon={onIcon} />}
    </Tag>
  );
}
IconButton.displayName = 'IconButton';
IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.string,
  on: PropTypes.bool,
  onIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  style: PropTypes.object,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
