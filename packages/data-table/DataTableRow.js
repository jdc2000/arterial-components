import PropTypes from 'prop-types';
import classNames from 'classnames';

export function DataTableRow({
  children,
  className,
  header,
  selected,
  ...otherProps
}) {
  const rowClass = header
    ? 'mdc-data-table__header-row'
    : 'mdc-data-table__row';
  const classes = classNames(rowClass, className, {
    'mdc-data-table__row--selected': selected && !header,
  });
  return (
    <tr className={classes} {...otherProps}>
      {children}
    </tr>
  );
}
DataTableRow.displayName = 'DataTableRow';
DataTableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.bool,
  selected: PropTypes.bool,
};
