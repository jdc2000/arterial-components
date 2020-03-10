import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DialogContext } from './DialogContext';

export default function DialogTitle({
  children,
  className,
  id,
  tag = 'h2',
  ...otherProps
}) {
  const dialogContext = useContext(DialogContext);
  const classes = classNames('mdc-dialog__title', className);
  const Tag = tag;

  if (id) {
    dialogContext.setTitleId(id);
  }

  return (
    <Tag className={classes} id={dialogContext.titleId} {...otherProps}>
      {children}
    </Tag>
  );
}

DialogTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  tag: PropTypes.element
};
