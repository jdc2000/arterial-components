import React from 'react';
import PropTypes from 'prop-types';
import { HelperText } from './HelperText';

export function HelperLine({ text }) {
  if (typeof text === 'object') {
    if (text === null || React.isValidElement(text)) {
      return text;
    }
    return <HelperText {...text} />;
  }
  return null;
}

HelperLine.displayName = 'SelectHelperLine';
HelperLine.propTypes = {
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
};
