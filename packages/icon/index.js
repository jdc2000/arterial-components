import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Icon({ className, icon, ...otherProps }) {
  if (typeof icon === 'string') {
    const classes = classNames('fat-icon', 'material-icons', className);
    return (
      <i className={classes} {...otherProps}>
        {icon}
      </i>
    );
  }
  const isNotFatIcon =
    icon.props.className && !icon.props.className.includes('fat-icon');
  const classes = classNames(
    { 'fat-icon': isNotFatIcon },
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

export { Icon };
