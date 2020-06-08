import React, { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import { List, ListItem, ListItemText } from '@arterial/list';
import { MenuSurface, MenuSurfaceAnchor, Corner } from '@arterial/menu-surface';
import { TextField } from '@arterial/textfield';
import Highlighter from './Highlighter';

const DEFAULT_OPTIONS = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  includeMatches: true,
  threshold: 0.3,
  minMatchCharLength: 1
};

const ENGINE = 'ENGINE';
const MENU_STYLE = 'MENU_STYLE';
const SEARCH = 'SEARCH';

const initialState = {
  engine: null,
  list: [],
  matches: [],
  menuStyle: null
};

function reducer(state, action) {
  switch (action.type) {
    case ENGINE:
      return { ...state, engine: action.data };
    case MENU_STYLE:
      return { ...state, menuStyle: action.data };
    case SEARCH:
      return { ...state, list: action.data.list, matches: action.data.matches };
    default:
      throw new Error();
  }
}

export function Typeahead({
  className,
  filterBy,
  highlight,
  list = [],
  onBodyClick,
  onSelect,
  onWindowKeyDown,
  options, // options for fuse.js
  renderListItemChildren,
  // textfield props
  helperText,
  icon,
  invalid,
  focused,
  fullWidth,
  label,
  labelClassName,
  outlined,
  trailingIcon,
  textfieldProps = {}, // equivalent to rootProps in textfield component
  // input props
  disabled,
  id,
  maxLength,
  onBlur,
  onChange,
  onFocus,
  required,
  value,
  inputProps = {}, // equivalent to otherProps for native input
  // menu-surface props
  anchorCorner = Corner.BOTTOM_LEFT,
  anchorMargin,
  direction,
  fixed,
  menuWidth = 'auto', // set width of menu surface. 'auto' sets width to textfield width
  open,
  // list props
  avatarList,
  dense,
  nonInteractive,
  twoLine,
  listProps = {}, // equivalent to otherProps in list component
  tag = 'div',
  ...otherProps
}) {
  const anchorEl = useRef();
  const textfieldEl = useRef();
  const [state, dispatch] = useReducer(reducer, { ...initialState, list });

  const classes = classNames('art-typeahead', className);
  const Tag = tag;

  function handleClick(item, index) {
    onSelect(item, index);
  }

  function handleKeyDown(e, item, index) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onSelect(item, index);
    }
  }

  function renderListItems(item, index) {
    if (typeof item !== 'string' && !renderListItemChildren) {
      throw new Error(
        'You must use `renderListItemChildren` when `list` is NOT an array of strings'
      );
    }
    const id = `art-typeahead-menu-item-${index}`;
    return (
      <ListItem
        id={id}
        key={id}
        onClick={() => handleClick(item, index)}
        onKeyDown={e => handleKeyDown(e, item, index)}
        tabIndex="0"
      >
        {renderListItemChildren
          ? renderListItemChildren(item, state.matches, index)
          : renderListItemText(item, index)}
      </ListItem>
    );
  }

  function renderListItemText(item, index) {
    return (
      <ListItemText>
        {highlight ? (
          <Highlighter item={item} matches={state.matches[index]} />
        ) : (
          item
        )}
      </ListItemText>
    );
  }

  useEffect(() => {
    dispatch({
      type: ENGINE,
      data: new Fuse(list, {
        ...DEFAULT_OPTIONS,
        ...options,
        keys: filterBy
      })
    });
  }, [filterBy, list, options]);

  useEffect(() => {
    if (value && value.trim().length > 0) {
      const results = state.engine.search(value.trim());
      const newList = [],
        newMatches = [];
      for (const r of results) {
        newList.push(isNaN(r.item) ? r.item : list[r.item]);
        newMatches.push(r.matches);
      }
      dispatch({ type: SEARCH, data: { list: newList, matches: newMatches } });
    } else {
      dispatch({ type: SEARCH, data: { list, matches: [] } });
    }
  }, [state.engine, list, value]);

  useEffect(() => {
    const el = textfieldEl.current;
    if (el) {
      const isAuto = menuWidth === 'auto';
      dispatch({
        type: MENU_STYLE,
        data: { width: isAuto ? el.clientWidth : menuWidth }
      });
    }
  }, [menuWidth, textfieldEl]);

  useEffect(() => {
    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, [onBodyClick]);

  useEffect(() => {
    window.addEventListener('keydown', onWindowKeyDown);
    return () => {
      window.removeEventListener('keydown', onWindowKeyDown);
    };
  }, [onWindowKeyDown]);

  return (
    <Tag className={classes} {...otherProps}>
      <MenuSurfaceAnchor ref={anchorEl}>
        <TextField
          autoComplete="off"
          disabled={disabled}
          helperText={helperText}
          icon={icon}
          id={id}
          invalid={invalid}
          label={label}
          labelClassName={labelClassName}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          outlined={outlined}
          required={required}
          rootProps={{
            ...textfieldProps,
            ref: textfieldEl
          }}
          trailingIcon={trailingIcon}
          value={value}
          {...inputProps}
        />
        <MenuSurface
          anchorCorner={anchorCorner}
          anchorElement={anchorEl}
          open={open}
          quickOpen={!open}
          style={state.menuStyle}
          tabIndex="-1"
        >
          <List
            {...listProps}
            avatarList={avatarList}
            dense={dense}
            nonInteractive={nonInteractive}
            tabIndex="-1"
            twoLine={twoLine}
          >
            {state.list.map(renderListItems)}
          </List>
        </MenuSurface>
      </MenuSurfaceAnchor>
    </Tag>
  );
}

Typeahead.propTypes = {
  className: PropTypes.string,
  filterBy: PropTypes.arrayOf(PropTypes.string),
  highlight: PropTypes.bool,
  list: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  onBodyClick: PropTypes.func,
  onSelect: PropTypes.func,
  onWindowKeyDown: PropTypes.func,
  options: PropTypes.object, // options for fuse.js
  renderListItemChildren: PropTypes.func,
  // textfield props
  helperText: PropTypes.element,
  icon: PropTypes.element,
  invalid: PropTypes.bool,
  focused: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  outlined: PropTypes.bool,
  trailingIcon: PropTypes.element,
  textfieldProps: PropTypes.object, // equivalent to rootProps in textfield component
  // input props
  disabled: PropTypes.bool,
  id: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
  inputProps: PropTypes.object, // equivalent to otherProps in textfield component
  // menu-surface props
  anchorCorner: PropTypes.number,
  anchorMargin: PropTypes.object,
  direction: PropTypes.string,
  fixed: PropTypes.bool,
  menuWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // set width of menu surface. 'auto' sets width to textfield width
  open: PropTypes.bool,
  // list props
  avatarList: PropTypes.bool,
  dense: PropTypes.bool,
  nonInteractive: PropTypes.bool,
  twoLine: PropTypes.bool,
  listProps: PropTypes.object, // equivalent to otherProps in list component
  tag: PropTypes.element
};

export { Highlighter };
