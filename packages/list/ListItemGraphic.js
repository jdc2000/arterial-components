import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@faterial/icon';

function ListItemGraphic({ className, graphic, ...otherProps }) {
  const classes = classNames('mdc-list-item__graphic', className);
  return <Icon className={classes} icon={graphic} {...otherProps} />;
}

ListItemGraphic.propTypes = {
  className: PropTypes.string,
  graphic: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};

export default ListItemGraphic;
