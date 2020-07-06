import React from 'react';
import CharacterCounter from './CharacterCounter';
import HelperText from './HelperText';
import PropTypes from 'prop-types';

function Text({ text }) {
  if (typeof text === 'object') {
    if (text === null || React.isValidElement(text)) {
      return text;
    }
    return <HelperText {...text} />;
  }
  return null;
}

export default function HelperLine({ count, maxLength, text }) {
  if (text || maxLength) {
    return (
      <div className="mdc-text-field-helper-line">
        <Text text={text} />
        <CharacterCounter count={count} maxLength={maxLength} />
      </div>
    );
  }
  return null;
}
HelperLine.displayName = 'TextFieldHelperLine';
HelperLine.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  helperText: PropTypes.node,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
