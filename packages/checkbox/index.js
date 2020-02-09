import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withFormField } from '../form-field';

function CheckboxRoot({
  checked,
  className,
  disabled,
  formFieldProps,
  id,
  indeterminate,
  label,
  onChange,
  ripple = true,
  rootProps,
  value,
  ...otherProps
}) {
  const el = useRef();
  const classes = classNames('mdc-checkbox', className, {
    'mdc-checkbox--disabled': disabled,
    'mdc-checkbox--selected': checked || indeterminate
  });

  useEffect(() => {
    if (el.current) {
      el.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <>
      <div {...rootProps} className={classes}>
        <input
          className="mdc-checkbox__native-control"
          checked={checked}
          disabled={disabled}
          id={id}
          ref={el}
          onChange={onChange}
          type="checkbox"
          value={value}
          {...otherProps}
        />
        <div className="mdc-checkbox__background">
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
      {label && <label htmlFor={id}>{label}</label>}
    </>
  );
}

export const Checkbox = withFormField(CheckboxRoot);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  formFieldProps: PropTypes.object,
  id: PropTypes.string,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  ripple: PropTypes.bool,
  rootProps: PropTypes.object,
  value: PropTypes.string
};
