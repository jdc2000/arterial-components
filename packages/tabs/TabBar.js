import {numbers, strings} from '@material/tab-bar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Children, cloneElement, useRef, useEffect, useState} from 'react';
import {TabScroller} from './TabScroller';

const ACCEPTABLE_KEYS = new Set();
// IE11 has no support for new Set with iterable so we need to initialize this by hand
ACCEPTABLE_KEYS.add(strings.ARROW_LEFT_KEY);
ACCEPTABLE_KEYS.add(strings.ARROW_RIGHT_KEY);
ACCEPTABLE_KEYS.add(strings.END_KEY);
ACCEPTABLE_KEYS.add(strings.HOME_KEY);
ACCEPTABLE_KEYS.add(strings.ENTER_KEY);
ACCEPTABLE_KEYS.add(strings.SPACE_KEY);

const KEYCODE_MAP = new Map();
// IE11 has no support for new Map with iterable so we need to initialize this by hand
KEYCODE_MAP.set(numbers.ARROW_LEFT_KEYCODE, strings.ARROW_LEFT_KEY);
KEYCODE_MAP.set(numbers.ARROW_RIGHT_KEYCODE, strings.ARROW_RIGHT_KEY);
KEYCODE_MAP.set(numbers.END_KEYCODE, strings.END_KEY);
KEYCODE_MAP.set(numbers.HOME_KEYCODE, strings.HOME_KEY);
KEYCODE_MAP.set(numbers.ENTER_KEYCODE, strings.ENTER_KEY);
KEYCODE_MAP.set(numbers.SPACE_KEYCODE, strings.SPACE_KEY);

