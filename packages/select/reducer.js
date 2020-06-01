export const INITIAL_STATE = {
  activated: false,
  focused: false,
  focusedKey: null,
  options: new Map(),
  selected: {}
};

export const types = {
  FOCUSED: 'FOCUSED',
  SET_ACTIVATED: 'SET_ACTIVATED',
  SET_FOCUSED: 'SET_FOCUSED',
  SET_FOCUSED_KEY: 'SET_FOCUSED_KEY',
  SET_OPTIONS: 'SET_OPTIONS',
  SET_SELECTED: 'SET_SELECTED'
};

export const actions = {
  [types.FOCUSED]: (state, action) => {
    return { ...state, focused: true };
  },
  [types.SET_ACTIVATED]: (state, action) => {
    const { activated, focused } = action;
    return {
      ...state,
      ...(activated != null && { activated }),
      ...(focused != null && { focused }),
      focusedKey: state.selected.value
    };
  },
  [types.SET_FOCUSED_KEY]: (state, action) => {
    return { ...state, focusedKey: action.focusedKey };
  },
  [types.SET_OPTIONS]: (state, action) => {
    const options = new Map();
    for (let i = 0; i < action.options.length; i++) {
      options.set(action.options[i].value, { ...action.options[i], index: i });
    }
    return { ...state, options };
  },
  [types.SET_SELECTED]: (state, action) => {
    const selected = state.options.get(action.value) || {};
    return {
      ...state,
      activated: false,
      focusedKey: selected.value,
      selected
    };
  }
};

export function reducer(state, action) {
  const applyAction = action.type ? actions[action.type] : null;
  if (!applyAction) throw new Error('Invalid action in reducer');
  return applyAction(state, action);
}
