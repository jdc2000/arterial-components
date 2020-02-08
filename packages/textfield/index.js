import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './Icon';
import NotchedOutline from './NotchedOutline';
import HelperLine from './HelperLine';
import CharacterCounter from './CharacterCounter';

const FLOAT_ABOVE_CLASS = 'mdc-floating-label--float-above';

function TextField({
  className,
  disabled,
  helperText,
  icon,
  id,
  focused,
  fullWidth,
  label,
  labelClassName,
  maxLength,
  onBlur,
  onChange,
  onFocus,
  outlined,
  required,
  rootProps = {},
  textarea,
  trailingIcon,
  valid = true,
  value,
  ...otherProps
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFocused, setIsFocused] = useState(focused);
  const [floatAbove, setFloatAbove] = useState(false);

  const { className: rootClassName, ...otherRootProps } = rootProps;
  const rootClasses = classNames(rootClassName, 'mdc-text-field', {
    'mdc-text-field--disabled': disabled,
    'mdc-text-field--focused': isFocused,
    'mdc-text-field--fullwidth': fullWidth,
    'mdc-text-field--invalid': !valid,
    'mdc-text-field--no-label': !label,
    'mdc-text-field--outlined': outlined,
    'mdc-text-field--textarea': textarea,
    'mdc-text-field--with-leading-icon': icon,
    'mdc-text-field--with-trailing-icon': trailingIcon
  });
  const inputClasses = classNames(className, 'mdc-text-field__input');
  const labelClasses = classNames('mdc-floating-label', labelClassName, {
    [FLOAT_ABOVE_CLASS]: floatAbove
  });
  const lineRippleClasses = classNames('mdc-line-ripple', {
    'mdc-line-ripple--active': isFocused,
    'mdc-line-ripple--deactivating': !isFocused
  });
  const inputProps = {
    ...otherProps,
    className: inputClasses,
    disabled: disabled,
    id: id,
    maxLength: maxLength,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    required: required,
    value: currentValue
  };
  if (helperText) {
    inputProps['aria-controls'] = `${id}-helper-text`;
    inputProps['aria-describedby'] = `${id}-helper-text`;
  }

  function handleChange(e) {
    if (onChange) {
      return onChange(e);
    }
    setCurrentValue(e.target.value);
  }
  function handleBlur(e) {
    if (onBlur) {
      return onBlur(e);
    }
    setIsFocused(false);
  }
  function handleFocus(e) {
    if (onFocus) {
      return onFocus(e);
    }
    setIsFocused(true);
  }

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  useEffect(() => {
    setIsFocused(focused);
  }, [focused]);
  useEffect(() => {
    const float = labelClassName && labelClassName.includes(FLOAT_ABOVE_CLASS);
    setFloatAbove(currentValue || isFocused || float);
  }, [currentValue, isFocused, labelClassName]);

  return (
    <>
      <div className={rootClasses} {...otherRootProps}>
        {icon && <Icon icon={icon} />}
        {textarea ? (
          <textarea {...inputProps}></textarea>
        ) : (
          <input type="text" {...inputProps} />
        )}
        {outlined || textarea ? (
          <NotchedOutline
            htmlFor={id}
            label={label}
            labelClassName={labelClasses}
            notched={floatAbove}
          />
        ) : (
          label && (
            <label className={labelClasses} htmlFor={id}>
              {label}
            </label>
          )
        )}
        {trailingIcon && <Icon icon={trailingIcon} />}
        {!outlined && !textarea && <div className={lineRippleClasses}></div>}
      </div>
      <HelperLine
        characterCounter={
          maxLength && (
            <CharacterCounter
              count={currentValue && currentValue.length}
              maxLength={maxLength}
            />
          )
        }
        helperText={helperText}
        id={id}
      />
    </>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.element,
  icon: PropTypes.element,
  id: PropTypes.string,
  focused: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  outlined: PropTypes.bool,
  required: PropTypes.bool,
  textarea: PropTypes.bool,
  trailingIcon: PropTypes.element,
  valid: PropTypes.bool,
  value: PropTypes.string
};

export { TextField };
export { default as CharacterCounter } from './src/CharacterCounter';
export { default as HelperText } from './src/HelperText';
export { default as Icon } from './src/Icon';
