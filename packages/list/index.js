import classNames from 'classnames';
import PropTypes from 'prop-types';

export function List({
  avatarList,
  children,
  className,
  dense,
  iconList,
  imageList,
  nonInteractive,
  textualList,
  thumbnailList,
  twoLine,
  videoList,
  tag: Tag = 'ul',
  ...otherProps
}) {
  const classes = classNames('mdc-list', className, {
    'mdc-list--avatar-list': avatarList,
    'mdc-list--dense': dense,
    'mdc-list--icon-list': iconList,
    'mdc-list--image-list': imageList,
    'mdc-list--non-interactive': nonInteractive,
    'mdc-list--textual-list': textualList,
    'mdc-list--thumbnail-list': thumbnailList,
    'mdc-list--two-line': twoLine,
    'mdc-list--video-list': videoList,
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
  iconList: PropTypes.bool,
  imageList: PropTypes.bool,
  dense: PropTypes.bool,
  nonInteractive: PropTypes.bool,
  textualList: PropTypes.bool,
  twoLine: PropTypes.bool,
  videoList: PropTypes.bool,
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
