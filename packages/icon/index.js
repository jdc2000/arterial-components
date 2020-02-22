import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Icon({ className, icon, ...otherProps }) {
  const material = typeof icon === 'string';
  if (!icon || material) {
    const classes = classNames(
      'fat-icon',
      { 'material-icons': material },
      className
    );
    return (
      <i className={classes} {...otherProps}>
        {icon}
      </i>
    );
  }
  const classes = classNames('fat-icon', icon.props.className, className);
  const props = { ...otherProps, ...icon.props, className: classes };
  return React.cloneElement(icon, props);
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export { Icon };
