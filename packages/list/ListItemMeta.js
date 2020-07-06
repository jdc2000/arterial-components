import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function ListItemMeta({
  className,
  meta,
  style,
  tag: Tag = 'span',
  ...otherProps
}) {
  const classes = classNames('mdc-list-item__meta', className);
  const styles = React.isValidElement(meta)
    ? { display: 'inherit', alignItems: 'inherit', ...style }
    : style;
  return (
    <Tag className={classes} style={styles} {...otherProps}>
      {meta}
    </Tag>
  );
}
ListItemMeta.displayName = 'ListItemMeta';
ListItemMeta.propTypes = {
  className: PropTypes.string,
  meta: PropTypes.node,
  style: PropTypes.object,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
