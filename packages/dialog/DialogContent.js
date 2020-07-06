import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DialogContext } from './DialogContext';

export default function DialogContent({
  children,
  className,
  id,
  tag: Tag = 'div',
  ...otherProps
}) {
  const dialogContext = useContext(DialogContext);
  const classes = classNames('mdc-dialog__content', className);

  if (id) dialogContext.setContentId(id);

  return (
    <Tag className={classes} id={dialogContext.contentId} {...otherProps}>
      {children}
    </Tag>
  );
}
DialogContent.displayName = 'DialogContent';
DialogContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
