import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Button} from '@arterial/button';

export default function DialogButton({
  action = 'close',
  className,
  onSelect,
  type = 'button',
  ...otherProps
}) {
  const classes = classNames('mdc-dialog__button', className);

  function handleSelect(e) {
    const isClick = e.type === 'click';
    const isEnter = e.key === 'Enter' || e.keyCode === 13;
    if (onSelect && (isClick || isEnter)) {
      onSelect(action);
    }
  }

  return (
    <Button
      className={classes}
      onClick={handleSelect}
      onKeyDown={handleSelect}
      type={type}
      {...otherProps}
    />
  );
}
DialogButton.displayName = 'DialogButton';
DialogButton.propTypes = {
  action: PropTypes.string,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  type: PropTypes.string,
};
