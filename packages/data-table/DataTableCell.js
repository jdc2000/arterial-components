import {Checkbox} from '@arterial/checkbox';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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

  const cellProps = header
    ? {role: 'columnheader', scope: 'col', ...otherProps}
    : otherProps;
  const Tag = header ? 'th' : 'td';
  return (
    <Tag className={classes} {...cellProps}>
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

export function DataTableCell(props) {
  return <Cell {...props} />;
}
DataTableCell.displayName = 'DataTableCell';
DataTableCell.propTypes = {
  checkbox: PropTypes.bool,
  checkboxId: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  numeric: PropTypes.bool,
};

export function DataTableHeaderCell(props) {
  return <Cell {...props} header />;
}
DataTableHeaderCell.displayName = 'DataTableHeaderCell';
DataTableHeaderCell.propTypes = {
  checkbox: PropTypes.bool,
  checkboxId: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  numeric: PropTypes.bool,
};
