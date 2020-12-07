import classNames from 'classnames';
import PropTypes from 'prop-types';

export function Card({
  children,
  className,
  outlined,
  tag: Tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-card', className, {
    'mdc-card--outlined': outlined,
  });
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}
Card.displayName = 'Card';
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  outlined: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export {CardPrimaryAction} from './CardPrimaryAction';
export {CardMedia} from './CardMedia';
export {CardMediaContent} from './CardMediaContent';
export {CardActions} from './CardActions';
export {CardActionButtons} from './CardActionButtons';
export {CardActionButton} from './CardActionButton';
export {CardActionIcons} from './CardActionIcons';
export {CardActionIcon} from './CardActionIcon';
