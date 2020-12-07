import {FormField} from '@arterial/form-field';
import {cssClasses, strings} from '@material/checkbox';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';

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
  const [animClass, setAnimClass] = useState('');
  const [checkState, setCheckState] = useState(strings.TRANSITION_STATE_INIT);
  const inputRef = useRef();
  let classes = classNames('mdc-checkbox', className, {
    [animClass]: animClass,
    'mdc-checkbox--disabled': disabled,
    'mdc-checkbox--selected': checked || indeterminate,
  });

  function determineCheckState(input) {
    if (input.indeterminate) return strings.TRANSITION_STATE_INDETERMINATE;
    return input.checked
      ? strings.TRANSITION_STATE_CHECKED
      : strings.TRANSITION_STATE_UNCHECKED;
  }

  function getTransitionAnimClass(newState) {
    switch (checkState) {
      case strings.TRANSITION_STATE_INIT:
        if (newState === strings.TRANSITION_STATE_UNCHECKED) {
          return '';
        }
        return newState === strings.TRANSITION_STATE_CHECKED
          ? cssClasses.ANIM_INDETERMINATE_CHECKED
          : cssClasses.ANIM_INDETERMINATE_UNCHECKED;
      case strings.TRANSITION_STATE_UNCHECKED:
        return newState === strings.TRANSITION_STATE_CHECKED
          ? cssClasses.ANIM_UNCHECKED_CHECKED
          : cssClasses.ANIM_UNCHECKED_INDETERMINATE;
      case strings.TRANSITION_STATE_CHECKED:
        return newState === strings.TRANSITION_STATE_UNCHECKED
          ? cssClasses.ANIM_CHECKED_UNCHECKED
          : cssClasses.ANIM_CHECKED_INDETERMINATE;
      default:
        // TRANSITION_STATE_INDETERMINATE
        return newState === strings.TRANSITION_STATE_CHECKED
          ? cssClasses.ANIM_INDETERMINATE_CHECKED
          : cssClasses.ANIM_INDETERMINATE_UNCHECKED;
    }
  }

  function handleAnimationEnd() {
    setAnimClass('');
  }

  function handleChange(e) {
    const newState = determineCheckState(e.target);
    const transitionAnimClass = getTransitionAnimClass(newState);
    setAnimClass(transitionAnimClass);
    setCheckState(newState);
    if (onChange) onChange(e);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = checked;
      inputRef.current.indeterminate = indeterminate;
      if (indeterminate) {
        setCheckState(strings.TRANSITION_STATE_INDETERMINATE);
      } else {
        setCheckState(
          checked
            ? strings.TRANSITION_STATE_CHECKED
            : strings.TRANSITION_STATE_UNCHECKED
        );
      }
    }
  }, [checked, indeterminate]);

  return (
    <div className={classes} style={style}>
      <input
        className="mdc-checkbox__native-control"
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
