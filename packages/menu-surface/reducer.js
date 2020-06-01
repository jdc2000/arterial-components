export const INITIAL_STATE = {
  isAnimatingClosed: false,
  isAnimatingOpen: false,
  isOpen: false,
  isOpenBelow: false,
  style: {}
};

export const types = {
  ANIMATING_CLOSED: 'ANIMATING_CLOSED',
  ANIMATING_OPEN: 'ANIMATING_OPEN',
  CLOSE: 'CLOSE',
  OPEN: 'OPEN',
  OPEN_BELOW: 'OPEN_BELOW',
  STYLE: 'STYLE'
};

export const actions = {
  [types.ANIMATING_CLOSED]: (state, action) => {
    return { ...state, isAnimatingClosed: action.isAnimatingClosed };
  },
  [types.ANIMATING_OPEN]: (state, action) => {
    return { ...state, isAnimatingOpen: action.isAnimatingOpen };
  },
  [types.CLOSE]: (state, action) => {
    return { ...state, isOpen: false, isOpenBelow: false };
  },
  [types.OPEN]: (state, action) => {
    return { ...state, isOpen: true };
  },
  [types.OPEN_BELOW]: (state, action) => {
    return { ...state, isOpenBelow: true };
  },
  [types.STYLE]: (state, action) => {
    return { ...state, style: action.style };
  }
};

export function reducer(state, action) {
  const applyAction = action.type ? actions[action.type] : null;
  if (!applyAction) throw new Error('Invalid action in reducer');
  return applyAction(state, action);
}
