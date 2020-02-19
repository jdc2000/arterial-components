import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withFormField } from '@faterial/form-field';

function RadioRoot({
  checked,
  className,
  disabled,
  formFieldProps,
  id,
  label,
  onChange,
  ripple = true,
  rootProps,
  value,
  ...otherProps
}) {
  const classes = classNames('mdc-radio', className, {
    'mdc-radio--disabled': disabled
  });

  return (
    <>
      <div {...rootProps} className={classes}>
        <input
          className="mdc-radio__native-control"
          checked={checked}
          disabled={disabled}
          id={id}
          onChange={onChange}
          type="radio"
          value={value}
          {...otherProps}
        />
        <div className="mdc-radio__background">
          <div className="mdc-radio__outer-circle"></div>
          <div className="mdc-radio__inner-circle"></div>
        </div>
        {ripple && <div className="mdc-radio__ripple"></div>}
      </div>
      {label && <label htmlFor={id}>{label}</label>}
    </>
  );
}

const Radio = withFormField(RadioRoot);

Radio.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  formFieldProps: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  ripple: PropTypes.bool,
  rootProps: PropTypes.object,
  value: PropTypes.string
};

export { Radio };
