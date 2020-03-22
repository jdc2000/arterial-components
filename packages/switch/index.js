import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withFormField } from '@arterial/form-field';

function SwitchRoot({
  alignEnd,
  checked,
  className,
  disabled,
  formFieldProps,
  id,
  label,
  onChange,
  value,
  ...otherProps
}) {
  const classes = classNames('mdc-switch', className, {
    'mdc-switch--checked': checked,
    'mdc-switch--disabled': disabled
  });
  const labelStyle = alignEnd
    ? { marginRight: '22px' }
    : { marginLeft: '22px' };

  return (
    <>
      <div className={classes} {...otherProps}>
        <div className="mdc-switch__track"></div>
        <div className="mdc-switch__thumb-underlay">
          <div className="mdc-switch__thumb"></div>
          <input
            aria-checked={checked}
            className="mdc-switch__native-control"
            id={id}
            onChange={onChange}
            role="switch"
            type="checkbox"
            value={value}
          />
        </div>
      </div>
      {label && (
        <label htmlFor={id} style={labelStyle}>
          {label}
        </label>
      )}
    </>
  );
}

export const Switch = withFormField(SwitchRoot);

Switch.propTypes = {
  alignEnd: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  formFieldProps: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};
