import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@arterial/icon';

const TabIndicator = React.forwardRef((props, ref) => {
  const {
    active,
    className,
    fade,
    icon,
    id,
    previousIndicatorClientRect,
    tag: Tag = 'span',
    ...otherProps
  } = props;
  const contentRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const [transform, setTransform] = useState();
  const classes = classNames('mdc-tab-indicator', className, {
    'mdc-tab-indicator--active': isActive,
    'mdc-tab-indicator--fade': fade,
  });
  const contentClasses = classNames('mdc-tab-indicator__content', {
    'mdc-tab-indicator__content--icon': icon,
    'mdc-tab-indicator__content--underline': !icon,
  });

  useEffect(() => {
    let timeout = 0;
    if (active) {
      // Early exit if no indicator is present to handle cases where an indicator
      // may be activated without a prior indicator state
      if (!previousIndicatorClientRect) {
        setIsActive(true);
        return;
      }

      // This animation uses the FLIP approach. You can read more about it at the link below:
      // https://aerotwist.com/blog/flip-your-animations/

      // Calculate the dimensions based on the dimensions of the previous indicator
      let currentClientRect = contentRef.current.getBoundingClientRect();
      const widthDelta =
        previousIndicatorClientRect.width / currentClientRect.width;
      const xPosition =
        previousIndicatorClientRect.left - currentClientRect.left;
      setTransform(`translateX(${xPosition}px) scaleX(${widthDelta})`);

      timeout = setTimeout(() => {
        setIsActive(true);
        setTransform('');
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setIsActive(false);
      }, 100);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [active, previousIndicatorClientRect]);

  return (
    <Tag className={classes} id={id} ref={ref} {...otherProps}>
      {icon ? (
        <Icon
          aria-hidden="true"
          className={contentClasses}
          icon={icon}
          id={id}
          ref={contentRef}
          style={{ transform }}
          tag="span"
        />
      ) : (
        <span
          className={contentClasses}
          id={id}
          ref={contentRef}
          style={{ transform }}
        ></span>
      )}
    </Tag>
  );
});
TabIndicator.displayName = 'TabIndicator';
TabIndicator.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  fade: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.string,
  previousIndicatorClientRect: PropTypes.object,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default TabIndicator;
