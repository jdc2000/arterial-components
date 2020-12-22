import classNames from 'classnames';
import PropTypes from 'prop-types';

function Row({children, className, header, selected, ...otherProps}) {
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

export function DataTableRow(props) {
  return <Row {...props} />;
}
DataTableRow.displayName = 'DataTableRow';
DataTableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.bool,
  selected: PropTypes.bool,
};

export function DataTableHeaderRow(props) {
  return <Row {...props} />;
}
DataTableHeaderRow.displayName = 'DataTableHeaderRow';
DataTableHeaderRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.bool,
  selected: PropTypes.bool,
};
