import React, { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DEBOUNCE_THROTTLE_RESIZE_TIME_MS = 100;
const INITIAL_VALUE = 0;
const MAX_TOP_APP_BAR_HEIGHT = 128;

const FIXED_SCROLL = 'FIXED_SCROLL';
const SHORT_SCROLL = 'SHORT_SCROLL';
const STANDARD_SCROLL = 'STANDARD_SCROLL';
const MOUNT = 'MOUNT';
const WINDOW_RESIZE = 'WINDOW_RESIZE';

const initialState = {
  wasDocked: true,
  isDockedShowing: true,
  currentAppBarOffsetTop: INITIAL_VALUE,
  lastScrollPosition: null,
  topAppBarHeight: null,
  isCollapsed: false,
  wasScrolled: false,
  styleTop: null
};

function mount(state, topAppBarEl) {
  return {
    ...state,
    lastScrollPosition: getViewportScrollY(state.scrollTarget),
    topAppBarHeight: getTopAppBarHeight(topAppBarEl),
    topAppBarEl
  };
}

function getViewportScrollY(scrollTarget) {
  return scrollTarget && scrollTarget.current
    ? scrollTarget.current.scrollTop
    : window.pageYOffset;
}

function getTopAppBarHeight(topAppBarEl) {
  return topAppBarEl && topAppBarEl.current
    ? topAppBarEl.current.clientHeight
    : 0;
}

function handleStandardScroll(state) {
  let scrollTarget = state.scrollTarget;
  let lastScrollPosition = state.lastScrollPosition;
  let currentAppBarOffsetTop = state.currentAppBarOffsetTop;
  let topAppBarHeight = state.topAppBarHeight;
  const currentScrollPosition = Math.max(getViewportScrollY(scrollTarget), 0);
  const diff = currentScrollPosition - lastScrollPosition;
  lastScrollPosition = currentScrollPosition;

  // If the window is being resized the lastScrollPosition_ needs to be updated but the
  // current scroll of the top app bar should stay in the same position.
  if (!state.isCurrentlyBeingResizedRef.current) {
    currentAppBarOffsetTop -= diff;

    if (currentAppBarOffsetTop > 0) {
      currentAppBarOffsetTop = 0;
    } else if (Math.abs(currentAppBarOffsetTop) > topAppBarHeight) {
      currentAppBarOffsetTop = -topAppBarHeight;
    }

    return moveTopAppBar({
      ...state,
      lastScrollPosition,
      currentAppBarOffsetTop,
      topAppBarHeight
    });
  }
  return {
    ...state,
    lastScrollPosition,
    currentAppBarOffsetTop,
    topAppBarHeight
  };
}

function moveTopAppBar(state) {
  let topAppBarHeight = state.topAppBarHeight;
  let currentAppBarOffsetTop = state.currentAppBarOffsetTop;
  let wasDocked = state.wasDocked;
  let isDockedShowing = state.isDockedShowing;
  let styleTop = state.styleTop;
  let isUpdate = false;
  const offscreenBoundaryTop = -topAppBarHeight;
  const hasAnyPixelsOffscreen = currentAppBarOffsetTop < 0;
  const hasAnyPixelsOnscreen = currentAppBarOffsetTop > offscreenBoundaryTop;
  const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;

  // If it's partially showing, it can't be docked.
  if (partiallyShowing) {
    wasDocked = false;
  } else {
    // Not previously docked and not partially showing, it's now docked.
    if (!wasDocked) {
      wasDocked = true;
      isUpdate = true;
    } else if (isDockedShowing !== hasAnyPixelsOnscreen) {
      isDockedShowing = hasAnyPixelsOnscreen;
      isUpdate = true;
    }
  }

  if (isUpdate || Boolean(partiallyShowing)) {
    // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
    // so the top app bar doesn't show if the window resizes and the new height > the old height.
    if (Math.abs(currentAppBarOffsetTop) >= topAppBarHeight) {
      currentAppBarOffsetTop = -MAX_TOP_APP_BAR_HEIGHT;
    }

    styleTop = { top: currentAppBarOffsetTop + 'px' };
  }

  return {
    ...state,
    topAppBarHeight,
    currentAppBarOffsetTop,
    wasDocked,
    isDockedShowing,
    styleTop
  };
}

function handleWindowResize(currentState) {
  let state = currentState;
  // Throttle resize events 10 p/s
  if (!state.resizeThrottleIdRef.current) {
    state.resizeThrottleIdRef.current = setTimeout(() => {
      state.resizeThrottleIdRef.current = INITIAL_VALUE;
      throttledResizeHandler(state);
    }, DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  }

  state.isCurrentlyBeingResizedRef.current = true;

  if (state.resizeDebounceIdRef.current) {
    clearTimeout(state.resizeDebounceIdRef.current);
  }

  state.resizeDebounceIdRef.current = setTimeout(() => {
    handleStandardScroll(state);
    state.isCurrentlyBeingResizedRef.current = false;
    state.resizeDebounceIdRef.current = INITIAL_VALUE;
  }, DEBOUNCE_THROTTLE_RESIZE_TIME_MS);

  return state;
}

function throttledResizeHandler(state) {
  const currentHeight = getTopAppBarHeight(state.topAppBarEl);
  let topAppBarHeight = state.topAppBarHeight;
  let wasDocked = state.wasDocked;
  let currentAppBarOffsetTop = state.currentAppBarOffsetTop;
  if (topAppBarHeight !== currentHeight) {
    wasDocked = false;

    // Since the top app bar has a different height depending on the screen width, this
    // will ensure that the top app bar remains in the correct location if
    // completely hidden and a resize makes the top app bar a different height.
    currentAppBarOffsetTop -= topAppBarHeight - currentHeight;
    topAppBarHeight = currentHeight;
  }
  return handleStandardScroll({
    ...state,
    topAppBarHeight,
    wasDocked,
    currentAppBarOffsetTop
  });
}

function handleShortScroll(state) {
  const currentScroll = getViewportScrollY(state.scrollTarget);
  let shortCollapsed = state.shortCollapsed;
  let isCollapsed = state.isCollapsed;
  if (shortCollapsed) {
    return state;
  }
  if (currentScroll <= 0) {
    if (isCollapsed) {
      isCollapsed = false;
    }
  } else {
    if (!isCollapsed) {
      isCollapsed = true;
    }
  }
  return { ...state, isCollapsed };
}

function handleFixedScroll(state) {
  const currentScroll = getViewportScrollY(state.scrollTarget);
  let wasScrolled = state.wasScrolled;
  if (currentScroll <= 0) {
    if (wasScrolled) {
      wasScrolled = false;
    }
  } else {
    if (!wasScrolled) {
      wasScrolled = true;
    }
  }
  return { ...state, wasScrolled };
}

function reducer(state, action) {
  switch (action.type) {
    case FIXED_SCROLL:
      return handleFixedScroll(state);
    case SHORT_SCROLL:
      return handleShortScroll(state);
    case STANDARD_SCROLL:
      return handleStandardScroll(state);
    case MOUNT:
      return mount(state, action.data);
    case WINDOW_RESIZE:
      return handleWindowResize(state);
    default:
      throw new Error();
  }
}

export function TopAppBar({
  children,
  className,
  dense,
  fixed,
  prominent,
  scrollTarget = window,
  short,
  shortCollapsed,
  shortHasActionItem,
  style,
  tag = 'header',
  ...otherProps
}) {
  const topAppBarEl = useRef();
  const isCurrentlyBeingResizedRef = useRef(false);
  const resizeThrottleIdRef = useRef(INITIAL_VALUE);
  const resizeDebounceIdRef = useRef(INITIAL_VALUE);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    dense,
    fixed,
    prominent,
    short,
    shortCollapsed,
    scrollTarget,
    topAppBarEl,
    isCurrentlyBeingResizedRef,
    resizeThrottleIdRef,
    resizeDebounceIdRef
  });

  const classes = classNames('mdc-top-app-bar', className, {
    'mdc-top-app-bar--dense': state.dense,
    'mdc-top-app-bar--fixed': state.fixed,
    'mdc-top-app-bar--fixed-scrolled': state.wasScrolled,
    'mdc-top-app-bar--prominent': state.prominent,
    'mdc-top-app-bar--short': state.short,
    'mdc-top-app-bar--short-collapsed':
      state.shortCollapsed || state.isCollapsed,
    'mdc-top-app-bar--short-has-action-item': shortHasActionItem
  });
  const Tag = tag;

  useEffect(() => {
    dispatch({ type: MOUNT, data: topAppBarEl });
  }, [topAppBarEl]);

  useEffect(() => {
    const standard = !state.short && !state.fixed;
    let handleWindowResize = () => dispatch({ type: WINDOW_RESIZE });
    let handleTargetScroll = () => dispatch({ type: STANDARD_SCROLL });
    if (state.short) {
      handleTargetScroll = () => dispatch({ type: SHORT_SCROLL });
    } else if (state.fixed) {
      handleTargetScroll = () => dispatch({ type: FIXED_SCROLL });
    }

    state.scrollTarget.addEventListener('scroll', handleTargetScroll);
    if (standard) {
      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      state.scrollTarget.removeEventListener('scroll', handleTargetScroll);
      if (standard) {
        window.removeEventListener('resize', handleWindowResize);
      }
    };
  }, [state]);

  return (
    <Tag
      className={classes}
      ref={topAppBarEl}
      style={{ ...style, ...state.styleTop }}
      {...otherProps}
    >
      {children}
    </Tag>
  );
}

TopAppBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dense: PropTypes.bool,
  fixed: PropTypes.bool,
  prominent: PropTypes.bool,
  scrollTarget: PropTypes.element,
  short: PropTypes.bool,
  shortCollapsed: PropTypes.bool,
  shortHasActionItem: PropTypes.bool,
  style: PropTypes.object,
  tag: PropTypes.element
};

export { default as TopAppBarFixedAdjust } from './FixedAdjust';
export { default as TopAppBarIcon } from './Icon';
export { default as TopAppBarRow } from './Row';
export { default as TopAppBarSection } from './Section';
export { default as TopAppBarTitle } from './Title';
