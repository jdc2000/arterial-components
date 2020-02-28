import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@faterial/icon';

const ICON_CLASS = 'mdc-icon-button__icon';
const ON_ICON_CLASS = classNames(ICON_CLASS, 'mdc-icon-button__icon--on');

function IconButton({
  className,
  icon,
  label,
  on,
  onIcon,
  tag = 'button',
  ...otherProps
}) {
  const classes = classNames('mdc-icon-button', className, {
    'mdc-icon-button--on': on
  });
  const ariaProps = {
    'aria-label': label,
    'aria-pressed': on
  };
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps} {...ariaProps}>
      {icon && <Icon className={ICON_CLASS} icon={icon} />}
      {onIcon && <Icon className={ON_ICON_CLASS} icon={onIcon} />}
    </Tag>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  label: PropTypes.string,
  on: PropTypes.bool,
  onIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  tag: PropTypes.element
};

export { IconButton };
