import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FormField} from '@arterial/form-field';

function CheckboxBase({
  checked,
  className,
  disabled,
  id,
  indeterminate,
  onChange,
  ripple = true,
  style,
  value,
  ...otherProps
}) {
  const [anim, setAnim] = useState(false);
  const inputRef = useRef();
  let classes = classNames('mdc-checkbox', className, {
    [`mdc-checkbox--anim-indeterminate-checked`]: anim,
    'mdc-checkbox--disabled': disabled,
    'mdc-checkbox--selected': checked || indeterminate,
  });

  function handleAnimationEnd() {
    setAnim(false);
  }

  function handleChange(e) {
    if (indeterminate && e.target.checked) setAnim(true);
    if (onChange) onChange(e);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={classes} style={style}>
      <input
        className="mdc-checkbox__native-control"
        checked={checked}
        disabled={disabled}
        id={id}
        onChange={handleChange}
        ref={inputRef}
        type="checkbox"
        value={value}
        {...otherProps}
      />
      <div
        className="mdc-checkbox__background"
        onAnimationEnd={handleAnimationEnd}
      >
        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
          <path
            className="mdc-checkbox__checkmark-path"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
            fill="none"
          />
        </svg>
        <div className="mdc-checkbox__mixedmark"></div>
      </div>
      {ripple && <div className="mdc-checkbox__ripple"></div>}
    </div>
  );
}

export function Checkbox({alignEnd, id, label, ...otherProps}) {
  if (label) {
    return (
      <FormField alignEnd={alignEnd}>
        <CheckboxBase id={id} {...otherProps} />
        <label id={`${id}-label`} htmlFor={id}>
          {label}
        </label>
      </FormField>
    );
  }
  return <CheckboxBase id={id} {...otherProps} />;
}
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  alignEnd: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  ripple: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string,
};
