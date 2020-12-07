import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Dialog} from './Dialog';
import {DialogActions} from './DialogActions';
import {DialogButton} from './DialogButton';
import {DialogContent} from './DialogContent';
import {DialogTitle} from './DialogTitle';

export function AlertDialog({
  className,
  confirmingButtonLabel = 'Ok',
  content,
  onClose,
  open,
  title,
}) {
  const classes = classNames('ajs-dialog', 'ajs-dialog--alert', className);
  function handleClose() {
    if (onClose) {
      onClose('close');
    }
  }
  return (
    <Dialog className={classes} open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <DialogButton label={confirmingButtonLabel} onSelect={handleClose} />
      </DialogActions>
    </Dialog>
  );
}
AlertDialog.displayName = 'AlertDialog';
AlertDialog.propTypes = {
  className: PropTypes.string,
  confirmingButtonLabel: PropTypes.string,
  content: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
