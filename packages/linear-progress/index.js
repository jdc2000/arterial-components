import classNames from 'classnames';
import PropTypes from 'prop-types';

export function LinearProgress({
  buffer,
  className,
  closed,
  indeterminate,
  label,
  progress,
  reversed,
  ...otherProps
}) {
  const classes = classNames('mdc-linear-progress', className, {
    'mdc-linear-progress--closed': closed,
    'mdc-linear-progress--indeterminate': indeterminate,
    'mdc-linear-progress--reversed': reversed,
  });
  return (
    <div
      role="progressbar"
      className={classes}
      aria-label={label}
      aria-valuemin="0"
      aria-valuemax="1"
      aria-valuenow={progress}
      {...otherProps}
    >
      <div className="mdc-linear-progress__buffer">
        <div class="mdc-linear-progress__buffer-bar"></div>
        <div
          class="mdc-linear-progress__buffer-dots"
          style={buffer ? {flexBasis: `${(1 - buffer) * 100}%`} : {}}
        ></div>
      </div>
      <div
        className="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
        style={progress ? {transform: `scaleX(${progress})`} : {}}
      >
        <span className="mdc-linear-progress__bar-inner"></span>
      </div>
      <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span className="mdc-linear-progress__bar-inner"></span>
      </div>
    </div>
  );
}
LinearProgress.displayName = 'LinearProgress';
LinearProgress.propTypes = {
  buffer: PropTypes.number,
  className: PropTypes.string,
  closed: PropTypes.bool,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  progress: PropTypes.number,
  reversed: PropTypes.bool,
};
