import {useEffect, useReducer, useRef} from 'react';
import {SelectHelperLine} from './SelectHelperLine';
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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {reducer, types, INITIAL_STATE} from './reducer';
import {v4 as uuid} from 'uuid';

export {SelectHelperLine};
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
    'mdc-select--with-leading-icon': icon,
  });
  const isLabelFloating = Boolean(labelFloating || state.focused || value);
  const labelClasses = classNames('mdc-floating-label', {
    'mdc-floating-label--float-above': isLabelFloating,
  });
  const lineRippleClasses = classNames('mdc-line-ripple', {
    'mdc-line-ripple--active': state.focused,
  });
  const labelId = `${id}-label`;

  const ariaProps = {
    role: required ? null : 'button',
    'aria-haspopup': 'listbox',
    'aria-labelledby': label ? `${labelId} ${id}` : null,
    'aria-required': required,
  };

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
    return index === state.focusedIndex ? 0 : -1;
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
    if (!state.activated) focusListItem(state.selectedIndex);
    const type = state.activated ? types.DEACTIVATE : types.ACTIVATE;
    dispatch({type, focused: true});
    e.preventDefault();
  }

  function handleFocus() {
    dispatch({type: types.FOCUS});
  }

  function handleKeyDown(e) {
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;
    const isTab = e.key === 'Tab' || e.keyCode === 9;

    if (isEnter || isSpace || arrowUp || arrowDown) {
      e.preventDefault();
      focusListItem(state.selectedIndex);
      dispatch({type: types.ACTIVATE});
    } else if (isTab) {
      dispatch({type: types.DEACTIVATE, focused: false});
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
      dispatch({type: types.DEACTIVATE});
      if (onSelect) onSelect(option);
    } else if (isTab && e.shiftKey) {
      e.preventDefault();
      setTimeout(() => anchorRef.current.focus(), 0);
    } else if (arrowUp) {
      e.preventDefault();
      const i = getPreviousIndex(index);
      focusListItem(i);
      dispatch({type: types.FOCUS_INDEX, focusedIndex: i});
    } else if (arrowDown) {
      e.preventDefault();
      const i = getNextIndex(index);
      focusListItem(i);
      dispatch({type: types.FOCUS_INDEX, focusedIndex: i});
    }
  }

  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial || arterial !== arterialRef.current) {
        dispatch({type: types.DEACTIVATE, focused: false});
      }
    }

    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        if (isTab && !e.shiftKey) anchorRef.current.focus();
        dispatch({type: types.DEACTIVATE, focused: false});
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
      const selectedIndex = options.findIndex(option => option.value === value);
      dispatch({type: types.SELECT_INDEX, selectedIndex});
    }
  }, [options, value]);

  return (
    <>
      <div className={classes} style={style}>
        <div
          {...ariaProps}
          {...otherProps}
          className="mdc-select__anchor"
          data-arterial={arterialRef.current}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          ref={anchorRef}
          style={{width: 'inherit'}}
          tabIndex={disabled ? null : 0}
          title={getText(state.selectedIndex)}
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
            value={getText(state.selectedIndex)}
          />
          {trailingIcon ? (
            <Icon
              className="mdc-select__dropdown-icon"
              data-arterial={arterialRef.current}
              icon={trailingIcon}
              style={{background: 'initial'}}
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
              notched={isLabelFloating}
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
        <SelectHelperLine text={helperText} />
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
            twoLine={state.twoLine}
          >
            {Array.isArray(options) &&
              options.length > 0 &&
              options.map((option, index) => (
                <ListItem
                  aria-selected={
                    index === state.selectedIndex && !option.disabled
                  }
                  data-arterial={arterialRef.current}
                  data-value={option.value}
                  disabled={option.disabled}
                  id={`${id}-list-item-${option.value}`}
                  key={option.value}
                  onClick={e => handleListItemAction(e, option, index)}
                  onKeyDown={e => handleListItemAction(e, option, index)}
                  ref={element => listItems.current.set(index, element)}
                  role="option"
                  selected={index === state.selectedIndex && !option.disabled}
                  tabIndex={getListItemTabIndex(index)}
                >
                  {option.graphic && (
                    <ListItemGraphic
                      data-arterial={arterialRef.current}
                      graphic={option.graphic}
                    />
                  )}
                  {state.twoLine ? (
                    <ListItemText data-arterial={arterialRef.current}>
                      <ListItemPrimaryText title={option.text}>
                        {option.text}
                      </ListItemPrimaryText>
                      <ListItemSecondaryText title={option.secondaryText}>
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
  value: PropTypes.string,
};
