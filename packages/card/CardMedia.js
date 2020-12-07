import PropTypes from 'prop-types';
import classNames from 'classnames';

export function CardMedia({
  backgroundImage,
  children,
  className,
  sixteenByNine,
  square,
  style,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__media', className, {
    'mdc-card__media--square': square,
    'mdc-card__media--16-9': sixteenByNine,
  });
  const img = backgroundImage ? `url("${backgroundImage}")` : undefined;
  const styles = {...style, backgroundImage: img};
  return (
    <Tag className={classes} style={styles} {...otherProps}>
      {children}
    </Tag>
  );
}
CardMedia.displayName = 'CardMedia';
CardMedia.propTypes = {
  backgroundImage: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  sixteenByNine: PropTypes.bool,
  square: PropTypes.bool,
  style: PropTypes.object,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
