import {Icon} from '@arterial/icon';
import {NotchedOutline} from '@arterial/notched-outline';
import {ALWAYS_FLOAT_TYPES} from '@material/textfield';
import {forwardRef, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';
import {TextFieldHelperLine} from './TextFieldHelperLine';

const AFFIX_CLASS = 'mdc-text-field__affix';
const PREFIX_CLASSES = `${AFFIX_CLASS} mdc-text-field__affix--prefix`;
const SUFFIX_CLASSES = `${AFFIX_CLASS} mdc-text-field__affix--suffix`;
const ICON_CLASS = 'mdc-text-field__icon';
const LEADING_ICON_CLASSES = `${ICON_CLASS} mdc-text-field__icon--leading`;
const TRAILING_ICON_CLASSES = `${ICON_CLASS} mdc-text-field__icon--trailing`;

export {TextFieldHelperLine};
export {TextFieldHelperText} from './TextFieldHelperText';
export const TextField = forwardRef((props, ref) => {
  const {
    children,
    className,
    'data-arterial': dataArterial,
    disabled,
    endAligned,
    helperText,
    icon,
    id,
    invalid,
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
    'mdc-text-field--end-aligned': endAligned,
    'mdc-text-field--filled': !outlined,
    'mdc-text-field--focused': focused,
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
      const {arterial} = e.target.dataset;
      if (!arterial || arterial !== arterialRef.current) {
        setFocused(false);
      }
    }

    function handleWindowKeyDown(e) {
      const {arterial} = e.target.dataset;
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

  function renderInput() {
    const Input = textarea ? 'textarea' : 'input';
    return (
      <Input
        className="mdc-text-field__input"
        data-arterial={arterialRef.current}
        disabled={disabled}
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
    );
  }

  return (
    <>
      <label
        className={classes}
        data-arterial={arterialRef.current}
        ref={ref}
        style={style}
      >
        {outlined ? (
          <NotchedOutline
            data-arterial={arterialRef.current}
            label={noLabel ? null : label}
            labelId={labelId}
            notched={isLabelFloating}
          />
        ) : (
          <>
            <span
              className="mdc-text-field__ripple"
              data-arterial={arterialRef.current}
            ></span>
            {label && (
              <span
                className={labelClasses}
                data-arterial={arterialRef.current}
                id={labelId}
              >
                {label}
              </span>
            )}
          </>
        )}
        {textarea ? (
          <span
            className="mdc-text-field__resizer"
            data-arterial={arterialRef.current}
          >
            {renderInput()}
          </span>
        ) : (
          <>
            {icon && (
              <Icon
                className={LEADING_ICON_CLASSES}
                data-arterial={arterialRef.current}
                icon={icon}
                onClick={e => handleIconAction(e, onIconAction)}
                onFocus={handleIconFocus}
                onKeyDown={e => handleIconAction(e, onIconAction)}
                role={onIconAction ? 'button' : null}
                tabIndex={onIconAction ? '0' : null}
              />
            )}
            {prefix && (
              <span
                className={PREFIX_CLASSES}
                data-arterial={arterialRef.current}
              >
                {prefix}
              </span>
            )}
            {renderInput()}
            {suffix && (
              <span
                className={SUFFIX_CLASSES}
                data-arterial={arterialRef.current}
              >
                {suffix}
              </span>
            )}
            {trailingIcon && (
              <Icon
                className={TRAILING_ICON_CLASSES}
                data-arterial={arterialRef.current}
                icon={trailingIcon}
                onClick={e => handleIconAction(e, onTrailingIconAction)}
                onFocus={handleIconFocus}
                onKeyDown={e => handleIconAction(e, onTrailingIconAction)}
                role={onTrailingIconAction ? 'button' : null}
                tabIndex={onTrailingIconAction ? '0' : null}
              />
            )}
          </>
        )}
        {!outlined && (
          <span
            className={lineRippleClasses}
            data-arterial={arterialRef.current}
          ></span>
        )}
      </label>
      <TextFieldHelperLine
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
  endAligned: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  icon: PropTypes.node,
  id: PropTypes.string,
  invalid: PropTypes.bool,
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
