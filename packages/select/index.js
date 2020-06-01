import React, { useEffect, useReducer, useRef } from 'react';
import HelperText from './HelperText';
import { Icon } from '@arterial/icon';
import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemMeta
} from '@arterial/list';
import { MenuSurface, Corner } from '@arterial/menu-surface';
import { NotchedOutline } from '@arterial/notched-outline';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reducer, types, INITIAL_STATE } from './reducer';
import { v4 as uuid } from 'uuid';

export { HelperText };
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
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const anchorRef = useRef();
  const arterialRef = useRef(uuid());
  const inputRef = useRef();
  const listItems = useRef(new Map());
  const classes = classNames('mdc-select', className, {
    'mdc-select--activated': state.activated,
    'mdc-select--disabled': disabled,
    'mdc-select--invalid': invalid,
    'mdc-select--focused': state.focused,
    'mdc-select--no-label': !label,
    'mdc-select--outlined': outlined,
    'mdc-select--required': required,
    'mdc-select--with-leading-icon': icon
  });
  const labelClasses = classNames('mdc-floating-label', {
    'mdc-floating-label--float-above': labelFloating || state.focused || value
  });
  const lineRippleClasses = classNames('mdc-line-ripple', {
    'mdc-line-ripple--active': state.focused
  });
  const labelId = `${id}-label`;

  const ariaProps = {
    role: required ? null : 'button',
    'aria-haspopup': 'listbox',
    'aria-labelledby': label ? `${labelId} ${id}` : null,
    'aria-required': required
  };

  function focusListItem(key) {
    let focusKey = key;
    if (focusKey == null || getOption(focusKey).disabled) {
      const option = options.find(o => !o.disabled) || {};
      focusKey = option.value;
    }
    const item = getListItem(focusKey);
    if (item) setTimeout(() => item.focus({ preventScroll: true }), 0);
  }

  function getListItem(key) {
    return listItems.current.get(key);
  }

  function getListItemTabIndex(key) {
    if (getOption(key).disabled) return;
    return key === state.focusedKey ? 0 : -1;
  }

  function getMenuStyle() {
    if (anchorRef.current) {
      const width = menuWidth || anchorRef.current.clientWidth;
      return { maxWidth: width, width };
    }
  }

  function getOption(key) {
    return state.options.get(key) || {};
  }

  function getNextKey(key) {
    const index = getOption(key).index;
    if (index == null || index >= state.options.size - 1) return key;
    const nextIndex = index + 1;
    const option = options[nextIndex];
    return option.disabled ? getNextKey(option.value) : option.value;
  }

  function getPreviousKey(key) {
    const index = getOption(key).index;
    if (index == null || index <= 0) return key;
    const previousIndex = index - 1;
    const option = options[previousIndex];
    return option.disabled ? getPreviousKey(option.value) : option.value;
  }

  function getSelectedText(key) {
    const option = getOption(key);
    return option.selectedText || option.text || '';
  }

  function handleClick(e) {
    if (disabled) return;
    if (!state.activated) focusListItem(state.selected.value);
    dispatch({
      type: types.SET_ACTIVATED,
      activated: !state.activated,
      focused: true
    });
    e.preventDefault();
  }

  function handleFocus() {
    if (!disabled) dispatch({ type: types.FOCUSED });
  }

  function handleKeyDown(e) {
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;

    if (isEnter || isSpace || arrowUp || arrowDown) {
      focusListItem(state.selected.value);
      dispatch({ type: types.SET_ACTIVATED, activated: true });
      e.preventDefault();
    }
  }

  function handleListItemAction(e, option) {
    const isClick = e.type === 'click';
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;

    if (!option.disabled && (isClick || isEnter || isSpace)) {
      anchorRef.current.focus({ preventScroll: true });
      dispatch({ type: types.SET_ACTIVATED, activated: false });
      if (onSelect) onSelect(option);
    } else if (arrowUp) {
      const key = getPreviousKey(option.value);
      focusListItem(key);
      dispatch({ type: types.SET_FOCUSED_KEY, focusedKey: key });
    } else if (arrowDown) {
      const key = getNextKey(option.value);
      focusListItem(key);
      dispatch({ type: types.SET_FOCUSED_KEY, focusedKey: key });
    }
  }

  function renderHelperText() {
    if (typeof helperText === 'object') {
      if (helperText === null || React.isValidElement(helperText)) {
        return helperText;
      }
      return <HelperText {...helperText} />;
    }
    return null;
  }

  useEffect(() => {
    function handleBodyClick(e) {
      const { arterial } = e.target.dataset;
      if (!arterial || arterial !== arterialRef.current) {
        dispatch({
          type: types.SET_ACTIVATED,
          activated: false,
          focused: false
        });
      }
    }

    function handleWindowKeyDown(e) {
      const { arterial } = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        if (isTab) anchorRef.current.focus({ preventScroll: true });
        dispatch({
          type: types.SET_ACTIVATED,
          activated: false,
          focused: false
        });
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
    dispatch({ type: types.SET_OPTIONS, options });
  }, [options]);

  useEffect(() => {
    if (value != null) {
      dispatch({ type: types.SET_SELECTED, value });
    }
  }, [value]);

  return (
    <>
      <div className={classes} style={style}>
        <div
          {...ariaProps}
          {...otherProps}
          className="mdc-select__anchor"
          data-arterial={arterialRef.current}
          ref={anchorRef}
          style={{ width: 'inherit' }}
          tabIndex={disabled ? null : 0}
          title={getSelectedText(value)}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        >
          {!outlined && <span className="mdc-select__ripple"></span>}
          {icon && (
            <Icon
              className="mdc-select__icon"
              data-arterial={arterialRef.current}
              icon={icon}
            />
          )}
          <input
            className="mdc-select__selected-text"
            data-arterial={arterialRef.current}
            disabled
            id={id}
            placeholder={placeholder}
            readOnly
            ref={inputRef}
            value={getSelectedText(value)}
          />
          {trailingIcon ? (
            <Icon
              className="mdc-select__dropdown-icon"
              data-arterial={arterialRef.current}
              icon={trailingIcon}
              style={{ background: 'initial' }}
            />
          ) : (
            <i
              className="mdc-select__dropdown-icon"
              data-arterial={arterialRef.current}
              id={`${id}-dropdown-icon`}
            ></i>
          )}
          {outlined ? (
            <NotchedOutline
              data-arterial={arterialRef.current}
              label={label}
              labelId={labelId}
              notched={Boolean(labelFloating || state.focused || value)}
            />
          ) : (
            <>
              {label && (
                <span
                  className={labelClasses}
                  data-arterial={arterialRef.current}
                  id={labelId}
                >
                  {label}
                </span>
              )}
              <span
                className={lineRippleClasses}
                data-arterial={arterialRef.current}
              ></span>
            </>
          )}
        </div>
        {renderHelperText()}
        <MenuSurface
          className="mdc-select__menu mdc-menu"
          anchorCorner={Corner.BOTTOM_LEFT}
          anchorRef={anchorRef}
          data-arterial={arterialRef.current}
          id={`${id}-menu`}
          open={state.activated}
          style={getMenuStyle()}
        >
          <List
            data-arterial={arterialRef.current}
            id={`${id}-list`}
            role="listbox"
          >
            {Array.isArray(options) &&
              options.length &&
              options.map(opt => (
                <ListItem
                  aria-selected={opt.value === state.selected.value}
                  data-arterial={arterialRef.current}
                  data-value={opt.value}
                  disabled={opt.disabled}
                  id={`${id}-list-item-${opt.value}`}
                  key={opt.value}
                  ref={element => listItems.current.set(opt.value, element)}
                  role="option"
                  selected={opt.value === state.selected.value}
                  tabIndex={getListItemTabIndex(opt.value)}
                  title={opt.selectedText || opt.text}
                  onClick={e => handleListItemAction(e, opt)}
                  onKeyDown={e => handleListItemAction(e, opt)}
                >
                  {opt.graphic && (
                    <ListItemGraphic
                      data-arterial={arterialRef.current}
                      graphic={opt.graphic}
                    />
                  )}
                  <ListItemText data-arterial={arterialRef.current}>
                    {opt.text}
                  </ListItemText>
                  {opt.icon && (
                    <Icon
                      className="mdc-list-item__graphic"
                      data-arterial={arterialRef.current}
                      icon={opt.icon}
                      style={{
                        color:
                          'var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))',
                        margin: '0 0 0 8px',
                        ...opt.iconStyle
                      }}
                    />
                  )}
                  {opt.meta && (
                    <ListItemMeta
                      data-arterial={arterialRef.current}
                      meta={opt.meta}
                    />
                  )}
                </ListItem>
              ))}
          </List>
        </MenuSurface>
      </div>
    </>
  );
}

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
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  outlined: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  trailingIcon: PropTypes.node,
  value: PropTypes.string
};
