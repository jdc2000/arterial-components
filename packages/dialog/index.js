import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withDialogContext, DialogProvider } from './DialogContext';

function Dialog({
  children,
  className,
  dialogContext,
  onClose,
  open,
  scrollable,
  stacked,
  tag = 'div',
  ...otherProps
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [ariaHidden, setAriaHidden] = useState(null);
  const classes = classNames('mdc-dialog', className, {
    'mdc-dialog--open': isOpen,
    'mdc-dialog--opening': isOpening,
    'mdc-dialog--closing': isClosing,
    'mdc-dialog--scrollable': scrollable,
    'mdc-dialog--stacked': stacked
  });
  const ariaProps = {
    'aria-hidden': ariaHidden
  };

  function handleScrimClick() {
    if (onClose) {
      return onClose('close');
    }
  }

  useEffect(() => {
    const DIALOG_ANIMATION_CLOSE_TIME_MS = 75;
    const DIALOG_ANIMATION_OPEN_TIME_MS = 150;
    const SCROLL_LOCK = 'mdc-dialog-scroll-lock';
    let animationTimer = 0,
      animationFrame = 0,
      layoutFrame = 0;
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
      setIsOpening(false);
      setIsClosing(false);
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
      setIsOpening(true);

      runNextAnimationFrame(() => {
        setIsOpen(true);
        setAriaHidden(true);
        document.body.classList.add(SCROLL_LOCK);

        layout();

        animationTimer = setTimeout(() => {
          handleAnimationTimerEnd();
        }, DIALOG_ANIMATION_OPEN_TIME_MS);
      });
    } else {
      setIsOpen(false);
      setIsClosing(true);
      setAriaHidden(null);
      document.body.classList.remove(SCROLL_LOCK);

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
        <DialogContainer>{children}</DialogContainer>
        <div className="mdc-dialog__scrim" onClick={handleScrimClick}></div>
      </div>
    </DialogProvider>
  );
}

const DialogContainer = withDialogContext(({ children, dialogContext }) => (
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
));

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dialogContext: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  scrollable: PropTypes.bool,
  stacked: PropTypes.bool,
  tag: PropTypes.element
};

export { Dialog };
export { default as DialogActions } from './DialogActions';
export { default as DialogButton } from './DialogButton';
export { default as DialogContent } from './DialogContent';
export { default as DialogTitle } from './DialogTitle';

export { default as AlertDialog } from './AlertDialog';
export { default as ConfirmationDialog } from './ConfirmationDialog';
export { default as SimpleDialog } from './SimpleDialog';
