import React, { useEffect, useRef, useState } from 'react';
import HelperLine from './HelperLine';
import { Icon } from '@arterial/icon';
import { NotchedOutline } from '@arterial/notched-outline';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

// prettier-ignore
const ALWAYS_FLOAT_TYPES = ['color', 'date', 'datetime-local', 'month', 'range', 'time', 'week'];
const AFFIX_CLASS = 'mdc-text-field__affix';
const PREFIX_CLASSES = `${AFFIX_CLASS} mdc-text-field__affix--prefix`;
const SUFFIX_CLASSES = `${AFFIX_CLASS} mdc-text-field__affix--suffix`;
const ICON_CLASS = 'mdc-text-field__icon';
const LEADING_ICON_CLASSES = `${ICON_CLASS} mdc-text-field__icon--leading`;
const TRAILING_ICON_CLASSES = `${ICON_CLASS} mdc-text-field__icon--trailing`;

export { default as HelperText } from './HelperText';
export const TextField = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    'data-arterial': dataArterial,
    disabled,
    helperText,
    icon,
    id,
    invalid,
    fullwidth,
    label,
    labelFloating,
    maxLength,
    noLabel,
    onChange,
    onFocus,
    onIconAction,
    onTrailingIconAction,
    outlined,
    prefix,
    style,
    suffix,
    textarea,
    trailingIcon,
    type,
    value,
    ...otherProps
  } = props;
  const [focused, setFocused] = useState(false);
  const arterialRef = useRef(dataArterial || uuid());
  const inputRef = useRef();
  const isLabelFloating = Boolean(
    labelFloating || focused || value || ALWAYS_FLOAT_TYPES.includes(type)
  );
  const classes = classNames(className, 'mdc-text-field', {
    'mdc-text-field--disabled': disabled,
    'mdc-text-field--filled': !outlined && !textarea,
    'mdc-text-field--focused': focused,
    'mdc-text-field--fullwidth': fullwidth,
    'mdc-text-field--invalid': invalid,
    'mdc-text-field--label-floating': isLabelFloating,
    'mdc-text-field--no-label': noLabel,
    'mdc-text-field--outlined': outlined,
    'mdc-text-field--textarea': textarea,
    'mdc-text-field--with-leading-icon': icon,
    'mdc-text-field--with-trailing-icon': trailingIcon,
  });
  const labelClasses = classNames('mdc-floating-label', {
    'mdc-floating-label--float-above': isLabelFloating,
  });
  const lineRippleClasses = classNames('mdc-line-ripple', {
    'mdc-line-ripple--active': focused,
  });

  const labelId = `${id}-label`;
  const ariaProps = {
    'aria-label': noLabel ? label : null,
    'aria-labelledby': noLabel ? null : labelId,
  };

  function handleFocus(e) {
    if (focused) return;
    setFocused(true);
    if (onFocus) onFocus(e);
  }

  function handleIconAction(e, action) {
    const isClick = e.type === 'click';
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    const isSpace = e.key === 'Space' || e.keyCode === 32;
    if (action && (isClick || isEnter || isSpace)) {
      inputRef.current.focus();
      action();
      e.preventDefault();
    }
  }

  function handleIconFocus(e) {
    setFocused(true);
  }

  useEffect(() => {
    function handleBodyClick(e) {
      const { arterial } = e.target.dataset;
      if (!arterial || arterial !== arterialRef.current) {
        setFocused(false);
      }
    }

    function handleWindowKeyDown(e) {
      const { arterial } = e.target.dataset;
      const isEscape = e.key === 'Escape' || e.keyCode === 27;
      const isTab = e.key === 'Tab' || e.keyCode === 9;
      if ((isEscape || isTab) && arterial === arterialRef.current) {
        setFocused(false);
      }
    }

    document.body.addEventListener('click', handleBodyClick);
    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);

  const Input = textarea ? 'textarea' : 'input';
  return (
    <>
      <label
        className={classes}
        data-arterial={arterialRef.current}
        ref={ref}
        style={style}
      >
        {!textarea && (
          <>
            {!outlined && <span className="mdc-text-field__ripple"></span>}
            {prefix && <span className={PREFIX_CLASSES}>{prefix}</span>}
            {icon && (
              <Icon
                className={LEADING_ICON_CLASSES}
                data-arterial={arterialRef.current}
                icon={icon}
                onClick={(e) => handleIconAction(e, onIconAction)}
                onFocus={handleIconFocus}
                onKeyDown={(e) => handleIconAction(e, onIconAction)}
                role={onIconAction ? 'button' : null}
                tabIndex={onIconAction ? '0' : null}
              />
            )}
          </>
        )}
        <Input
          className="mdc-text-field__input"
          data-arterial={arterialRef.current}
          id={id}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={handleFocus}
          ref={inputRef}
          type={type}
          value={value}
          {...ariaProps}
          {...otherProps}
        />
        {!textarea && (
          <>
            {suffix && <span className={SUFFIX_CLASSES}>{suffix}</span>}
            {trailingIcon && (
              <Icon
                className={TRAILING_ICON_CLASSES}
                data-arterial={arterialRef.current}
                icon={trailingIcon}
                onClick={(e) => handleIconAction(e, onTrailingIconAction)}
                onFocus={handleIconFocus}
                onKeyDown={(e) => handleIconAction(e, onTrailingIconAction)}
                role={onTrailingIconAction ? 'button' : null}
                tabIndex={onTrailingIconAction ? '0' : null}
              />
            )}
            {!outlined && (
              <>
                {label && !noLabel && (
                  <span
                    className={labelClasses}
                    data-arterial={arterialRef.current}
                    id={labelId}
                  >
                    {label}
                  </span>
                )}
                <span
                  className={lineRippleClasses}
                  data-arterial={arterialRef.current}
                ></span>
              </>
            )}
          </>
        )}
        {(outlined || textarea) && (
          <NotchedOutline
            data-arterial={arterialRef.current}
            label={noLabel ? null : label}
            labelId={labelId}
            notched={isLabelFloating}
          />
        )}
      </label>
      <HelperLine
        count={value ? value.length : 0}
        maxLength={maxLength}
        text={helperText}
      />
    </>
  );
});
TextField.displayName = 'TextField';
TextField.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  'data-arterial': PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  icon: PropTypes.node,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  fullwidth: PropTypes.bool,
  label: PropTypes.node,
  labelFloating: PropTypes.bool,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  noLabel: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onIconAction: PropTypes.func,
  onTrailingIconAction: PropTypes.func,
  outlined: PropTypes.bool,
  prefix: PropTypes.string,
  style: PropTypes.object,
  suffix: PropTypes.string,
  textarea: PropTypes.bool,
  trailingIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};
