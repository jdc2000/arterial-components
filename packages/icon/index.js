import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Icon = React.forwardRef((props, ref) => {
  const { className, icon, ...otherProps } = props;
  if (typeof icon === 'string') {
    const classes = classNames('art-icon', 'material-icons', className);
    return (
      <i className={classes} ref={ref} {...otherProps}>
        {icon}
      </i>
    );
  }
  const addArtIcon =
    icon.props.className && !icon.props.className.includes('art-icon');
  const classes = classNames(
    { 'art-icon': addArtIcon },
    icon.props.className,
    className
  );
  const iconProps = { ...otherProps, ...icon.props, className: classes, ref };
  return React.cloneElement(icon, iconProps);
});
Icon.displayName = 'Icon';
Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
};
