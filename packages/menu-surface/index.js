import React, { useEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Corner, CornerBit } from './Corner';

const ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO = 0.67;
const MARGIN_TO_EDGE = 32;
const TRANSITION_CLOSE_DURATION = 75;
const TRANSITION_OPEN_DURATION = 120;

const ANIMATING_CLOSED = 'ANIMATING_CLOSED';
const ANIMATING_OPEN = 'ANIMATING_OPEN';
const AUTO_POSITION = 'AUTO_POSITION';
const OPEN = 'OPEN';

const initialState = {
  isOpen: false,
  isQuickOpen: false,
  isHoistedElement: true,
  isFixedPosition: false,
  isRtl: false,

  anchorCorner: Corner.TOP_LEFT,
  anchorMargin: { top: 0, right: 0, bottom: 0, left: 0 },
  position: { x: 0, y: 0 },
  styles: { transformOrigin: '', maxHeight: '', position: {} }
};

function reducer(state, action) {
  switch (action.type) {
    case ANIMATING_CLOSED:
      return { ...state, isAnimatingClosed: action.isAnimatingClosed };
    case ANIMATING_OPEN:
      return { ...state, isAnimatingOpen: action.isAnimatingOpen };
    case AUTO_POSITION:
      return {
        ...state,
        ...(action.isOpen != null && { isOpen: action.isOpen }),
        styles: autoPosition(state, action)
      };
    case OPEN:
      return { ...state, isOpen: action.isOpen };
    default:
      throw new Error();
  }
}

function autoPosition(state, action) {
  // Compute measurements for autoposition methods reuse.
  let measurements = getAutoLayoutMeasurements(state, action);

  const corner = getOriginCorner(state, measurements);
  const maxMenuSurfaceHeight = getMenuSurfaceMaxHeight(
    state,
    measurements,
    corner
  );
  const verticalAlignment = hasBit(corner, CornerBit.BOTTOM) ? 'bottom' : 'top';
  let horizontalAlignment = hasBit(corner, CornerBit.RIGHT) ? 'right' : 'left';
  const horizontalOffset = getHorizontalOriginOffset(
    state,
    measurements,
    corner
  );
  const verticalOffset = getVerticalOriginOffset(state, measurements, corner);
  const { anchorSize, surfaceSize } = measurements;

  let position = {
    [horizontalAlignment]: horizontalOffset,
    [verticalAlignment]: verticalOffset
  };

  // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.
  if (
    anchorSize.width / surfaceSize.width >
    ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO
  ) {
    horizontalAlignment = 'center';
  }

  // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element
  if (state.isHoistedElement || state.isFixedPosition) {
    position = adjustPositionForHoistedElement(state, measurements, position);
  }

  return {
    transformOrigin: `${horizontalAlignment} ${verticalAlignment}`,
    position: {
      top: 'top' in position ? position.top : null,
      right: 'right' in position ? position.right : null,
      bottom: 'bottom' in position ? position.bottom : null,
      left: 'left' in position ? position.left : null
    },
    maxHeight: maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : ''
  };
}

function getAutoLayoutMeasurements(state, action) {
  const dimensions = getInnerDimensions(action.menuSurfaceElement);
  let anchorRect =
    action.anchorElement && action.anchorElement.current
      ? action.anchorElement.current.getBoundingClientRect()
      : null;
  const bodySize = {
    width: document.body.clientWidth,
    height: document.body.clientHeight
  };
  const viewportSize = { width: window.innerWidth, height: window.innerHeight };
  const windowScroll = { x: window.pageXOffset, y: window.pageYOffset };

  if (!anchorRect) {
    // Positional properties are more readable when they're grouped together
    anchorRect = {
      top: state.position.y,
      right: state.position.x,
      bottom: state.position.y,
      left: state.position.x,
      width: 0,
      height: 0
    };
  }

  return {
    anchorSize: anchorRect,
    bodySize,
    surfaceSize: dimensions,
    viewportDistance: {
      // Positional properties are more readable when they're grouped together
      top: anchorRect.top,
      right: viewportSize.width - anchorRect.right,
      bottom: viewportSize.height - anchorRect.bottom,
      left: anchorRect.left
    },
    viewportSize,
    windowScroll
  };
}

function getInnerDimensions(menuSurfaceElement) {
  const element = menuSurfaceElement.current;
  if (!element) {
    return { width: 0, height: 0 };
  }
  return { width: element.offsetWidth, height: element.offsetHeight };
}

