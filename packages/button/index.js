import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Button({
  className,
  ripple = true,
  raised,
  unelevated,
  outlined,
  label,
  icon,
  trailingIcon,
  tag = 'button',
  ...otherProps
}) {
  const classes = classNames(className, 'mdc-button', {
    'mdc-button--raised': raised,
    'mdc-button--unelevated': unelevated && !raised,
    'mdc-button--outlined': outlined && !unelevated && !raised
  });
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {ripple && <div className="mdc-button__ripple"></div>}
      {icon && <Icon icon={icon} />}
      {label && <span className="mdc-button__label">{label}</span>}
      {trailingIcon && <Icon icon={trailingIcon} />}
    </Tag>
  );
}

function Icon({ icon }) {
  const classes = classNames(icon.props.className, 'mdc-button__icon');
  const props = { ...icon.props, 'aria-hidden': true, className: classes };
  return React.cloneElement(icon, props);
}

Button.propTypes = {
  className: PropTypes.string,
  ripple: PropTypes.bool,
  raised: PropTypes.bool,
  unelevated: PropTypes.bool,
  outlined: PropTypes.bool,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  trailingIcon: PropTypes.node,
  tag: PropTypes.element
};

export { Button };
