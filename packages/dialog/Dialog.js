import {cssClasses, numbers} from '@material/dialog';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useContext, useEffect, useState} from 'react';
import {DialogContext, DialogProvider} from './DialogContext';

function DialogBase({
  children,
  className,
  onClose,
  open,
  scrollable,
  stacked,
  tag: Tag = 'div',
  ...otherProps
}) {
  const dialogContext = useContext(DialogContext);
  const [isAriaHidden, setIsAriaHidden] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const classes = classNames('mdc-dialog', className, {
    'mdc-dialog--open': isOpen,
    'mdc-dialog--opening': isOpening,
    'mdc-dialog--closing': isClosing,
    'mdc-dialog--scrollable': scrollable,
    'mdc-dialog--stacked': stacked,
  });
  const ariaProps = {
    'aria-hidden': isAriaHidden,
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
        document.body.classList.add(cssClasses.SCROLL_LOCK);
        setIsOpen(true);
        setIsAriaHidden(true);

        layout();
        animationTimer = setTimeout(() => {
          handleAnimationTimerEnd();
        }, numbers.DIALOG_ANIMATION_OPEN_TIME_MS);
      });
    } else {
      document.body.classList.remove(cssClasses.SCROLL_LOCK);
      setIsOpen(false);
      setIsOpening(false);
      setIsAriaHidden(false);

      cancelAnimationFrame(animationFrame);
      animationFrame = 0;

      clearTimeout(animationTimer);
      animationTimer = setTimeout(() => {
        handleAnimationTimerEnd();
      }, numbers.DIALOG_ANIMATION_CLOSE_TIME_MS);
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
      document.body.classList.remove(cssClasses.SCROLL_LOCK);
    };
  }, [open]);

  return (
    <Tag className={classes} {...otherProps} {...ariaProps}>
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
    </Tag>
  );
}

export function Dialog(props) {
  return (
    <DialogProvider>
      <DialogBase {...props} />
    </DialogProvider>
  );
}
Dialog.displayName = 'Dialog';
Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  scrollable: PropTypes.bool,
  stacked: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
