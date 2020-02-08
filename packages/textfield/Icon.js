import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Icon({ icon }) {
  const className = classNames(icon.props.className, 'mdc-text-field__icon');
  const props = { ...icon.props, className };
  return React.cloneElement(icon, props);
}

Icon.propTypes = { icon: PropTypes.element.isRequired };

export default Icon;
