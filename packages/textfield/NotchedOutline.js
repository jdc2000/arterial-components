import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function NotchedOutline({
  className,
  htmlFor,
  label,
  labelClassName,
  notched,
  ...otherProps
}) {
  const labelEl = useRef();
  const [notchStyle, setNotchStyle] = useState(null);
  const classes = classNames(
    'mdc-notched-outline',
    'mdc-notched-outline--upgraded',
    className,
    {
      'mdc-notched-outline--notched': notched,
      'mdc-notched-outline--no-label': !label
    }
  );

  useEffect(() => {
    const style =
      notched && labelEl && labelEl.current
        ? { width: labelEl.current.offsetWidth * 0.75 + 8 }
        : null;
    setNotchStyle(style);
  }, [notched]);

  return (
    <div className={classes} {...otherProps}>
      <div className="mdc-notched-outline__leading"></div>
      <div className="mdc-notched-outline__notch" style={notchStyle}>
        {label && (
          <label className={labelClassName} htmlFor={htmlFor} ref={labelEl}>
            {label}
          </label>
        )}
      </div>
      <div className="mdc-notched-outline__trailing"></div>
    </div>
  );
}

NotchedOutline.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  notched: PropTypes.bool
};
