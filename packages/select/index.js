import React, { useRef, useEffect, useReducer } from 'react';
import { Icon } from '@arterial/icon';
import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemMeta
} from '@arterial/list';
import { MenuSurface, Corner } from '@arterial/menu-surface';
import NotchedOutline from './NotchedOutline';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reducer, types, INITIAL_STATE } from './reducer';
import { v4 as uuid } from 'uuid';

export { default as HelperText } from './HelperText';
export function Select({
  children,
  className,
  disabled,
  helperText,
  icon,
  id,
  invalid,
  label,
  labelFloated,
  onSelect,
  options,
  outlined,
  placeholder,
  required,
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
    'mdc-floating-label--float-above': state.focused || labelFloated || value
  });
  const lineRippleClasses = classNames('mdc-line-ripple', {
    'mdc-line-ripple--active': state.focused
  });
  const inputId = `${id}-selected-text`;

  const ariaProps = {
    role: required ? undefined : 'button',
    'aria-haspopup': 'listbox',
    'aria-labelledby': `${id} ${inputId}`,
    'aria-required': required
  };

  function handleClick(e) {
    const focusedIndex = isSelected() ? state.selectedIndex : 0;
    if (!state.activated) {
      setTimeout(() => listItems.current.get(focusedIndex).focus(), 0);
    }
    dispatch({
      type: types.SET_ACTIVATED,
      activated: !state.activated,
      focused: true,
      focusedIndex
    });
    e.preventDefault();
  }

  function handleFocus() {
    dispatch({ type: types.SET_FOCUSED, focused: true });
  }

  function handleKeyDown(e) {
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;

    if (isEnter || isSpace || arrowUp || arrowDown) {
      const focusedIndex = isSelected() ? state.selectedIndex : 0;
      setTimeout(() => listItems.current.get(focusedIndex).focus(), 0);
      dispatch({
        type: types.SET_ACTIVATED,
        activated: true,
        focused: state.focused,
        focusedIndex
      });
      e.preventDefault();
    }
  }

  function handleMenuItemAction(e, option, index) {
    const isClick = e.type === 'click';
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;

    if (!option.disabled && (isClick || isEnter || isSpace)) {
      anchorRef.current.focus();
      dispatch({
        type: types.SET_SELECTED_INDEX,
        activated: false,
        focused: true,
        selectedIndex: index
      });
      if (onSelect) onSelect({ ...option, index });
    } else if (arrowUp) {
      const i = getPreviousIndex(index);
      focusMenuItem(i);
    } else if (arrowDown) {
      const i = getNextIndex(index);
      focusMenuItem(i);
    }
  }

  function focusMenuItem(index) {
    listItems.current.get(index).focus();
    dispatch({ type: types.SET_FOCUSED_INDEX, focusedIndex: index });
  }

  function getMenuItemTabIndex(index, disabled) {
    if (disabled) return;
    return index === state.focusedIndex ? 0 : -1;
  }

  function getNextIndex(index) {
    if (index >= options.length - 1) return index;
    const nextIndex = index + 1;
    return isDisabledIndex(nextIndex) ? getNextIndex(nextIndex) : nextIndex;
  }

  function getPreviousIndex(index) {
    if (index <= 0) return index;
    const previousIndex = index - 1;
    return isDisabledIndex(previousIndex)
      ? getPreviousIndex(previousIndex)
      : previousIndex;
  }

  function isDisabledIndex(index) {
    const item = listItems.current.get(index);
    return item.classList.contains('mdc-list-item--disabled');
  }

  function isSelected() {
    return state.selectedIndex !== -1;
  }

  useEffect(() => {
    function handleBodyClick(e) {
      const { arterial } = e.target.dataset;
      if (!arterial || arterial !== arterialRef.current) {
        const focusedIndex = isSelected() ? state.selectedIndex : 0;
        dispatch({
          type: types.SET_ACTIVATED,
          activated: false,
          focused: false,
          focusedIndex
        });
      }
    }

    function handleWindowKeyDown(e) {
      const { arterial } = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        if (isTab) anchorRef.current.focus();
        const focusedIndex = isSelected() ? state.selectedIndex : 0;
        dispatch({
          type: types.SET_ACTIVATED,
          activated: false,
          focused: false,
          focusedIndex
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

  return (
    <>
      <div className={classes}>
        <div
          {...ariaProps}
          {...otherProps}
          className="mdc-select__anchor"
          data-arterial={arterialRef.current}
          ref={anchorRef}
          tabIndex="0"
          title={value}
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
            id={inputId}
            placeholder={placeholder}
            readOnly
            ref={inputRef}
            value={value}
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
            ></i>
          )}
          {outlined ? (
            <NotchedOutline
              data-arterial={arterialRef.current}
              id={id}
              label={label}
              labelClassName={labelClasses}
              notched={state.focused || labelFloated || Boolean(value)}
            />
          ) : (
            <>
              {label && (
                <span
                  className={labelClasses}
                  data-arterial={arterialRef.current}
                  id={id}
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
        {helperText}
        <MenuSurface
          className="mdc-select__menu mdc-menu"
          anchorCorner={Corner.BOTTOM_LEFT}
          anchorElement={anchorRef}
          data-arterial={arterialRef.current}
          open={state.activated}
        >
          <List data-arterial={arterialRef.current} role="listbox">
            {Array.isArray(options)
              ? options.map((opt, index) => (
                  <ListItem
                    aria-selected={index === state.selectedIndex}
                    data-arterial={arterialRef.current}
                    data-value={opt.value}
                    disabled={opt.disabled}
                    key={opt.value}
                    role="option"
                    selected={index === state.selectedIndex}
                    tabIndex={getMenuItemTabIndex(index, opt.disabled)}
                    onClick={e => handleMenuItemAction(e, opt, index)}
                    onKeyDown={e => handleMenuItemAction(e, opt, index)}
                    ref={element => listItems.current.set(index, element)}
                  >
                    {opt.graphic && (
                      <ListItemGraphic
                        data-arterial={arterialRef.current}
                        graphic={opt.graphic}
                      />
                    )}
                    {opt.text && (
                      <ListItemText data-arterial={arterialRef.current}>
                        {opt.text}
                      </ListItemText>
                    )}
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
                ))
              : options}
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
  labelFloated: PropTypes.bool,
  onSelect: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  outlined: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  trailingIcon: PropTypes.node,
  value: PropTypes.string
};
