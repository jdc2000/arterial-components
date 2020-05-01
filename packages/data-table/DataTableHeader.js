import React from 'react';
import PropTypes from 'prop-types';

export function DataTableHeader({ children, className, ...otherProps }) {
  return (
    <thead className={className} {...otherProps}>
      {React.Children.map(children, row => {
        const { children, ...otherProps } = row.props;
        const props = { ...otherProps, header: true };
        return React.cloneElement(row, props, children);
      })}
    </thead>
  );
}

DataTableHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
