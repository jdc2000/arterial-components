import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function NotchedOutline({
  className,
  label,
  labelId,
  notched,
  'data-arterial': arterial,
  ...otherProps
}) {
  const [notchStyle, setNotchStyle] = useState(null);
  const labelRef = useRef();
  const classes = classNames(
    'mdc-notched-outline',
    'mdc-notched-outline--upgraded',
    className,
    {
      'mdc-notched-outline--notched': notched,
    }
  );
  const labelClasses = classNames('mdc-floating-label', {
    'mdc-floating-label--float-above': notched,
  });

  useEffect(() => {
    const style =
      notched && labelRef.current
        ? { width: labelRef.current.offsetWidth * 0.75 + 8 }
        : null;
    setNotchStyle(style);
  }, [notched]);

  return (
    <span className={classes} data-arterial={arterial} {...otherProps}>
      <span
        className="mdc-notched-outline__leading"
        data-arterial={arterial}
      ></span>
      {label && (
        <span
          className="mdc-notched-outline__notch"
          data-arterial={arterial}
          style={notchStyle}
        >
          <span
            className={labelClasses}
            data-arterial={arterial}
            id={labelId}
            ref={labelRef}
          >
            {label}
          </span>
        </span>
      )}
      <span
        className="mdc-notched-outline__trailing"
        data-arterial={arterial}
      ></span>
    </span>
  );
}
NotchedOutline.displayName = 'NotchedOutline';
NotchedOutline.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  notched: PropTypes.bool,
  'data-arterial': PropTypes.string,
};
