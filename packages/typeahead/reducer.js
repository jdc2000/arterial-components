import Fuse from 'fuse.js';

function defaultSearchOptions() {
  return {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    includeMatches: true,
    threshold: 0.3,
    minMatchCharLength: 1,
  };
}

export const INITIAL_STATE = {
  activated: false,
  engine: null,
  focused: false,
  focusedIndex: 0,
  matches: [],
  options: [],
  twoLine: false,
};

export const types = {
  ACTIVATE: 'ACTIVATE',
  DEACTIVATE: 'DEACTIVATE',
  SEARCH: 'SEARCH',
  FOCUS_INDEX: 'FOCUS_INDEX',
  SET_OPTIONS: 'SET_OPTIONS',
};

export const actions = {
  [types.ACTIVATE]: (state, action) => {
    const {focused} = action;
    return {...state, activated: true, ...(focused != null && {focused})};
  },
  [types.DEACTIVATE]: (state, action) => {
    const {focused} = action;
    return {...state, activated: false, ...(focused != null && {focused})};
  },
  [types.FOCUS_INDEX]: (state, action) => {
    const {activated, focused, focusedIndex} = action;
    return {
      ...state,
      focusedIndex,
      ...(activated != null && {activated}),
      ...(focused != null && {focused}),
    };
  },
  [types.SEARCH]: (state, action) => {
    const value = action.value ? action.value.trim() : '';
    if (value.length > 0) {
      const options = [];
      const matches = [];
      const results = state.engine.search(action.value);
      for (const result of results) {
        if (isNaN(result.item)) options.push(result.item);
        matches.push(result.matches);
      }
      return {...state, options, matches};
    } else {
      return {...state, options: action.options, matches: []};
    }
  },
  [types.SET_OPTIONS]: (state, action) => {
    const {options, searchOptions} = action;
    const twoLine = options.some(option => option.secondaryText != null);
    const keys = [
      'text',
      'value',
      ...(searchOptions && Array.isArray(searchOptions.keys)
        ? searchOptions.keys
        : []),
    ];
    const engine = new Fuse(options, {
      ...defaultSearchOptions(),
      ...searchOptions,
      keys,
    });
    return {...state, options, engine, twoLine};
  },
};

export function reducer(state, action) {
  const applyAction = action.type ? actions[action.type] : null;
  if (!applyAction) throw new Error('Invalid action in reducer');
  return applyAction(state, action);
}
