import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Section({
  alignEnd,
  alignStart = true,
  children,
  className,
  tag: Tag = 'section',
  ...otherProps
}) {
  const classes = classNames('mdc-top-app-bar__section', className, {
    'mdc-top-app-bar__section--align-end': alignEnd,
    'mdc-top-app-bar__section--align-start': !alignEnd && alignStart,
  });
  const role = alignEnd ? 'toolbar' : null;
  return (
    <Tag className={classes} {...otherProps} role={role}>
      {children}
    </Tag>
  );
}

Section.propTypes = {
  alignEnd: PropTypes.bool,
  alignStart: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
