import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TabScroller = React.forwardRef((props, ref) => {
  const {
    align,
    animating,
    children,
    className,
    dir,
    onInteraction,
    onTransitionEnd,
    tag: Tag = 'div',
    ...otherProps
  } = props;
  const areaRef = useRef();
  const contentRef = useRef();
  const classes = classNames('mdc-tab-scroller', className, {
    [`mdc-tab-scroller--align-${align}`]: align,
    'mdc-tab-scroller--animating': animating,
  });
  const areaClasses = classNames(
    'mdc-tab-scroller__scroll-area',
    'mdc-tab-scroller__scroll-area--scroll'
  );
  const contentClasses = classNames('mdc-tab-scroller__scroll-content');

  function handleInteraction(e) {
    if (onInteraction) {
      onInteraction(e);
    }
  }

  function handleTransitionEnd(e) {
    if (onTransitionEnd) {
      onTransitionEnd(e);
    }
  }

  return (
    <Tag
      className={classes}
      onWheel={handleInteraction}
      onTouchStart={handleInteraction}
      onPointerDown={handleInteraction}
      onMouseDown={handleInteraction}
      onKeyDown={handleInteraction}
      onTransitionEnd={handleTransitionEnd}
      {...otherProps}
      ref={ref}
    >
      <div className={areaClasses} ref={areaRef}>
        <div className={contentClasses} ref={contentRef}>
          {children}
        </div>
      </div>
    </Tag>
  );
});
TabScroller.displayName = 'TabScroller';
TabScroller.propTypes = {
  align: PropTypes.oneOf(['start', 'end', 'center']),
  animating: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  dir: PropTypes.string,
  onInteraction: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default TabScroller;
