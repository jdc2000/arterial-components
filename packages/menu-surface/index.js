import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Corner, CornerBit } from './Corner';

function MenuSurface({
  anchorCorner = Corner.TOP_LEFT,
  anchorElement,
  anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 },
  children,
  className,
  coordinates,
  direction,
  fixed,
  open,
  quickOpen,
  style,
  tag = 'div',
  ...otherProps
}) {
  const menuSurfaceEl = useRef();
  const [isAnimatingClosed, setIsAnimatingClosed] = useState(false);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(undefined);
  const [stylePosition, setStylePosition] = useState({});
  const [transformOrigin, setTransformOrigin] = useState('');

  const classes = classNames('mdc-menu-surface', className, {
    'mdc-menu-surface--animating-closed': isAnimatingClosed,
    'mdc-menu-surface--animating-open': isAnimatingOpen,
    'mdc-menu-surface--open': isOpen,
    'mdc-menu-surface--fixed': fixed
  });
  const styles = {
    ...style,
    [`${getTransformPropertyName(window)}Origin`]: transformOrigin,
    maxHeight,
    ...stylePosition
  };
  const Tag = tag;

  useEffect(() => {
    const hoisted = true;
    let openAnimationEndTimerId = 0,
      closeAnimationEndTimerId = 0,
      animationRequestId = 0,
      dimensions,
      measurements;

    function autoPosition() {
      // Compute measurements for autoposition methods reuse.
      measurements = getAutoLayoutMeasurements();

      const corner = getOriginCorner();
      const maxMenuSurfaceHeight = getMenuSurfaceMaxHeight(corner);
      const verticalAlignment = hasBit(corner, CornerBit.BOTTOM)
        ? 'bottom'
        : 'top';
      let horizontalAlignment = hasBit(corner, CornerBit.RIGHT)
        ? 'right'
        : 'left';
      const horizontalOffset = getHorizontalOriginOffset(corner);
      const verticalOffset = getVerticalOriginOffset(corner);
      const { anchorSize, surfaceSize } = measurements;

      const position = {
        [horizontalAlignment]: horizontalOffset,
        [verticalAlignment]: verticalOffset
      };

      // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.
      if (anchorSize.width / surfaceSize.width > 0.67) {
        horizontalAlignment = 'center';
      }

      // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element
      if (hoisted || fixed) {
        adjustPositionForHoistedElement(position);
      }

      setTransformOrigin(`${horizontalAlignment} ${verticalAlignment}`);
      setStylePosition(position);
      setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');
    }

    function getAutoLayoutMeasurements() {
      const el = anchorElement.current;
      let anchorRect = el ? el.getBoundingClientRect() : null;
      const bodySize = {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      };
      const viewportSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      const windowScroll = { x: window.pageXOffset, y: window.pageYOffset };

      if (!anchorRect) {
        anchorRect = {
          top: coordinates.y,
          right: coordinates.x,
          bottom: coordinates.y,
          left: coordinates.x,
          width: 0,
          height: 0
        };
      }

      return {
        anchorSize: anchorRect,
        bodySize,
        surfaceSize: dimensions,
        viewportDistance: {
          top: anchorRect.top,
          right: viewportSize.width - anchorRect.right,
          bottom: viewportSize.height - anchorRect.bottom,
          left: anchorRect.left
        },
        viewportSize,
        windowScroll
      };
    }

    function getOriginCorner() {
      // Defaults: open from the top left.
      let corner = Corner.TOP_LEFT;

      const { viewportDistance, anchorSize, surfaceSize } = measurements;

      const isBottomAligned = hasBit(anchorCorner, CornerBit.BOTTOM);
      const availableTop = isBottomAligned
        ? viewportDistance.top + anchorSize.height + anchorMargin.bottom
        : viewportDistance.top + anchorMargin.top;
      const availableBottom = isBottomAligned
        ? viewportDistance.bottom - anchorMargin.bottom
        : viewportDistance.bottom + anchorSize.height - anchorMargin.top;

      const topOverflow = surfaceSize.height - availableTop;
      const bottomOverflow = surfaceSize.height - availableBottom;
      if (bottomOverflow > 0 && topOverflow < bottomOverflow) {
        corner = setBit(corner, CornerBit.BOTTOM);
      }

      const isRtl = direction === 'rtl';
      const isFlipRtl = hasBit(anchorCorner, CornerBit.FLIP_RTL);
      const avoidHorizontalOverlap = hasBit(anchorCorner, CornerBit.RIGHT);
      const isAlignedRight =
        (avoidHorizontalOverlap && !isRtl) ||
        (!avoidHorizontalOverlap && isFlipRtl && isRtl);
      const availableLeft = isAlignedRight
        ? viewportDistance.left + anchorSize.width + anchorMargin.right
        : viewportDistance.left + anchorMargin.left;
      const availableRight = isAlignedRight
        ? viewportDistance.right - anchorMargin.right
        : viewportDistance.right + anchorSize.width - anchorMargin.left;

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

    function getMenuSurfaceMaxHeight(corner) {
      const { viewportDistance } = measurements;

      let maxHeight = 0;
      const isBottomAligned = hasBit(corner, CornerBit.BOTTOM);
      const isBottomAnchored = hasBit(anchorCorner, CornerBit.BOTTOM);
      const MARGIN_TO_EDGE = 32;

      // When maximum height is not specified, it is handled from CSS.
      if (isBottomAligned) {
        maxHeight = viewportDistance.top + anchorMargin.top - MARGIN_TO_EDGE;
        if (!isBottomAnchored) {
          maxHeight += measurements.anchorSize.height;
        }
      } else {
        maxHeight =
          viewportDistance.bottom -
          anchorMargin.bottom +
          measurements.anchorSize.height -
          MARGIN_TO_EDGE;
        if (isBottomAnchored) {
          maxHeight -= measurements.anchorSize.height;
        }
      }

      return maxHeight;
    }

    function getHorizontalOriginOffset(corner) {
      const { anchorSize, bodySize, viewportSize } = measurements;

      // isRightAligned corresponds to using the 'right' property on the surface.
      const isRightAligned = hasBit(corner, CornerBit.RIGHT);
      const avoidHorizontalOverlap = hasBit(anchorCorner, CornerBit.RIGHT);

      if (isRightAligned) {
        const rightOffset = avoidHorizontalOverlap
          ? anchorSize.width - anchorMargin.left
          : anchorMargin.right;

        // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
        // when we calculate the right value (`adjustPositionForHoistedElement_`) based on the element position,
        // the right property is correct.
        if (hoisted || fixed) {
          return rightOffset - (viewportSize.width - bodySize.width);
        }

        return rightOffset;
      }

      return avoidHorizontalOverlap
        ? anchorSize.width - anchorMargin.right
        : anchorMargin.left;
    }

    function getVerticalOriginOffset(corner) {
      const { anchorSize } = measurements;
      const isBottomAligned = hasBit(corner, CornerBit.BOTTOM);
      const avoidVerticalOverlap = hasBit(anchorCorner, CornerBit.BOTTOM);

      let y = 0;
      if (isBottomAligned) {
        y = avoidVerticalOverlap
          ? anchorSize.height - anchorMargin.top
          : -anchorMargin.bottom;
      } else {
        y = avoidVerticalOverlap
          ? anchorSize.height + anchorMargin.bottom
          : anchorMargin.top;
      }
      return y;
    }

    function adjustPositionForHoistedElement(position) {
      const { windowScroll, viewportDistance } = measurements;

      const props = Object.keys(position);

      for (const prop of props) {
        let value = position[prop] || 0;

        // Hoisted surfaces need to have the anchor elements location on the page added to the
        // position properties for proper alignment on the body.
        value += viewportDistance[prop];

        // Surfaces that are absolutely positioned need to have additional calculations for scroll
        // and bottom positioning.
        if (!fixed) {
          if (prop === 'top') {
            value += windowScroll.y;
          } else if (prop === 'bottom') {
            value -= windowScroll.y;
          } else if (prop === 'left') {
            value += windowScroll.x;
          } else {
            value -= windowScroll.x;
          }
        }

        position[prop] = value;
      }
    }

    function hasBit(corner, bit) {
      return Boolean(corner & bit);
    }

    function setBit(corner, bit) {
      return corner | bit;
    }

    if (open) {
      if (!quickOpen) {
        setIsAnimatingOpen(true);
      }

      animationRequestId = requestAnimationFrame(() => {
        setIsOpen(true);
        const el = menuSurfaceEl.current;
        dimensions = el
          ? { width: el.offsetWidth, height: el.offsetHeight }
          : null;
        autoPosition();
        if (!quickOpen) {
          openAnimationEndTimerId = setTimeout(() => {
            openAnimationEndTimerId = 0;
            setIsAnimatingOpen(false);
          }, 120);
        }
      });
    } else {
      if (!quickOpen) {
        setIsAnimatingClosed(true);
      }

      requestAnimationFrame(() => {
        setIsOpen(false);
        if (!quickOpen) {
          closeAnimationEndTimerId = setTimeout(() => {
            closeAnimationEndTimerId = 0;
            setIsAnimatingClosed(false);
          }, 75);
        }
      });
    }

    return () => {
      clearTimeout(openAnimationEndTimerId);
      clearTimeout(closeAnimationEndTimerId);
      // Cancel any currently running animations.
      cancelAnimationFrame(animationRequestId);
    };
  }, [
    anchorCorner,
    anchorElement,
    anchorMargin.bottom,
    anchorMargin.left,
    anchorMargin.right,
    anchorMargin.top,
    coordinates,
    direction,
    fixed,
    open,
    quickOpen
  ]);

  return ReactDOM.createPortal(
    <Tag
      className={classes}
      direction={direction}
      ref={menuSurfaceEl}
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
  anchorElement: PropTypes.element,
  anchorMargin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  children: PropTypes.node,
  className: PropTypes.string,
  coordinates: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),
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

export { Corner, MenuSurface };
export { MenuSurfaceAnchor } from './MenuSurfaceAnchor';
