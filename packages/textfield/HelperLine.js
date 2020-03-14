import React from 'react';
import PropTypes from 'prop-types';

export default function HelperLine({ characterCounter, helperText, id }) {
  return (
    <div className="mdc-text-field-helper-line">
      {helperText &&
        React.cloneElement(helperText, {
          ...helperText.props,
          id: `${id}-helper-text`
        })}
      {characterCounter &&
        React.cloneElement(characterCounter, characterCounter.props)}
    </div>
  );
}

HelperLine.propTypes = {
  characterCounter: PropTypes.element,
  helperText: PropTypes.element,
  id: PropTypes.string
};
