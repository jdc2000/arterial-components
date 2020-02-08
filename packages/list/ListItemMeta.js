import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ListItemMeta({ className, meta, ...otherProps }) {
  const classes = classNames('mdc-list-item__meta', className);
  const props = { className: classes, ...otherProps };
  return React.cloneElement(meta, props);
}

ListItemMeta.propTypes = {
  className: PropTypes.string,
  meta: PropTypes.element
};

export default ListItemMeta;
