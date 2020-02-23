import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function CardMedia({
  backgroundImage,
  children,
  className,
  sixteenByNine,
  square,
  style,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card__media', className, {
    'mdc-card__media--square': square,
    'mdc-card__media--16-9': sixteenByNine
  });
  const img = backgroundImage ? `url("${backgroundImage}")` : undefined;
  const styles = { ...style, backgroundImage: img };
  const Tag = tag;
  return (
    <Tag className={classes} style={styles} {...otherProps}>
      {children}
    </Tag>
  );
}

CardMedia.propTypes = {
  backgroundImage: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  sixteenByNine: PropTypes.bool,
  square: PropTypes.bool,
  style: PropTypes.object,
  tag: PropTypes.element
};

export default CardMedia;
