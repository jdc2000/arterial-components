import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Icon({ className, icon, ...otherProps }) {
  const classes = classNames('fat-icon', 'material-icons', className);
  return (
    <i className={classes} {...otherProps}>
      {icon}
    </i>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  material: PropTypes.bool
};

export default Icon;
