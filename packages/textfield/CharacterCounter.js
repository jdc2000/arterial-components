import React from 'react';
import PropTypes from 'prop-types';

export default function CharacterCounter({ count, maxLength }) {
  if (maxLength) {
    return (
      <div className="mdc-text-field-character-counter">
        {count || 0} / {maxLength}
      </div>
    );
  }
  return null;
}

CharacterCounter.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
