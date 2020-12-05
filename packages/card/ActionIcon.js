import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconButton} from '@arterial/icon-button';

export default function ActionIcon({className, ...otherProps}) {
  const classes = classNames(
    'mdc-card__action',
    'mdc-card__action--icon',
    className
  );
  return <IconButton className={classes} {...otherProps} />;
}
ActionIcon.displayName = 'CardActionIcon';
ActionIcon.propTypes = {
  className: PropTypes.string,
};
