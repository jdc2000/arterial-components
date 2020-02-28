import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withDialogContext } from './DialogContext';

function DialogContent({
  children,
  className,
  dialogContext,
  id,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-dialog__content', className);
  const Tag = tag;

  if (id) {
    dialogContext.setContentId(id);
  }

  return (
    <Tag className={classes} id={dialogContext.contentId} {...otherProps}>
      {children}
    </Tag>
  );
}

DialogContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  tag: PropTypes.element
};

export default withDialogContext(DialogContent);
