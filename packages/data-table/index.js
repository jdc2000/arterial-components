import classNames from 'classnames';
import PropTypes from 'prop-types';

export function DataTable({children, className, label, ...otherProps}) {
  const classes = classNames('mdc-data-table', className);
  return (
    <div className={classes} {...otherProps}>
      <div className="mdc-data-table__table-container">
        <table className="mdc-data-table__table" aria-label={label}>
          {children}
        </table>
      </div>
    </div>
  );
}
DataTable.displayName = 'DataTable';
DataTable.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
};

export {DataTableHeader} from './DataTableHeader';
export {DataTableContent} from './DataTableContent';
export {DataTableHeaderRow, DataTableRow} from './DataTableRow';
export {DataTableHeaderCell, DataTableCell} from './DataTableCell';
