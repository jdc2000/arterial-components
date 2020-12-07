import classNames from 'classnames';
import PropTypes from 'prop-types';

export function TextFieldHelperText({
  className,
  id,
  persistent,
  text,
  validationMsg,
  ...otherProps
}) {
  const classes = classNames('mdc-text-field-helper-text', className, {
    'mdc-text-field-helper-text--persistent': persistent,
    'mdc-text-field-helper-text--validation-msg': validationMsg,
  });
  return (
    <div className={classes} aria-hidden="true" id={id} {...otherProps}>
      {text}
    </div>
  );
}
TextFieldHelperText.displayName = 'TextFieldHelperText';
TextFieldHelperText.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  persistent: PropTypes.bool,
  text: PropTypes.node,
  validationMsg: PropTypes.bool,
};
