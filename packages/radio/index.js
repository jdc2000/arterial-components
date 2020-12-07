import {FormField} from '@arterial/form-field';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function RadioBase({
  checked,
  className,
  disabled,
  id,
  onChange,
  ripple = true,
  style,
  value,
  ...otherProps
}) {
  const classes = classNames('mdc-radio', className, {
    'mdc-radio--disabled': disabled,
  });
  return (
    <div className={classes} style={style}>
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
  );
}

export function Radio({alignEnd, id, label, ...otherProps}) {
  if (label) {
    return (
      <FormField alignEnd={alignEnd}>
        <RadioBase id={id} {...otherProps} />
        <label id={`${id}-label`} htmlFor={id}>
          {label}
        </label>
      </FormField>
    );
  }
  return <RadioBase id={id} {...otherProps} />;
}
Radio.displayName = 'Radio';
Radio.propTypes = {
  alignEnd: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  ripple: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string,
};
