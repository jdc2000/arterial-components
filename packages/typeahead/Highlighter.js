import React from 'react';
import PropTypes from 'prop-types';

function Highlighter({
  color = 'var(--mdc-theme-primary, black)',
  item,
  itemKey,
  matches,
  tag = 'span'
}) {
  let value = item;
  if (typeof item !== 'string') {
    if (!itemKey) {
      throw new Error(
        'The `field` prop is required when the `item` prop is an object'
      );
    }
    value = item[itemKey];
  }
  const Tag = tag;
  if (Array.isArray(matches) && matches[0].value === value) {
    const prop = color ? ` style="color: ${color}"` : '';
    const match = matches[0];

    let text = value;
    let result = [];
    let m = [].concat(match.indices);
    let pair = m.shift();

    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);
      if (pair && i === pair[0]) {
        result.push(`<b${prop}>`);
      }
      result.push(char);
      if (pair && i === pair[1]) {
        result.push('</b>');
        pair = m.shift();
      }
    }
    return <Tag dangerouslySetInnerHTML={{ __html: result.join('') }} />;
  }
  return <Tag>{value}</Tag>;
}

Highlighter.propTypes = {
  color: PropTypes.string,
  field: PropTypes.string,
  item: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  matches: PropTypes.arrayOf(PropTypes.object)
};

export default Highlighter;
