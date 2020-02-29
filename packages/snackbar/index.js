import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ACTION = 'action',
  DISMISS = 'dismiss';

export function Snackbar({
  action,
  className,
  dismiss,
  label,
  leading,
  onClose,
  open,
  stacked
}) {
  if (!label) {
    throw new Error('The `label` prop is required');
  }

  const [isOpen, setIsOpen] = useState(open);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosed, setIsClosed] = useState(!open);
  const [isClosing, setIsClosing] = useState(false);
  const classes = classNames('mdc-snackbar', className, {
    'mdc-snackbar--open': isOpen,
    'mdc-snackbar--opening': isOpening,
    'mdc-snackbar--closing': isClosing,
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
      if (isOpen && isEscape) {
        setIsClosed(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Handle closed
  useEffect(() => {
    if (isClosed) {
      onClose(DISMISS);
      setIsClosed(false);
    }
  }, [isClosed, onClose]);

  // Handle opening & closing
  useEffect(() => {
    const DEFAULT_AUTO_DISMISS_TIMEOUT_MS = 5000,
      INDETERMINATE = -1,
      SNACKBAR_ANIMATION_CLOSE_TIME_MS = 75,
      SNACKBAR_ANIMATION_OPEN_TIME_MS = 150;

    let animationFrame = 0,
      animationTimer = 0,
      autoDismissTimer = 0;

    function openSnackbar() {
      clearAutoDismissTimer();
      setIsClosing(false);
      setIsOpening(true);

      // Wait a frame once display is no longer "none", to establish basis for animation
      runNextAnimationFrame(() => {
        setIsOpen(true);

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

      setIsClosing(true);
      setIsOpen(false);
      setIsOpening(false);

      clearTimeout(animationTimer);
      animationTimer = setTimeout(() => {
        handleAnimationTimerEnd();
        setIsClosed(reason);
      }, SNACKBAR_ANIMATION_CLOSE_TIME_MS);
    }

    function clearAutoDismissTimer() {
      clearTimeout(autoDismissTimer);
      autoDismissTimer = 0;
    }

    function handleAnimationTimerEnd() {
      animationTimer = 0;
      setIsOpening(false);
      setIsClosing(false);
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
    <div className={classes}>
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
