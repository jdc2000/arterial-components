import {isValidElement} from 'react';
import {TextFieldCharacterCounter} from './TextFieldCharacterCounter';
import {TextFieldHelperText} from './TextFieldHelperText';
import PropTypes from 'prop-types';

function HelperText({text}) {
  if (typeof text === 'object') {
    if (text === null || isValidElement(text)) {
      return text;
    }
    return <TextFieldHelperText {...text} />;
  }
  return null;
}

export function TextFieldHelperLine({count, maxLength, text}) {
  if (text || maxLength) {
    return (
      <div className="mdc-text-field-helper-line">
        <HelperText text={text} />
        <TextFieldCharacterCounter count={count} maxLength={maxLength} />
      </div>
    );
  }
  return null;
}
TextFieldHelperLine.displayName = 'TextFieldHelperLine';
TextFieldHelperLine.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  helperText: PropTypes.node,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
