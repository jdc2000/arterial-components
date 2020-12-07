import classNames from 'classnames';
import PropTypes from 'prop-types';

export function SelectHelperText({
  className,
  id,
  persistent,
  text,
  validationMsg,
  ...otherProps
}) {
  const classes = classNames('mdc-select-helper-text', className, {
    'mdc-select-helper-text--persistent': persistent,
    'mdc-select-helper-text--validation-msg': validationMsg,
  });
  return (
    <p className={classes} aria-hidden="true" id={id} {...otherProps}>
      {text}
    </p>
  );
}
SelectHelperText.displayName = 'SelectHelperText';
SelectHelperText.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  persistent: PropTypes.bool,
  text: PropTypes.node,
  validationMsg: PropTypes.bool,
};
