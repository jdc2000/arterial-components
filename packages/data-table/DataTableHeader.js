import {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';

export function DataTableHeader({children, className, ...otherProps}) {
  return (
    <thead className={className} {...otherProps}>
      {Children.map(children, row => {
        const {children, ...otherProps} = row.props;
        const props = {...otherProps, header: true};
        return cloneElement(row, props, children);
      })}
    </thead>
  );
}
DataTableHeader.displayName = 'DataTableHeader';
DataTableHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
