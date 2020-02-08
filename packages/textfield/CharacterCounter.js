import React from 'react';
import PropTypes from 'prop-types';

function CharacterCounter({ count, maxLength }) {
  return (
    <div className="mdc-text-field-character-counter">
      {count || 0} / {maxLength}
    </div>
  );
}

CharacterCounter.propTypes = {
  count: PropTypes.number,
  maxLength: PropTypes.number.isRequired
};

export default CharacterCounter;
