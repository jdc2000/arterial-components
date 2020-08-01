import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@arterial/icon';

const ICON_CLASS = 'mdc-button__icon';

export function Button({
  className,
  'data-arterial': dataArterial,
  icon,
  label,
  outlined,
  raised,
  ripple = true,
  style,
  trailingIcon,
  unelevated,
  tag: Tag = 'button',
  ...otherProps
}) {
  const classes = classNames('mdc-button', className, {
    'mdc-button--outlined': outlined,
    'mdc-button--raised': raised,
    'mdc-button--unelevated': unelevated,
  });

  const styles = {
    ...(Tag === 'button' && { textAlign: 'initial' }),
    ...style,
  };
  return (
    <Tag
      className={classes}
      data-arterial={dataArterial}
      style={styles}
      {...otherProps}
    >
      {ripple && (
        <div className="mdc-button__ripple" data-arterial={dataArterial}></div>
      )}
      {icon && (
        <Icon
          aria-hidden="true"
          className={ICON_CLASS}
          data-arterial={dataArterial}
          icon={icon}
        />
      )}
      {label && (
        <span className="mdc-button__label" data-arterial={dataArterial}>
          {label}
        </span>
      )}
      {trailingIcon && (
        <Icon
          aria-hidden="true"
          className={ICON_CLASS}
          data-arterial={dataArterial}
          icon={trailingIcon}
        />
      )}
    </Tag>
  );
}
Button.displayName = 'Button';
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
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
