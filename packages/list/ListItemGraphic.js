import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ListItemGraphic({ className, graphic, ...otherProps }) {
  const classes = classNames('mdc-list-item__graphic', className);
  const props = { className: classes, ...otherProps };
  return React.cloneElement(graphic, props);
}

ListItemGraphic.propTypes = {
  className: PropTypes.string,
  graphic: PropTypes.element
};

export default ListItemGraphic;
