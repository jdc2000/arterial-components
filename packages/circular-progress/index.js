import classNames from 'classnames';
import PropTypes from 'prop-types';

const XMLNS = 'http://www.w3.org/2000/svg';
const styleDimensions = {
  large: {width: '48px', height: '48px'},
  medium: {width: '32px', height: '32px'},
  small: {width: '24px', height: '24px'},
};
const circleGraphicViewBoxes = {
  large: '0 0 48 48',
  medium: '0 0 32 32',
  small: '0 0 24 24',
};
const gapPatchCircleStrokeWidths = {
  large: {strokeWidth: '3.2'},
  medium: {strokeWidth: '2.4'},
  small: {strokeWidth: '2'},
};
const circleProps = {
  large: {
    cx: '24',
    cy: '24',
    r: '18',
    strokeDasharray: '113.097',
    strokeDashoffset: '56.549',
    strokeWidth: '4',
  },
  medium: {
    cx: '16',
    cy: '16',
    r: '12.5',
    strokeDasharray: '78.54',
    strokeDashoffset: '39.27',
    strokeWidth: '3',
  },
  small: {
    cx: '12',
    cy: '12',
    r: '8.75',
    strokeDasharray: '54.978',
    strokeDashoffset: '27.489',
    strokeWidth: '2.5',
  },
};

export function CircularProgress({
  children,
  className,
  closed,
  fourColors,
  label = 'Progress Bar',
  medium,
  progress,
  small,
  style,
  ...otherProps
}) {
  const isIndeterminate = progress == null;
  let size = 'large';
  if (medium) size = 'medium';
  else if (small) size = 'small';
  const classes = classNames('mdc-circular-progress', className, {
    'mdc-circular-progress--closed': closed,
    'mdc-circular-progress--indeterminate': isIndeterminate,
    [`mdc-circular-progress--${size}`]: size,
  });
  const value = progress || 0;
  const strokeDashoffset = (1 - value) * (2 * Math.PI * circleProps[size].r);
  const styles = {...styleDimensions[size], ...style};

  let spinners = fourColors ? [1, 2, 3, 4] : [1];
  if (Array.isArray(fourColors) && fourColors.length === 4) {
    spinners = fourColors;
  }
  return (
    <div
      {...otherProps}
      className={classes}
      role="progressbar"
      aria-label={label}
      aria-valuemin="0"
      aria-valuemax="1"
      aria-valuenow={progress}
      style={styles}
    >
      <div className="mdc-circular-progress__determinate-container">
        <svg
          className="mdc-circular-progress__determinate-circle-graphic"
          viewBox={circleGraphicViewBoxes[size]}
          xmlns={XMLNS}
        >
          <circle
            className="mdc-circular-progress__determinate-track"
            {...circleProps[size]}
            strokeDasharray={null}
            strokeDashoffset={null}
          />
          <circle
            className="mdc-circular-progress__determinate-circle"
            {...circleProps[size]}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
      <div className="mdc-circular-progress__indeterminate-container">
        {spinners.map(item => {
          const spinnerClasses = classNames(
            'mdc-circular-progress__spinner-layer',
            {[`mdc-circular-progress__color-${item}`]: fourColors}
          );
          return (
            <div className={spinnerClasses} key={item}>
              <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={circleGraphicViewBoxes[size]}
                  xmlns={XMLNS}
                >
                  <circle {...circleProps[size]} />
                </svg>
              </div>
              <div className="mdc-circular-progress__gap-patch">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={circleGraphicViewBoxes[size]}
                  xmlns={XMLNS}
                >
                  <circle
                    {...circleProps[size]}
                    strokeWidth={gapPatchCircleStrokeWidths[size]}
                  />
                </svg>
              </div>
              <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                <svg
                  className="mdc-circular-progress__indeterminate-circle-graphic"
                  viewBox={circleGraphicViewBoxes[size]}
                  xmlns={XMLNS}
                >
                  <circle {...circleProps[size]} />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
CircularProgress.displayName = 'CircularProgress';
CircularProgress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closed: PropTypes.bool,
  fourColors: PropTypes.bool,
  label: PropTypes.string,
  medium: PropTypes.bool,
  progress: PropTypes.number,
  small: PropTypes.bool,
};
