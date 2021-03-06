import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Dialog} from './Dialog';
import {DialogTitle} from './DialogTitle';
import {DialogContent} from './DialogContent';

export function SimpleDialog({className, content, onClose, open, title}) {
  const classes = classNames('ajs-dialog', 'ajs-dialog--simple', className);
  function handleClose() {
    if (onClose) {
      onClose('close');
    }
  }
  return (
    <Dialog className={classes} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}
SimpleDialog.displayName = 'SimpleDialog';
SimpleDialog.propTypes = {
  className: PropTypes.string,
  content: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