export function TabBar({
  activeIndex,
  children,
  className,
  dir,
  handleActiveIndexUpdate,
  onKeyDown,
  scroll,
  tag: Tag = 'div',
  ...otherProps
}) {
  const tabBarRef = useRef();
  const tabScrollerRef = useRef();
  const tabScrollerAreaRef = useRef();
  const tabScrollerContentRef = useRef();
  const tabsRef = useRef(new Map());

  const [currentActiveIndex, setCurrentActiveIndex] = useState(-1);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [
    previousIndicatorClientRect,
    setPreviousIndicatorClientRect,
  ] = useState();

  const classes = classNames('mdc-tab-bar', className);

  function getPreviousIndicatorClientRect() {
    const prev = tabsRef.current.get(currentActiveIndex);
    const prevIndicatorContent = prev
      ? prev.getElementsByClassName('mdc-tab-indicator__content')[0]
      : null;
    return prevIndicatorContent
      ? prevIndicatorContent.getBoundingClientRect()
      : null;
  }

  function getKeyFromEvent(e) {
    if (ACCEPTABLE_KEYS.has(e.key)) {
      return e.key;
    }
    return KEYCODE_MAP.get(e.keyCode);
  }

  function isActivationKey(key) {
    return key === strings.SPACE_KEY || key === strings.ENTER_KEY;
  }

  function determineTargetFromKey(origin, key) {
    const maxIndex = tabsRef.current.size - 1;
    const shouldGoToEnd = key === strings.END_KEY;
    const shouldDecrement =
      (key === strings.ARROW_LEFT_KEY && !isRtl) ||
      (key === strings.ARROW_RIGHT_KEY && isRtl);
    const shouldIncrement =
      (key === strings.ARROW_RIGHT_KEY && !isRtl) ||
      (key === strings.ARROW_LEFT_KEY && isRtl);
    let index = origin;

    if (shouldGoToEnd) {
      index = maxIndex;
    } else if (shouldDecrement) {
      index -= 1;
    } else if (shouldIncrement) {
      index += 1;
    } else {
      index = 0;
    }

    if (index < 0) {
      index = maxIndex;
    } else if (index > maxIndex) {
      index = 0;
    }

    return index;
  }

  function focusTabAtIndex(index) {
    tabsRef.current.get(index) && tabsRef.current.get(index).focus();
  }

  function setScrollIntoView(index) {
    // Early exit if the index is out of range
    if (!indexIsInRange(index)) return;

    // Always scroll to 0 if scrolling to the 0th index
    if (index === 0) return scrollTo(0);

    // Always scroll to the max value if scrolling to the Nth index
    // MDCTabScroller.scrollTo() will never scroll past the max possible value
    if (index === getTabListLength() - 1) {
      return scrollTo(getScrollContentWidth());
    }

    if (isRtl) {
      // TODO: Add RTL support
      // return this.scrollIntoViewRTL_(index);
    }

    scrollIntoView(index);
  }

  function indexIsInRange(index) {
    return index >= 0 && index < getTabListLength();
  }

  function getTabListLength() {
    return tabsRef.current.size;
  }

  function scrollTo(scrollX) {
    const currentScrollX = getScrollPosition();
    const safeScrollX = clampScrollValue(scrollX);
    const scrollDelta = safeScrollX - currentScrollX;
    animate({finalScrollPosition: safeScrollX, scrollDelta});
  }

  function getScrollPosition() {
    if (isRtl) {
      // TODO: computeCurrentScrollPositionRTL;
      return;
    }

    const currentTranslateX = calculateCurrentTranslateX();
    const scrollLeft = getScrollAreaScrollLeft();
    return scrollLeft - currentTranslateX;
  }

  function calculateCurrentTranslateX() {
    const transformValue = getScrollContentStyleValue('transform');
    // Early exit if no transform is present
    if (transformValue === 'none') return 0;

    // The transform value comes back as a matrix transformation in the form
    // of `matrix(a, b, c, d, tx, ty)`. We only care about tx (translateX) so
    // we're going to grab all the parenthesized values, strip out tx, and
    // parse it.
    const match = /\((.+?)\)/.exec(transformValue);
    if (!match) return 0;

    const matrixParams = match[1];
    const [a, b, c, d, tx, ty] = matrixParams.split(','); // eslint-disable-line no-unused-vars

    return parseFloat(tx);
  }

  function getScrollContentStyleValue(propName) {
    return tabScrollerContentRef.current
      ? window
          .getComputedStyle(tabScrollerContentRef.current)
          .getPropertyValue(propName)
      : '';
  }

  function getScrollAreaScrollLeft() {
    return tabScrollerAreaRef.current
      ? tabScrollerAreaRef.current.scrollLeft
      : 0;
  }

  function getScrollContentWidth() {
    return tabScrollerContentRef.current
      ? tabScrollerContentRef.current.offsetWidth
      : 0;
  }

  function animate(animation) {
    // Early exit if translateX is 0, which means there's no animation to perform
    if (animation.scrollDelta === 0) return;

    stopScrollAnimation();
    // This animation uses the FLIP approach.
    // Read more here: https://aerotwist.com/blog/flip-your-animations/
    setScrollAreaScrollLeft(animation.finalScrollPosition);
    setScrollContentStyleProperty(
      'transform',
      `translateX(${animation.scrollDelta}px)`
    );

    requestAnimationFrame(() => {
      setIsAnimating(true);
      setScrollContentStyleProperty('transform', 'none');
    });
  }

  function stopScrollAnimation() {
    const currentScrollPosition = getAnimatingScrollPosition();
    setIsAnimating(false);
    setScrollContentStyleProperty('transform', 'translateX(0px)');
    setScrollAreaScrollLeft(currentScrollPosition);
  }

  function getAnimatingScrollPosition() {
    const currentTranslateX = calculateCurrentTranslateX();
    const scrollLeft = getScrollAreaScrollLeft();
    if (isRtl) {
      // TODO: getAnimatingScrollPosition for rtl scroller
      return {};
    }

    return scrollLeft - currentTranslateX;
  }

  function scrollIntoView(index) {
    const scrollPosition = getScrollPosition();
    const barWidth = getOffsetWidth();
    const tabDimensions = getTabDimensionsAtIndex(index);
    const nextIndex = findAdjacentTabIndexClosestToEdge(
      index,
      tabDimensions,
      scrollPosition,
      barWidth
    );

    if (!indexIsInRange(nextIndex)) return;

    const scrollIncrement = calculateScrollIncrement(
      index,
      nextIndex,
      scrollPosition,
      barWidth
    );
    incrementScroll(scrollIncrement);
  }

  function getOffsetWidth() {
    return tabBarRef.current ? tabBarRef.current.offsetWidth : 0;
  }

  function getTabDimensionsAtIndex(index) {
    const tab = tabsRef.current.get(index);
    const tabContent = tab
      ? tab.getElementsByClassName('mdc-tab__content')[0]
      : null;
    const rootWidth = Number(tab && tab.offsetWidth);
    const rootLeft = Number(tab && tab.offsetLeft);
    const contentWidth = tabContent ? tabContent.offsetLeft : 0;
    const contentLeft = tabContent ? tabContent.offsetWidth : 0;

    return {
      contentLeft: rootLeft + contentLeft,
      contentRight: rootLeft + contentLeft + contentWidth,
      rootLeft,
      rootRight: rootLeft + rootWidth,
    };
  }

  function findAdjacentTabIndexClosestToEdge(
    index,
    tabDimensions,
    scrollPosition,
    barWidth
  ) {
    const relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
    const relativeRootRight =
      tabDimensions.rootRight - scrollPosition - barWidth;
    const relativeRootDelta = relativeRootLeft + relativeRootRight;
    const leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
    const rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;

    if (leftEdgeIsCloser) return index - 1;
    if (rightEdgeIsCloser) return index + 1;
    return -1;
  }

  function clampScrollValue(scrollX) {
    const edges = calculateScrollEdges();
    return Math.min(Math.max(edges.left, scrollX), edges.right);
  }

  function calculateScrollEdges() {
    const contentWidth = getScrollContentOffsetWidth();
    const rootWidth = getScrollAreaOffsetWidth();
    return {
      left: 0,
      right: contentWidth - rootWidth,
    };
  }

  function getScrollContentOffsetWidth() {
    return tabScrollerContentRef.current
      ? tabScrollerContentRef.current.offsetWidth
      : 0;
  }

  function getScrollAreaOffsetWidth() {
    return tabScrollerAreaRef.current
      ? tabScrollerAreaRef.current.offsetWidth
      : 0;
  }

  function setScrollContentStyleProperty(propName, propValue) {
    if (tabScrollerContentRef.current) {
      tabScrollerContentRef.current.style[propName] = propValue;
    }
  }

  function setScrollAreaScrollLeft(scrollX) {
    return tabScrollerAreaRef.current
      ? (tabScrollerAreaRef.current.scrollLeft = scrollX)
      : null;
  }

  function calculateScrollIncrement(
    index,
    nextIndex,
    scrollPosition,
    barWidth
  ) {
    const nextTabDimensions = getTabDimensionsAtIndex(nextIndex);
    const relativeContentLeft =
      nextTabDimensions.contentLeft - scrollPosition - barWidth;
    const relativeContentRight =
      nextTabDimensions.contentRight - scrollPosition;
    const leftIncrement = relativeContentRight - numbers.EXTRA_SCROLL_AMOUNT;
    const rightIncrement = relativeContentLeft + numbers.EXTRA_SCROLL_AMOUNT;

    if (nextIndex < index) {
      return Math.min(leftIncrement, 0);
    }

    return Math.max(rightIncrement, 0);
  }

  function incrementScroll(scrollXIncrement) {
    // Early exit for non-operational increment values
    if (scrollXIncrement === 0) return;

    animate(getIncrementScrollOperation(scrollXIncrement));
  }

  function getIncrementScrollOperation(scrollX) {
    if (isRtl) {
      // TODO: incrementScrollRTL for rtl scroller
      return;
    }

    const currentScrollX = getScrollPosition();
    const targetScrollX = scrollX + currentScrollX;
    const safeScrollX = clampScrollValue(targetScrollX);
    const scrollDelta = safeScrollX - currentScrollX;
    return {
      finalScrollPosition: safeScrollX,
      scrollDelta,
    };
  }

  function handleKeyDown(e) {
    // Get the key from the event
    const key = getKeyFromEvent(e);

    // Early exit if the event key isn't one of the keyboard navigation keys
    if (key === undefined) return;

    // Prevent default behavior for movement keys, but not for activation keys, since :active is used to apply ripple
    if (!isActivationKey(key)) e.preventDefault();

    if (isActivationKey(key)) {
      handleActiveIndexUpdate(focusedIndex);
    } else {
      const index = determineTargetFromKey(focusedIndex, key);
      focusTabAtIndex(index);
      setScrollIntoView(index);
    }

    if (onKeyDown) onKeyDown(e);
  }

  function handleTabBlur(e, onBlur) {
    setFocusedIndex(-1);
    if (onBlur) onBlur(e);
  }

  function handleTabClick(e, index, onClick) {
    setCurrentActiveIndex(index);
    setPreviousIndicatorClientRect(
      getPreviousIndicatorClientRect() || previousIndicatorClientRect
    );
    handleActiveIndexUpdate(index);
    setScrollIntoView(index);
    if (onClick) onClick(e);
  }

  function handleTabFocus(e, index, onFocus) {
    setFocusedIndex(index);
    if (onFocus) onFocus(e);
  }

  if (currentActiveIndex === -1) setCurrentActiveIndex(activeIndex);

  useEffect(() => {
    tabScrollerAreaRef.current = tabScrollerRef.current.getElementsByClassName(
      'mdc-tab-scroller__scroll-area'
    )[0];
    tabScrollerContentRef.current = tabScrollerRef.current.getElementsByClassName(
      'mdc-tab-scroller__scroll-content'
    )[0];
  }, []);

  useEffect(() => {
    setIsRtl(dir === 'rtl');
  }, [dir]);

  return (
    <Tag
      className={classes}
      onKeyDown={handleKeyDown}
      role="tablist"
      ref={tabBarRef}
      {...otherProps}
    >
      <TabScroller animating={isAnimating} ref={tabScrollerRef} scroll={scroll}>
        {Children.map(children, (tab, index) => {
          const {children, onBlur, onClick, onFocus, ...otherProps} = tab.props;
          const props = {
            active: index === currentActiveIndex,
            focused: index === focusedIndex,
            previousIndicatorClientRect,
            onBlur: e => handleTabBlur(e, onBlur),
            onClick: e => handleTabClick(e, index, onClick),
            onFocus: e => handleTabFocus(e, index, onFocus),
            ref: element => tabsRef.current.set(index, element),
            ...otherProps,
          };

          return cloneElement(tab, props, children);
        })}
      </TabScroller>
    </Tag>
  );
}
TabBar.displayName = 'TabBar';
TabBar.propTypes = {
  activeIndex: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  dir: PropTypes.string,
  handleActiveIndexUpdate: PropTypes.func,
  onKeyDown: PropTypes.func,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
