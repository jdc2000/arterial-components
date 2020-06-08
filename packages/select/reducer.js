export const INITIAL_STATE = {
  activated: false,
  focused: false,
  focusedIndex: 0,
  selectedIndex: -1,
  twoLine: false
};

export const types = {
  ACTIVATE: 'ACTIVATE',
  DEACTIVATE: 'DEACTIVATE',
  FOCUS: 'FOCUS',
  FOCUS_INDEX: 'FOCUS_INDEX',
  SELECT_INDEX: 'SELECT_INDEX'
};

export const actions = {
  [types.ACTIVATE]: (state, action) => {
    const { focused, focusedIndex } = action;
    return {
      ...state,
      activated: true,
      ...(focused != null && { focused }),
      ...(focusedIndex != null && { focusedIndex })
    };
  },
  [types.DEACTIVATE]: (state, action) => {
    const { focused } = action;
    return { ...state, activated: false, ...(focused != null && { focused }) };
  },
  [types.FOCUS]: (state, action) => {
    return { ...state, focused: true };
  },
  [types.FOCUS_INDEX]: (state, action) => {
    return { ...state, focusedIndex: action.focusedIndex };
  },
  [types.SELECT_INDEX]: (state, action) => {
    return {
      ...state,
      activated: false,
      focusedIndex: action.selectedIndex,
      selectedIndex: action.selectedIndex
    };
  }
};

export function reducer(state, action) {
  const applyAction = action.type ? actions[action.type] : null;
  if (!applyAction) throw new Error('Invalid action in reducer');
  return applyAction(state, action);
}
