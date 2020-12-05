import {forwardRef} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ListItem = forwardRef((props, ref) => {
  const {
    activated,
    children,
    className,
    disabled,
    selected,
    tag: Tag = 'li',
    ...otherProps
  } = props;
  const classes = classNames('mdc-list-item', className, {
    'mdc-list-item--activated': activated,
    'mdc-list-item--disabled': disabled,
    'mdc-list-item--selected': selected,
  });
  return (
    <Tag className={classes} ref={ref} {...otherProps}>
      <span className="mdc-list-item__ripple"></span>
      {children}
    </Tag>
  );
});
ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  activated: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
