import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ACTION = 'action';
const DISMISS = 'dismiss';

const DEFAULT_AUTO_DISMISS_TIMEOUT_MS = 5000;
const INDETERMINATE = -1;
const SNACKBAR_ANIMATION_CLOSE_TIME_MS = 75;
const SNACKBAR_ANIMATION_OPEN_TIME_MS = 150;

const ANIMATION_TIMER_END = 'ANIMATION_TIMER_END';
const CLOSED = 'CLOSED';
const CLOSING = 'CLOSING';
const OPEN = 'OPEN';
const OPENING = 'OPENING';

const initialState = {
  isOpen: false,
  isOpening: false,
  isClosed: false,
  isClosing: false
};

function reducer(state, action) {
  switch (action.type) {
    case ANIMATION_TIMER_END:
      return { ...state, isClosing: false, isOpening: false };
    case CLOSED:
      return { ...state, isClosed: action.data };
    case CLOSING:
      return {
        ...state,
        isClosing: action.data,
        isOpen: !action.data,
        isOpening: !action.data
      };
    case OPEN:
      return { ...state, isOpen: action.data };
    case OPENING:
      return { ...state, isClosing: !action.data, isOpening: action.data };
    default:
      throw new Error();
  }
}

export function Snackbar({
  action,
  className,
  dismiss,
  label,
  leading,
  onClose,
  open,
  stacked,
  ...otherProps
}) {
  if (!label) {
    throw new Error('The `label` prop is required');
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = classNames('mdc-snackbar', className, {
    'mdc-snackbar--open': state.isOpen,
    'mdc-snackbar--opening': state.isOpening,
    'mdc-snackbar--closing': state.isClosing,
    'mdc-snackbar--leading': leading,
    'mdc-snackbar--stacked': stacked
  });

  function handleSelect(e, action) {
    const isClick = e.type === 'click';
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSelected = isClick || isEnter;

    if (onClose && isSelected) {
      onClose(action);
    }
  }

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e) {
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      if (state.isOpen && isEscape) {
        dispatch({ type: CLOSED, data: true });
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isOpen]);

  // Handle closed
  useEffect(() => {
    if (state.isClosed) {
      onClose(DISMISS);
      dispatch({ type: CLOSED, data: false });
    }
  }, [state.isClosed, onClose]);

  // Handle opening & closing
  useEffect(() => {
    let animationFrame = 0;
    let animationTimer = 0;
    let autoDismissTimer = 0;

    function openSnackbar() {
      clearAutoDismissTimer();
      dispatch({ type: OPENING, data: true });

      // Wait a frame once display is no longer "none", to establish basis for animation
      runNextAnimationFrame(() => {
        dispatch({ type: OPEN, data: true });

        animationTimer = setTimeout(() => {
          const timeoutMs = DEFAULT_AUTO_DISMISS_TIMEOUT_MS;
          handleAnimationTimerEnd();
          if (timeoutMs !== INDETERMINATE) {
            autoDismissTimer = setTimeout(() => {
              closeSnackbar(DISMISS);
            }, timeoutMs);
          }
        }, SNACKBAR_ANIMATION_OPEN_TIME_MS);
      });
    }

    function closeSnackbar(reason = '') {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      clearAutoDismissTimer();

      dispatch({ type: CLOSING, data: true });

      clearTimeout(animationTimer);
      animationTimer = setTimeout(() => {
        handleAnimationTimerEnd();
        dispatch({ type: CLOSED, data: reason });
      }, SNACKBAR_ANIMATION_CLOSE_TIME_MS);
    }

    function clearAutoDismissTimer() {
      clearTimeout(autoDismissTimer);
      autoDismissTimer = 0;
    }

    function handleAnimationTimerEnd() {
      animationTimer = 0;
      dispatch({ type: ANIMATION_TIMER_END });
    }

    // Runs the given logic on the next animation frame, using setTimeout to factor in Firefox reflow behavior.
    function runNextAnimationFrame(callback) {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;
        clearTimeout(animationTimer);
        animationTimer = setTimeout(callback, 0);
      });
    }

    if (open) {
      openSnackbar();
    } else {
      closeSnackbar();
    }

    return () => {
      clearAutoDismissTimer();
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      clearTimeout(animationTimer);
      animationTimer = 0;
    };
  }, [open]);

  return (
    <div className={classes} {...otherProps}>
      <div className="mdc-snackbar__surface">
        <div className="mdc-snackbar__label" role="status" aria-live="polite">
          {label}
        </div>

        <div className="mdc-snackbar__actions">
          {action && (
            <button
              className="mdc-button mdc-snackbar__action"
              onClick={e => handleSelect(e, ACTION)}
              onKeyDown={e => handleSelect(e, ACTION)}
              type="button"
            >
              <div className="mdc-button__ripple"></div>
              <span className="mdc-button__label">{action}</span>
            </button>
          )}
          {dismiss && (
            <button
              className="material-icons mdc-icon-button mdc-snackbar__dismiss"
              onClick={e => handleSelect(e, DISMISS)}
              onKeyDown={e => handleSelect(e, DISMISS)}
              title="Dismiss"
            >
              close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Snackbar.propTypes = {
  action: PropTypes.string,
  className: PropTypes.string,
  dismiss: PropTypes.bool,
  label: PropTypes.string,
  leading: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  stacked: PropTypes.bool
};
