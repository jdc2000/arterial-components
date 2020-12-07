import PropTypes from 'prop-types';

export function TextFieldCharacterCounter({count, maxLength}) {
  if (maxLength) {
    return (
      <div className="mdc-text-field-character-counter">
        {count || 0} / {maxLength}
      </div>
    );
  }
  return null;
}
TextFieldCharacterCounter.displayName = 'TextFieldCharacterCounter';
TextFieldCharacterCounter.propTypes = {
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
