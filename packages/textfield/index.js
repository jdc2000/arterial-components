import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NotchedOutline from './NotchedOutline';
import HelperLine from './HelperLine';
import CharacterCounter from './CharacterCounter';
import { Icon } from '@faterial/icon';

const FLOAT_ABOVE_CLASS = 'mdc-floating-label--float-above';
const ICON_CLASS = 'mdc-text-field__icon';

function TextField({
  className,
  disabled,
  helperText,
  icon,
  id,
  invalid,
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
  value,
  ...otherProps
}) {
  const inputEl = useRef();
  const [floatAbove, setFloatAbove] = useState(false);
  const [isFocused, setIsFocused] = useState(focused);

  const { className: rootClassName, ...otherRootProps } = rootProps;
  const classes = classNames(className, 'mdc-text-field', {
    'mdc-text-field--disabled': disabled,
    'mdc-text-field--focused': isFocused,
    'mdc-text-field--fullwidth': fullWidth,
    'mdc-text-field--invalid': invalid,
    'mdc-text-field--no-label': !label,
    'mdc-text-field--outlined': outlined,
    'mdc-text-field--textarea': textarea,
    'mdc-text-field--with-leading-icon': icon,
    'mdc-text-field--with-trailing-icon': trailingIcon
  });
  const inputClasses = classNames('mdc-text-field__input');
  const labelClasses = classNames('mdc-floating-label', labelClassName, {
    [FLOAT_ABOVE_CLASS]: floatAbove
  });
  const lineRippleClasses = classNames('mdc-line-ripple', {
    'mdc-line-ripple--active': isFocused,
    'mdc-line-ripple--deactivating': !isFocused
  });
  const inputProps = {
    className: inputClasses,
    disabled,
    id,
    maxLength,
    onBlur: handleBlur,
    onChange: onChange,
    onFocus: handleFocus,
    ref: inputEl,
    required,
    value,
    ...otherProps
  };

  if (helperText) {
    inputProps['aria-controls'] = `${id}-helper-text`;
    inputProps['aria-describedby'] = `${id}-helper-text`;
  }

  function handleBlur(e) {
    if (onBlur) {
      onBlur(e);
    }
    setIsFocused(false);
  }

  function handleFocus(e) {
    if (onFocus) {
      onFocus(e);
    }
    setIsFocused(true);
  }

  useEffect(() => {
    setIsFocused(focused);
  }, [focused]);

  useEffect(() => {
    const hasFloatAboveClass =
      labelClassName && labelClassName.includes(FLOAT_ABOVE_CLASS);
    setFloatAbove(Boolean(value || isFocused || hasFloatAboveClass));
  }, [value, isFocused, labelClassName]);

  return (
    <>
      <div className={classes} {...otherRootProps}>
        {icon && <Icon className={ICON_CLASS} icon={icon} />}
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
        {trailingIcon && <Icon className={ICON_CLASS} icon={trailingIcon} />}
        {!outlined && !textarea && <div className={lineRippleClasses}></div>}
      </div>
      <HelperLine
        characterCounter={
          maxLength && (
            <CharacterCounter
              count={value ? value.length : 0}
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
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  id: PropTypes.string,
  focused: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  outlined: PropTypes.bool,
  required: PropTypes.bool,
  textarea: PropTypes.bool,
  trailingIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  invalid: PropTypes.bool,
  value: PropTypes.string
};

export { TextField, CharacterCounter, Icon };
export { default as HelperText } from './HelperText';
