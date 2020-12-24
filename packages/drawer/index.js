import {cssClasses} from '@material/drawer';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

export function Drawer({
  children,
  className,
  dismissible,
  modal,
  onClose,
  open,
  tag: Tag = 'aside',
  ...otherProps
}) {
  const [isAnimate, setIsAnimate] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const classes = classNames(cssClasses.ROOT, className, {
    'mdc-drawer--dismissible': dismissible,
    'mdc-drawer--modal': modal,
    'mdc-drawer--open': isOpen,
    'mdc-drawer--opening': isOpening,
    'mdc-drawer--closing': isClosing,
    'mdc-drawer--animate': isAnimate,
  });

  function handleScrimClick() {
    if (onClose) onClose();
  }

  function handleTransitionEnd(e) {
    const element = e.target;
    if (isElement(element) && hasClass(element, cssClasses.ROOT)) {
      setIsOpen(!isClosing);
      setIsOpening(false);
      setIsClosing(false);
      setIsAnimate(false);
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
      if (isOpen || isOpening || isClosing) return;
      setIsOpen(true);
      setIsAnimate(true);

      // Wait a frame once display is no longer "none", to establish basis for animation
      runNextAnimationFrame(() => {
        setIsOpening(true);
      });
    } else {
      if (!isOpen || isOpening || isClosing) return;
      setIsClosing(true);
    }
  }, [isClosing, isOpen, isOpening, open]);

  useEffect(() => {
    function handleEscape(e) {
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      if (onClose && isEscape) onClose();
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
Drawer.displayName = 'Drawer';
Drawer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  modal: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export {DrawerAppContent} from './DrawerAppContent';
export {DrawerContent} from './DrawerContent';
export {DrawerHeader} from './DrawerHeader';
export {DrawerTitle} from './DrawerTitle';
export {DrawerSubtitle} from './DrawerSubtitle';
