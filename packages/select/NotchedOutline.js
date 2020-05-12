import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function NotchedOutline({
  className,
  id,
  label,
  labelClassName,
  notched,
  'data-arterial': arterial,
  ...otherProps
}) {
  const labelRef = useRef();
  const [notchStyle, setNotchStyle] = useState(null);
  const classes = classNames(
    'mdc-notched-outline',
    'mdc-notched-outline--upgraded',
    className,
    {
      'mdc-notched-outline--notched': notched
    }
  );

  useEffect(() => {
    const style =
      notched && labelRef && labelRef.current
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
            className={labelClassName}
            data-arterial={arterial}
            id={id}
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

NotchedOutline.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  notched: PropTypes.bool,
  'data-arterial': PropTypes.string
};
