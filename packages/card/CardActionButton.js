import {Button} from '@arterial/button';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export function CardActionButton({className, ...otherProps}) {
  const classes = classNames(
    'mdc-card__action',
    'mdc-card__action--button',
    className
  );
  return <Button className={classes} {...otherProps} />;
}
CardActionButton.displayName = 'CardActionButton';
CardActionButton.propTypes = {
  className: PropTypes.string,
};
