import {FormField} from '@arterial/form-field';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function SwitchBase({
  checked,
  className,
  disabled,
  id,
  onChange,
  style,
  value,
  ...otherProps
}) {
  const classes = classNames('mdc-switch', className, {
    'mdc-switch--checked': checked,
    'mdc-switch--disabled': disabled,
  });
  return (
    <div className={classes} style={style}>
      <div className="mdc-switch__track"></div>
      <div className="mdc-switch__thumb-underlay">
        <div className="mdc-switch__thumb"></div>
        <input
          aria-checked={checked}
          className="mdc-switch__native-control"
          disabled={disabled}
          id={id}
          onChange={onChange}
          role="switch"
          type="checkbox"
          value={value}
          {...otherProps}
        />
      </div>
    </div>
  );
}

export function Switch({alignEnd, id, label, ...otherProps}) {
  const styles = alignEnd ? {marginRight: '22px'} : {marginLeft: '22px'};
  if (label) {
    return (
      <FormField alignEnd={alignEnd}>
        <SwitchBase id={id} {...otherProps} />
        <label id={`${id}-label`} htmlFor={id} style={styles}>
          {label}
        </label>
      </FormField>
    );
  }
  return <SwitchBase id={id} {...otherProps} />;
}
Switch.displayName = 'Switch';
Switch.propTypes = {
  alignEnd: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.string,
};
