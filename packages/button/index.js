import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@arterial/icon';

const ICON_CLASS = 'mdc-button__icon';

export function Button({
  className,
  icon,
  label,
  outlined,
  raised,
  ripple = true,
  style,
  trailingIcon,
  unelevated,
  tag = 'button',
  ...otherProps
}) {
  const classes = classNames('mdc-button', className, {
    'mdc-button--outlined': outlined,
    'mdc-button--raised': raised,
    'mdc-button--unelevated': unelevated
  });
  const styles = {
    ...(tag === 'button' && { textAlign: 'initial' }),
    ...style
  };
  const Tag = tag;
  return (
    <Tag className={classes} style={styles} {...otherProps}>
      {ripple && <div className="mdc-button__ripple"></div>}
      {icon && <Icon aria-hidden="true" className={ICON_CLASS} icon={icon} />}
      {label && <span className="mdc-button__label">{label}</span>}
      {trailingIcon && (
        <Icon aria-hidden="true" className={ICON_CLASS} icon={trailingIcon} />
      )}
    </Tag>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  outlined: PropTypes.bool,
  raised: PropTypes.bool,
  ripple: PropTypes.bool,
  style: PropTypes.object,
  trailingIcon: PropTypes.node,
  unelevated: PropTypes.bool,
  tag: PropTypes.element
};
