import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@faterial/button';

function DialogButton({
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
      return onSelect(action);
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

DialogButton.propTypes = {
  action: PropTypes.string,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  type: PropTypes.string
};

export default DialogButton;
