import React, { useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DialogContext, DialogProvider } from './DialogContext';

const DIALOG_ANIMATION_CLOSE_TIME_MS = 75;
const DIALOG_ANIMATION_OPEN_TIME_MS = 150;
const SCROLL_LOCK = 'mdc-dialog-scroll-lock';

const ANIMATION_TIMER_END = 'ANIMATION_TIMER_END';
const CLOSE = 'CLOSE';
const OPEN = 'OPEN';
const OPENING = 'OPENING';

const initialState = {
  isAriaHidden: null,
  isClosing: false,
  isOpen: false,
  isOpening: false
};

function reducer(state, action) {
  switch (action.type) {
    case ANIMATION_TIMER_END:
      return { ...state, isOpening: false, isClosing: false };
    case CLOSE:
      document.body.classList.remove(SCROLL_LOCK);
      return { ...state, isOpen: false, isClosing: true, isAriaHidden: null };
    case OPEN:
      document.body.classList.add(SCROLL_LOCK);
      return { ...state, isOpen: true, isAriaHidden: true };
    case OPENING:
      return { ...state, isOpening: true };
    default:
      throw new Error();
  }
}

export function Dialog({
  children,
  className,
  onClose,
  open,
  scrollable,
  stacked,
  tag = 'div',
  ...otherProps
}) {
  const dialogContext = useContext(DialogContext);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isOpen: open
  });

  const classes = classNames('mdc-dialog', className, {
    'mdc-dialog--open': state.isOpen,
    'mdc-dialog--opening': state.isOpening,
    'mdc-dialog--closing': state.isClosing,
    'mdc-dialog--scrollable': scrollable,
    'mdc-dialog--stacked': stacked
  });
  const ariaProps = {
    'aria-hidden': state.isAriaHidden
  };

  function handleScrimClick() {
    if (onClose) {
      onClose('close');
    }
  }

  useEffect(() => {
    let animationTimer = 0;
    let animationFrame = 0;
    let layoutFrame = 0;

    function runNextAnimationFrame(callback) {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;
        clearTimeout(animationTimer);
        animationTimer = setTimeout(callback, 0);
      });
    }

    function handleAnimationTimerEnd() {
      animationTimer = 0;
      dispatch({ type: ANIMATION_TIMER_END });
    }

    function layout() {
      if (layoutFrame) {
        cancelAnimationFrame(layoutFrame);
      }
      layoutFrame = requestAnimationFrame(() => {
        layoutFrame = 0;
      });
    }

    if (open) {
      dispatch({ type: OPENING });

      runNextAnimationFrame(() => {
        dispatch({ type: OPEN });

        layout();
        animationTimer = setTimeout(() => {
          handleAnimationTimerEnd();
        }, DIALOG_ANIMATION_OPEN_TIME_MS);
      });
    } else {
      dispatch({ type: CLOSE });

      cancelAnimationFrame(animationFrame);
      animationFrame = 0;

      clearTimeout(animationTimer);
      animationTimer = setTimeout(() => {
        handleAnimationTimerEnd();
      }, DIALOG_ANIMATION_CLOSE_TIME_MS);
    }

    return () => {
      if (animationTimer) {
        clearTimeout(animationTimer);
        handleAnimationTimerEnd();
      }

      if (layoutFrame) {
        cancelAnimationFrame(layoutFrame);
        layoutFrame = 0;
      }
    };
  }, [open]);

  return (
    <DialogProvider>
      <div className={classes} {...otherProps} {...ariaProps}>
        <div className="mdc-dialog__container">
          <div
            className="mdc-dialog__surface"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={dialogContext.titleId}
            aria-describedby={dialogContext.contentId}
          >
            {children}
          </div>
        </div>
        <div className="mdc-dialog__scrim" onClick={handleScrimClick}></div>
      </div>
    </DialogProvider>
  );
}

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  scrollable: PropTypes.bool,
  stacked: PropTypes.bool,
  tag: PropTypes.element
};

export { default as DialogActions } from './DialogActions';
export { default as DialogButton } from './DialogButton';
export { default as DialogContent } from './DialogContent';
export { default as DialogTitle } from './DialogTitle';

export { default as AlertDialog } from './AlertDialog';
export { default as ConfirmationDialog } from './ConfirmationDialog';
export { default as SimpleDialog } from './SimpleDialog';
