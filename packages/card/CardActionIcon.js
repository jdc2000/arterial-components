import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconButton} from '@arterial/icon-button';

export function CardActionIcon({className, ...otherProps}) {
  const classes = classNames(
    'mdc-card__action',
    'mdc-card__action--icon',
    className
  );
  return <IconButton className={classes} {...otherProps} />;
}
CardActionIcon.displayName = 'CardActionIcon';
CardActionIcon.propTypes = {
  className: PropTypes.string,
};
