import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function DataTableContent({ children, className, ...otherProps }) {
  const classes = classNames('mdc-data-table__content', className);
  return (
    <tbody className={classes} {...otherProps}>
      {children}
    </tbody>
  );
}

DataTableContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
