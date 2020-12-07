import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {DialogContext} from './DialogContext';
import {getTitleId} from './utils';

export function DialogTitle({
  children,
  className,
  id,
  tag: Tag = 'h2',
  ...otherProps
}) {
  const {titleId, setTitleId} = useContext(DialogContext);
  const classes = classNames('mdc-dialog__title', className);

  useEffect(() => {
    setTitleId(id || getTitleId());
  }, [id, setTitleId]);

  return (
    <Tag className={classes} id={titleId} {...otherProps}>
      {children}
    </Tag>
  );
}
DialogTitle.displayName = 'DialogTitle';
DialogTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
