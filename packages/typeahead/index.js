import {
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemMeta,
  ListItemPrimaryText,
  ListItemSecondaryText,
} from '@arterial/list';
import {MenuSurface, MenuSurfaceAnchor, Corner} from '@arterial/menu-surface';
import {TextField} from '@arterial/textfield';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useEffect, useReducer, useRef} from 'react';
import {v4 as uuid} from 'uuid';
import Highlighter from './Highlighter';
import {reducer, types, INITIAL_STATE} from './reducer';

export function Typeahead({
  className,
  highlight,
  id,
  labelFloating,
  menuWidth,
  onChange,
  onSelect,
  options,
  searchOptions,
  style,
  value,
  ...otherProps
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const anchorRef = useRef();
  const arterialRef = useRef(uuid());
  const textFieldRef = useRef();
  const classes = classNames('ajs-typeahead', className, {
    'ajs-typeahead--activated': state.activated,
    'ajs-typeahead--focused': state.focused,
  });
  const isLabelFloating = Boolean(labelFloating || state.focused || value);

  function focusListItem(index) {
    const activated = !state.activated ? true : null;
    const focused = !state.focused ? true : null;
    const focusedIndex = index;
    dispatch({type: types.FOCUS_INDEX, focusedIndex, activated, focused});
  }

  function getMenuStyle() {
    if (textFieldRef.current) {
      const width = menuWidth || textFieldRef.current.clientWidth;
      return {maxWidth: width, width};
    }
  }

  function getNextIndex(index) {
    if (index >= state.options.length - 1) return state.options.length - 1;
    const nextIndex = index + 1;
    const option = state.options[nextIndex];
    return option.disabled ? getNextIndex(nextIndex) : nextIndex;
  }

  function getPreviousIndex(index) {
    if (index <= 0) return 0;
    const previousIndex = index - 1;
    const option = state.options[previousIndex];
    return option.disabled ? getPreviousIndex(previousIndex) : previousIndex;
  }

  function getText(option) {
    return option.selectedText || option.text || '';
  }

  function select(option) {
    if (option.disabled) return;
    textFieldRef.current.focus();
    dispatch({type: types.DEACTIVATE});
    if (onSelect) onSelect(option);
    if (onChange) onChange(getText(option));
  }

  function handleChange(e) {
    focusListItem(0);
    if (onChange) onChange(e.target.value);
  }

  function handleClick() {
    if (!state.activated && state.focused) dispatch({type: types.ACTIVATE});
  }

  function handleFocus() {
    const type = state.activated ? types.DEACTIVATE : types.ACTIVATE;
    dispatch({type, focused: true});
  }

  function handleKeyDown(e) {
    const arrowUp = e.key === 'ArrowUp' || e.keyCode === 38;
    const arrowDown = e.key === 'ArrowDown' || e.keyCode === 40;
    const isEscape = e.key === 'Escape' || e.keyCode === 27;
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isTab = e.key === 'Tab' || e.keyCode === 9;

    if (isEnter) {
      select(state.options[state.focusedIndex]);
    } else if (isEscape) {
      e.preventDefault();
      e.stopPropagation();
    } else if (isTab) {
      dispatch({type: types.DEACTIVATE});
    } else if (arrowUp) {
      e.preventDefault();
      focusListItem(getPreviousIndex(state.focusedIndex));
    } else if (arrowDown) {
      e.preventDefault();
      focusListItem(getNextIndex(state.focusedIndex));
    }
  }

  function handleListItemClick(option) {
    select(option);
  }

  useEffect(() => {
    function handleBodyClick(e) {
      const {arterial} = e.target.dataset;
      if (!arterial || arterial !== arterialRef.current) {
        dispatch({type: types.DEACTIVATE, focused: false});
      }
    }
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  useEffect(() => {
    dispatch({type: types.SET_OPTIONS, options, searchOptions});
  }, [options, searchOptions]);

  useEffect(() => {
    dispatch({type: types.SEARCH, value, options});
  }, [options, value]);

  return (
    <div className={classes} data-arterial={arterialRef.current} style={style}>
      <MenuSurfaceAnchor data-arterial={arterialRef.current} ref={anchorRef}>
        <TextField
          {...otherProps}
          autoComplete="off"
          data-arterial={arterialRef.current}
          id={id}
          labelFloating={isLabelFloating}
          onChange={handleChange}
          onClick={handleClick}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          ref={textFieldRef}
          value={value}
        />
        <MenuSurface
          className="mdc-select__menu mdc-menu"
          anchorCorner={Corner.BOTTOM_LEFT}
          anchorRef={anchorRef}
          data-arterial={arterialRef.current}
          id={`${id}-menu`}
          open={state.activated}
          quickOpen
          style={getMenuStyle()}
        >
          <List
            data-arterial={arterialRef.current}
            id={`${id}-list`}
            role="listbox"
            twoLine={state.twoLine}
          >
            {Array.isArray(state.options) &&
              state.options.length > 0 &&
              state.options.map((option, index) => (
                <ListItem
                  aria-selected={index === state.focusedIndex}
                  data-arterial={arterialRef.current}
                  data-value={option.value}
                  disabled={option.disabled}
                  id={`${id}-list-item-${option.value}`}
                  key={option.value}
                  onClick={e => handleListItemClick(option)}
                  role="option"
                  selected={index === state.focusedIndex}
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
                        <Highlighter
                          highlight={highlight}
                          matches={state.matches[index]}
                          value={option.text}
                        />
                      </ListItemPrimaryText>
                      <ListItemSecondaryText title={option.secondaryText}>
                        <Highlighter
                          highlight={highlight}
                          matches={state.matches[index]}
                          value={option.secondaryText}
                        />
                      </ListItemSecondaryText>
                    </ListItemText>
                  ) : (
                    <ListItemText
                      data-arterial={arterialRef.current}
                      title={getText(option)}
                    >
                      <Highlighter
                        highlight={highlight}
                        matches={state.matches[index]}
                        value={option.text}
                      />
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
      </MenuSurfaceAnchor>
    </div>
  );
}
Typeahead.displayName = 'Typeahead';
Typeahead.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  labelFloating: PropTypes.bool,
  menuWidth: PropTypes.string,
  onChange: PropTypes.func,
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
  searchOptions: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
};
