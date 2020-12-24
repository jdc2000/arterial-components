import classNames from 'classnames';
import PropTypes from 'prop-types';
import {forwardRef, cloneElement} from 'react';

const AJS_ICON = 'ajs-icon';

export const Icon = forwardRef((props, ref) => {
  const {className, icon, ...otherProps} = props;
  if (typeof icon === 'string') {
    const classes = classNames(AJS_ICON, 'material-icons', className);
    return (
      <i className={classes} ref={ref} {...otherProps}>
        {icon}
      </i>
    );
  }
  const addArtIcon =
    icon.props.className && !icon.props.className.includes(AJS_ICON);
  const classes = classNames(
    {[AJS_ICON]: addArtIcon},
    icon.props.className,
    className
  );
  const iconProps = {...otherProps, ...icon.props, className: classes, ref};
  return cloneElement(icon, iconProps);
});
Icon.displayName = 'Icon';
Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
};
