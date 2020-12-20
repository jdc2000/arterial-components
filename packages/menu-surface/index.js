import {Corner, CornerBit, numbers, util} from '@material/menu-surface';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {forwardRef, useCallback, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

const {getTransformPropertyName} = util;
const isHoistedElement = true;

export {Corner};
export {MenuSurfaceAnchor} from './MenuSurfaceAnchor';
export const MenuSurface = forwardRef((props, ref) => {
  const {
    anchorCorner = Corner.TOP_START,
    anchorMargin = {top: 0, right: 0, bottom: 0, left: 0},
    anchorRef,
    children,
    className,
    dir,
    fixed,
    open,
    originCorner = Corner.TOP_START,
    position = {x: 0, y: 0},
    quickOpen,
    style,
    tag: Tag = 'div',
    ...otherProps
  } = props;
  const [isAnimatingClosed, setIsAnimatingClosed] = useState(false);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBelow, setIsOpenBelow] = useState(false);
  const [styles, setStyles] = useState(style);
  const classes = classNames('mdc-menu-surface', className, {
    'mdc-menu-surface--animating-closed': isAnimatingClosed,
    'mdc-menu-surface--animating-open': isAnimatingOpen,
    'mdc-menu-surface--open': isOpen,
    'mdc-menu-surface--is-open-below': isOpenBelow,
    'mdc-menu-surface--fixed': fixed,
  });

  const autoPosition = useCallback(
    measurements => {
      function getOriginCorner() {
        let corner = originCorner;

        const {viewportDistance, anchorSize, surfaceSize} = measurements;
        const {MARGIN_TO_EDGE} = numbers;

        const isAnchoredToBottom = hasBit(anchorCorner, CornerBit.BOTTOM);

        let availableTop;
        let availableBottom;
        if (isAnchoredToBottom) {
          availableTop =
            viewportDistance.top -
            MARGIN_TO_EDGE +
            anchorSize.height +
            anchorMargin.bottom;
          availableBottom =
            viewportDistance.bottom - MARGIN_TO_EDGE - anchorMargin.bottom;
        } else {
          availableTop =
            viewportDistance.top - MARGIN_TO_EDGE + anchorMargin.top;
          availableBottom =
            viewportDistance.bottom -
            MARGIN_TO_EDGE +
            anchorSize.height -
            anchorMargin.top;
        }

        const isAvailableBottom = availableBottom - surfaceSize.height > 0;
        if (!isAvailableBottom && availableTop >= availableBottom) {
          // Attach bottom side of surface to the anchor.
          corner = setBit(corner, CornerBit.BOTTOM);
        }

        const isRtl = dir === 'rtl';
        const isFlipRtl = hasBit(anchorCorner, CornerBit.FLIP_RTL);
        const hasRightBit = hasBit(anchorCorner, CornerBit.RIGHT);

        // Whether surface attached to right side of anchor element.
        let isAnchoredToRight = false;

        // Anchored to start
        if (isRtl && isFlipRtl) {
          isAnchoredToRight = !hasRightBit;
        } else {
          // Anchored to right
          isAnchoredToRight = hasRightBit;
        }

        let availableLeft;
        let availableRight;
        if (isAnchoredToRight) {
          availableLeft =
            viewportDistance.left + anchorSize.width + anchorMargin.right;
          availableRight = viewportDistance.right - anchorMargin.right;
        } else {
          availableLeft = viewportDistance.left + anchorMargin.left;
          availableRight =
            viewportDistance.right + anchorSize.width - anchorMargin.left;
        }

        const isAvailableLeft = availableLeft - surfaceSize.width > 0;
        const isAvailableRight = availableRight - surfaceSize.width > 0;
        const isOriginCornerAlignedToEnd =
          hasBit(corner, CornerBit.FLIP_RTL) && hasBit(corner, CornerBit.RIGHT);

        if (
          (isAvailableRight && isOriginCornerAlignedToEnd && isRtl) ||
          (!isAvailableLeft && isOriginCornerAlignedToEnd)
        ) {
          // Attach left side of surface to the anchor.
          corner = unsetBit(corner, CornerBit.RIGHT);
        } else if (
          (isAvailableLeft && isAnchoredToRight && isRtl) ||
          (isAvailableLeft && !isAnchoredToRight && hasRightBit) ||
          (!isAvailableRight && availableLeft >= availableRight)
        ) {
          // Attach right side of surface to the anchor.
          corner = setBit(corner, CornerBit.RIGHT);
        }

        return corner;
      }
      function hasBit(corner, bit) {
        return Boolean(corner & bit);
      }

      function setBit(corner, bit) {
        return corner | bit;
      }

      function unsetBit(corner, bit) {
        return corner ^ bit;
      }
      function getMenuSurfaceMaxHeight(corner) {
        const {viewportDistance} = measurements;

        let maxHeight = 0;
        const isBottomAligned = hasBit(corner, CornerBit.BOTTOM);
        const isBottomAnchored = hasBit(anchorCorner, CornerBit.BOTTOM);
        const {MARGIN_TO_EDGE} = numbers;

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
        const {anchorSize} = measurements;

        // isRightAligned corresponds to using the 'right' property on the surface.
        const isRightAligned = hasBit(corner, CornerBit.RIGHT);
        const avoidHorizontalOverlap = hasBit(anchorCorner, CornerBit.RIGHT);

        if (isRightAligned) {
          const rightOffset = avoidHorizontalOverlap
            ? anchorSize.width - anchorMargin.left
            : anchorMargin.right;

          // For hoisted or fixed elements, adjust the offset by the difference between viewport width and body width so
          // when we calculate the right value (`adjustPositionForHoistedElement`) based on the element position,
          // the right property is correct.
          if (isHoistedElement || fixed) {
            return (
              rightOffset -
              (measurements.viewportSize.width - measurements.bodySize.width)
            );
          }

          return rightOffset;
        }

        return avoidHorizontalOverlap
          ? anchorSize.width - anchorMargin.right
          : anchorMargin.left;
      }
      function getVerticalOriginOffset(corner) {
        const {anchorSize} = measurements;
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
        const {windowScroll, viewportDistance} = measurements;

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
              // prop === 'right'
              value -= windowScroll.x;
            }
          }

          position[prop] = value;
        }
      }

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
      const {anchorSize, surfaceSize} = measurements;

      const position = {
        [horizontalAlignment]: horizontalOffset,
        [verticalAlignment]: verticalOffset,
      };

      // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.
      if (
        anchorSize.width / surfaceSize.width >
        numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO
      ) {
        horizontalAlignment = 'center';
      }

      // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element
      if (isHoistedElement || fixed) {
        adjustPositionForHoistedElement(position);
      }

      const propertyName = `${getTransformPropertyName(window)}Origin`;
      setStyles(prevStyles => ({
        ...prevStyles,
        [propertyName]: `${horizontalAlignment} ${verticalAlignment}`,
        left: 'left' in position ? `${position.left}px` : '',
        right: 'right' in position ? `${position.right}px` : '',
        top: 'top' in position ? `${position.top}px` : '',
        bottom: 'bottom' in position ? `${position.bottom}px` : '',
        maxHeight: maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '',
      }));

      // If it is opened from the top then add is-open-below class
      if (!hasBit(corner, CornerBit.BOTTOM)) {
        setIsOpenBelow(true);
      }
    },
    [
      anchorCorner,
      anchorMargin.bottom,
      anchorMargin.left,
      anchorMargin.right,
      anchorMargin.top,
      dir,
      fixed,
      originCorner,
    ]
  );

  useEffect(() => {
    // Compute measurements for autoposition methods reuse.
    function getAutoLayoutMeasurements() {
      function isNumberAndFinite(num) {
        return typeof num === 'number' && isFinite(num);
      }

      let anchorRect =
        anchorRef && anchorRef.current
          ? anchorRef.current.getBoundingClientRect()
          : null;
      const bodySize = {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
      const viewportSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      const windowScroll = {x: window.pageXOffset, y: window.pageYOffset};

      if (!anchorRect) {
        anchorRect = {
          top: isNumberAndFinite(position.y) ? position.y : 0,
          right: isNumberAndFinite(position.x) ? position.x : 0,
          bottom: isNumberAndFinite(position.y) ? position.y : 0,
          left: isNumberAndFinite(position.x) ? position.x : 0,
          width: 0,
          height: 0,
        };
      }

      return {
        anchorSize: anchorRect,
        bodySize,
        surfaceSize: {
          width: ref && ref.current ? ref.current.offsetWidth : 0,
          height: ref && ref.current ? ref.current.offsetHeight : 0,
        },
        viewportDistance: {
          top: anchorRect.top,
          right: viewportSize.width - anchorRect.right,
          bottom: viewportSize.height - anchorRect.bottom,
          left: anchorRect.left,
        },
        viewportSize,
        windowScroll,
      };
    }

    let openAnimationEndTimerId = 0;
    let closeAnimationEndTimerId = 0;
    let animationRequestId = 0;

    const measurements = getAutoLayoutMeasurements();
    autoPosition(measurements);

    if (open) {
      if (quickOpen) {
        setIsOpen(true);
      } else {
        setIsAnimatingOpen(true);
        animationRequestId = requestAnimationFrame(() => {
          setIsOpen(true);
          openAnimationEndTimerId = setTimeout(() => {
            openAnimationEndTimerId = 0;
            setIsAnimatingOpen(false);
          }, numbers.TRANSITION_OPEN_DURATION);
        });
      }
    } else {
      if (quickOpen) {
        setIsOpen(false);
        setIsOpenBelow(false);
      } else {
        setIsAnimatingClosed(true);
        requestAnimationFrame(() => {
          setIsOpen(false);
          setIsOpenBelow(false);
          closeAnimationEndTimerId = setTimeout(() => {
            closeAnimationEndTimerId = 0;
            setIsAnimatingClosed(false);
          }, numbers.TRANSITION_CLOSE_DURATION);
        });
      }
    }

    return () => {
      clearTimeout(openAnimationEndTimerId);
      clearTimeout(closeAnimationEndTimerId);
      // Cancel any currently running animations.
      cancelAnimationFrame(animationRequestId);
    };
  }, [anchorRef, autoPosition, open, position.x, position.y, quickOpen, ref]);

  return ReactDOM.createPortal(
    <Tag className={classes} ref={ref} style={styles} {...otherProps}>
      {children}
    </Tag>,
    document.body
  );
});
MenuSurface.displayName = 'MenuSurface';
MenuSurface.propTypes = {
  anchorCorner: PropTypes.number,
  anchorMargin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  anchorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any}),
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  dir: PropTypes.string,
  fixed: PropTypes.bool,
  open: PropTypes.bool,
  originCorner: PropTypes.number,
  position: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
  quickOpen: PropTypes.bool,
  style: PropTypes.object,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
