import {Icon} from '@arterial/icon';
import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemMeta,
  ListItemPrimaryText,
  ListItemSecondaryText,
} from '@arterial/list';
import {MenuSurface, Corner} from '@arterial/menu-surface';
import {NotchedOutline} from '@arterial/notched-outline';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import {SelectHelperLine} from './SelectHelperLine';
import {v4 as uuid} from 'uuid';

export {SelectHelperText} from './SelectHelperText';
export function Select({
  children,
  className,
  disabled,
  helperText,
  icon,
  id,
  invalid,
  label,
  labelFloating,
  menuTwoLine,
  menuWidth,
  onSelect,
  options,
  outlined,
  placeholder,
  required,
  style,
  trailingIcon,
  value,
  ...otherProps
}) {
  const [isActivated, setIsActivated] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const anchorRef = useRef();
  const arterialRef = useRef(uuid());
  const listItems = useRef(new Map());
  const classes = classNames('mdc-select', className, {
    'mdc-select--activated': isActivated,
    'mdc-select--disabled': disabled,
    'mdc-select--invalid': invalid,
    'mdc-select--filled': !outlined,
    'mdc-select--focused': isFocused,
    'mdc-select--no-label': !label,
    'mdc-select--outlined': outlined,
    'mdc-select--required': required,
    'mdc-select--with-leading-icon': icon,
  });
  const isLabelFloating = Boolean(labelFloating || isFocused || value);
  const labelClasses = classNames('mdc-floating-label', {
    'mdc-floating-label--float-above': isLabelFloating,
  });
  const lineRippleClasses = classNames('mdc-line-ripple', {
    'mdc-line-ripple--active': isFocused,
  });
  const menuClasses = classNames('mdc-select__menu', 'mdc-menu', {
    'mdc-select__menu--invalid': invalid,
  });
  const labelId = `${id}-label`;

  function focusListItem(index) {
    let i = index;
    if (!options[i] || options[i].disabled) {
      const next = options.slice(i + 1);
      i = next.findIndex(option => !option.disabled);
      if (i === -1) {
        const previous = options.slice(0, i);
        i = previous.findIndex(option => !option.disabled);
      }
    }
    if (i >= 0 && i < options.length) {
      setTimeout(() => listItems.current.get(i).focus(), 1);
    }
  }

  function getListItemTabIndex(index) {
    if (options[index].disabled) return;
    return index === focusedIndex ? 0 : -1;
  }

  function getMenuStyle() {
    if (anchorRef.current) {
      const width = menuWidth || anchorRef.current.clientWidth;
      return {maxWidth: width, width};
    }
  }

  function getNextIndex(index) {
    const nextIndex = index + 1;
    const option = options[nextIndex];
    if (!option) return index;
    return option.disabled ? getNextIndex(nextIndex) : nextIndex;
  }

  function getPreviousIndex(index) {
    const previousIndex = index - 1;
    const option = options[previousIndex];
    if (!option) return index;
    return option.disabled ? getPreviousIndex(previousIndex) : previousIndex;
  }

  function getText(index) {
    const option = options[index] || {};
    return option.selectedText || option.text || '';
  }

  function handleClick(e) {
    if (disabled) return;
    if (isActivated) {
      setIsActivated(false);
      setIsFocused(true);
    } else {
      focusListItem(selectedIndex);
      setIsActivated(true);
      setIsFocused(true);
    }
    e.preventDefault();
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleKeyDown(e) {
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;
    const isTab = e.key === 'Tab' || e.keyCode === 9;

    if (isEnter || isSpace || arrowUp || arrowDown) {
      e.preventDefault();
      focusListItem(selectedIndex);
      setIsActivated(true);
    } else if (isTab) {
      setIsActivated(false);
      setIsFocused(false);
    }
  }

  function handleListItemAction(e, option, index) {
    const isClick = e.type === 'click';
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;
    const isTab = e.key === 'Tab' || e.keyCode === 9;

    if (!option.disabled && (isClick || isEnter || isSpace)) {
      e.preventDefault();
      setTimeout(() => anchorRef.current.focus(), 0);
      setIsActivated(false);
      if (onSelect) onSelect(option);
    } else if (isTab && e.shiftKey) {
      e.preventDefault();
      setTimeout(() => anchorRef.current.focus(), 0);
    } else if (arrowUp) {
      e.preventDefault();
      const i = getPreviousIndex(index);
      focusListItem(i);
      setFocusedIndex(i);
    } else if (arrowDown) {
      e.preventDefault();
      const i = getNextIndex(index);
      focusListItem(i);
      setFocusedIndex(i);
    }
  }

  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial || arterial !== arterialRef.current) {
        setIsActivated(false);
        setIsFocused(false);
      }
    }

    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        if (isTab && !e.shiftKey) anchorRef.current.focus();
        setIsActivated(false);
        setIsFocused(false);
      }
    }

    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);

  useEffect(() => {
    if (value != null) {
      const index = options.findIndex(option => option.value === value);
      setSelectedIndex(index);
    }
  }, [options, value]);

  return (
    <>
      <div className={classes} style={style}>
        <div
          {...otherProps}
          className="mdc-select__anchor"
          role="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          {...(label && {'aria-labelledby': `${labelId} ${id}`})}
          data-arterial={arterialRef.current}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          ref={anchorRef}
          tabIndex={disabled ? null : 0}
          title={getText(selectedIndex)}
        >
          {outlined && (
            <NotchedOutline
              data-arterial={arterialRef.current}
              label={label}
              labelId={labelId}
              notched={isLabelFloating}
            />
          )}
          {!outlined && (
            <span
              className="mdc-select__ripple"
              data-arterial={arterialRef.current}
            ></span>
          )}
          {!outlined && label && (
            <span
              className={labelClasses}
              data-arterial={arterialRef.current}
              id={labelId}
            >
              {label}
            </span>
          )}
          {icon && (
            <Icon
              className="mdc-select__icon"
              data-arterial={arterialRef.current}
              icon={icon}
            />
          )}
          <span
            className="mdc-select__selected-text-container"
            data-arterial={arterialRef.current}
          >
            <span
              className="mdc-select__selected-text"
              data-arterial={arterialRef.current}
              id={id}
            >
              {getText(selectedIndex) || placeholder}
            </span>
          </span>
          {trailingIcon ? (
            <Icon
              className="mdc-select__dropdown-icon"
              data-arterial={arterialRef.current}
              icon={trailingIcon}
            />
          ) : (
            <span
              className="mdc-select__dropdown-icon"
              data-arterial={arterialRef.current}
            >
              <svg
                className="mdc-select__dropdown-icon-graphic"
                data-arterial={arterialRef.current}
                focusable="false"
                viewBox="7 10 10 5"
              >
                <polygon
                  className="mdc-select__dropdown-icon-inactive"
                  data-arterial={arterialRef.current}
                  fillRule="evenodd"
                  points="7 10 12 15 17 10"
                  stroke="none"
                ></polygon>
                <polygon
                  className="mdc-select__dropdown-icon-active"
                  data-arterial={arterialRef.current}
                  points="7 15 12 10 17 15"
                  fillRule="evenodd"
                  stroke="none"
                ></polygon>
              </svg>
            </span>
          )}
          {!outlined && (
            <span
              className={lineRippleClasses}
              data-arterial={arterialRef.current}
            ></span>
          )}
        </div>
        <MenuSurface
          className={menuClasses}
          anchorCorner={Corner.BOTTOM_LEFT}
          anchorRef={anchorRef}
          data-arterial={arterialRef.current}
          id={`${id}-menu`}
          open={isActivated}
          style={getMenuStyle()}
        >
          <List
            data-arterial={arterialRef.current}
            id={`${id}-list`}
            role="listbox"
            twoLine={menuTwoLine}
          >
            {Array.isArray(options) &&
              options.length > 0 &&
              options.map((option, index) => (
                <ListItem
                  aria-selected={index === selectedIndex && !option.disabled}
                  data-arterial={arterialRef.current}
                  data-value={option.value}
                  disabled={option.disabled}
                  id={`${id}-list-item-${option.value}`}
                  key={option.value}
                  onClick={e => handleListItemAction(e, option, index)}
                  onKeyDown={e => handleListItemAction(e, option, index)}
                  ref={element => listItems.current.set(index, element)}
                  role="option"
                  selected={index === selectedIndex && !option.disabled}
                  tabIndex={getListItemTabIndex(index)}
                >
                  {option.graphic && (
                    <ListItemGraphic
                      data-arterial={arterialRef.current}
                      graphic={option.graphic}
                    />
                  )}
                  {menuTwoLine ? (
                    <ListItemText data-arterial={arterialRef.current}>
                      <ListItemPrimaryText
                        data-arterial={arterialRef.current}
                        title={option.text}
                      >
                        {option.text}
                      </ListItemPrimaryText>
                      <ListItemSecondaryText
                        data-arterial={arterialRef.current}
                        title={option.secondaryText}
                      >
                        {option.secondaryText}
                      </ListItemSecondaryText>
                      )
                    </ListItemText>
                  ) : (
                    <ListItemText
                      data-arterial={arterialRef.current}
                      title={getText(index)}
                    >
                      {option.text}
                    </ListItemText>
                  )}
                  {option.node}
                  {option.meta && (
                    <ListItemMeta
                      data-arterial={arterialRef.current}
                      meta={option.meta}
                    />
                  )}
                </ListItem>
              ))}
          </List>
        </MenuSurface>
      </div>
      <SelectHelperLine data-arterial={arterialRef.current} text={helperText} />
    </>
  );
}
Select.displayName = 'Select';
Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  label: PropTypes.node,
  labelFloating: PropTypes.bool,
  menuWidth: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      graphic: PropTypes.node,
      meta: PropTypes.node,
      node: PropTypes.node,
      secondaryText: PropTypes.string,
      selectedText: PropTypes.string,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  outlined: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  trailingIcon: PropTypes.node,
  twoLine: PropTypes.bool,
  value: PropTypes.string,
};
