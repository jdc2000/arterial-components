import PropTypes from 'prop-types';
import classNames from 'classnames';

export function List({
  avatarList,
  children,
  className,
  dense,
  nonInteractive,
  twoLine,
  tag: Tag = 'ul',
  ...otherProps
}) {
  const classes = classNames('mdc-list', className, {
    'mdc-list--avatar-list': avatarList,
    'mdc-list--dense': dense,
    'mdc-list--non-interactive': nonInteractive,
    'mdc-list--two-line': twoLine,
  });
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
List.displayName = 'List';
List.propTypes = {
  avatarList: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  nonInteractive: PropTypes.bool,
  twoLine: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export {ListDivider} from './ListDivider';
export {ListGroup} from './ListGroup';
export {ListGroupSubheader} from './ListGroupSubheader';
export {ListItem} from './ListItem';
export {ListItemGraphic} from './ListItemGraphic';
export {ListItemMeta} from './ListItemMeta';
export {ListItemPrimaryText} from './ListItemPrimaryText';
export {ListItemSecondaryText} from './ListItemSecondaryText';
export {ListItemText} from './ListItemText';
