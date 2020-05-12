export const INITIAL_STATE = {
  activated: false,
  focused: false,
  focusedIndex: 0,
  selectedIndex: -1
};

export const types = {
  SET_ACTIVATED: 'SET_ACTIVATED',
  SET_FOCUSED: 'SET_FOCUSED',
  SET_FOCUSED_INDEX: 'SET_FOCUSED_INDEX',
  SET_SELECTED_INDEX: 'SET_SELECTED_INDEX'
};

export const actions = {
  [types.SET_ACTIVATED]: (state, action) => {
    return {
      ...state,
      activated: action.activated,
      focused: action.focused,
      focusedIndex: action.focusedIndex
    };
  },
  [types.SET_FOCUSED]: (state, action) => {
    return { ...state, focused: action.focused };
  },
  [types.SET_FOCUSED_INDEX]: (state, action) => {
    return { ...state, focusedIndex: action.focusedIndex };
  },
  [types.SET_SELECTED_INDEX]: (state, action) => {
    return {
      ...state,
      activated: action.activated,
      focused: action.focused,
      focusedIndex: action.selectedIndex,
      selectedIndex: action.selectedIndex
    };
  }
};

export function reducer(state, action) {
  const apply = actions[action.type];
  if (!action.type || !apply)
    throw new Error('Action type does not exist in reducer.');
  return apply(state, action);
}
