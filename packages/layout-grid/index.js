import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Grid({
  align,
  children,
  className,
  fixedColumnWidth,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-layout-grid', className, {
    [`mdc-layout-grid--align-${align}`]: align,
    'mdc-layout-grid--fixed-column-width': fixedColumnWidth,
  });
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
Grid.displayName = 'Grid';
Grid.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  fixedColumnWidth: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export function GridRow({
  children,
  className,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-layout-grid__inner', className);
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
GridRow.displayName = 'GridRow';
GridRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export function GridCell({
  align,
  children,
  className,
  order,
  span,
  spanDesktop,
  spanPhone,
  spanTablet,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-layout-grid__cell', className, {
    [`mdc-layout-grid__cell--align-${align}`]: align,
    [`mdc-layout-grid__cell--order-${order}`]: order,
    [`mdc-layout-grid__cell--span-${span}`]: span,
    [`mdc-layout-grid__cell--span-${spanDesktop}-desktop`]: spanDesktop,
    [`mdc-layout-grid__cell--span-${spanPhone}-phone`]: spanPhone,
    [`mdc-layout-grid__cell--span-${spanTablet}-tablet`]: spanTablet,
  });
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

const INTEGERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
GridCell.displayName = 'GridCell';
GridCell.propTypes = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  children: PropTypes.node,
  className: PropTypes.string,
  order: PropTypes.oneOf(INTEGERS),
  span: PropTypes.oneOf(INTEGERS),
  spanDesktop: PropTypes.oneOf(INTEGERS),
  spanPhone: PropTypes.oneOf(INTEGERS),
  spanTablet: PropTypes.oneOf(INTEGERS),
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