function getOriginCorner(state, measurements) {
  // Defaults: open from the top left.
  let corner = Corner.TOP_LEFT;

  const { viewportDistance, anchorSize, surfaceSize } = measurements;

  const isBottomAligned = hasBit(state.anchorCorner, CornerBit.BOTTOM);
  const availableTop = isBottomAligned
    ? viewportDistance.top + anchorSize.height + state.anchorMargin.bottom
    : viewportDistance.top + state.anchorMargin.top;
  const availableBottom = isBottomAligned
    ? viewportDistance.bottom - state.anchorMargin.bottom
    : viewportDistance.bottom + anchorSize.height - state.anchorMargin.top;

  const topOverflow = surfaceSize.height - availableTop;
  const bottomOverflow = surfaceSize.height - availableBottom;
  if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
    corner = setBit(corner, CornerBit.BOTTOM);
  }

  const isRtl = state.isRtl;
  const isFlipRtl = hasBit(state.anchorCorner, CornerBit.FLIP_RTL);
  const avoidHorizontalOverlap = hasBit(state.anchorCorner, CornerBit.RIGHT);
  const isAlignedRight =
    (avoidHorizontalOverlap && !isRtl) ||
    (!avoidHorizontalOverlap && isFlipRtl && isRtl);
  const availableLeft = isAlignedRight
    ? viewportDistance.left + anchorSize.width + state.anchorMargin.right
    : viewportDistance.left + state.anchorMargin.left;
  const availableRight = isAlignedRight
    ? viewportDistance.right - state.anchorMargin.right
    : viewportDistance.right + anchorSize.width - state.anchorMargin.left;

  const leftOverflow = surfaceSize.width - availableLeft;
  const rightOverflow = surfaceSize.width - availableRight;

  if (
    (leftOverflow < 0 && isAlignedRight && isRtl) ||
    (avoidHorizontalOverlap && !isAlignedRight && leftOverflow < 0) ||
    (rightOverflow > 0 && leftOverflow < rightOverflow)
  ) {
    corner = setBit(corner, CornerBit.RIGHT);
  }

  return corner;
}

function getMenuSurfaceMaxHeight(state, measurements, corner) {
  const { viewportDistance } = measurements;

  let maxHeight = 0;
  const isBottomAligned = hasBit(corner, CornerBit.BOTTOM);
  const isBottomAnchored = hasBit(state.anchorCorner, CornerBit.BOTTOM);

  // When maximum height is not specified, it is handled from CSS.
  if (isBottomAligned) {
    maxHeight = viewportDistance.top + state.anchorMargin.top - MARGIN_TO_EDGE;
    if (!isBottomAnchored) {
      maxHeight += measurements.anchorSize.height;
    }
  } else {
    maxHeight =
      viewportDistance.bottom -
      state.anchorMargin.bottom +
      measurements.anchorSize.height -
      MARGIN_TO_EDGE;
    if (isBottomAnchored) {
      maxHeight -= measurements.anchorSize.height;
    }
  }

  return maxHeight;
}

function getHorizontalOriginOffset(state, measurements, corner) {
  const { anchorSize } = measurements;

  // isRightAligned corresponds to using the 'right' property on the surface.
  const isRightAligned = hasBit(corner, CornerBit.RIGHT);
  const avoidHorizontalOverlap = hasBit(state.anchorCorner, CornerBit.RIGHT);

  if (isRightAligned) {
    const rightOffset = avoidHorizontalOverlap
      ? anchorSize.width - state.anchorMargin.left
      : state.anchorMargin.right;

    // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
    // when we calculate the right value (`adjustPositionForHoistedElement_`) based on the element position,
    // the right property is correct.
    if (state.isHoistedElement || state.isFixedPosition) {
      return (
        rightOffset -
        (measurements.viewportSize.width - measurements.bodySize.width)
      );
    }

    return rightOffset;
  }

  return avoidHorizontalOverlap
    ? anchorSize.width - state.anchorMargin.right
    : state.anchorMargin.left;
}

function getVerticalOriginOffset(state, measurements, corner) {
  const { anchorSize } = measurements;
  const isBottomAligned = hasBit(corner, CornerBit.BOTTOM);
  const avoidVerticalOverlap = hasBit(state.anchorCorner, CornerBit.BOTTOM);

  let y = 0;
  if (isBottomAligned) {
    y = avoidVerticalOverlap
      ? anchorSize.height - state.anchorMargin.top
      : -state.anchorMargin.bottom;
  } else {
    y = avoidVerticalOverlap
      ? anchorSize.height + state.anchorMargin.bottom
      : state.anchorMargin.top;
  }
  return y;
}

