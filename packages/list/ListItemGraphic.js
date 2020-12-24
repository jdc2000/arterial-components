import {Icon} from '@arterial/icon';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {isValidElement} from 'react';

export function ListItemGraphic({
  className,
  graphic,
  style,
  tag: Tag = 'span',
  ...otherProps
}) {
  const styles = isValidElement(graphic)
    ? {display: 'inherit', alignItems: 'inherit', ...style}
    : style;
  const classes = classNames('mdc-list-item__graphic', className);
  if (typeof graphic === 'string') {
    return (
      <Icon
        className={classes}
        icon={graphic}
        styles={styles}
        tag={Tag}
        {...otherProps}
      />
    );
  }
  return (
    <Tag className={classes} style={styles} {...otherProps}>
      {graphic}
    </Tag>
  );
}
ListItemGraphic.displayName = 'ListItemGraphic';
ListItemGraphic.propTypes = {
  className: PropTypes.string,
  graphic: PropTypes.node,
  style: PropTypes.object,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
