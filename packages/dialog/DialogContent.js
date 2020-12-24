import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {DialogContext} from './DialogContext';
import {getContentId} from './utils';

export function DialogContent({
  children,
  className,
  id,
  tag: Tag = 'div',
  ...otherProps
}) {
  const {contentId, setContentId} = useContext(DialogContext);
  const classes = classNames('mdc-dialog__content', className);

  useEffect(() => {
    setContentId(id || getContentId());
  }, [id, setContentId]);

  return (
    <Tag className={classes} id={contentId} {...otherProps}>
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