function adjustPositionForHoistedElement(state, measurements, position) {
  const { windowScroll, viewportDistance } = measurements;
  const currentPosition = position;

  const props = Object.keys(position);

  for (const prop of props) {
    let value = currentPosition[prop] || 0;

    // Hoisted surfaces need to have the anchor elements location on the page added to the
    // position properties for proper alignment on the body.
    value += viewportDistance[prop];

    // Surfaces that are absolutely positioned need to have additional calculations for scroll
    // and bottom positioning.
    if (!state.isFixedPosition) {
      if (prop === 'top') {
        value += windowScroll.y;
      } else if (prop === 'bottom') {
        value -= windowScroll.y;
      } else if (prop === 'left') {
        value += windowScroll.x;
      } else {
        // prop === 'right'
        value -= windowScroll.x;
      }
    }

    currentPosition[prop] = value;
  }

  return currentPosition;
}

function hasBit(corner, bit) {
  return Boolean(corner & bit);
}

function setBit(corner, bit) {
  return corner | bit;
}

export function MenuSurface({
  anchorCorner = Corner.TOP_LEFT,
  anchorElement,
  anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 },
  children,
  className,
  direction,
  fixed,
  open,
  position = { x: 0, y: 0 },
  quickOpen,
  style,
  tag = 'div',
  ...otherProps
}) {
  const menuSurfaceElement = useRef();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isQuickOpen: quickOpen,
    isFixedPosition: fixed,
    anchorCorner,
    anchorMargin,
    position,
    isRtl: direction === 'rtl'
  });

  const classes = classNames('mdc-menu-surface', className, {
    'mdc-menu-surface--animating-closed': state.isAnimatingClosed,
    'mdc-menu-surface--animating-open': state.isAnimatingOpen,
    'mdc-menu-surface--open': state.isOpen,
    'mdc-menu-surface--fixed': fixed
  });
  const styles = {
    ...style,
    [`${getTransformPropertyName(window)}Origin`]: state.styles.transformOrigin,
    maxHeight: state.styles.maxHeight,
    top: state.styles.position.top,
    right: state.styles.position.right,
    bottom: state.styles.position.bottom,
    left: state.styles.position.left
  };
  const Tag = tag;

  useEffect(() => {
    let openAnimationEndTimerId = 0;
    let closeAnimationEndTimerId = 0;
    let animationRequestId = 0;

    if (open) {
      if (!state.isQuickOpen) {
        dispatch({ type: ANIMATING_OPEN, isAnimatingOpen: true });
      }

      animationRequestId = requestAnimationFrame(() => {
        dispatch({
          type: AUTO_POSITION,
          menuSurfaceElement,
          anchorElement,
          isOpen: true
        });
        if (!state.isQuickOpen) {
          openAnimationEndTimerId = setTimeout(() => {
            openAnimationEndTimerId = 0;
            dispatch({ type: ANIMATING_OPEN, isAnimatingOpen: false });
          }, TRANSITION_OPEN_DURATION);
        }
      });
    } else {
      if (!state.isQuickOpen) {
        dispatch({ type: ANIMATING_CLOSED, isAnimatingClosed: true });
      }

      requestAnimationFrame(() => {
        dispatch({ type: OPEN, isOpen: false });
        if (!state.isQuickOpen) {
          closeAnimationEndTimerId = setTimeout(() => {
            closeAnimationEndTimerId = 0;
            dispatch({ type: ANIMATING_CLOSED, isAnimatingClosed: false });
          }, TRANSITION_CLOSE_DURATION);
        }
      });
    }

    function handleResize(e) {
      if (e.type === 'resize') {
        dispatch({ type: AUTO_POSITION, menuSurfaceElement, anchorElement });
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(openAnimationEndTimerId);
      clearTimeout(closeAnimationEndTimerId);
      // Cancel any currently running animations.
      cancelAnimationFrame(animationRequestId);
      window.removeEventListener('resize', handleResize);
    };
  }, [anchorElement, open, state.isQuickOpen]);

  return ReactDOM.createPortal(
    <Tag
      className={classes}
      direction={direction}
      ref={menuSurfaceElement}
      style={styles}
      {...otherProps}
    >
      {children}
    </Tag>,
    document.body
  );
}

MenuSurface.propTypes = {
  anchorCorner: PropTypes.number,
  anchorElement: PropTypes.object,
  anchorMargin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
  direction: PropTypes.string,
  fixed: PropTypes.bool,
  open: PropTypes.bool,
  quickOpen: PropTypes.bool,
  style: PropTypes.object,
  tag: PropTypes.element
};

let cachedCssTransformPropertyName;
function getTransformPropertyName(globalObj, forceRefresh = false) {
  if (cachedCssTransformPropertyName === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    cachedCssTransformPropertyName =
      'transform' in el.style ? 'transform' : 'WebkitTransform';
  }
  return cachedCssTransformPropertyName;
}

export { Corner };
export { MenuSurfaceAnchor } from './MenuSurfaceAnchor';
