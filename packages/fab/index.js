import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@arterial/icon';

export function Fab({
  className,
  exited,
  extended,
  icon,
  label,
  mini,
  ripple = true,
  trailingIcon,
  tag = 'button'
}) {
  const classes = classNames('mdc-fab', className, {
    'mdc-fab--exited': exited,
    'mdc-fab--extended': extended,
    'mdc-fab--mini': mini
  });
  const Tag = tag;
  let ariaLabel = '';
  if (label) {
    ariaLabel = label;
  } else if (typeof icon === 'string') {
    ariaLabel = icon;
  } else if (typeof trailingIcon === 'string') {
    ariaLabel = trailingIcon;
  }
  return (
    <Tag className={classes} aria-label={ariaLabel}>
      {ripple && <div className="mdc-fab__ripple"></div>}
      {icon && <Icon className="mdc-fab__icon" icon={icon} />}
      {label && <span class="mdc-fab__label">{label}</span>}
      {trailingIcon && <Icon className="mdc-fab__icon" icon={trailingIcon} />}
    </Tag>
  );
}

Fab.propTypes = {
  className: PropTypes.string,
  exited: PropTypes.bool,
  extended: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  mini: PropTypes.bool,
  ripple: PropTypes.bool,
  tag: PropTypes.oneOf(['button', 'span', 'i', 'img', 'svg'])
};
