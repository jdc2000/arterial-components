import classNames from 'classnames';
import PropTypes from 'prop-types';

export function TopAppBarFixedAdjust({
  children,
  className,
  dense,
  fixed,
  prominent,
  short,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames(
    {
      'mdc-top-app-bar--fixed-adjust': !dense && !prominent && !short,
      'mdc-top-app-bar--dense-fixed-adjust': dense && !prominent,
      'mdc-top-app-bar--dense-prominent-fixed-adjust': dense && prominent,
      'mdc-top-app-bar--prominent-fixed-adjust': !dense && prominent,
      'mdc-top-app-bar--short-fixed-adjust': short,
    },
    className
  );
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
TopAppBarFixedAdjust.displayName = 'TopAppBarFixedAdjust';
TopAppBarFixedAdjust.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  fixed: PropTypes.bool,
  prominent: PropTypes.bool,
  short: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
