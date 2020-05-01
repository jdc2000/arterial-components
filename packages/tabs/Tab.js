import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@arterial/icon';
import TabIndicator from './TabIndicator';

const Tab = React.forwardRef((props, ref) => {
  const {
    active,
    children,
    className,
    focused,
    icon,
    id,
    indicatorFade,
    indicatorIcon,
    indicatorId,
    label,
    minWidth,
    previousIndicatorClientRect,
    restricted,
    ripple = true,
    stacked,
    tag: Tag = 'button',
    ...otherProps
  } = props;
  const classes = classNames('mdc-tab', className, {
    'mdc-tab--active': active,
    'mdc-tab--min-width': minWidth,
    'mdc-tab--stacked': stacked
  });
  const rippleClasses = classNames('mdc-tab__ripple', 'mdc-ripple-upgraded', {
    'mdc-ripple-upgraded--background-focused': focused
  });

  function renderTabIndicator() {
    return (
      <TabIndicator
        active={active}
        fade={indicatorFade}
        icon={indicatorIcon}
        id={indicatorId}
        previousIndicatorClientRect={previousIndicatorClientRect}
      />
    );
  }

  return (
    <Tag
      className={classes}
      aria-selected={active}
      id={id}
      ref={ref}
      role="tab"
      tabIndex={active ? 0 : -1}
      {...otherProps}
    >
      <span className="mdc-tab__content">
        {icon && (
          <Icon className="mdc-tab__icon" aria-hidden="true" icon={icon} />
        )}
        {label && <span className="mdc-tab__text-label">{label}</span>}
        {restricted && renderTabIndicator()}
      </span>
      {!restricted && renderTabIndicator()}
      {ripple && <span className={rippleClasses}></span>}
    </Tag>
  );
});

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  focused: PropTypes.bool,
  icon: PropTypes.node,
  id: PropTypes.string,
  indicatorFade: PropTypes.bool,
  indicatorIcon: PropTypes.node,
  indicatorId: PropTypes.string,
  label: PropTypes.string,
  minWidth: PropTypes.bool,
  previousIndicatorClientRect: PropTypes.object,
  restricted: PropTypes.bool,
  ripple: PropTypes.bool,
  stacked: PropTypes.bool,
  tag: PropTypes.element
};

export default Tab;
