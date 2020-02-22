import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
      {icon && <Icon icon={icon} />}
      {onIcon && <Icon icon={onIcon} on />}
    </Tag>
  );
}

function Icon({ icon, on }) {
  const classes = classNames(
    'mdc-icon-button__icon',
    { 'mdc-icon-button__icon--on': on },
    icon.props.className
  );
  const props = { ...icon.props, className: classes };
  return React.cloneElement(icon, props);
}

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string,
  on: PropTypes.bool,
  onIcon: PropTypes.element,
  tag: PropTypes.element
};

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired
};

export { IconButton };
