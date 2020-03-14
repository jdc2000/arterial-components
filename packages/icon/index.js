import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Icon({ className, icon, ...otherProps }) {
  if (typeof icon === 'string') {
    const classes = classNames('arm-icon', 'material-icons', className);
    return (
      <i className={classes} {...otherProps}>
        {icon}
      </i>
    );
  }
  const isNotArmIcon =
    icon.props.className && !icon.props.className.includes('arm-icon');
  const classes = classNames(
    { 'arm-icon': isNotArmIcon },
    icon.props.className,
    className
  );
  const props = { ...otherProps, ...icon.props, className: classes };
  return React.cloneElement(icon, props);
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};
