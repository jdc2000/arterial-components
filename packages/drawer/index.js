import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CLOSE = 'CLOSE';
const CLOSING = 'CLOSING';
const DRAWER_CLASS = 'mdc-drawer';
const OPEN = 'OPEN';
const OPENING = 'OPENING';

const initialState = {
  isAnimate: false,
  isClosing: false,
  isOpen: false,
  isOpening: false
};

function reducer(state, action) {
  switch (action.type) {
    case CLOSE:
      return {
        ...state,
        isOpen: action.data,
        isOpening: false,
        isClosing: false,
        isAnimate: false
      };
    case CLOSING:
      return { ...state, isClosing: true };
    case OPEN:
      return { ...state, isOpen: true, isAnimate: true };
    case OPENING:
      return { ...state, isOpening: true };
    default:
      throw new Error();
  }
}

export function Drawer({
  children,
  className,
  dismissible,
  modal,
  onClose,
  open,
  tag = 'aside',
  ...otherProps
}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isOpen: open
  });

  const classes = classNames(DRAWER_CLASS, className, {
    'mdc-drawer--dismissible': dismissible,
    'mdc-drawer--modal': modal,
    'mdc-drawer--open': state.isOpen,
    'mdc-drawer--opening': state.isOpening,
    'mdc-drawer--closing': state.isClosing,
    'mdc-drawer--animate': state.isAnimate
  });
  const Tag = tag;

  function handleScrimClick() {
    if (onClose) {
      onClose();
    }
  }

  function handleTransitionEnd(e) {
    const element = e.target;
    if (isElement(element) && hasClass(element, DRAWER_CLASS)) {
      dispatch({ type: CLOSE, data: !state.isClosing });
    }
  }

  function isElement(element) {
    // In Edge, transitionend on ripple pseudo-elements yields a target without classList.
    return Boolean(element.classList);
  }

  function hasClass(element, className) {
    return element.classList.contains(className);
  }

  useEffect(() => {
    let animationFrame = 0;
    let animationTimer = 0;

    function runNextAnimationFrame(callback) {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;
        clearTimeout(animationTimer);
        animationTimer = setTimeout(callback, 0);
      });
    }

    if (open) {
      if (state.isOpen || state.isOpening || state.isClosing) {
        return;
      }
      dispatch({ type: OPEN });

      // Wait a frame once display is no longer "none", to establish basis for animation
      runNextAnimationFrame(() => {
        dispatch({ type: OPENING });
      });
    } else {
      if (!state.isOpen || state.isOpening || state.isClosing) {
        return;
      }
      dispatch({ type: CLOSING });
    }
  }, [open, state]);

  useEffect(() => {
    function handleEscape(e) {
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      if (onClose && isEscape) {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <>
      <Tag
        className={classes}
        onTransitionEnd={handleTransitionEnd}
        {...otherProps}
      >
        {children}
      </Tag>
      {modal && (
        <div className="mdc-drawer-scrim" onClick={handleScrimClick}></div>
      )}
    </>
  );
}

Drawer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  modal: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  tag: PropTypes.element
};

export { default as DrawerAppContent } from './AppContent';
export { default as DrawerContent } from './Content';
export { default as DrawerHeader } from './Header';
export { default as DrawerTitle } from './Title';
export { default as DrawerSubtitle } from './Subtitle';
