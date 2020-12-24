import {Icon} from '@arterial/icon';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ICON_BUTTON_ICON = 'mdc-icon-button__icon';
const ICON_BUTTON_ICON_ON = classNames(
  ICON_BUTTON_ICON,
  'mdc-icon-button__icon--on'
);

export function IconButton({
  className,
  icon,
  iconOn,
  label,
  on,
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
  return (
    <Tag className={classes} {...ariaProps} {...otherProps}>
      {icon && <Icon className={ICON_BUTTON_ICON} icon={icon} />}
      {iconOn && <Icon className={ICON_BUTTON_ICON_ON} icon={iconOn} />}
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
