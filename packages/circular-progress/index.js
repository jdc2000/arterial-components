import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const XMLNS = 'http://www.w3.org/2000/svg';
const CIRCLES = {
  large: {
    viewBox: '0 0 48 48',
    cx: 24,
    cy: 24,
    r: 18,
    strokeDasharray: 113.097,
    strokeDashoffset: 56.549
  },
  medium: {
    viewBox: '0 0 32 32',
    cx: 16,
    cy: 16,
    r: 12.5,
    strokeDasharray: 78.54,
    strokeDashoffset: 39.27
  },
  small: {
    viewBox: '0 0 24 24',
    cx: 12,
    cy: 12,
    r: 8.75,
    strokeDasharray: 54.978,
    strokeDashoffset: 27.489
  },
  xsmall: {
    viewBox: '0 0 18 18',
    cx: 9,
    cy: 9,
    r: 6.563,
    strokeDasharray: 41.237,
    strokeDashoffset: 20.719
  }
};

export function CircularProgress({
  children,
  className,
  closed,
  fourColors,
  label = 'Progress Bar',
  progress,
  size = 'large',
  ...otherProps
}) {
  const isIndeterminate = progress === null || progress === undefined;
  const classes = classNames('mdc-circular-progress', className, {
    'mdc-circular-progress--closed': closed,
    'mdc-circular-progress--indeterminate': isIndeterminate,
    [`mdc-circular-progress--${size}`]: size
  });
  const value = progress || 0;
  const strokeDashoffset = (1 - value) * (2 * Math.PI * CIRCLES[size].r);

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
    >
      {isIndeterminate ? (
        <div className="mdc-circular-progress__indeterminate-container">
          {spinners.map(item => {
            const spinnerClasses = classNames(
              'mdc-circular-progress__spinner-layer',
              { [`mdc-circular-progress__color-${item}`]: fourColors }
            );
            return (
              <div className={spinnerClasses} key={item}>
                <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                  <svg
                    className="mdc-circular-progress__indeterminate-circle-graphic"
                    viewBox={CIRCLES[size].viewBox}
                    xmlns={XMLNS}
                  >
                    <circle
                      cx={CIRCLES[size].cx}
                      cy={CIRCLES[size].cy}
                      r={CIRCLES[size].r}
                      strokeDasharray={CIRCLES[size].strokeDasharray}
                      strokeDashoffset={CIRCLES[size].strokeDashoffset}
                    />
                  </svg>
                </div>
                <div className="mdc-circular-progress__gap-patch">
                  <svg
                    className="mdc-circular-progress__indeterminate-circle-graphic"
                    viewBox={CIRCLES[size].viewBox}
                    xmlns={XMLNS}
                  >
                    <circle
                      cx={CIRCLES[size].cx}
                      cy={CIRCLES[size].cy}
                      r={CIRCLES[size].r}
                      strokeDasharray={CIRCLES[size].strokeDasharray}
                      strokeDashoffset={CIRCLES[size].strokeDashoffset}
                    />
                  </svg>
                </div>
                <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                  <svg
                    className="mdc-circular-progress__indeterminate-circle-graphic"
                    viewBox={CIRCLES[size].viewBox}
                    xmlns={XMLNS}
                  >
                    <circle
                      cx={CIRCLES[size].cx}
                      cy={CIRCLES[size].cy}
                      r={CIRCLES[size].r}
                      strokeDasharray={CIRCLES[size].strokeDasharray}
                      strokeDashoffset={CIRCLES[size].strokeDashoffset}
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mdc-circular-progress__determinate-container">
          <svg
            className="mdc-circular-progress__determinate-circle-graphic"
            viewBox={CIRCLES[size].viewBox}
            xmlns={XMLNS}
          >
            <circle
              className="mdc-circular-progress__determinate-circle"
              cx={CIRCLES[size].cx}
              cy={CIRCLES[size].cy}
              r={CIRCLES[size].r}
              strokeDasharray={CIRCLES[size].strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

CircularProgress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closed: PropTypes.bool,
  fourColors: PropTypes.bool,
  label: PropTypes.string,
  progress: PropTypes.number,
  size: PropTypes.oneOf(['large', 'medium', 'small', 'xsmall'])
};
