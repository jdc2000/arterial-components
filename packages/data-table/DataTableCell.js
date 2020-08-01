import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@arterial/checkbox';
import classNames from 'classnames';

export function DataTableCell(props) {
  return <Cell {...props} header={false} />;
}

export function DataTableHeaderCell(props) {
  return <Cell {...props} header />;
}

function Cell({
  checkbox,
  checkboxId,
  checked,
  children,
  className,
  header,
  indeterminate,
  numeric,
  onChange,
  ...otherProps
}) {
  const cellClass = header
    ? 'mdc-data-table__header-cell'
    : 'mdc-data-table__cell';
  const classes = classNames(cellClass, className, {
    [`${cellClass}--checkbox`]: checkbox,
    [`${cellClass}--numeric`]: numeric && !checkbox,
  });
  const checkboxClasses = classNames({
    'mdc-data-table__header-row-checkbox': checkbox && header,
    'mdc-data-table__row-checkbox': checkbox && !header,
  });
  function handleChange(e) {
    if (onChange) {
      onChange({
        checked: e.target.checked,
        indeterminate: e.target.indeterminate,
      });
    }
  }

  const Tag = header ? 'th' : 'td';
  return (
    <Tag className={classes} {...otherProps}>
      {checkbox ? (
        <Checkbox
          className={checkboxClasses}
          checked={checked}
          id={checkboxId}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
      ) : (
        children
      )}
    </Tag>
  );
}
Cell.displayName = 'DataTableCell';
Cell.propTypes = {
  checkbox: PropTypes.bool,
  checkboxId: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.bool,
  numeric: PropTypes.bool,
};
