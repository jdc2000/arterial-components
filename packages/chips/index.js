import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@faterial/icon';

function Chip({
  checkmark,
  className,
  icon,
  id,
  onTrailingIconSelect,
  onSelect,
  ripple = true,
  selected,
  text,
  trailingIcon,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-chip', className, {
    'mdc-chip--selected': selected
  });
  const iconClasses = classNames('mdc-chip__icon', 'mdc-chip__icon--leading', {
    'mdc-chip__icon--leading-hidden': checkmark && selected
  });
  const trailingIconClasses = classNames(
    'mdc-chip__icon',
    'mdc-chip__icon--trailing'
  );
  const Tag = tag;

  function isSelected(e) {
    const isClick = e.type === 'click';
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpacebar = e.key === 'Spacebar' || e.keyCode === 32;
    return isClick || isEnter || isSpacebar;
  }

  function handleTrailingIconSelect(e) {
    if (onTrailingIconSelect && isSelected(e)) {
      return onTrailingIconSelect(id);
    }
  }

  function handleSelect(e) {
    if (onSelect && isSelected(e)) {
      return onSelect();
    }
  }

  return (
    <Tag
      className={classes}
      id={id}
      onClick={handleSelect}
      onKeyDown={handleSelect}
      role="row"
      {...otherProps}
    >
      {ripple && <div className="mdc-chip__ripple"></div>}
      {icon && <Icon className={iconClasses} icon={icon} />}
      {checkmark && (
        <span className="mdc-chip__checkmark">
          <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
            <path
              className="mdc-chip__checkmark-path"
              fill="none"
              stroke="black"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            />
          </svg>
        </span>
      )}
      {text && (
        <span role="gridcell">
          <span className="mdc-chip__primary-action" role="button" tabIndex="0">
            <span className="mdc-chip__text">{text}</span>
          </span>
        </span>
      )}
      {trailingIcon && (
        <Icon
          className={trailingIconClasses}
          icon={trailingIcon}
          role="button"
          tabIndex={onTrailingIconSelect ? 0 : -1}
          onKeyDown={handleTrailingIconSelect}
          onClick={handleTrailingIconSelect}
        />
      )}
    </Tag>
  );
}

Chip.propTypes = {
  className: PropTypes.string
};

export { Chip };
export { default as ChipSet } from './ChipSet';
