import classNames from 'classnames';
import PropTypes from 'prop-types';

export function SelectHelperText({
  className,
  id,
  text,
  validationMsg,
  validationMsgPersistent,
  ...otherProps
}) {
  const classes = classNames('mdc-select-helper-text', className, {
    'mdc-select-helper-text--validation-msg': validationMsg,
    'mdc-select-helper-text--validation-msg-persistent': validationMsgPersistent,
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
