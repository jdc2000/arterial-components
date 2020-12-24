import classNames from 'classnames';
import PropTypes from 'prop-types';

export function DataTableContent({children, className, ...otherProps}) {
  const classes = classNames('mdc-data-table__content', className);
  return (
    <tbody className={classes} {...otherProps}>
      {children}
    </tbody>
  );
}
DataTableContent.displayName = 'DataTableContent';
DataTableContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
