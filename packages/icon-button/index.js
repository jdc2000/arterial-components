import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@arterial/icon';

const ICON_CLASS = 'mdc-icon-button__icon';
const ON_ICON_CLASS = classNames(ICON_CLASS, 'mdc-icon-button__icon--on');

export function IconButton({
  className,
  icon,
  label,
  on,
  onIcon,
  style,
  tag = 'button',
  ...otherProps
}) {
  const classes = classNames('mdc-icon-button', className, {
    'mdc-icon-button--on': on
  });
  const ariaProps = {
    'aria-label': label,
    'aria-pressed': on
  };
  const styles = {
    ...(tag === 'button' && { textAlign: 'initial' }),
    ...style
  };
  const Tag = tag;
  return (
    <Tag className={classes} style={styles} {...otherProps} {...ariaProps}>
      {icon && <Icon className={ICON_CLASS} icon={icon} />}
      {onIcon && <Icon className={ON_ICON_CLASS} icon={onIcon} />}
    </Tag>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  on: PropTypes.bool,
  onIcon: PropTypes.node,
  style: PropTypes.object,
  tag: PropTypes.element
};
