import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function FormField({
  alignEnd,
  children,
  className,
  tag = 'div',
  ...otherProps
}) {
  const classes = classNames('mdc-form-field', className, {
    'mdc-form-field--align-end': alignEnd
  });
  const Tag = tag;
  return (
    <Tag className={classes} {...otherProps}>
      {children}
    </Tag>
  );
}

export function withFormField(WrappedComponent) {
  return function({ formFieldProps, label, ...otherProps }) {
    if (label) {
      return (
        <FormField {...formFieldProps}>
          <WrappedComponent label={label} {...otherProps} />
        </FormField>
      );
    }
    return <WrappedComponent {...otherProps} />;
  };
}

FormField.propTypes = {
  alignEnd: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.element
};
