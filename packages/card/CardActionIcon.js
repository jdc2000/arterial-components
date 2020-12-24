import {IconButton} from '@arterial/icon-button';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
