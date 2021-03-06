import {IconButton} from '@arterial/icon-button';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export function TopAppBarIcon({action, className, nav, ...otherProps}) {
  const classes = classNames(
    {
      'mdc-top-app-bar__action-item': action,
      'mdc-top-app-bar__navigation-icon': nav,
    },
    className
  );
  return <IconButton className={classes} {...otherProps} />;
}
TopAppBarIcon.displayName = 'TopAppBarIcon';
TopAppBarIcon.propTypes = {
  action: PropTypes.bool,
  className: PropTypes.string,
  nav: PropTypes.bool,
};
