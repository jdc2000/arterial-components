import PropTypes from 'prop-types';
import {isValidElement} from 'react';
import {SelectHelperText} from './SelectHelperText';

export function SelectHelperLine({text}) {
  if (typeof text === 'object') {
    if (text === null || isValidElement(text)) {
      return text;
    }
    return <SelectHelperText {...text} />;
  }
  return null;
}
SelectHelperLine.displayName = 'SelectHelperLine';
SelectHelperLine.propTypes = {
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};
