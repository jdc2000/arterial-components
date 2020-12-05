import PropTypes from 'prop-types';

const DEFAULT_COLOR = 'var(--mdc-theme-primary, black)';
const FONT_WEIGHT_BOLD = 'font-weight: bold';

export default function Highlighter({
  color = DEFAULT_COLOR,
  highlight,
  value,
  matches,
  tag: Tag = 'span',
}) {
  if (
    highlight &&
    Array.isArray(matches) &&
    matches[0] &&
    matches[0].value === value
  ) {
    const style = color
      ? `${FONT_WEIGHT_BOLD}; color: ${color}`
      : FONT_WEIGHT_BOLD;
    const result = [];
    const m = [].concat(matches[0].indices);
    let pair = m.shift();

    for (let i = 0; i < value.length; i++) {
      const char = value.charAt(i);
      if (pair && i === pair[0]) {
        result.push(`<span style="${style}">`);
      }
      result.push(char);
      if (pair && i === pair[1]) {
        result.push('</span>');
        pair = m.shift();
      }
    }
    return <Tag dangerouslySetInnerHTML={{__html: result.join('')}} />;
  }
  return value;
}

Highlighter.displayName = 'Highlighter';
Highlighter.propTypes = {
  color: PropTypes.string,
  highlight: PropTypes.bool,
  matches: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
};
